import { useState } from "react";
import { Avatar, Card, Col, Row } from "antd";
import { useLocation } from "react-router-dom";
import { useAuthState } from "../../_context";

const { Meta } = Card;

const SidebarComponent = () => {
  const userDetails = useAuthState(); // global state user details usage here
  const [showSidebar, setShowSidebar] = useState(false);
  let location = useLocation();

  const getCurrentUserInfo = (label, value) => {
    return (
      <Row
        gutter={8}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Col span={8}>
          <span style={{ fontWeight: "bold" }}>{label}</span>
        </Col>
        <Col span={16}>
          <span>{value}</span>
        </Col>
      </Row>
    );
  };

  const { username, nickname, phone, gender } = userDetails.userDetails;

  return (
    <div>
      <>
        {showSidebar ? (
          <button
            className="flex text-3xl text-app-btn-green items-center cursor-pointer fixed mr-2 right-10 top-21 z-50"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            x
          </button>
        ) : (
          <svg
            onClick={() => setShowSidebar(!showSidebar)}
            className={`${
              ["/", "/register"].includes(location.pathname) && "hidden"
            } fixed z-30 flex items-center cursor-pointer border-gray-700 bg-neutral-100 pl-2 rounded-full fill-app-btn-green m-1 right-10 top-20`}
            fill="#6b876b"
            viewBox="0 0 100 80"
            width="30"
            height="30"
          >
            <rect width="70" height="10" />
            <rect y="30" width="70" height="10" />
            <rect y="60" width="70" height="10" />
          </svg>
        )}
        <div
          className={`bottom-33 shadow-2xl rounded-md right-0 w-[25vw] bg-white text-black fixed h-2/5 z-40 p-2 ease-in-out duration-300 
                    ${showSidebar ? "translate-x-0 " : "translate-x-full"}`}
        >
          <Card style={{ width: "100%", marginTop: 16 }} bordered={false}>
            <Meta
              avatar={
                <Avatar
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  src="https://joeschmoe.io/api/v1/random"
                />
              }
              title={userDetails?.userDetails.username}
              description="My information"
            />
            <div style={{ marginTop: 20, display: "grid", gap: 8 }}>
              {getCurrentUserInfo("Nickname:", nickname)}
              {getCurrentUserInfo("Email:", username)}
              {getCurrentUserInfo("Phone:", phone)}
              {getCurrentUserInfo("Gender:", gender)}
            </div>
          </Card>
        </div>
      </>
    </div>
  );
};

export default SidebarComponent;
