import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import UsersList from "./UsersList";

const format = (val) => `$` + val;
const parse = (val) => val.replace(/^\$/, "");
const UserManager = () => {
  const [users, setUser] = useState([]);
  const isLoading = useState(false);
  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setCampaign({ ...users, [name]: value });
  };

  return (
    <div className="bg-default-background p-2qq md:p-4 rounded">
      <UsersList />
    </div>
  );
};

export default UserManager;
