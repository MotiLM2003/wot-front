import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Link,
} from '@chakra-ui/react';
import { Stack, Button, ButtonGroup } from '@chakra-ui/react';
import api from '../../../apis/userAPI';
import edit from '../../../images/icons/edit.svg';
import Loading from '@components/Loader/Loader';
import Loader from '@components/Loader/Loader';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import NumberFormat from 'react-number-format';

const OwnerPaymentList = () => {
	const router = useRouter();
	const [list, setList] = useState([]);
	const { user } = useSelector((state) => state.userReducer);
	const [isLoading, setLoading] = useState(false);
	const [filterByMenu, setFilterBy] = useState(0);
	const [totals, setTotals] = useState({
		all: 0,
		archive: 0,
		pending: 0,
		approved: 0,
	});
	const { selectedUser, selectedCampagin } = useSelector(
		(state) => state.switcherReducer
	);

	const [localUser, setLocalUser] = useState(user);
	const getData = async () => {
		let userId = null;

		const campaignId = selectedCampagin?._id && selectedCampagin?._id;
		const payload = {
			filters: {},
			selectedFields: {},
		};

		if (localUser.role.type === 'admin') {
			if (selectedUser) {
				payload.filters = { ...payload.filters, owner: selectedUser._id };
			} else {
				payload.filters = { ...payload.filters };
			}
		} else {
			payload.filters = { ...payload.filters, owner: localUser._id };
		}

		if (selectedCampagin?._id) {
			payload.filters = { ...payload.filters, campaign: campaignId };
		}
		setLoading(true);

		const { data } = await api.post('/owner-payments/get', payload);
		console.log('date', data);
		setLoading(false);
		setList(data);
	};
	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		getData();
	}, [selectedUser, selectedCampagin]);
	useEffect(() => {
		setTotals({
			all: list.length,
			archive: list.filter((x) => x.status === 3).length,
			pending: list.filter((x) => x.status === 0).length,
			approved: list.filter((x) => x.status === 1).length,
		});
	}, [list]);

	const onStatuschange = (id, status) => {
		setList([
			...list.map((item) => {
				if (item._id === id) {
					return { ...item, status };
				} else return item;
			}),
		]);
	};

	const updateCamping = (_id, status) => {
		api.put('/campaigns/update', {
			_id,
			status,
		});
	};

	const orderBy = (index) => {
		switch (index) {
			case 0: {
				return list;
			}
			// pending
			case 1: {
				return list.filter((x) => x.status === 0);
			}
			// approve
			case 2: {
				return list.filter((x) => x.status === 1);
			}
			// archive
			case 3: {
				return list.filter((x) => x.status === 3);
			}
		}
	};

	const userName = selectedUser
		? `${selectedUser.firstName} ${selectedUser.lastName}`
		: 'All payments';

	const total = list.reduce((sum, item) => sum + item.sum, 0);
	const uniqueIds = new Set();
	for (let i = 0; i < list.length; i++) {
		uniqueIds.add(list[i].campaign._id);
	}

	const totalcount = list.length;

	const count = uniqueIds.size;

	return (
		<div>
			<div>
				<div className='flex flex-col gap-3 justify-center'>
					<div className='flex items-center pt-4 pr-y'>
						<h2 className='font-bold'>
							Payments / <span class='font-normal'>{`${userName}`}</span>
						</h2>
					</div>
				</div>
			</div>
			<div>
				<div className='flex items-center gap-4 mb-10 mt-5  text-sm'>
					<h5
						onClick={() => {
							setFilterBy(0);
						}}
						className={`cursor-pointer transition ease-in-out duration-150 px-[.6rem] py-[.1rem] rounded flex items-center gap-1 justify-center${
							filterByMenu === 0 ? '  status-selected' : ''
						} `}
					>
						All Payments
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
							setFilterBy(1);
						}}
						className={`cursor-pointer transition ease-in-out duration-150  px-[.6rem] py-[.1rem] rounded flex items-center gap-1 justify-center ${
							filterByMenu === 1 ? '  status-selected' : ''
						} `}
					>
						Processing
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
							setFilterBy(2);
						}}
						className={`cursor-pointer transition ease-in-out duration-150 px-[.6rem] py-[.1rem] rounded flex items-center gap-1 justify-center ${
							filterByMenu === 2 ? 'status-selected' : ''
						} `}
					>
						Completed payments
						<span
							className={`${
								filterByMenu === 2 ? 'text-tertiary' : 'text-black'
							}`}
						>
							{' '}
							({totals.approved})
						</span>
					</h5>
					<div className='text-red font-bold text-xl'>|</div>
					<h5
						onClick={() => {
							setFilterBy(3);
						}}
						className={`cursor-pointer transition ease-in-out duration-150 px-[.6rem] py-[.1rem] rounded flex items-center gap-1 justify-center ${
							filterByMenu === 3 ? 'status-selected' : ''
						} `}
					>
						Faild payments
						<span
							className={`${
								filterByMenu === 3 ? 'text-tertiary' : 'text-black'
							}`}
						>
							{' '}
							({totals.archive})
						</span>
					</h5>
				</div>
				<TableContainer>
					<Table variant='striped' colorScheme='gray' size='sm'>
						<TableCaption>Total campaign details</TableCaption>
						<Thead>
							<Tr>
								<Th>
									<span className='text-primary'>Campaign ID</span>
								</Th>
								<Th>
									<span className='text-primary'>Created</span>
								</Th>
								<Th>
									<span className='text-primary'>Owner</span>
								</Th>
								<Th>
									<span className='text-primary' onClick={() => orderBy(0)}>
										Campaign Name
									</span>
								</Th>

								<Th className='text-center'>
									<span className='text-primary text-center'>Total</span>
								</Th>
							</Tr>
						</Thead>
						<Tbody>
							{orderBy(filterByMenu).map((item, index) => {
								let cName = item?.campaign?.campaignName;
								const max = 22;
								cName = cName.length > max ? cName.substring(0, max) : cName;
								return (
									<Tr key={item._id} className='h-[40px] md:h-[60px]'>
										<Td>{item._id}</Td>
										<Td>{moment(item.createdAt).format('DD-MM-YY HH:mm')}</Td>
										<Td>
											{item.owner.firstName} {item.owner.lastName}
										</Td>
										<Td className='underline cursor-pointer'>
											<Link href={`/campaigns/${item._id}`} isExternal={true}>
												{cName}
												<ExternalLinkIcon mx='2px' />
											</Link>
										</Td>

										<Td className='text-center'>
											<NumberFormat
												thousandSeparator={true}
												prefix={'$'}
												value={item.sum}
												className='text-sm'
												displayType={'text'}
											/>
										</Td>
									</Tr>
								);
							})}
						</Tbody>

						<Tr className='bg-primary text-white font-bold'>
							<Td colspan='2'>&nbsp;</Td>
							<td className='text-center'>total payments: {totalcount}</td>
							<td className='text-center'>total campaigns: {count}</td>
							<td className='text-center'>
								<NumberFormat
									thousandSeparator={true}
									prefix={'$'}
									value={total}
									className='text-sm'
									displayType={'text'}
								/>
							</td>
						</Tr>
					</Table>
				</TableContainer>
			</div>

			{isLoading && (
				<Loader isLoading={isLoading} text='Loading campaign details...' />
			)}
		</div>
	);
};

export default OwnerPaymentList;
