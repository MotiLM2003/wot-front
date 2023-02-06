import React, { useState, useEffect } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Link,
  Button,
  Input,
  Box,
  Center,
  Text,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import moment from "moment";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Edit from "@components/Icons/Edit";
import Close from "@components/Icons/Close";
import Ok2 from "@components/Icons/Ok2";
import Cancel2 from "@components/Icons/Cancel2";
import { currencies } from "../../../json-data/currency";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";

import {
  faEnvelope,
  faPenToSquare,
  faCirclePlus,
  faFileCirclePlus,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import NumberFormat from "react-number-format";
import Donate from "@components/Outer/Camaigns/Donate/Donate";
import { CloudFog } from "tabler-icons-react";

const DonationRow = ({
  donation,
  changeUser,
  updateUserDetails,
  isLoading,
  openEditDonationMenu,
  openNewDonationMenu,
  currentDonation,
  updatePrivateNotes,
  openPaymentList,
  processors,
}) => {
  const [isFullDetails, setIsFullDetails] = useState(false);
  const [privateNote, setPrivateNote] = useState(
    donation ? donation.privateNotes : ""
  );
  const renderFullDetailsRecurring = () => {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 120 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, height: 0 }}
        className="flex justify-around"
      >
        <div className="donation-full-details-content p-4 min-w-[450px] my-2">
          <div className="flex justify-around items-center">
            <div className="flex flex-col gap-2 justify-center">
              <div>
                <Text className="text-red font-bold">• Payments Number</Text>
                <Text className="pl-4 text-xs font-bold mt-1">
                  {`${
                    donation.recurringCount === 0
                      ? "Ongoing"
                      : donation.recurringCount
                  }`}
                </Text>
              </div>
              <div>
                <Text className="text-red font-bold">• Payments Done</Text>
                <Text className="pl-4 text-xs font-bold mt-1">
                  {donation.currentRecurringCount}
                </Text>
              </div>
            </div>
            <div className="min-w-[20px] h-[60px]  border-r-2 border-red">
              &nbsp;
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <div>
                <Text className="text-red font-bold">• Payment Method</Text>
                <Text className="pl-4 text-xs font-bold mt-1">
                  {donation.paymentInterface.paymentName}
                </Text>
              </div>
              <div>
                <Text className="text-red font-bold">• Payment Processor</Text>
                <Text className="pl-4 text-xs font-bold mt-1">
                  {processors[donation.paymentInterface.processor].name}
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className="donation-full-details-content p-4 min-w-[450px] my-2">
          <div className="flex justify-around items-center">
            <div className="flex flex-col gap-2 justify-center">
              <div>
                <Text className="text-red font-bold">• By Partner</Text>
                <Text className="pl-4 text-xs font-bold mt-1">{`${donation.firstName} ${donation.lastName}`}</Text>
              </div>
              <div>
                <Text className="text-red font-bold">• UTM link</Text>
                <Text className="pl-4 text-xs font-bold mt-1">[WIP]</Text>
              </div>
            </div>
            <div className="min-w-[20px] h-[60px]  border-r-2 border-red">
              &nbsp;
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <div>
                <Text className="text-red font-bold">• Note</Text>
                <Text className="pl-4 text-xs font-bold mt-1">
                  {donation.donationNote}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderReleaseDays = () => {
    const dayToAdd = donation.paymentInterface.daysToRelease;
    const now = moment();

    const expiration = moment(donation.createdAt).add(dayToAdd, "days");
    const isAfter = moment().isAfter(expiration);

    //express as a duration
    const diff = expiration.diff(now);
    const diffDuration = moment.duration(diff);
    if (isAfter) {
      return (
        <Text className="w-[200px] h-[40px]  font-bold  flex items-center justify-center">
          <Center>
            <div className="flex flex-col">
              <div className="bg-success text-white text-xs mt-1 py-[1px] px-[4px] rounded">
                Funds available!
              </div>
              <Center>
                <Text className="text-[10px] font-bold mt-1">
                  {expiration.format("DD-MM-YY HH:mm:ss")}
                </Text>
              </Center>
            </div>
          </Center>
        </Text>
      );
    } else {
      return (
        <>
          <Text className="text-xs font-bold mt-1">
            <Center>
              {diffDuration.days()} days and {diffDuration.hours()} hours and{" "}
              {diffDuration.minutes()} minutes.
            </Center>
          </Text>
          <Text className="text-xs font-bold mt-1">
            <Center>{expiration.format("DD-MM-YY HH:mm:ss")}</Center>
          </Text>
        </>
      );
    }
  };
  const renderFullDetailsPayment = () => {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: 1,
          height: donation.isRecurring === "1" ? 120 : 150,
        }}
        transition={{ duration: 0.6 }}
        exit={{ opacity: 0, height: 0 }}
        className="flex justify-around"
      >
        <div className="donation-full-details-content p-4 min-w-[450px] my-1">
          <div className="flex justify-around items-center">
            <div className="flex flex-col gap-2 justify-center">
              <div>
                <Text className="text-red font-bold">• By Partner</Text>
                <Text className="pl-4 text-xs font-bold mt-1">
                  {`${donation.firstName} ${donation.lastName}`}
                </Text>
              </div>
              <div>
                <Text className="text-red font-bold">• UTM link</Text>
                <Text className="pl-4 text-xs font-bold mt-1">[WIP]</Text>
              </div>
            </div>
            <div className="min-w-[20px] h-[60px]  border-r-2 border-red">
              &nbsp;
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <div>
                <Text className="text-red font-bold">•Donor Note</Text>
                <Text className="pl-4 text-xs font-bold mt-1">
                  {donation.donationNote}
                </Text>
              </div>
              <div className="mt-4 pl-4">
                <Text className="text-xs font-bold mt-1">Private note:</Text>
                <div className="flex gap-3 mt-1 items-center">
                  <Input
                    className=""
                    size="xs"
                    placeholder="Add private note."
                    value={privateNote}
                    onChange={(e) => {
                      setPrivateNote(e.target.value);
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faFileCirclePlus}
                    size="1x"
                    className="text-primary hover:text-green-900 transition duration-500 cursor-pointer"
                    onClick={() => {
                      const { _id } = donation;

                      updatePrivateNotes({ _id, privateNote });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="donation-full-details-content p-3 min-w-[450px] my-1">
          <div className="flex justify-around items-center">
            <div className="flex flex-col gap-2 justify-center min-w-[250px]">
              <div>
                <Text className="text-red font-bold">• Payment Method</Text>
                <Text className="pl-4 text-xs font-bold mt-1">
                  {" "}
                  {donation.paymentInterface.paymentName}
                </Text>
              </div>
              <div>
                <Text className="text-red font-bold">• Payment Processor</Text>
                <Text className="pl-4 text-xs font-bold mt-1">
                  {processors[donation.paymentInterface.processor].name}
                </Text>
              </div>
            </div>
            <div className="min-w-[20px] h-[60px]  border-r-2 border-red mx-2">
              &nbsp;
            </div>
            <div className="bg-shades-100 px-4 py-2 rounded min-w-[200px] ">
              <div className="flex flex-col gap-1 justify-center">
                <div className="flex flex-col justify-center max-h-[107px]">
                  <Text className="text-red font-bold">• Processing fee</Text>
                  <Text className="pl-4 text-xs font-bold mt-1">
                    <NumberFormat
                      value={donation.fee}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={donation.currency.symbol}
                    />
                  </Text>
                  {donation.isCompleteFee ? (
                    <div className="flex items-center gap-1 pl-4">
                      <div>
                        <Ok2 size={12} />
                      </div>
                      <div className="text-success font-bold text-xs ">
                        Fee covered
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 pl-4">
                      <div>
                        <Cancel2 size={12} />
                      </div>
                      <div className="text-red font-bold text-xs ">
                        Fee is not covered
                      </div>
                    </div>
                  )}
                  <div className="pl-4 mt-1">
                    <Text className="text-red font-bold text-xs">
                      • Time till funds available
                    </Text>

                    {renderReleaseDays()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };
  const renderFullDetails = () => {
    return donation.isRecurring.trim() === "1"
      ? renderFullDetailsRecurring()
      : renderFullDetailsPayment();
  };

  return (
    <>
      <Tr key={donation._id} className="h-[60px]">
        <Td>
          <Center>
            <div className="flex  items-center gap-1 ">
              <div
                className={`rounded-2xl border ${
                  donation.isActive == 1 ? "bg-success" : "bg-red"
                } w-[12px] h-[12px]`}
              ></div>
            </div>
          </Center>
        </Td>
        <Td>
          <div className="flex  items-center gap-3 ">
            <div
              className={`rounded-2xl order ${
                donation.isPrivateDonation == 1 ? "bg-success" : "bg-red"
              } w-[12px] h-[12px]`}
            ></div>

            <div className="text-sm">
              {donation.isPrivateDonation == 1 ? "Private" : "Campaign"}
            </div>
          </div>
        </Td>
        <Td>
          <Center>
            <div className="flex  items-center gap-1 ">
              <div
                className={`rounded-2xl border ${
                  donation.isRecurring === "1" ? "bg-success" : "bg-red"
                } w-[12px] h-[12px]`}
              ></div>
            </div>
          </Center>
        </Td>
        <Td className="text-center">
          <div className="text-sm">
            {moment(donation.createdAt).format("DD-MM-YY HH:mm")}
          </div>
        </Td>
        <Td>
          <Center>
            {donation.currency.symbol} - {donation.currency.abbr}
          </Center>
        </Td>
        <Td>
          <NumberFormat
            value={donation.sum}
            displayType={"text"}
            thousandSeparator={true}
            prefix={donation.currency.symbol}
          />
        </Td>
        <Td>
          <div className="flex items-center gap-2">
            <div>
              {donation.isCompleteFee ? (
                <Ok2 size={16} />
              ) : (
                <Cancel2 size={16} />
              )}
            </div>
            <div>
              {" "}
              <NumberFormat
                value={donation.fee}
                displayType={"text"}
                thousandSeparator={true}
                prefix={donation.currency.symbol}
              />
            </div>
          </div>
        </Td>
        <Td>{donation.firstName}</Td>
        <Td> {donation.lastName}</Td>
        <Td>
          <FontAwesomeIcon
            icon={faEnvelope}
            size="1x"
            className="text-slate-500 hover:text-slate-900 transition duration-500 cursor-pointer"
          />
        </Td>
        <Td>{donation.cellphone}</Td>
        <Td>
          <div className="flex items-center gap-2">
            <div
              onClick={() => {
                setIsFullDetails((prev) => !prev);
              }}
            >
              <Tooltip
                label="Open full details"
                placement="top"
                shouldWrapChildren
              >
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  size="1x"
                  className="text-red hover:text-green-900 transition duration-500 cursor-pointer"
                />
              </Tooltip>
            </div>
            <div
              onClick={() => {
                openNewDonationMenu(donation);
              }}
            >
              <Tooltip
                label="Create new donation"
                placement="top"
                shouldWrapChildren
              >
                <FontAwesomeIcon
                  icon={faFileCirclePlus}
                  size="1x"
                  className="text-green-500 hover:text-green-900 transition duration-500 cursor-pointer"
                />
              </Tooltip>
            </div>
            <div
              onClick={() => {
                openEditDonationMenu(donation);
              }}
            >
              <Tooltip label="Edit donation" placement="top" shouldWrapChildren>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  size="1x"
                  className="text-blue-500 hover:text-blue-900 transition duration-500 cursor-pointer"
                />
              </Tooltip>
            </div>
            {donation.isRecurring === "1" && (
              <div
                onClick={() => {
                  openPaymentList(donation);
                }}
              >
                <Tooltip
                  label="View payments list"
                  placement="top"
                  shouldWrapChildren
                >
                  <FontAwesomeIcon
                    icon={faList}
                    size="1x"
                    className="text-blue-500 hover:text-blue-900 transition duration-500 cursor-pointer"
                  />
                </Tooltip>
              </div>
            )}
          </div>
        </Td>
      </Tr>
      <AnimatePresence>
        {isFullDetails && (
          <motion.tr
            className={` bg-shades-200`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 120 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Td colSpan={11}>{renderFullDetails()}</Td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
};

export default DonationRow;
