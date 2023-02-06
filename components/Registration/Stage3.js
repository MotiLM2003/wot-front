import React from "react";

import city from "../../images/icons/dark/city.svg";
import ok from "../../images/ok.svg";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Ok from "@components/Icons/Ok";
const Stage3 = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ y: 0, opacity: 0 }}
      className="mt-4 md:px-[4rem] overflow-hidden p-2"
    >
      <div>
        <h2>Success</h2>
        <div className="flex flex-col items-center">
          <Ok stroke={"green"} />
          <p>Your registration request has been</p>
          <p>successfully submitted</p>
        </div>
        <div></div>
      </div>
    </motion.div>
  );
};

export default Stage3;
