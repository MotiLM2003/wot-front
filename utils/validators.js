import { Id } from 'tabler-icons-react';

export const email = (email) => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return email !== '' && emailRegex.test(email);
};

export const minLength = (word, min) => {
	return word.length >= min;
};

export const isMatch = (str1, str2) => {
	return str1.length > 0 && str1 === str2;
};

export const isId = (id) => {
	// need to know and implement the correct format.
	return id.length > 3;
};

export const izZipCode = (zipCode) => {
	// implement the correct format for zip codes.
	return true;
};

export const isFormValid = (data) => {
	const isValid = true;
	for (const prop in data) {
		if (isValid && data[prop]) {
			isValid = false;
		}
	}

	return isValid;
};
