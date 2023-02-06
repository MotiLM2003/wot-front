import React from "react";

const IsActiveIcon = ({ width = "8", height = "7", fill = "#29DC26" }) => {
  return (
    <svg
      className="transition duration-1000"
      width={width}
      height={height}
      viewBox="0 0 8 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="3.70069" cy="3.5" rx="3.70069" ry="3.5" fill={fill} />
    </svg>
  );
};

export default IsActiveIcon;
