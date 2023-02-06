import IsActiveIcon from "@components/Icons/IsActiveIcon";
import React from "react";

const IsActive = ({ isActive, width = "10", height = "9" }) => {
  return (
    <IsActiveIcon
      width={width}
      height={height}
      fill={isActive ? "#29DC26" : "#e93f2a"}
    />
  );
};

export default IsActive;
