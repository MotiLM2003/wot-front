import React, { useState, useEffect } from 'react';
import { Select, Text } from '@chakra-ui/react';
import api from 'apis/userAPI';
const UserCampaignList = ({ localUser, onCampaignSwitch, user }) => {
	const [list, setList] = useState([]);

	useEffect(() => {}, []);

	useEffect(() => {
		getData();
	}, [localUser]);

	useEffect(() => {}, [list]);
	const getData = async () => {
		const payload = {
			filters: { owner: localUser._id },
			selectedFields: { campaignName: 1 },
		};
		console.log('payload', payload);
		try {
			const { data } = await api.post('/campaigns/get', payload);
			setList(data);
		} catch (err) {
			console.log(err);
			ht46ug7g;
		}
	};
	useEffect(() => {
		if (localUser) {
			getData();
		}
	}, []);
	return !localUser || list.length === 0 ? (
		<div>
			<div className='bg-red text-white w-[200px] h-[30px] rounded flex justify-center items-center'>
				No campaigns.
			</div>
		</div>
	) : (
		<div>
			<select
				bg='white'
				class='max-w-[250px] p-1 rounded-[.4rem]'
				onChange={(e) => {
					let campaign = list.find((x) => x._id == e.target.value);
					if (!campaign) {
						campaign = null;
					}

					onCampaignSwitch(campaign);
				}}
			>
				<option value={1}>-- All campaigns --</option>

				{list.map((item, index) => {
					return (
						<option key={item._id} value={item._id}>
							{item.campaignName}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default UserCampaignList;
