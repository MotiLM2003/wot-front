import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import axios from 'axios';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage3 from './Stage3';
import api from '../../apis/userAPI';
import { fakeData, data } from './data';
import { useGenericOnChange } from '../../hooks/useGenericOnChange';
import {
	email,
	minLength,
	isMatch,
	isId,
	izZipCode,
	isFormValid,
} from '/utils/validators';

const initialData = fakeData;
const Registration = () => {
	const setTempErros = () => {
		const tempErrors = {};
		for (const prop in initialData) {
			tempErrors[prop] = false;
		}

		return tempErrors;
	};

	const [stage, setStage] = useState(0);
	const [data, setData] = useState(initialData);
	const [errors, setErrors] = useState(setTempErros());
	const [rabiList, setRabiList] = useState([]);
	const [birthDate, setBirthDate] = useState(new Date());
	const [isHasErrors, setIsHasErrors] = useState(false);
	const onSetStage = (newStage) => {
		if (newStage !== 2) {
			setStage(newStage);
		} else {
			data.rabiList = rabiList;
			setFinalData();
		}
	};

	const setFinalData = async () => {
		data.birthDate = birthDate;
		setIsHasErrors(false);
		if (!validate()) {
			setIsHasErrors(true);
			console.log('has errors', errors);
			return;
		} else {
			console.log('no errors');
			setIsHasErrors(false);
		}

		const user = await api.post('/users/', data);
		setStage(2);
	};
	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		if (e.target.type === 'checkbox') {
			const isChecked = e.target.checked;
			setData({ ...data, [name]: isChecked });
		} else {
			setData({ ...data, [name]: value });
		}
	};

	const validate = () => {
		const tempErrors = errors;
		tempErrors.email = !email(data.email);
		tempErrors.password = !isMatch(data.password, data.rePassword);
		tempErrors.firstName = !minLength(data.firstName, 3);
		tempErrors.lastName = !minLength(data.lastName, 3);
		tempErrors.phone = !minLength(data.phone, 3);
		tempErrors.idNumber = !isId(data.idNumber);
		tempErrors.country = !minLength(data.country, 3);
		tempErrors.city = !minLength(data.city, 3);
		tempErrors.street = !minLength(data.street, 3);
		tempErrors.zipCode = !izZipCode(data.zipCode, data.zipCode, 3);
		tempErrors.companyName = !minLength(data.companyName, 3);
		tempErrors.moreDetails = !minLength(data.moreDetails, 3);
		// finals
		setErrors({ ...tempErrors });
		return isFormValid(tempErrors);
	};

	const onCreditcardChange = (inputName, value) => {
		onChange(useGenericOnChange(inputName, value));
	};

	useEffect(() => {}, [data]);

	useEffect(() => {}, [errors]);
	useEffect(() => {
		setTempErros();
	}, []);

	const renderStage = () => {
		switch (stage) {
			case 0:
				return (
					<Stage1
						onSetStage={onSetStage}
						data={data}
						onChange={onChange}
						birthDate={birthDate}
						setBirthDate={setBirthDate}
						errors={errors}
					/>
				);
			case 1:
				return (
					<Stage2
						onSetStage={onSetStage}
						data={data}
						onChange={onChange}
						rabiList={rabiList}
						setRabiList={setRabiList}
						onCreditcardChange={onCreditcardChange}
						errors={errors}
						isHasErrors={isHasErrors}
					/>
				);
			case 2:
				return (
					<Stage3
						onSetStage={setFinalData}
						data={data}
						onChange={onChange}
						errors={errors}
					/>
				);
			default:
				return <Stage1 />;
		}
	};

	return <AnimatePresence>{renderStage()}</AnimatePresence>;
};

export default Registration;
