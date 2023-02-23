import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

import { setUser, setCampagin } from 'store/selectedSwitcherSlice';
import logo from '../../../images/logo-white.svg';
import question from '../../../images/question.svg';
import settings from '../../../images/settings.svg';
import bell from '../../../images/bell.svg';
import Link from 'next/link';
import UserSwitcher from '../UserSwitcher/UserSwitcher';
import UserCampaignList from './UserCampaignList';
import { Button, Input, Text } from '@chakra-ui/react';
import AccountIcon from '@components/Icons/AccountIcon';
import Creditcard from '@components/Icons/Creditcard';
import HeartOnHand from '@components/Icons/HeartOnHand';
import DocumentRecycleIcon from '@components/Icons/DocumentRecycleIcon';
import DollarSignIcon from '@components/Icons/DollarSignIcon';
import Sound from '@components/Icons/Sound';
import Email from '@components/Icons/Email';
import ArrowDown from '@components/Icons/ArrowDown';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudFog } from 'tabler-icons-react';

const Header = () => {
	const dispatch = useDispatch();

	const { selectedUser, selectedCampagin } = useSelector(
		(state) => state.switcherReducer
	);
	const { user } = useSelector((state) => state.userReducer);

	const [localUser, setLocalUser] = useState(selectedUser);
	const [switcherInitialValue, setSwitcherInitialValue] = useState('');
	const [IsAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

	const onUserSwitch = (user) => {
		dispatch(setUser(user));
		dispatch(setCampagin(null));
		setLocalUser({ ...user });
	};

	const onCampaignSwitch = (campaign) => {
		dispatch(setCampagin(campaign));
		// setLocalUser({ ...user });
	};

	const clear = () => {
		setLocalUser(null);
		dispatch(setUser(null));
		dispatch(setCampagin(null));
		setSwitcherInitialValue('');
	};

	useEffect(() => {}, []);

	useEffect(() => {
		if (localUser) {
			setSwitcherInitialValue(`${localUser.firstName} ${localUser.lastName}`);
		}
	}, [localUser]);
	return (
		<header className='bg-primary min-h-[98px] p-4 `>'>
			<div className='flex flex-col'>
				<div className='flex justify-between items-center'>
					<div className='ml-[1rem] flex gap-3 items-center'>
						{user && user.role.type === 'admin' && (
							<Link className='cursor-pointer' href='/crm/settings/'>
								<Image src={settings} className='cursor-pointer' />
							</Link>
						)}
						<Image src={bell} />
						<Image src={question} />
					</div>

					<div className=''>
						<Image src={logo} />
					</div>
				</div>
				<div className='flex justify-center'>
					<div className='flex  items-center gap-4'>
						{user.role.type === 'admin' && (
							<React.Fragment>
								<motion.div className='rounded-[.2rem] relative p-1 text-center bg-white border border-black min-w-[150px]'>
									<div
										className='flex items-center space-x-8 cursor-pointer select-none'
										onClick={() => {
											setIsAdminMenuOpen((prev) => !prev);
										}}
									>
										<div>Admin panel</div>
										<div
											className={`transition duration-500 ${
												IsAdminMenuOpen ? 'rotate-0' : 'rotate-180'
											}  `}
										>
											<ArrowDown />
										</div>
									</div>
									<AnimatePresence>
										{IsAdminMenuOpen && (
											<motion.div
												initial={{ opacity: 0, height: 0, top: -1 }}
												animate={{ opacity: 1, height: 202, top: 34 }}
												transition={{ duration: 0.5 }}
												exit={{ opacity: 0, height: 0, top: -1 }}
												className='flex justify-around'
												class='bg-white text-sm text-black rounded-[.2rem] border border-black top-[34px] left-[-1.5rem] absolute min-w-[200px] z-50'
											>
												<Link href={'/crm/user-manager'}>
													<div
														className='flex gap-2 p-1 border-b border-b-gray hover:bg-[#F1F6F5] cursor-pointer'
														onClick={() => {
															setIsAdminMenuOpen(false);
														}}
													>
														<div>
															<AccountIcon />
														</div>
														<div>User Manager</div>
													</div>
												</Link>
												<Link href={'/crm/payments'}>
													<div
														className='flex gap-2 p-1 border-b border-b-gray hover:bg-[#F1F6F5] cursor-pointer'
														onClick={() => {
															setIsAdminMenuOpen(false);
														}}
													>
														<div>
															<Creditcard />
														</div>
														<div>Users payments</div>
													</div>
												</Link>
												<div
													className='flex gap-2 p-1 border-b border-b-gray hover:bg-[#F1F6F5] cursor-pointer'
													onClick={() => {
														setIsAdminMenuOpen(false);
													}}
												>
													<div>
														<HeartOnHand />
													</div>
													<div>General Dontaions</div>
												</div>
												<div
													className='flex gap-2 p-1 border-b border-b-gray hover:bg-[#F1F6F5] cursor-pointer'
													onClick={() => {
														setIsAdminMenuOpen(false);
													}}
												>
													<div>
														<DocumentRecycleIcon />
													</div>
													<div>General Recurrings</div>
												</div>
												<div
													className='flex gap-2 p-1 border-b border-b-gray hover:bg-[#F1F6F5] cursor-pointer'
													onClick={() => {
														setIsAdminMenuOpen(false);
													}}
												>
													<div>
														<DollarSignIcon />
													</div>
													<div>Withdrawals Requests</div>
												</div>
												<div
													className='flex gap-2 p-1 border-b border-b-gray hover:bg-[#F1F6F5] cursor-pointer'
													onClick={() => {
														setIsAdminMenuOpen(false);
													}}
												>
													<div>
														<Sound />
													</div>
													<div>All Campaigns</div>
												</div>
												<div
													className='flex gap-2 p-1 border-b border-b-gray hover:bg-[#F1F6F5] cursor-pointer'
													onClick={() => {
														setIsAdminMenuOpen(false);
													}}
												>
													<div>
														<Email />
													</div>
													<div>Emails Editor</div>
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.div>
								<div>
									<UserSwitcher
										onSelected={onUserSwitch}
										initialValue={switcherInitialValue}
									/>
								</div>
							</React.Fragment>
						)}
						<div>
							{localUser || user.role.type === 'user' ? (
								<UserCampaignList
									localUser={localUser ? localUser : { _id: user._id }}
									onCampaignSwitch={onCampaignSwitch}
									user={user}
								/>
							) : (
								<div>
									<div className='bg-white  w-[200px] h-[30px] rounded flex justify-center items-center'>
										<Text>All campaigns</Text>
									</div>
								</div>
							)}
						</div>
						<div>
							<Button size='sm' colorScheme={'red'} onClick={clear}>
								Clear
							</Button>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
