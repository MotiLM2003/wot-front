import React, { useState, useEffect } from "react";
import { Button, Input } from "@chakra-ui/react";
import IsActiveIcon from "@components/Icons/IsActiveIcon";
import IsActive from "@components/Shared/IsActive/IsActive";

const CurrencyItem = ({ item, onSave, withUpdates = true }) => {
  const [currentItem, setCurrentItem] = useState(item);
  useEffect(() => {}, []);
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "isActive") {
      setCurrentItem((prev) => ({
        ...currentItem,
        [name]: !prev.isActive,
      }));
      return;
    }
    setCurrentItem({ ...currentItem, [name]: value });
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className="cursor-pointer w-[10px] h-[10px]"
        onClick={() => {
          const o = { target: { name: "isActive" } };
          onChange(o);
        }}
      >
        <IsActive isActive={currentItem.isActive} />
      </div>
      <div className="xs-input">
        <Input
          size="xs"
          className="text-center"
          value={currentItem.abbr}
          onChange={onChange}
          name="abbr"
          maxLength={4}
        />
      </div>
      <div className="xs-input ">
        <Input
          size="xs"
          className="text-center"
          value={currentItem.symbol}
          onChange={onChange}
          name="symbol"
          maxLength={2}
        />
      </div>
      <div>
        <Input
          size="xs"
          value={currentItem.description}
          onChange={onChange}
          name="description"
          maxLength={25}
        />
      </div>
      {withUpdates && (
        <div>
          <Button
            size="xs"
            variant="outline"
            colorScheme="green"
            onClick={() => onSave(currentItem)}
          >
            {currentItem?._id ? "Update" : "Add new currency"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CurrencyItem;
