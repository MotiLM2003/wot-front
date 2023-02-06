import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  getNewPayment,
  getLastRoundPayment,
  createFuturePayments,
} from "../../../utils/payments";

import { Button } from "@chakra-ui/react";
const NewPaymentEditor = ({ donation, list, createPayment }) => {
  const [days, setDays] = useState(0);
  const [lastPayment] = useState(getLastRoundPayment(list));
  const [nextRound] = useState(list.length + 1);
  const [payment, setPayment] = useState(donation.currentRecurringCount + 1);

  useEffect(() => {
    nextRound = nextRound;
    const tempPayment = {
      ...getNewPayment(donation),
      recurringCount: nextRound,
    };

    setPayment(tempPayment);
    // setDays(donationOptions[donation.recurringType]);
  }, []);

  useEffect(() => {}, [lastPayment]);
  return (
    <div className="flex flex-col gap-5">
      <div>Next round {nextRound}</div>
      <div>
        <Button
          size="sm"
          colorScheme="green"
          variant="outline"
          onClick={() => createPayment(payment)}
        >
          Create new payment for recurring #{donation._id}
        </Button>{" "}
      </div>
    </div>
  );
};

export default NewPaymentEditor;
