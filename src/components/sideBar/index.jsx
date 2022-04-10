import { useState } from "react";
import { Avatar, Card } from "antd";

const { Meta } = Card;

const SideBarComponent = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      <>
        {showSidebar ? (
          <button
            className="flex text-3xl text-app-btn-green items-center cursor-pointer fixed mr-2 right-10 top-24 z-50"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            x
          </button>
        ) : (
          <svg
            onClick={() => setShowSidebar(!showSidebar)}
            className="fixed z-30 flex items-center cursor-pointer fill-app-btn-green m-1 right-10 top-24"
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
          className={`bottom-16 rounded-md right-0 w-[25vw] bg-white text-black fixed h-4/5 z-40  ease-in-out duration-300 
                    ${showSidebar ? "translate-x-0 " : "translate-x-full"}`}
        >
          <Card style={{ width: 50, marginTop: 16 }} bordered={false}>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </div>
      </>
    </div>
  );
};

export default SideBarComponent;
