import { notification, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { dateFormatterWithTime } from "../../utils/DateFormatUtil";
import { useAuthState } from "../../../_context";

const HomeComponent = () => {
  const userDetails = useAuthState(); // global state user details usage here
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const columns = [
    {
      dataIndex: "dateCreated",
      title: "Created date",
      width: "20%",
      align: "center",
      sorter: (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated),
      render: (text) => {
        return text ? dateFormatterWithTime(text) : "";
      },
    },
    {
      dataIndex: "restDuration",
      title: "Rest duration",
      width: "15%",
      align: "center",
      sorter: (a, b) => a.restDuration - b.restDuration,
      render: (text) => `${text}m`,
    },
    {
      dataIndex: "exerciseDuration",
      title: "Exercise duration",
      width: "15%",
      align: "center",
      sorter: (a, b) => a.exerciseDuration - b.exerciseDuration,
      render: (text) => `${text}m`,
    },
    {
      dataIndex: "stepCount",
      title: "Step count",
      width: "10%",
      align: "center",
      sorter: (a, b) => a.stepCount - b.stepCount,
    },
    {
      dataIndex: "snackList",
      title: "Snacks",
      width: 200,
      align: "center",
      sorter: (a, b) =>
        a.snackList.join(", ").localeCompare(b.snackList.join(", ")),
      onCell: () => {
        return {
          style: {
            whiteSpace: "nowrap",
            maxWidth: 200,
          },
        };
      },
      render: (text) => {
        const joinedText = text ? text.join(", ") : "";
        return (
          <Tooltip title={joinedText}>{`${joinedText.substring(
            0,
            20
          )}...`}</Tooltip>
        );
      },
    },
    {
      dataIndex: "tags",
      title: "Tags",
      width: 200,
      align: "center",
      sorter: (a, b) => a.tags.join(", ").localeCompare(b.tags.join(", ")),
      onCell: () => {
        return {
          style: {
            whiteSpace: "nowrap",
            maxWidth: 200,
          },
        };
      },
      render: (text) => {
        const joinedText = text ? text.join(", ") : "";
        return (
          <Tooltip title={joinedText}>{`${joinedText.substring(
            0,
            20
          )}...`}</Tooltip>
        );
      },
    },
    {
      dataIndex: "moodDesc",
      title: "Mood",
      width: 350,
      align: "center",
      sorter: (a, b) => a.moodDesc.localeCompare(b.moodDesc),
      onCell: () => {
        return {
          style: {
            whiteSpace: "nowrap",
            maxWidth: 350,
          },
        };
      },
      render: (text) => {
        return <Tooltip title={text}>{`${text.substring(0, 45)}...`}</Tooltip>;
      },
    },
    {
      dataIndex: "favoriteFruit",
      title: "Favourite fruit",
      width: "10%",
      fixed: "right",
      align: "center",
      sorter: (a, b) => a.favoriteFruit.localeCompare(b.favoriteFruit),
    },
  ];

  useEffect(() => {
    getUserTimeData();
  }, []);

  const getUserTimeData = () => {
    axios
      .get("userInfo.json")
      .then((res) => {
        res.data.sort((a, b) => {
          return new Date(a.dateCreated) - new Date(b.dateCreated);
        });
        setData(res.data);
      })
      .catch(() => {
        openNotification();
      });
  };

  const openNotification = () => {
    notification.error({
      message: "Error!",
      description: "Error occurred while getting user data",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  return (
    <div>
      <span
        style={{
          display: "flex",
          justifyContent: "left",
          fontWeight: "bold",
        }}
      >
        {`Welcome ${
          userDetails.user?.nickname
            ? userDetails.user.nickname
            : userDetails.userDetails?.nickname
            ? userDetails.userDetails.nickname
            : ""
        } (${
          userDetails?.user?.username
            ? userDetails.user.username
            : userDetails.userDetails?.username
            ? userDetails.userDetails.username
            : "not registered user"
        })`}
      </span>
      <Table
        class="min-w-full max-h-full"
        rowKey="_id"
        dataSource={data}
        columns={columns}
        bordered={true}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          showQuickJumper: true,
          hideOnSinglePage: false,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20],
          showTotal: (total) => `${total} items`,
          onShowSizeChange: (current, size) => {
            setCurrentPage(current);
            setPageSize(size);
          },
          onChange: (page, pageSize) => {
            setPageSize(pageSize);
            setCurrentPage(page.current);
          },
        }}
        scroll={{ x: 1800, y: 900 }}
      />
    </div>
  );
};

export default HomeComponent;
