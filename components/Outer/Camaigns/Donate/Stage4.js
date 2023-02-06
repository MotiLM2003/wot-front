import React from "react";
import { motion } from "framer-motion";
import { Text } from "@chakra-ui/react";
import Ok2 from "@components/Icons/Ok2";

const Stage4 = () => {
  return (
    <div>
      <div className="flex  flex-col justify-center items-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          exit={{ opacity: 1, y: -30 }}
          style={{ overflow: "hidden" }}
        >
          <Ok2 />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          exit={{ opacity: 1, y: 50 }}
          style={{ overflow: "hidden" }}
        >
          <Text className="font-bold text-xl">
            Your donation has been successfully received.
          </Text>
        </motion.div>
      </div>
    </div>
  );
};

export default Stage4;
