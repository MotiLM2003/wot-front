import React, { useState, useEffect } from 'react';
import CRMLayout from '../../shared/CRMLayout';
import { useSelector, useDispatch } from 'react-redux';
import { setCRMId } from '../../../store/menuSlice';
import UserManagerContainer from '@components/UseManager';
const id = 9;
const UserManager = () => {
  const dispatch = useDispatch();
  const { CRMMenuId } = useSelector((state) => state.menuReducer);
  useEffect(() => {
    dispatch(setCRMId(id));
  }, []);
  return (
    <CRMLayout>
      <UserManagerContainer />
    </CRMLayout>
  );
};

export default UserManager;
