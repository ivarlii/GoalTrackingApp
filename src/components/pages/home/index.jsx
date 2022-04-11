import {notification, Table, Tooltip} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import {dateFormatterWithTime} from "../../utils/DateFormatUtil";
import "./style/HomeComponent.css";

const HomeComponent = () => {
    const [data, setData] = useState([]);
    const columns = [
        {
            dataIndex: "dateCreated",
            title: "Created date",
            width: "20%",
            align: "center",
            render: (text) => {
                return text ? dateFormatterWithTime(text) : "";
            },
        },
        {
            dataIndex: "restDuration",
            title: "Rest duration",
            width: "15%",
            align: "center",
            sorter: (a, b) => a - b,
            render: (text) => `${text}m`,
        },
        {
            dataIndex: "exerciseDuration",
            title: "Exercise duration",
            width: "15%",
            align: "center",
            render: (text) => `${text}m`,
        },
        {
            dataIndex: "stepCount",
            title: "Step count",
            width: "10%",
            align: "center",
        },
        {
            dataIndex: "snackList",
            title: "Snacks",
            width: 200,
            align: "center",
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
                return <Tooltip title={joinedText}>{joinedText.substring(0, 60) + "..."}</Tooltip>;
            }
        },
        {
            dataIndex: "tags",
            title: "Tags",
            width: 200,
            align: "center",
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
                return <Tooltip title={joinedText}>{joinedText}</Tooltip>;
            }
        },
        {
            dataIndex: "moodDesc",
            title: "Mood",
            width: "10%",
            align: "center",
        },
        {
            dataIndex: "favoriteFruit",
            title: "Fav fruit",
            width: "10%",
            align: "center",
        },
    ];

    useEffect(() => {
        getUserTimeData();
    }, []);

    const getUserTimeData = () => {
        axios
            .get("userInfo.json")
            .then((res) => {
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
        <div id="custom_table">
            <Table
                class="min-w-full"
                rowKey="_id"
                dataSource={data}
                columns={columns}
                bordered={true}
                pagination={{
                    pageSize: 5,
                }}
                scroll={{x: 1800, y: 600}}
            />
        </div>
    );
};

export default HomeComponent;
