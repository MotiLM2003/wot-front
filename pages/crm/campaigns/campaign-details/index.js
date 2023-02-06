import React, { useEffect } from 'react';
import CRMLayout from '../../../../pages/shared/CRMLayout';
import { useSelector, useDispatch } from 'react-redux';
import { setCRMId } from '../../../../store/menuSlice';
import CreateCampaign from '@components/Camaigns/CreateCamaigns/CreateCampaign';

const index = () => {
  return (
    <CRMLayout>
      <CreateCampaign />
    </CRMLayout>
  );
};

export default index;
