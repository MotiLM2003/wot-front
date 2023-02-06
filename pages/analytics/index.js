import React, { useEffect } from 'react';
import CRMLayout from '../shared/CRMLayout';
import { useSelector, useDispatch } from 'react-redux';
import { setCRMId } from '../../store/menuSlice';

const id = 8;
const Analytics = () => {
  const dispatch = useDispatch();
  const { CRMMenuId } = useSelector((state) => state.menuReducer);
  useEffect(() => {
    dispatch(setCRMId(id));
  }, []);
  return <CRMLayout>Analytics</CRMLayout>;
};

export default Analytics;
