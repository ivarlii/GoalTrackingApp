import {notification, Table} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";

const HomeComponent = () => {
    const [data, setData] = useState([]);
    const columns = [
        {
            dataIndex: "dateCreated",
            title: "Created date",
            width: "20%",
        },
        {
            dataIndex: "restTime",
            title: "Rest duration",
            width: "10%",
        },
        {
            dataIndex: "exerciseTime",
            title: "Exercise duration",
            width: "15%",
        },
        {
            dataIndex: "stepCount",
            title: "Step count",
            width: "10%",
        },
        {
            dataIndex: "snackList",
            title: "Snacks",
            width: "10%",
            render: (text, record) => {
                return text ? text.join(", ") : "";
            }
        },
        {
            dataIndex: "tags",
            title: "Tags",
            width: "10%",
            render: (text, record) => {
                return text ? text.join(", ") : "";
            }
        },
        {
            dataIndex: "moodDesc",
            title: "Mood",
            width: "10%",
        },
        {
            dataIndex: "favoriteFruit",
            title: "Fav fruit",
            width: "10%",
        },
    ]

    useEffect(() => {
        getUserTimeData();
    }, []);

    const getUserTimeData = () => {
        axios
            .get("userInfo.json")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                openNotification();
            });
    };

    const openNotification = () => {
        notification.error({
            message: 'Error!',
            description:
                'Error occurred while getting user data',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    return (
        <div>
            <Table className=""
                   rowKey="_id"
                   dataSource={data}
                   columns={columns}
                   style={{width: "90%"}}
                   bordered={true}
                   pagination={{
                       pageSize: 5
                   }}
            />
        </div>
    );
};

export default HomeComponent;
