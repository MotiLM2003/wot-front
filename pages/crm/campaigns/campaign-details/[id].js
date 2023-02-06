import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CRMLayout from "../../../../pages/shared/CRMLayout";
import { useSelector, useDispatch } from "react-redux";
import { setCRMId } from "../../../../store/menuSlice";
import CreateCampaign from "@components/Camaigns/CreateCamaigns/CreateCampaign";
import api from "../../../../apis/userAPI";
const index = () => {
  const [campingData, setCampingData] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const getCamping = async () => {
      const { data } = await api.post("/campaigns/getOne", { _id: id });

      setCampingData(data);
    };
    getCamping();
  }, []);
  return (
    <CRMLayout>
      <CreateCampaign campingData={campingData} />
    </CRMLayout>
  );
};

export default index;
