import React, { useEffect } from 'react';
import CRMLayout from '../shared/CRMLayout';
import { useSelector, useDispatch } from 'react-redux';
import { setCRMId } from '../../store/menuSlice';

const id = 7;
const UTMLink = () => {
  const dispatch = useDispatch();
  const { CRMMenuId } = useSelector((state) => state.menuReducer);
  useEffect(() => {
    dispatch(setCRMId(id));
  }, []);
  return <CRMLayout>UTMLink</CRMLayout>;
};

export default UTMLink;
