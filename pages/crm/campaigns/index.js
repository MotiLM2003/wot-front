import React, { useState, useEffect } from 'react';
import CRMLayout from '../../../pages/shared/CRMLayout';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setCRMId } from '../../../store/menuSlice';
import plus from '../../../images/icons/white/plus.svg';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Confirmation from '@components/Confirmation/Confirmation';
import CreateCampaign from '@components/Camaigns/CreateCamaigns/CreateCampaign';
import api from '../../../apis/userAPI';
import CampaignList from '@components/Camaigns/CampaignList/CampaignList';
const id = 4;
const Campaigns = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { CRMMenuId } = useSelector((state) => state.menuReducer);
  useEffect(() => {
    dispatch(setCRMId(id));
  }, []);

  useEffect(() => {
    const getData = async () => {
      const { data } = await api.post('/campaigns/get');
    };
    getData();
  }, []);
  const [isNewCampaign, setIsNewCampaign] = useState(false);
  useEffect(() => {}, [isNewCampaign]);
  return (
    <CRMLayout>
      <div className='p-3'>
        <div className='flex justify-between items-center '>
          <div>
            <div className='flex flex-col gap-3 justify-center'>
              <div className='flex items-center pt-4 pr-y'>
                <h2 className='font-bold'>Campaigns </h2>{' '}
                <h2 className='font-normal'>/ User name</h2>
              </div>
            </div>
          </div>
          <div
            onClick={() => router.push('/crm/campaigns/campaign-details')}
            className='  md:mr-[3rem] bg-black p-2 text-white cursor-pointer hover:scale-[1.05]  transition duration-500  flex gap-4 items-center justify-center rounded'
          >
            <div>
              <Image src={plus} />
            </div>
            <div>New Campaign</div>
          </div>
        </div>
        <div>
          <CampaignList />
        </div>
      </div>
    </CRMLayout>
  );
};

export default Campaigns;
