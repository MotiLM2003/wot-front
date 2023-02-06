import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
// WOT imports
import api from "../../../../apis/userAPI";
import PaymentInterfaceItem from "./PaymentInterfaceItem";
import InterfaceResponsesEditor from "./InterfaceResponseEditor/InterfaceResponsesEditor";
import InterfaceCurrencyEditor from "./InterfaceCurrencyEditor/InterfaceCurrencyEditor";
import { processors } from "json-data/processors";
const PaymentsInterfaceSettings = ({ interfaceList }) => {
  const [list, setList] = useState([]);
  const [isResponseOpen, setIsResponseOpen] = useState(false);
  const [isCurrencyEditorOpen, setIsCurrencyEditorOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const getPaymentInterfaces = async () => {
    const { data } = await api.post("/payments-interface/");
    setList(data);
  };

  const updateInterfaces = async (item) => {
    try {
      api.put("/payments-interface/update", item);
      toast.success(`${item.paymentName} was successfully updated.`);
    } catch (err) {}
  };

  const updateInterfaceAllowedCurrencies = (allowed) => {
    "allowed", allowed;
    currentItem.allowedCurrencies = allowed;
    updateInterfaces(currentItem);
  };

  const openResponseEditor = (item) => {
    setCurrentItem(item);
    setIsResponseOpen(true);
  };

  const openCurrenciesEditor = (item) => {
    setCurrentItem(item);
    setIsCurrencyEditorOpen(true);
  };

  useEffect(() => {}, [list]);
  useEffect(() => {
    getPaymentInterfaces();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0, y: 0 }}
      style={{ overflow: "hidden" }}
    >
      <div className="my-3">
        <Button colorScheme="red" size="xs">
          Add new payment interface{" "}
        </Button>{" "}
      </div>{" "}
      <div className="flex flex-col gap-2">
        <div className=" border-b border-b-shades-100 p-2 flex items-center gap-3 text-sm font-bold text-primary">
          <div className="w-[55px]"> Active </div>{" "}
          <div className="w-[150px]">Interface Name </div>
          <div className="w-[150px]">Processor</div>
          <div className="w-[90px] text-center"> Fee </div>
          <div className="w-[85px] text-center"> Fixed fee </div>
          <div className="w-[80px] text-center"> Release </div>
        </div>{" "}
        {list.map((item) => {
          return (
            <PaymentInterfaceItem
              item={item}
              updateInterfaces={updateInterfaces}
              openResponseEditor={openResponseEditor}
              openCurrenciesEditor={openCurrenciesEditor}
              processors={processors}
            />
          );
        })}{" "}
      </div>{" "}
      {isCurrencyEditorOpen && (
        <InterfaceCurrencyEditor
          isOpen={isCurrencyEditorOpen}
          onClose={() => {
            setIsCurrencyEditorOpen(false);
          }}
          item={currentItem}
          onCurrenciesUpdated={updateInterfaceAllowedCurrencies}
        />
      )}{" "}
      {isResponseOpen && (
        <InterfaceResponsesEditor
          isOpen={isResponseOpen}
          onClose={() => {
            setIsResponseOpen(false);
          }}
          item={currentItem}
        />
      )}{" "}
    </motion.div>
  );
};

export default PaymentsInterfaceSettings;
