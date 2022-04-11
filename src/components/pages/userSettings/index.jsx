import { Button, Form, Input, notification, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useAuthDispatch, useAuthState } from "../../../_context";
import { updateUser } from "../../../_context/action";
import { useHistory } from "react-router-dom";

const UserSettingsComponent = () => {
  const userDetails = useAuthState(); // global state user details usage here
  let history = useHistory();
  const initialFieldsState = {
    email: null,
    password: null,
    nickname: null,
    phone: null,
    gender: null,
  };
  const dispatch = useAuthDispatch();
  const formRef = useRef();
  const [form] = Form.useForm();
  const [fields, setFields] = useState(initialFieldsState);

  useEffect(() => {
    if (userDetails) {
      const user = { ...userDetails.userDetails };
      setFields({ ...user, email: user.username });
      form.setFieldsValue({
        ...user,
        email: user.username,
      });
    }
  }, [userDetails]);

  const handleChange = (name, value) => {
    setFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    formRef.current
      .validateFields()
      .then(async () => {
        const params = {
          email: fields.email,
          password: fields.password,
        };
        const response = await updateUser(dispatch, params);
        if (!response?.user) {
          openNotification("error");
          return;
        }
        openNotification("success");
      })
      .catch(() => {
        openNotification("error");
      });
  };

  const openNotification = (type) => {
    const typeObj = notificationType[type]();
    notification[type]({
      message: typeObj?.message,
      description: typeObj?.description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  const notificationType = {
    error: () => {
      return {
        message: "Error!",
        description: "Error occurred while updating",
      };
    },
    success: () => {
      return {
        message: "Success!",
        description: "Successfully updated",
      };
    },
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Select.Option value="90">+90</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="w-9/12">
      <Form
        labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
        wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
        form={form}
        ref={formRef}
        name="userUpdate"
        onFinish={handleSave}
        initialValues={{
          prefix: "90",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            name="email"
            value={fields.email}
            readOnly={true}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            name="password"
            value={fields.password}
            placeholder="Enter password"
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="nickname"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input
            name="nickname"
            value={fields.nickname}
            placeholder="Enter nickname"
            onChange={(e) => handleChange("nickname", e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            name="phone"
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
            value={fields.phone}
            placeholder="Enter phone number"
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Please select gender!",
            },
          ]}
        >
          <Select
            name="gender"
            value={fields.gender}
            placeholder="Select your gender"
            onChange={(value) => handleChange("gender", value)}
          >
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Space
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button htmlType="submit">Save</Button>
        </Space>
      </Form>
    </div>
  );
};

export default UserSettingsComponent;
