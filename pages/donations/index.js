import React, { useEffect } from "react";
import CRMLayout from "../../pages/shared/CRMLayout";
import { useSelector, useDispatch } from "react-redux";
import { setCRMId } from "../../store/menuSlice";
import Donations from "@components/CRM/Donations/Donations";

const id = 1;
const donations = () => {
  const dispatch = useDispatch();
  const { CRMMenuId } = useSelector((state) => state.menuReducer);
  useEffect(() => {
    dispatch(setCRMId(id));
  }, []);
  return (
    <CRMLayout>
      <Donations />
    </CRMLayout>
  );
};

export default donations;
