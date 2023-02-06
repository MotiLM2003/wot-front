import React, { useEffect } from "react";
import CRMLayout from "../../pages/shared/CRMLayout";
import { useSelector, useDispatch } from "react-redux";
import { setCRMId } from "../../store/menuSlice";

import Dashboard from "@components/CRM/Dashboard/Dashboard";

const id = 0;
const index = () => {
  const dispatch = useDispatch();
  const { CRMMenuId } = useSelector((state) => state.menuReducer);
  useEffect(() => {
    dispatch(setCRMId(id));
  }, []);
  return (
    <CRMLayout>
      <Dashboard />
    </CRMLayout>
  );
};

export default index;
