import {
  Button,
  Checkbox,
  Form,
  Input,
  notification,
  Select,
  Space,
} from "antd";
import { useRef, useState } from "react";
import { useAuthDispatch } from "../../_context";
import { register } from "../../_context/action";
import { useHistory } from "react-router-dom";

const RegisterComponent = () => {
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

  const handleChange = (name, value) => {
    setFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const handleSubmit = async () => {
    formRef.current.validateFields().then(async () => {
      const registerParams = {
        email: fields.email,
        password: fields.password,
      };
      const response = await register(dispatch, registerParams);
      if (!response?.user) {
        openNotification("error");
        return;
      }
      openNotification("success");
      history.push("/");
      formRef.current.resetFields();
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
        description: "Error occurred while registering",
      };
    },
    success: () => {
      return {
        message: "Success!",
        description: "Successfully registered",
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
    <div className="w-9/12 p-8 m-8 border-solid border-2 border-app-btn-green-900">
      <Form
        labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
        wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
        form={form}
        ref={formRef}
        name="register"
        onFinish={handleSubmit}
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
            placeholder="Enter email"
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
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
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
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Space
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={() => {
              formRef.current?.resetFields();
              history.push("/");
            }}
          >
            Back to login
          </Button>
          <Button htmlType="submit">Register</Button>
        </Space>
      </Form>
    </div>
  );
};

export default RegisterComponent;
