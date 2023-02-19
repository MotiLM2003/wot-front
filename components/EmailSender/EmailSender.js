import React, { useState } from 'react';
import api from '../../apis/userAPI';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Text,
	Input,
	Textarea,
} from '@chakra-ui/react';
import { CloudFog } from 'tabler-icons-react';
const EmailSender = ({ onClose, emailDetails }) => {
	const sendEmail = () => {
		try {
			api.post('/emails/send', {
				title: subject,
				content: content,
				template: 'free-text',
				to: [
					{
						email: emailDetails.email,
						name: `${emailDetails.name} `,
					},
				],
				options: {
					firstName: emailDetails.name,
					lastName: emailDetails.name,
					content: content,
				},
			});
		} catch (error) {
			console.error(error);
		}
	};
	const [subject, setSubject] = useState('testing');
	const [content, setContent] = useState('content');
	return (
		<Modal
			isCentered
			isOpen={true}
			onClose={onClose}
			size='2xl'
			lockScrollOnMount={false}
		>
			<ModalOverlay
				bg='none'
				backdropFilter='auto'
				backdropInvert='0%'
				backdropBlur='4px'
			/>
			<ModalContent>
				<ModalHeader>
					<div className='flex gap-8 justify-center items-center border-b border-b-primary p-1'>
						<Text className='text-primary font-bold text-sm'>
							Send email to {emailDetails.name} - {emailDetails.email}
						</Text>
					</div>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<div className='flex flex-col gap-1'>
						<p className='text-sm font-bold'>Email Subject</p>
						<Input
							placeholder='Email subject'
							value={subject}
							name='subject'
							onChange={(e) => setSubject(e.target.value)}
						/>
						<p className='text-sm font-bold my-1'>Email Content</p>
						<Textarea
							value={content}
							name='content'
							onChange={(e) => {
								setContent(e.target.value);
							}}
						/>
						<Button
							className='mt-3'
							size='sm'
							colorScheme='blue'
							onClick={() => sendEmail()}
						>
							Send Email
						</Button>
					</div>
				</ModalBody>
				<ModalFooter>
					<i class='fa-solid fa-circle-arrow-right'></i>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default EmailSender;
