import { Box, Heading, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const QuillEditor = dynamic(
	() => import('@components/Tests/QuilEditor/QuillEditor'),
	{
		ssr: false,
	}
);
import React from 'react';

const test = () => {
	return (
		<div>
			<QuillEditor />
		</div>
	);
};

export default test;
