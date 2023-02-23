import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';

import 'react-toastify/dist/ReactToastify.css';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Link,
} from '@chakra-ui/react';
import { Stack, Button, ButtonGroup } from '@chakra-ui/react';
import api from '../../apis/userAPI';
import edit from '../../images/icons/edit.svg';
import Loading from '@components/Loader/Loader';
import Loader from '@components/Loader/Loader';
import PlusSignWithBGIcon from '@components/Icons/PlusSignWithBGIcon';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import edit2 from '../../images/icons/white/edit.svg';
import close from '../../images/icons/white/close.svg';
import UserRow from './UserRow';
import { AnimatePresence, motion } from 'framer-motion';
import Confirmation from '@components/Confirmation/Confirmation';
import PencilWithBGIcon from '@components/Icons/PencilWithBGIcon';
import MinusSignWithBGIcon from '@components/Icons/MinusSignWithBGIcon';
const UsersList = ({ isSignUp, setIsSignUp }) => {
	const toast = useToast();
	const [users, setUser] = useState([]);
	const [currentUser, setCurrentUser] = useState(null);
	const [loadingMessage, setLoadingMessage] = useState('Loading...');
	const [filterByMenu, setFilterBy] = useState(0);
	const [isLoading, setLoading] = useState(false);
	const [isEditTimes, setIsEditTimes] = useState(true);
	const [paymentInterface, setPaymentInterface] = useState([]);
	const [totals, setTotals] = useState({
		all: 0,
		archive: 0,
		pending: 0,
		approved: 0,
	});

	const saveUserpaymentInterface = () => {
		if (currentUser === null) {
			console.log('user not selected');
			return;
		}
		const updatedUser = await api.post('/users/UpdateById', update);
		console.log('saving', users);
	};
	const onChange = (e, user) => {
		const name = e.target.name;
		const value = e.target.value;
		// setUser({ ...users, [name]: value });
		setUser(
			users.map((u) => {
				return u._id === user._id ? { ...user, [name]: value } : u;
			})
		);
	};

	const changeUser = async (user, update) => {
		setUser(
			users.map((u) => {
				return u._id === user._id ? user : u;
			})
		);
		try {
			const updatedUser = await api.post('/users/UpdateById', update);
			await api.post('/emails/send', {
				title: 'Great News…Your Account has been Approved',
				template: 'accountApproved',
				to: [
					{
						email: user.email,
						name: `${user.firstName} ${user.lastName}`,
					},
				],
				options: {
					firstName: user.firstName,
					lastName: user.lastName,
				},
			});
			toast({
				position: 'top',
				title: 'Action successfully committed.',
				status: 'success',
				duration: 4000,
				isClosable: true,
			});
		} catch (error) {}
	};

	const updateUserDetails = async (updates) => {
		setLoadingMessage('Updating user details, please wait...');
		setLoading(true);
		try {
			const user = await api.post('/users/UpdateById', updates);
			toast({
				position: 'top',
				title: 'User details successfully updated!',
				status: 'success',
				duration: 4000,
				isClosable: true,
			});
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const getInterfaceList = async () => {
		console.log('loading interface');
		try {
			const { data } = await api.post('/payments-interface/');
			setPaymentInterface(data);
			console.log('done', data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		setTotals({
			all: users.length,
			archive: users.filter((x) => x.status === 3).length,
			pending: users.filter((x) => x.status === 0).length,
			approved: users.filter((x) => x.status === 1).length,
		});
	}, [users]);

	useEffect(() => {
		const getData = async () => {
			setLoadingMessage('Loading interface list..');
			setLoading(true);
			const { data } = await api.post('/users/get');

			setUser(data);
			setLoading(false);
		};

		getData();

		getInterfaceList();
	}, []);

	useEffect(() => {}, [paymentInterface]);

	const orderBy = (index) => {
		switch (index) {
			case 0: {
				return users;
			}
			// pending
			case 1: {
				const pending = users.filter((x) => x.status === 0);

				return pending;
			}
			// approve
			case 2: {
				return users.filter((x) => x.status === 1);
			}
			// archive
			case 3: {
				return users.filter((x) => x.status === 3);
			}
		}
	};

	return (
		<div>
			<div className='flex flex-col'>
				<div className='flex items-center justify-between px-4 mt-5 mb-8'>
					<div className='flex items-center gap-4   grow '>
						<h5
							onClick={() => {
								setFilterBy(0);
							}}
							className={`cursor-pointer transition ease-in-out duration-200 px-[.6rem] py-[.1rem] rounded flex items-center gap-1 justify-center${
								filterByMenu === 0 ? '  status-selected' : ''
							} `}
						>
							All users
							<span
								className={`${
									filterByMenu === 0 ? 'text-tertiary' : 'text-black'
								}`}
							>
								({totals.all})
							</span>
						</h5>
						<div className='text-red font-bold text-xl'>|</div>
						<h5
							onClick={() => {
								setFilterBy(2);
							}}
							className={`cursor-pointer transition ease-in-out duration-200 px-[.6rem] py-[.1rem] rounded flex items-center gap-1 justify-center${
								filterByMenu === 2 ? '  status-selected' : ''
							} `}
						>
							Active users
							<span
								className={`${
									filterByMenu === 2 ? 'text-tertiary' : 'text-black'
								}`}
							>
								({totals.approved})
							</span>
						</h5>
						<div className='text-red font-bold text-xl'>|</div>
						<h5
							onClick={() => {
								setFilterBy(1);
							}}
							className={`cursor-pointer transition ease-in-out duration-200 px-[.6rem] py-[.1rem] rounded flex items-center gap-1 justify-center ${
								filterByMenu === 1 ? '  status-selected' : ''
							} `}
						>
							Pending users
							<span
								className={`${
									filterByMenu === 1 ? 'text-tertiary' : 'text-black'
								}`}
							>
								{' '}
								({totals.pending})
							</span>
						</h5>
						<div className='text-red font-bold text-xl'>|</div>
						<h5
							onClick={() => {
								setFilterBy(3);
							}}
							className={`cursor-pointer transition ease-in-out duration-200 px-[.6rem] py-[.1rem] rounded flex items-center gap-1 justify-center ${
								filterByMenu === 3 ? 'status-selected' : ''
							} `}
						>
							Archived users
							<span
								className={`${
									filterByMenu == 3 ? 'text-tertiary' : 'text-black'
								}`}
							>
								({totals.archive})
							</span>
						</h5>
					</div>
					<div>
						<div
							className='button bg-black flex gap-3 px-6 justify-center items-center'
							onClick={() => {
								setIsSignUp(true);
							}}
						>
							<div>
								<PlusSignWithBGIcon size={19} />
							</div>
							<div>Create User</div>
						</div>
					</div>
				</div>
				<TableContainer>
					<Table variant='striped' colorScheme='gray' size='sm'>
						<Thead>
							<Tr>
								<Th>
									<span className='text-primary'>Pay status</span>
								</Th>
								<Th>
									<span className='text-primary'>Created</span>
								</Th>
								<Th>
									<span className='text-primary'>First name</span>
								</Th>
								<Th>
									<span className='text-primary'>Last name</span>
								</Th>
								<Th>
									<span className='text-primary'>PHONE NUMBER</span>
								</Th>
								<Th>
									<span className='text-primary'>Emails Address</span>
								</Th>

								<Th>
									<span className='text-primary'>ID NUMBER</span>
								</Th>
								<Th>
									<span className='text-primary'>DAY OF BIRTH</span>
								</Th>
							</Tr>
						</Thead>
						<Tbody>
							{orderBy(filterByMenu).map((user, index) => {
								return (
									<UserRow
										user={user}
										changeUser={changeUser}
										updateUserDetails={updateUserDetails}
										isLoading={isLoading}
										onChange={onChange}
									/>
								);
							})}
						</Tbody>
						{/* <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot> */}
					</Table>
				</TableContainer>
			</div>
			{isLoading && <Loader isLoading={isLoading} text={loadingMessage} />}
			<AnimatePresence>
				{isEditTimes && (
					<motion.div
						className='w-[100px]'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<Confirmation
							title={
								<div className='flex gap-3 justify-center pb-4 border-b border-primary overflow-hidden  items-center w-[100%]'>
									<div className='font-bold'> Edit charge times </div>{' '}
								</div>
							}
							close={() => {
								setIsEditTimes(false);
								(prev) => !prev;
							}}
							visible={isEditTimes}
						>
							<div className='flex flex-col mt-2  justify-center items-center gap-2'>
								<div className='font-bold my-4 text-md'>
									Time of release of funds:
								</div>
								{paymentInterface.map((item, index) => {
									return (
										<div
											key={item._id}
											className='border border-secondary  md:min-w-[300px] min-w-[260px] rounded select-none  px-2 py-[.15rem] '
										>
											<div className='flex justify-between items-center'>
												<div className='flex'>
													<p>{item.paymentName}</p>
												</div>
												<div className='flex items-center gap-2'>
													<div className='flex items-center gap-1 ml-2'>
														<div
															className='cursor-pointer'
															onClick={() => {
																if (paymentInterface[index].daysToRelease >= 60)
																	return;
																paymentInterface[index].daysToRelease += 1;
																console.log(item.daysToRelease);
																setPaymentInterface([...paymentInterface]);
															}}
														>
															<PlusSignWithBGIcon color='#1979BE' size={12} />
														</div>
														<div className='text-sm'>{item.daysToRelease}</div>
														<div
															className='cursor-pointer'
															onClick={() => {
																if (paymentInterface[index].daysToRelease <= 1)
																	return;
																paymentInterface[index].daysToRelease -= 1;
																console.log(item.daysToRelease);
																setPaymentInterface([...paymentInterface]);
															}}
														>
															<MinusSignWithBGIcon
																color={'#1979BE'}
																size={12}
															/>
														</div>
														<div> days</div>
													</div>
												</div>
											</div>
										</div>
									);
								})}
								<div
									className='bg-primary min-w-[260px] md:min-w-[300px]  p-1 rounded text-white text-center cursor-pointer'
									onClick={saveUserpaymentInterface}
								>
									save
								</div>
							</div>
						</Confirmation>
					</motion.div>
				)}{' '}
			</AnimatePresence>{' '}
		</div>
	);
};

export default UsersList;
