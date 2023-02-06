import { Button, Input } from "@chakra-ui/react";
import ColorPicker from "@components/Shared/ColorPicker/ColorPicker";
import React from "react";

const InterfaceResponseItem = () => {
  return (
    <div>
      <div className="flex items-center text-sm gap-2 text-primary font-bold">
        <div className="w-[70px] text-center my-[1rem]">
          <Input placeholder="Code" size="xs" className="text-center" />
        </div>
        <div className="w-[90px]">
          <Input placeholder="Response" size="xs" className="text-center" />
        </div>
        <div className="w-[90px]">
          <Input placeholder="Alias" size="xs" className="text-center" />
        </div>
        <div className="w-[50px]">
          <ColorPicker />
        </div>
        <div>
          <Button size="xs" colorScheme="red">
            Add new response
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default InterfaceResponseItem;
