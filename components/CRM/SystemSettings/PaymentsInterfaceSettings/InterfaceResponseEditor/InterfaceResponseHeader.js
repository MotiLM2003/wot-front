import React from "react";

const InterfaceResponseHeader = () => {
  return (
    <div className="flex items-center text-sm gap-2 text-primary font-bold">
      <div className="w-[70px] text-center">Code</div>
      <div className="w-[90px]">Response</div>
      <div className="w-[90px]">Alias</div>
      <div className="w-[90px]">Color</div>
    </div>
  );
};

export default InterfaceResponseHeader;
