import React, { useEffect } from "react";
import CRMLayout from "../../pages/shared/CRMLayout";
import { useSelector, useDispatch } from "react-redux";
import { setCRMId } from "../../store/menuSlice";
const id = 0;
const Campaigns = () => {
  const dispatch = useDispatch();
  const { CRMMenuId } = useSelector((state) => state.menuReducer);
  useEffect(() => {
    dispatch(setCRMId(id));
  }, []);
  return (
    <CRMLayout>
      <div>Hello wolrdA</div>
    </CRMLayout>
  );
};

export default Campaigns;
