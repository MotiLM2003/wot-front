import React, { useState, useEffect } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Link,
  useDisclosure,
  Center,
  Box,
  Switch,
  Text,
  Button,
} from "@chakra-ui/react";
import { donationOptions } from "../.././../json-data/donationOptions";
import api from "../../../apis/userAPI";
import PaymentRow from "./PaymentRow";
import {
  createFuturePayments,
  getLastRoundPayment,
} from "../../../utils/payments";
import PaymentListContainer from "./PaymentListContainer";
import NewPaymentEditor from "./NewPaymentEditor";

const PaymentList = ({ donation }) => {
  const [futurePayments, setFuturePayments] = useState([]);
  const [isNewPayment, setNewPayment] = useState(false);
  const [list, setList] = useState([]);

  const getList = async () => {
    const { data } = await api.post("/payments/get", {
      recurring: donation._id,
    });

    setList(data);
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    getLastRoundPayment(list);
  }, [list]);
  const toggleFutureOrders = (e) => {
    const last = getLastRoundPayment(list);

    const isChecked = e.target.checked;
    if (!isChecked) {
      setFuturePayments([]);
    } else {
      setFuturePayments(createFuturePayments(donation, last, list));
    }
  };

  const createPayment = async (createdPayment) => {
    const newPayment = {
      ...createdPayment,
      campaign: createdPayment.campaign._id,
      isAdmin: true,
    };

    await api.post("/payments/addTransaction", newPayment);
    getList();
    setNewPayment(false);
  };

  return (
    <div>
      <div className="flex gap-1 items-center mt-1 mb-3 justify-around">
        <div>
          Number of payments:{" "}
          <span className="text-red text-sm font-bold">
            {donation.recurringCount === 0
              ? "On Going"
              : donation.recurringCount}
          </span>{" "}
        </div>
        <div>
          Recurring type:{" "}
          <span className="text-red text-sm font-bold">
            {donationOptions[donation.recurringType].text}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Text>Enable future payments</Text>
          <Box>
            <Switch
              checked={true}
              onChange={toggleFutureOrders}
              //   name={"isDescription"}
              //   colorScheme={color}
              //   isChecked={campaign.isDescription}
            />
          </Box>
        </div>
        <div>
          <Button
            size="sm"
            variant="outline"
            colorScheme="red"
            onClick={() => setNewPayment((prev) => !prev)}
          >
            {isNewPayment ? "Back to list" : "New Payment"}
          </Button>
        </div>
      </div>
      {!isNewPayment ? (
        <PaymentListContainer
          donation={donation}
          futurePayments={futurePayments}
          list={list}
        />
      ) : (
        <NewPaymentEditor
          donation={donation}
          list={list}
          createPayment={createPayment}
        />
      )}
    </div>
  );
};

export default PaymentList;
