import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { toast, ToastContainer } from "react-toastify";
import { Heading, Input } from "@chakra-ui/react";
import Edit2 from "@components/Icons/Edit2";
import Ok2 from "@components/Icons/Ok2";
import Cancel2 from "@components/Icons/Cancel2";
import { CloudFog } from "tabler-icons-react";
import { motion, AnimatePresence } from "framer-motion";
const EditableText = ({
  value,
  placeholder = "Please add the needed information",
  onDonateAmountSumChanged,
  ConfirmText = "Action Updated!",
  CancelText = "Action Canceled",
  currentCurrencySymbol,
}) => {
  const [isEditableMode, setIsEditableMode] = useState(false);
  const [sum, setSum] = useState(value);
  useEffect(() => {}, [isEditableMode]);

  const renderContent = () => {
    if (!isEditableMode) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
          className="flex gap-2 items-center"
          onClick={() => setIsEditableMode(true)}
        >
          <div>
            <NumberFormat
              value={sum}
              displayType={"text"}
              customInput={Input}
              thousandSeparator={true}
              prefix={currentCurrencySymbol}
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setIsEditableMode(true)}
          >
            <Edit2 />
          </div>
        </motion.div>
      );
    } else {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 13 }}
          exit={{ opacity: 0 }}
          className="flex gap-2 items-center"
        >
          <div>
            <NumberFormat
              placeholder={placeholder}
              value={sum}
              prefix={currentCurrencySymbol}
              customInput={Input}
              onValueChange={(values, sourceInfo) => {
                const { formattedValue, value } = values;
                const { event, source } = sourceInfo;
                setSum(value);
              }}
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setIsEditableMode((prev) => false);
              onDonateAmountSumChanged("sum", sum);
              toast.success(ConfirmText);
            }}
          >
            <Ok2 size="16" />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              toast.error(CancelText);
              setIsEditableMode((current) => !current);
            }}
          >
            <Cancel2 size="16" className="text-green bg-green scale-[1.2]" />
          </div>
        </motion.div>
      );
    }
  };
  return <>{renderContent()}</>;
};

export default EditableText;
