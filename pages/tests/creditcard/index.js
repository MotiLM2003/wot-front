import CreditcardHandler from "@components/Creditcard/CreditcardHandler";
import Input from "@components/Input/Input";
import { useGenericOnChange } from "../../../hooks/useGenericOnChange";
import React, { useState } from "react";
import NumberFormat from "react-number-format";

const index = () => {
  const [state, setState] = useState({ creditCard: "" });

  const onChange = (name, value) => {
    useGenericOnChange(state, name, value);
  };
  return (
    <div className="flex items-center  justify-center">
      <CreditcardHandler onChange={onChange} state={state.creditCard} />
    </div>
  );
};

export default index;
