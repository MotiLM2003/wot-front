import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Center, useToast } from "@chakra-ui/react";
import FlipMove from "react-flip-move";

import "react-toastify/dist/ReactToastify.css";

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
} from "@chakra-ui/react";
import { Stack, Button, ButtonGroup } from "@chakra-ui/react";
import api from "../../../apis/userAPI";
import edit from "../../../images/icons/edit.svg";
import Loading from "@components/Loader/Loader";
import Loader from "@components/Loader/Loader";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import edit2 from "../../../images/icons/white/edit.svg";
import close from "../../../images/icons/white/close.svg";
import DonationRow from "./DonationRow";
import { returnTrue } from "react-currency-format/lib/utils";
import DonateModel from "@components/Outer/Camaigns/Donate/DonateModel";
import DonateContainerModel from "@components/Outer/Camaigns/Donate/DonateContainerModel";
import { Reorder } from "framer-motion";
import {
  initialRecurringData,
  initialRecurringFakeData,
} from "../../../json-data/initialRecurring";
import PaymentsModal from "../Payments/PaymentsModal";
import { processors } from "json-data/processors";
const DonationList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [donations, setDonations] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [filterByMenu, setFilterBy] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [showDonationType, setShowDonationType] = useState(0);
  const [showRecurringType, setShowRecurringType] = useState(0);
  const [openEditDonation, setOpenEditDonation] = useState(false);
  const [openPaymentsList, setPaymentsList] = useState(false);
  const [openNewDonation, setOpenNewDonation] = useState(false);
  const [totals, setTotals] = useState({
    all: 0,
    archive: 0,
    pending: 0,
    approved: 0,
  });

  const [currentDonation, setCurrentDonation] = useState(null);

  useEffect(() => {
    orderBy();
  }, [showRecurringType]);
  const onChange = (e, user) => {
    const name = e.target.name;
    const value = e.target.value;
    // setUser({ ...users, [name]: value });
    // setUser(
    //   users.map((u) => {
    //     return u._id === user._id ? { ...user, [name]: value } : u;
    //   })
    // );
  };

  const openPaymentList = (donation) => {
    setPaymentsList(true);
    setCurrentDonation(donation);
  };

  const openEditDonationMenu = (donation) => {
    setOpenEditDonation(true);
    setCurrentDonation(donation);
  };

  const openNewDonationMenu = (donation) => {
    setOpenNewDonation(true);
    setCurrentDonation(donation);
  };

  const getNewDonation = () => {
    const { _id, ...newDonation } = currentDonation;
    return newDonation;
  };
  const changeUser = async (user, update) => {
    // setUser(
    //   users.map((u) => {
    //     return u._id === user._id ? user : u;
    //   })
    // );
    // const user = await api.post("/users/UpdateById", update);
    // toast({
    //   position: "top",
    //   title: "Action successfully committed.",
    //   status: "success",
    //   duration: 4000,
    //   isClosable: true,
    // });
    // try {
    // } catch (error) {}
  };

  // const updateUserDetails = async (updates) => {
  //   // setLoadingMessage("Updating user details, please wait...");
  //   // setLoading(true);
  //   // try {
  //   //   const user = await api.post("/users/UpdateById", updates);
  //   //   toast({
  //   //     position: "top",
  //   //     title: "User details successfully updated!",
  //   //     status: "success",
  //   //     duration: 4000,
  //   //     isClosable: true,
  //   //   });
  //   //   setLoading(false);
  //   // } catch (error) {
  //   //   console.log(error);
  //   //   setLoading(false);
  //   // }
  // };

  //   useEffect(() => {
  //     setTotals({
  //       all: users.length,
  //       archive: users.filter((x) => x.status === 3).length,
  //       pending: users.filter((x) => x.status === 0).length,
  //       approved: users.filter((x) => x.status === 1).length,
  //     });
  //   }, [users]);
  const getData = async () => {
    setLoadingMessage("Getting users list..");
    setLoading(true);
    try {
      const { data } = await api.post("/recurring/get", {});
      setLoading(false);

      setDonations(data);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updatePrivateNotes = async (data) => {
    updateDonation(data);
    toast({
      position: "top",
      title: "Private notes updated",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const updateDonation = async (recurring) => {
    try {
      const { data } = await api.put("/recurring/update", recurring);
      return data;
    } catch (error) {}
  };

  const customCompleteDonation = async (data) => {
    setLoading(true);
    try {
      const newData = await updateDonation(data.recurring);
      toast({
        position: "top",
        title: "Details successfully updated.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
      getData();
      setOpenEditDonation(false);
      return newData;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const customCompleteNewDonation = async (data) => {
    setLoading(true);

    try {
      const r = await api.post("/recurring/", {
        recurring: data.recurring,
        privateRecurring: data.privateRecurring,
      });

      toast({
        position: "top",
        title: "Details successfully created.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      getData();
      setLoading(false);
      setOpenNewDonation(false);
    } catch (e) {}
    setLoading(false);
  };
  const orderBy = () => {
    switch (showDonationType) {
      case 0: {
        return orderByRecurring(donations);
      }
      // private
      case 1: {
        const recurring = donations.filter((x) => !x.isPrivateDonation);
        return orderByRecurring(recurring);
      }
      // approve
      case 2: {
        const recurring = donations.filter((x) => x.isPrivateDonation);
        return orderByRecurring(recurring);
      }
    }

    return orderByRecurring();
  };

  const orderByRecurring = (list) => {
    switch (showRecurringType) {
      case 0: {
        return list;
      }
      // private
      case 1: {
        const recurring = list.filter((x) => x.isRecurring === "1");
        return recurring;
      }
      // approve
      case 2: {
        const recurring = list.filter((x) => x.isRecurring === "0");
        return recurring;
      }
    }

    return donations;
  };

  return (
    <div>
      <div className="flex  items-center  gap-5 bg-shades-100 max-w-[620px] rounded justify-center p-2 mb-7  mt-1">
        <div className="flex items-center  gap-5 donation-buttons  bg-white p-3 rounded border-shades-500 border">
          <div>
            <Button
              size="small"
              className={`text-xs p-1 ${
                showRecurringType === 0 ? "bg-red" : ""
              } text-white`}
              variant="outline"
              onClick={() => {
                setShowRecurringType(0);
              }}
            >
              All donations
            </Button>{" "}
          </div>
          <div>
            <Button
              size="small"
              className={`text-xs p-1 ${
                showRecurringType === 1 ? "bg-red" : ""
              } text-white`}
              variant="outline"
              onClick={() => {
                setShowRecurringType(1);
              }}
            >
              Recurring
            </Button>{" "}
          </div>
          <div>
            <Button
              size="small"
              className={`text-xs  p-1 ${
                showRecurringType === 2 ? "bg-red text-white" : ""
              } text-white`}
              variant="outline"
              onClick={() => {
                setShowRecurringType(2);
              }}
            >
              One time
            </Button>
          </div>
        </div>
        <div className="flex items-center  gap-5 donation-buttons bg-white p-3 rounded border-shades-500 border">
          <div>
            <Button
              size="small"
              variant="outline"
              className={`text-xs p-1 ${
                showDonationType === 0 ? "bg-primary" : ""
              } text-white`}
              onClick={() => {
                setShowDonationType(0);
              }}
            >
              All Donations
            </Button>{" "}
          </div>
          <div>
            <Button
              size="small"
              className={`text-xs p-1 ${
                showDonationType === 1 ? "bg-primary" : ""
              } text-white`}
              variant="outline"
              onClick={() => {
                setShowDonationType(1);
              }}
            >
              To Campaign
            </Button>{" "}
          </div>
          <div>
            <Button
              size="small"
              className={`text-xs p-1 ${
                showDonationType === 2 ? "bg-primary" : ""
              } text-white`}
              variant="outline"
              onClick={() => {
                setShowDonationType(2);
              }}
            >
              Only Private
            </Button>
          </div>
        </div>
      </div>
      <div>
        <TableContainer>
          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead>
              <Tr>
                <Th>
                  <span className="text-primary text-center">Active</span>
                </Th>
                <Th>
                  <span className="text-primary flex justify-center">
                    {" "}
                    type
                  </span>
                </Th>
                <Th>
                  <span className="text-primary">Recurring</span>
                </Th>
                <Th>
                  <span className="text-primary">Created</span>
                </Th>
                <Th>
                  <span className="text-primary">
                    <Center> Currency</Center>
                  </span>
                </Th>
                <Th>
                  <span className="text-primary">Sum</span>
                </Th>
                <Th>
                  <span className="text-primary">Fee</span>
                </Th>
                <Th>
                  <span className="text-primary">First name</span>
                </Th>
                <Th>
                  <span className="text-primary">Last name</span>
                </Th>
                <Th>
                  <span className="text-primary">Email</span>
                </Th>
                <Th>
                  <span className="text-primary">Phone</span>
                </Th>
                <Th>
                  <span className="text-primary">
                    <Center>Tools</Center>
                  </span>
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {orderBy().map((donation, index) => {
                return (
                  <DonationRow
                    key={donation._id}
                    donation={donation}
                    isLoading={isLoading}
                    openEditDonationMenu={openEditDonationMenu}
                    openNewDonationMenu={openNewDonationMenu}
                    currentDonation={donation}
                    openPaymentList={openPaymentList}
                    updatePrivateNotes={updatePrivateNotes}
                    processors={processors}
                  />
                );
              })}
            </Tbody>

            {/* <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot> */}
          </Table>
        </TableContainer>
      </div>

      {isLoading && <Loader isLoading={isLoading} text={loadingMessage} />}

      {openEditDonation && (
        <DonateContainerModel
          isOpen={openEditDonation}
          onClose={() => {
            setOpenEditDonation(false);
          }}
          donation={currentDonation}
          customCompleteDonation={customCompleteDonation}
        />
      )}

      {openNewDonation && (
        <DonateContainerModel
          isOpen={openNewDonation}
          onClose={() => {
            setOpenNewDonation(false);
          }}
          donation={getNewDonation()}
          customCompleteDonation={customCompleteNewDonation}
          goToStage={2}
        />
      )}

      {openPaymentsList && (
        <PaymentsModal
          isOpen={onOpen}
          onClose={() => setPaymentsList(false)}
          donation={currentDonation}
        />
      )}
    </div>
  );
};

export default DonationList;
