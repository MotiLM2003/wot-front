import React, { useEffect } from 'react';
import CRMLayout from '../shared/CRMLayout';
import { useSelector, useDispatch } from 'react-redux';
import { setCRMId } from '../../store/menuSlice';

const id = 6;
const withdrawals = () => {
  const dispatch = useDispatch();
  const { CRMMenuId } = useSelector((state) => state.menuReducer);
  useEffect(() => {
    dispatch(setCRMId(id));
  }, []);
  return <CRMLayout>withdrawals</CRMLayout>;
};

export default withdrawals;
