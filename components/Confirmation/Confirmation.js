import React from 'react';
import Image from 'next/image';

import cross from '../../images/icons/cross.svg';
const Confirmation = ({
	title = ' no title',
	children,
	visible = false,
	close,
}) => {
	return (
		<div
			className={`w-[100px] ${
				visible ? 'block' : 'hidden'
			} overflow-hidden transition duration-150`}
		>
			<div className='conf-background'></div>
			<div className='conf-container rounded transition-all duration-150 w-[100px]'>
				<div className='flex justify-between'>
					<h3 className='w-full'>{title}</h3>
					<Image
						src={cross}
						width='25px'
						height='25px'
						className='cursor-pointer'
						onClick={close}
						layout='fixed'
					/>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Confirmation;
