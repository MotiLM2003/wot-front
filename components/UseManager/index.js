import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
	Input,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
} from '@chakra-ui/react';
import UsersList from './UsersList';
import Registration from '@components/Registration/Registration';
import Confirmation from '@components/Confirmation/Confirmation';
import bigAccount from '/images/big-account.svg';
import Image from 'next/image';
import AccountIcon from '@components/Icons/AccountIcon';

const format = (val) => `$` + val;
const parse = (val) => val.replace(/^\$/, '');
const UserManager = () => {
	const [users, setUser] = useState([]);
	const [isSignUp, setIsSignUp] = useState(false);

	const isLoading = useState(false);

	const onChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		setCampaign({ ...users, [name]: value });
	};

	return (
		<div className='bg-default-background p-2qq md:p-4 rounded'>
			<UsersList isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
			<AnimatePresence>
				{isSignUp && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
						<Confirmation
							title={
								<div className='flex gap-3 justify-center pb-1 border-b overflow-hidden  items-center md:min-w-[600px] '>
									<div>
										<AccountIcon fill='#1979BE' height={23} width={23} />
									</div>
									<div> Create new Member </div>{' '}
								</div>
							}
							close={() => {
								setIsSignUp(false);
								(prev) => !prev;
							}}
							visible={isSignUp}
						>
							<Registration />
						</Confirmation>{' '}
					</motion.div>
				)}{' '}
			</AnimatePresence>
		</div>
	);
};

export default UserManager;
