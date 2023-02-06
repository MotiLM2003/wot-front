import React, { useState, useEffect } from "react";
import creditCard from "../../images/icons/dark/credit-card.svg";
import { motion, AnimatePresence } from "framer-motion";
import NumberFormat from "react-number-format";
import { Input } from "@chakra-ui/react";
import { CloudFog } from "tabler-icons-react";

const CreditcardHandler = ({ state, onChange }) => {
  useEffect(() => {}, []);
  function limit(val, max) {
    if (val.length === 1 && val[0] > max[0]) {
      val = "0" + val;
    }

    if (val.length === 2) {
      if (Number(val) === 0) {
        val = "01";

        //this can happen when user paste number
      } else if (val > max) {
        val = max;
      }
    }

    return val;
  }

  function cardExpiry(val) {
    let month = limit(val.substring(0, 2), "12");
    let year = val.substring(2, 4);

    return month + (year.length ? "/" + year : "");
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 250 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0, height: 0 }}
      style={{ overflow: "hidden" }}
    >
      <div className="pt-10">
        <div>
          <h3 className="text-black">Card Number:</h3>
          <NumberFormat
            format="#### #### #### ####"
            placeholder="#### #### #### ####"
            value={state.creditCardNumber}
            mask="#"
            customInput={Input}
            className="pl-6"
            onValueChange={(values, sourceInfo) => {
              const { formattedValue, value } = values;
              const { event, source } = sourceInfo;
              onChange("creditCardNumber", value);
            }}
          />
        </div>
        <div className="mt-4 flex">
          <h4 className="text-black basis-1/2">Expiry (MM/YY)</h4>
          <h4 className="text-black basis-1/2">Card Code:</h4>
        </div>
        <div className="mt-4 flex gap-4">
          <NumberFormat
            format={cardExpiry}
            placeholder="MM/YY"
            mask={["M", "M", "Y", "Y"]}
            customInput={Input}
            value={state.creditCardExpire}
            onValueChange={(values, sourceInfo) => {
              const { formattedValue, value } = values;
              const { event, source } = sourceInfo;
              onChange("creditCardExpire", value);
            }}
          />

          <NumberFormat
            format="###"
            mask="#"
            placeholder="CVC"
            customInput={Input}
            value={state.CVC}
            onValueChange={(values, sourceInfo) => {
              const { formattedValue, value } = values;

              const { event, source } = sourceInfo;
              onChange("CVC", value);
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CreditcardHandler;
