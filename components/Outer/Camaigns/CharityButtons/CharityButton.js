import React from "react";
import { Text } from "@chakra-ui/react";
import Image from "next/image";
import { motion } from "framer-motion";

// project imports
import temp from "../../../../images/temp/charity-button-temp.png";

const itemVariant = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};
const CharityButton = ({ item, openCharityButtonDonation }) => {
  const { title, description, sum } = item;
  return (
    <motion.div
      variants={itemVariant}
      initial="hidden"
      animate="show"
      className="w-[225px] rounded  hover:scale-[1.03] shadow-m transition duration-500"
      onClick={() => {
        openCharityButtonDonation(sum);
      }}
    >
      <div className="flex flex-col">
        <Image src={temp} width={200} height={100} layout="responsive" />

        <div className="bg-primary p-1 -mt-2 text-center relative  min-h-[250px] pb-10 rounded-b ">
          <Text className="text-white font-bold my-2">{title}</Text>
          <Text className="text-white ">{description}</Text>
          <div className="absolute bottom-[-30px] hover:text-green shadow-m scale-50 absolute-center cursor-pointer left-[50%] rounded p-1 min-w-[120px] text-center text-white opacity-80 hover:opacity-100 hover:scale-[1.2] transition duration-500 font-bold bg-red">
            Donate: ${sum}{" "}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CharityButton;
