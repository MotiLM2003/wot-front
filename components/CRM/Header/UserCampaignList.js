import React, { useState, useEffect } from "react";
import { Select, Text } from "@chakra-ui/react";
import api from "apis/userAPI";
const UserCampaignList = ({ localUser, onCampaignSwitch }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    console.log("loading c list");
  }, []);

  useEffect(() => {
    console.log(localUser);
    getData();
  }, [localUser]);

  useEffect(() => {
    console.log(list);
  }, [list]);
  const getData = async () => {
    const payload = {
      owner: localUser._id,
    };
    console.log("payload", payload);
    const { data } = await api.post("/campaigns/get-small", payload);
    setList(data);
    console.log("data", data);
  };
  useEffect(() => {
    if (localUser) {
      getData();
    }
  }, []);
  return !localUser || list.length === 0 ? (
    <div>
      <div className="bg-red text-white w-[200px] h-[30px] rounded flex justify-center items-center">
        No campaigns.
      </div>
    </div>
  ) : (
    <div>
      <Select
        bg="white"
        size="sm"
        onChange={(e) => {
          const campaign = list.find((x) => x._id == e.target.value);
          onCampaignSwitch(campaign);
        }}
      >
        <option value={0}>-- Select campaign</option>
        {list.map((item, index) => {
          return <option value={item._id}>{item.campaignName}</option>;
        })}
      </Select>
    </div>
  );
};

export default UserCampaignList;
