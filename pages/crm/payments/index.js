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
import OwnerPaymentList from '@components/CRM/OwnerPayments/OwnerPaymentsList';
const id = 5;
const OwnerPayments = () => {
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
				<div>
					<OwnerPaymentList />
				</div>
			</div>
		</CRMLayout>
	);
};

export default OwnerPayments;
