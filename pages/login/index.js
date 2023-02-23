import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Input from '@components/Input/Input';
import hero from '../../images/login.svg';
import bigAccount from '../../images/big-account.svg';
import google from '../../images/icons/google.svg';
import email from '../../images/icons/email.svg';
import security from '../../images/icons/security.svg';

import eye from '../../images/icons/eye.svg';
import Confirmation from '@components/Confirmation/Confirmation';
import Layout from 'pages/shared/Layout';
import Registration from '@components/Registration/Registration';
import axios from 'axios';
import api from '../../apis/userAPI';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';
import { route } from 'next/dist/server/router';
import Loader from '@components/Loader/Loader';

export default function Home() {
	const router = useRouter();
	const { isLogged } = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();
	const [details, setDetails] = useState({
		email: 'motiphone2003@gmail.com',
		password: 'moti2003',
	});
	// const [details, setDetails] = useState({
	// 	email: '',
	// 	password: '',
	// });

	const [isLoading, setLoading] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [isConfOpen, setIsConfOpen] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [isErrorLoggin, setIsErrorLogin] = useState(false);

	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setDetails({ ...details, [name]: value });
	};
	useEffect(() => {}, [passwordVisible]);

	const logIn = async () => {
		try {
			setIsErrorLogin(false);
			setLoading(true);
			const { data } = await api.post('/users/login', details);
			const user = data.user;
			console.log(user);
			dispatch(setUser(user));
			setLoading(false);
			api.post('logger/add', {
				loggerId: 2,
				statusCode: 200,
				descriptionId: 0,
				params: [`${user.firstName} ${user.lastName}`],
			});
			router.push('/dashboard');
		} catch (error) {
			// const message = error.response.data.message;
			setIsErrorLogin(true);
			setLoading(false);
		}
	};
	return (
		<Layout>
			<div className='flex flex-col md:flex-row justify-center'>
				<div className='bg-shades-100 p-6 flex items-center basis-1/2  justify-center'>
					<div className='flex flex-col gap-2'>
						<h1> Login </h1>{' '}
						<Input
							placeholder={'E-mail / username'}
							name='email'
							value={details.email}
							onChange={onChange}
							icon={email}
						/>{' '}
						<Input
							type={`${passwordVisible ? 'text' : 'password'}`}
							placeholder={`${passwordVisible ? 'text' : 'password'}`}
							icon={security}
							backIcon={eye}
							name='password'
							value={details.password}
							onChange={onChange}
							backIconCallback={() => {
								setPasswordVisible((prev) => !prev);
							}}
						/>
						{isErrorLoggin && (
							<div className='text-xs text-red'>
								The login details you entered are incorrect
							</div>
						)}
						<div className='flex justify-between text-xs text-paragraph underline'>
							<div
								className='cursor-pointer'
								onClick={() => setIsConfOpen((prev) => !prev)}
							>
								Forget Password{' '}
							</div>{' '}
						</div>{' '}
						<div
							className='flex justify-center bg-black rounded border-none px-3 py-2 text-sm cursor-pointer text-white mt-3'
							onClick={() => logIn()}
						>
							<button> Sign In </button>{' '}
						</div>{' '}
						<p className='text-xs flex justify-center m-4'> Or </p>
						<Image src={google} />{' '}
						<p className='text-xs flex justify-center m-4'>
							Don 't have an account?&nbsp;{' '}
							<span
								className='font-bold text-paragraph cursor-pointer hover:text-primary'
								onClick={() => {
									setIsSignUp(true);
								}}
							>
								Sign up{' '}
							</span>{' '}
						</p>{' '}
					</div>{' '}
				</div>{' '}
				<div className='basis-1/2 xl:basis-1/3 relative'>
					<Image src={hero} layout='responsive' />
				</div>{' '}
				<Loader isLoading={isLoading} />{' '}
			</div>{' '}
			<AnimatePresence>
				{' '}
				{isConfOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<Confirmation
							title='Forgot your password?'
							close={() => {
								setIsConfOpen((prev) => !prev);
							}}
							visible={isConfOpen}
						>
							<div className='flex flex-col'>
								<p className='text-sm my-2'> Enter your email </p>{' '}
								<input type='text' className='bg-shades-500 rounded h-[2rem]' />
								<div className='flex max-w-[100px] justify-center bg-black rounded border-none px-3 py-2 text-sm cursor-pointer text-white mt-3  self-end'>
									<button
										className=''
										onClick={() => {
											alert('sending email');
											setIsConfOpen((prev) => !prev);
										}}
									>
										Submit{' '}
									</button>{' '}
								</div>{' '}
							</div>{' '}
						</Confirmation>{' '}
					</motion.div>
				)}{' '}
			</AnimatePresence>{' '}
			<AnimatePresence>
				{' '}
				{isSignUp && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, x: -400 }}
					>
						<Confirmation
							title={
								<div className='flex gap-6 justify-center pb-1 border-b overflow-hidden  items-center md:min-w-[600px] '>
									<div>
										<Image src={bigAccount} />{' '}
									</div>{' '}
									<div> Become A Memeber </div>{' '}
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
			</AnimatePresence>{' '}
		</Layout>
	);
}
