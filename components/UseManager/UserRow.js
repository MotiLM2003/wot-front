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
} from "@chakra-ui/react";
import moment from "moment";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Edit from "@components/Icons/Edit";
import Close from "@components/Icons/Close";

const UserRow = ({
  user,
  changeUser,
  updateUserDetails,
  isLoading,
  onChange,
}) => {
  const [editUser, setEditUser] = useState(false);
  const [openUser, setOpenUser] = useState(null);
  const isHidden = openUser === user._id ? "" : "hidden";
  const [birthday, setBirthDay] = useState(new Date(moment(user.birthDate)));

  const updateChanges = () => {
    const updates = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      idNumber: user.idNumber,
      birthDate: birthday,
    };
    updateUserDetails(updates);
  };

  return (
    <>
      <Tr key={user._id} className="h-[80px]">
        <Td>
          <div className="flex  items-center gap-1 ">
            <div
              className={`rounded-2xl border ${
                user.status == 1 ? "bg-success" : "bg-red"
              } w-[12px] h-[12px]`}
            ></div>
            {user.status == 1 ? "Active" : "Disabled"}
          </div>
        </Td>
        <Td>{moment(user.createdAt).format("DD-MM-YY HH:mm")}</Td>
        <Td>
          {!editUser ? (
            user.firstName
          ) : (
            <Input
              bg="white"
              size="sm"
              type="text"
              name="firstName"
              fontSize="12px"
              onChange={(e) => onChange(e, user)}
              value={user.firstName}
              className="max-w-[100px]"
            />
          )}
        </Td>
        <Td>
          {!editUser ? (
            user.lastName
          ) : (
            <Input
              size="sm"
              bg="white"
              type="text"
              name="lastName"
              fontSize="12px"
              onChange={(e) => onChange(e, user)}
              value={user.lastName}
            />
          )}
        </Td>
        <Td>
          {!editUser ? (
            user.phone
          ) : (
            <Input
              size="sm"
              bg="white"
              type="text"
              name="phone"
              fontSize="12px"
              value={user.phone}
              onChange={(e) => onChange(e, user)}
            />
          )}
        </Td>
        <Td>
          {!editUser ? (
            user.email
          ) : (
            <Input
              size="sm"
              fontSize="12px"
              bg="white"
              type="text"
              name="email"
              value={user.email}
              onChange={(e) => onChange(e, user)}
            />
          )}
        </Td>

        <Td>
          {!editUser ? (
            user.idNumber
          ) : (
            <Input
              size="sm"
              bg="white"
              type="text"
              name="idNumber"
              value={user.idNumber}
              fontSize="12px"
              onChange={(e) => onChange(e, user)}
            />
          )}
        </Td>
        <Td>
          {!editUser ? (
            moment(birthday).format("DD-MM-YYYY")
          ) : (
            <DatePicker
              selected={new Date(moment(birthday))}
              onChange={(date) => setBirthDay(date)}
            />
          )}
          {/* new Date(moment(campingData.endDate)) */}
          {/* {moment(user.createdAt).format('DD-MM-YY HH:mm')} */}
        </Td>
        <Td>
          <div className="flex gap-2">
            <div
              className="cursor-pointer"
              onClick={() => {
                setEditUser((prev) => !prev);
                setOpenUser(user._id);
              }}
            >
              <Edit
                color={editUser ? "red" : "#999FC0"}
                secondaryColor={"red"}
              />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                if (user._id === openUser) {
                  setEditUser((prev) => false);
                  setOpenUser(null);
                } else {
                  setOpenUser(user._id);
                }
              }}
            >
              <Close
                color={openUser === user._id ? "red" : "#999FC0"}
                secondaryColor={"red"}
              />
            </div>
            <div></div>
          </div>
        </Td>
      </Tr>
      <Tr className={isHidden}>
        <Td colSpan={8}>
          <div className="flex gap-5">
            <div className="border border-primary rounded max-w-[380px] p-4">
              <div className="flex gap-4">
                <div className="flex align-center flex-col gap-4 justify-center">
                  <div>
                    <h5 className="text-red font-bold"> • Address</h5>
                    <p className="text-paragraph">
                      {user.city},<br /> {user.street},<br /> {user.country}
                    </p>
                  </div>
                  <div
                    style={{
                      borderBottom: "1px solid #ED604F",
                      maxWidth: "100px",
                      minWidth: "100px",
                    }}
                  ></div>
                  <div>
                    <h5 className="text-red font-bold"> • Language</h5>
                    <p>{user.language} English</p>
                  </div>
                </div>
                <div
                  style={{
                    borderLeft: "1px solid #ED604F",
                    maxWidth: "10px",
                    minWidth: "10px",
                    maxHeight: "50px",
                    marginTop: "30px",
                  }}
                ></div>
                <div className="flex flex-col gap-3">
                  <h5 className="text-red font-bold">
                    • Main Campaign Or
                    <br /> Organization Name
                  </h5>
                  <p classNam="text-paragraph">THE SAADON FAMILY FUND</p>
                  <div>
                    <div className="rounded border border-primary max-w-[80px] flex justify-center px-3 py-1">
                      <p>ID file</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-primary rounded max-w-[480px]  min-w-[400px] p-4">
              <div>
                <h5 className="text-red font-bold">
                  • Vaad Hatzedaka Certificate:
                </h5>
                <div className="flex flex-col gap-1 mt-4">
                  <p className="text-black font-bold">Rabbonim Details</p>
                  {user.rabiList.map(({ name, phone, address }) => (
                    <div className="flex gap-2 text-paragraph">
                      <div>{name}</div>
                      <div>|</div>
                      <div className=" w-[100px] m-w-150px">{phone}</div>
                      <div>|</div>
                      <div>{address}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col my-4 gap-3">
                <Button
                  colorScheme="red"
                  size="xs"
                  variant="outline"
                  isFullWidth="true"
                >
                  Edit Charge times
                </Button>
                <Button
                  colorScheme="blue"
                  size="xs"
                  variant="outline"
                  isFullWidth="true"
                >
                  Change Payment Details
                </Button>
                <Button
                  colorScheme="gray"
                  size="xs"
                  variant="outline"
                  isFullWidth="true"
                  textColor="gray"
                  isDisabled={user.status === 3}
                  onClick={() => {
                    changeUser(
                      { ...user, status: 3 },
                      { _id: user._id, status: 3 }
                    );
                  }}
                >
                  Move To Archive
                </Button>
                <Button
                  colorScheme="green"
                  size="xs"
                  variant="outline"
                  isFullWidth="true"
                  isDisabled={user.status === 1}
                  onClick={() => {
                    changeUser(
                      { ...user, status: 1 },
                      { _id: user._id, status: 1 }
                    );
                  }}
                >
                  Active User
                </Button>
                <Button
                  colorScheme="blue"
                  size="xs"
                  isFullWidth="true"
                  isDisabled={!editUser}
                  onClick={updateChanges}
                  isLoading={isLoading}
                >
                  Save changes!
                </Button>
              </div>
            </div>
          </div>
        </Td>
      </Tr>
    </>
  );
};

export default UserRow;
