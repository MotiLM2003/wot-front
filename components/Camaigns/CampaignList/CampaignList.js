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

const CampaignList = () => {
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
			selectedFields: { campaignName: 1 },
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
			payload.filters = { ...payload.filters, _id: campaignId };
		}
		setLoading(true);

		const { data } = await api.post('/campaigns/get', payload);
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
		console.log('status', list);
		switch (index) {
			case 0: {
				return list;
			}
			// proccesing
			case 1: {
				return list.filter((x) => x.status === 1);
			}
			// complete
			case 2: {
				return list.filter((x) => x.status === 0);
			}
			// archive
			case 3: {
				return list.filter((x) => x.status === 2);
			}
		}
	};

	const userName = selectedUser
		? `${selectedUser.firstName} ${selectedUser.lastName}`
		: 'all campaigns';
	return (
		<div>
			<div>
				<div className='flex flex-col gap-3 justify-center'>
					<div className='flex items-center pt-4 pr-y'>
						<h2 className='font-bold'>
							Campaigns / <span class='font-normal'>{`${userName}`}</span>
						</h2>
					</div>
				</div>
			</div>
			<div>
				<div className='flex items-center gap-4 mb-10 mt-5 text-sm'>
					<h5
						onClick={() => {
							setFilterBy(0);
						}}
						className={`cursor-pointer transition ease-in-out duration-300 px-[.6rem] py-[.1rem] rounded flex items-center gap-1 justify-center${
							filterByMenu === 0 ? '  status-selected' : ''
						} `}
					>
						All Campaigns
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
						className={`cursor-pointer transition ease-in-out duration-300  px-[.6rem] py-[.1rem] rounded flex items-center gap-1 justify-center ${
							filterByMenu === 1 ? '  status-selected' : ''
						} `}
					>
						Pending
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
						className={`cursor-pointer transition ease-in-out duration-300 px-[.6rem] py-[.1rem] rounded flex items-center gap-1 justify-center ${
							filterByMenu === 2 ? 'status-selected' : ''
						} `}
					>
						Approved
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
						className={`cursor-pointer transition ease-in-out duration-300 px-[.6rem] py-[.1rem] rounded flex items-center gap-1 justify-center ${
							filterByMenu === 3 ? 'status-selected' : ''
						} `}
					>
						Archived
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
									<span className='text-primary' onClick={() => orderBy(0)}>
										Campaign Name
									</span>
								</Th>
								<Th>
									<span className='text-primary'>Manager</span>
								</Th>
								<Th>
									<span className='text-primary'>Total</span>
								</Th>
							</Tr>
						</Thead>
						<Tbody>
							{orderBy(filterByMenu).map((item, index) => {
								return (
									<Tr key={item._id}>
										<Td>{item._id}</Td>
										<Td>{moment(item.createdAt).format('DD-MM-YY HH:mm')}</Td>
										<td className='underline cursor-pointer '>
											<Link href={`/campaigns/${item._id}`} isExternal={true}>
												{item.campaignName} <ExternalLinkIcon mx='2px' />
											</Link>
										</td>
										<Td>
											{item.owner.firstName} {item.owner.lastName}
										</Td>
										<td>56,000</td>
										<Td>
											<div class='flex flex-col gap-2 width-[100%] justify center items-stretch'>
												<div>
													<Button
														colorScheme='red'
														size='xs'
														variant='outline'
														isFullWidth='true'
														onClick={() => {
															router.push(
																`/crm/campaigns/campaign-details/${item._id}`
															);
														}}
													>
														Edit Campaign
													</Button>
												</div>
												<div class='flex flex-col'>
													<Button
														colorScheme='yellow'
														size='xs'
														isDisabled={item.status === 3}
														variant='outline'
														onClick={() => {
															onStatuschange(item._id, 3);
															updateCamping(item._id, 3);
															toast.warning('Campaign has been archived.');
														}}
													>
														Move To Archive
													</Button>
												</div>
												<div class='flex flex-col'>
													<Button
														colorScheme='green'
														size='xs'
														variant='outline'
														isDisabled={item.status === 1}
														onClick={() => {
															onStatuschange(item._id, 1);
															updateCamping(item._id, 1);
															toast.success('Campaign is now approved.');
														}}
													>
														Approve
													</Button>
												</div>
											</div>
										</Td>
									</Tr>
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

			{isLoading && (
				<Loader isLoading={isLoading} text='Loading campaign details...' />
			)}
		</div>
	);
};

export default CampaignList;
