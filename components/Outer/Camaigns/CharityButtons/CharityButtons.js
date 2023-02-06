import React from "react";
import { motion } from "framer-motion";

import CharityButton from "./CharityButton";

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 1.2, delayChildren: 0.5 },
  },
};
const CharityButtons = ({ campaign, openCharityButtonDonation }) => {
  const { charityButtons } = campaign;
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="show"
      className="grid  mb-10 grid-cols-1 sm:grid-cols-2  md:grid-cols-4 xl:grid-cols-5 r gap-y-10 place-items-center"
    >
      {charityButtons &&
        charityButtons.map((item) => (
          <CharityButton
            item={item}
            openCharityButtonDonation={openCharityButtonDonation}
          />
        ))}
    </motion.div>
  );
};

export default CharityButtons;
