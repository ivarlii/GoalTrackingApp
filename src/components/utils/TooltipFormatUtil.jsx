import { useEffect, useState } from "react";
import { Tooltip } from "antd";

const TooltipFormatUtil = ({ title, width = null, ...restProps }) => {
  const [visible, setVisible] = useState(false);
  let container = null;

  useEffect(() => {
    return () => {
      setVisible(false);
    };
  }, []);

  const handleVisibleChange = () => {
    if (container?.clientWidth < container?.scrollWidth) {
      setVisible(true);
    }
  };

  return (
    <Tooltip
      visible={visible}
      onVisibleChange={handleVisibleChange}
      title={title}
    >
      <div
        ref={(node) => (container = node)}
        style={{
          width: width ? width : "100%",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        {restProps.children}
      </div>
    </Tooltip>
  );
};

export default TooltipFormatUtil;
