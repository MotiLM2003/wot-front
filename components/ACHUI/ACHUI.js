import { Heading, Input } from "@chakra-ui/react";

import { motion } from "framer-motion";
import React from "react";
import NumberFormat from "react-number-format";

const ACHUI = ({ state }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 250 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0, height: 0 }}
      style={{ overflow: "hidden" }}
    >
      <div className="flex flex-col  gap-3 mt-5 border p-3 rounded">
        <Heading>ACH Payment</Heading>
        <div>
          <NumberFormat
            format="#########"
            placeholder="Please insert your routing number"
            value={state.routing_number}
            mask="#"
            customInput={Input}
            className="pl-6"
            onValueChange={(values, sourceInfo) => {
              const { formattedValue, value } = values;
              const { event, source } = sourceInfo;
              onChange("routing_number", value);
            }}
          />
        </div>
        <div>
          <NumberFormat
            format="###########"
            placeholder="Please insert your account number"
            value={state.account_number}
            mask="#"
            customInput={Input}
            className="pl-6"
            onValueChange={(values, sourceInfo) => {
              const { formattedValue, value } = values;
              const { event, source } = sourceInfo;
              onChange("account_number", value);
            }}
          />
        </div>
        <div>
          <Input
            value={state.name}
            placeholder="Please insert the account owner name"
            onChange={(e) => {
              const name = e.target.name;
              const value = e.target.value;
              onChange("name", value);
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ACHUI;
