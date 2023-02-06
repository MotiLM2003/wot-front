import React from "react";
import moment from "moment";
import {
  Button,
  Center,
  Tag,
  TagLabel,
  Td,
  Text,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import NumberFormat from "react-number-format";

import { getCurrency } from "../.././../json-data/currency";
import { paymentStatus } from "../.././../utils/payments";
import Ok2 from "@components/Icons/Ok2";
import Cancel2 from "@components/Icons/Cancel2";

import { faShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const renderStatus = (status) => {
  switch (status) {
    case 0: {
      return (
        <Center>
          <Tag
            size="sm"
            key="sm"
            variant="outline"
            colorScheme="green"
            className="min-w-[150px]"
          >
            <TagLabel> {paymentStatus[status].text}</TagLabel>
          </Tag>
        </Center>
      );
    }
    case 3: {
      return (
        <Center>
          <Tag size="sm" key="sm" variant="outline" colorScheme="red">
            <TagLabel> {paymentStatus[status].text}</TagLabel>
          </Tag>
        </Center>
      );
    }
  }
  return paymentStatus[status].text;
};
const PaymentRow = ({ item, index }) => {
  return (
    <>
      <Tr>
        <Td>
          <Center>{index + 1}</Center>
        </Td>
        <Td>
          {item._id
            ? moment(item.createdDate).format("DD-MM-YY HH:mm")
            : moment(item.createdDate).format("DD-MM-YYYY")}
        </Td>
        <Td className="text-success text-xs font-bold ">
          <Text className="text-success text-sm font-bold ">
            {renderStatus(item.status)}
          </Text>
        </Td>
        <Td>
          <NumberFormat
            value={item.sum}
            displayType={"text"}
            thousandSeparator={true}
            prefix={item.currency.symbol}
          />
        </Td>
        <Td>
          <Center>
            {" "}
            <div className="flex gap-1">
              <div>
                {" "}
                {item.isCompleteFee ? <Ok2 size={16} /> : <Cancel2 size={16} />}
              </div>
              <div>
                <NumberFormat
                  value={item.fee}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={item.currency.symbol}
                />
              </div>
            </div>{" "}
          </Center>
        </Td>
        <Td>
          <Center>{item.recurringCount}</Center>
        </Td>
        <Td>
          <Center>
            {item.currency.symbol} - {item.currency.abbr}
          </Center>
        </Td>
        <Td>
          <div className="flex items-center gap-4">
            <Button size="xs" colorScheme="red" variant="outline">
              Refund
            </Button>{" "}
            {item.isAdmin && (
              <Tooltip
                label="Payment created by admin"
                placement="top"
                shouldWrapChildren
              >
                <FontAwesomeIcon
                  icon={faShield}
                  size="15x"
                  className="text-red"
                />
              </Tooltip>
            )}
          </div>
        </Td>
      </Tr>
    </>
  );
};

export default PaymentRow;
