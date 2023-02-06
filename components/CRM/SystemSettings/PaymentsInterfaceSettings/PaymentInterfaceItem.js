import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, Select } from "@chakra-ui/react";
import IsActive from "@components/Shared/IsActive/IsActive";
import NumberFormat from "react-number-format";
import { useGenericOnChange } from "../../../../hooks/useGenericOnChange";
const PaymentInterfaceItem = ({
  item,
  updateInterfaces,
  openResponseEditor,
  openCurrenciesEditor,
  processors,
}) => {
  const [paymentInterface, setPaymentInterface] = useState(item);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "isActive") {
      value = !paymentInterface.isActive;
    }

    setPaymentInterface({ ...paymentInterface, [name]: value });
  };

  useEffect(() => {}, [paymentInterface]);
  return (
    <>
      <div className=" border-b border-b-shades-100 p-2 flex items-center gap-3">
        <Checkbox
          size="sm"
          className="w-[55px]"
          isChecked={paymentInterface.isActive}
          onChange={onChange}
          name="isActive"
        >
          <IsActive isActive={paymentInterface.isActive} />
        </Checkbox>
        <div className="w-[150px]">
          <Input
            size="xs"
            value={paymentInterface.paymentName}
            onChange={onChange}
            className="input-style-1"
            name="paymentName"
            maxLength="30"
          />
        </div>
        <div className="w-[150px]">
          <Select
            size="xs"
            name="processor"
            onChange={(e) => {
              const value = e.target.value;
              onChange(useGenericOnChange("processor", value));
            }}
            value={paymentInterface.processor}
          >
            {processors.map((p, index) => (
              <option value={p.id}>{p.name}</option>
            ))}
          </Select>
        </div>
        <div className="w-[90px]">
          <NumberFormat
            placeholder="Fee %"
            value={paymentInterface.feePercentage}
            customInput={Input}
            className="input-style-1 text-center"
            prefix={"%"}
            onValueChange={(values, sourceInfo) => {
              const { formattedValue, value } = values;
              const { event, source } = sourceInfo;
              onChange(useGenericOnChange("feePercentage", value));
            }}
          />
        </div>
        <div className="w-[90px]">
          <NumberFormat
            placeholder="Fixed fee"
            className="input-style-1 text-center"
            value={paymentInterface.fixedFee}
            customInput={Input}
            prefix={parseFloat(paymentInterface.fixedFee) < 1 ? "" : "$"}
            suffix={parseFloat(paymentInterface.fixedFee) < 1 ? "¢" : ""}
            onValueChange={(values, sourceInfo) => {
              const { formattedValue, value } = values;
              const { event, source } = sourceInfo;
              onChange(useGenericOnChange("fixedFee", value));
            }}
          />
        </div>
        <div className="w-[90px]">
          <NumberFormat
            placeholder="Set days"
            className="input-style-1 text-center"
            value={paymentInterface.daysToRelease}
            customInput={Input}
            suffix={" days"}
            onValueChange={(values, sourceInfo) => {
              const { formattedValue, value } = values;
              const { event, source } = sourceInfo;
              onChange(useGenericOnChange("daysToRelease", value));
            }}
          />{" "}
        </div>
        <div>
          <Button
            size="xs"
            variant="outline"
            colorScheme="blue"
            onClick={() => openCurrenciesEditor(paymentInterface)}
          >
            Currencies{" "}
          </Button>{" "}
        </div>{" "}
        <div>
          <Button
            size="xs"
            variant="outline"
            colorScheme="red"
            onClick={() => openResponseEditor(paymentInterface)}
          >
            Interface Responses{" "}
          </Button>{" "}
        </div>{" "}
        <div>
          <Button
            size="xs"
            colorScheme="green"
            onClick={() => updateInterfaces(paymentInterface)}
          >
            Update{" "}
          </Button>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};

export default PaymentInterfaceItem;
