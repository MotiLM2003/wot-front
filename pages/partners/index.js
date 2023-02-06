import React, { useEffect } from 'react';
import CRMLayout from '../../pages/shared/CRMLayout';
import { useSelector, useDispatch } from 'react-redux';
import { setCRMId } from '../../store/menuSlice';

const id = 3;
const partners = () => {
  const dispatch = useDispatch();
  const { CRMMenuId } = useSelector((state) => state.menuReducer);
  useEffect(() => {
    dispatch(setCRMId(id));
  }, []);
  return <CRMLayout>partners</CRMLayout>;
};

export default partners;
