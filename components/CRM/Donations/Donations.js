import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DonationList from "./DonationList";

const Donations = () => {
  return (
    <div className="bg-default-background min-h-screen">
      <div className="default-container p-10 md:p-4 rounded">
        <DonationList />
      </div>
    </div>
  );
};

export default Donations;
