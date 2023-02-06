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
import { ExternalLinkIcon } from '@chakra-ui/icons';
import edit2 from '../../images/icons/white/edit.svg';
import close from '../../images/icons/white/close.svg';
import UserRow from './UserRow';
const UsersList = () => {
	const toast = useToast();
	const [users, setUser] = useState([]);
	const [loadingMessage, setLoadingMessage] = useState('Loading...');
	const [filterByMenu, setFilterBy] = useState(0);
	const [isLoading, setLoading] = useState(false);
	const [totals, setTotals] = useState({
		all: 0,
		archive: 0,
		pending: 0,
		approved: 0,
	});

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
			setLoadingMessage('Getting users list..');
			setLoading(true);
			const { data } = await api.post('/users/get');
			setLoading(false);

			setUser(data);
		};
		getData();
	}, []);

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
			<div>
				<div className='flex items-center gap-4 mb-10 mt-5'>
					<h5
						onClick={() => {
							setFilterBy(0);
						}}
						className={`cursor-pointer transition ease-in-out duration-1000 px-[.6rem] py-[.1rem] rounded flex items-center gap-1 justify-center${
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
						className={`cursor-pointer transition ease-in-out duration-1000 px-[.6rem] py-[.1rem] rounded flex items-center gap-1 justify-center${
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
						className={`cursor-pointer transition ease-in-out duration-1000  px-[.6rem] py-[.1rem] rounded flex items-center gap-1 justify-center ${
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
						className={`cursor-pointer transition ease-in-out duration-1000 px-[.6rem] py-[.1rem] rounded flex items-center gap-1 justify-center ${
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
		</div>
	);
};

export default UsersList;
