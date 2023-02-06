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
  Tfoot,
} from "@chakra-ui/react";
import { donationOptions } from "../.././../json-data/donationOptions";
import api from "../../../apis/userAPI";
import PaymentRow from "./PaymentRow";
import NumberFormat from "react-number-format";

const reducer = (accumulator, item) => {
  return accumulator + item.sum;
};
const PaymentListContainer = ({ donation, futurePayments, list }) => {
  const [totals, setTotals] = useState(0);
  useEffect(() => {
    const total = list.reduce(reducer, 0);
    setTotals(total);
    // console.log("total", total);
  }, [list]);
  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="gray" size="sm">
          <Thead>
            <Tr>
              <Th>
                <span className="text-primary text-center">#</span>
              </Th>
              <Th>
                <span className="text-primary text-center">Created</span>
              </Th>
              <Th>
                <Center>
                  <span className="text-primary text-center">Status</span>
                </Center>
              </Th>
              <Th>
                <span className="text-primary text-center">Sum</span>
              </Th>
              <Th>
                <Center>
                  <span className="text-primary text-center">Fee</span>{" "}
                </Center>
              </Th>
              <Th>
                <span className="text-primary text-center">
                  {" "}
                  <Center>Payment # </Center>
                </span>
              </Th>
              <Th>
                <span className="text-primary text-center font-bold">
                  <Center>Currency</Center>
                </span>
              </Th>
              <Th>&nbsp;</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list &&
              [...list, ...futurePayments].map((item, index) => (
                <PaymentRow key={item._id} item={item} index={index} />
              ))}
          </Tbody>
          <Tfoot>
            <Tr className="bg-shades-100 border-t-4 border-shades-600">
              <Td colSpan="3" className="font-bold">
                Totals
              </Td>
              <Td className="font-bold">
                <NumberFormat
                  value={totals}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </Td>
              <Td colspan="4">&nbsp;</Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default PaymentListContainer;
