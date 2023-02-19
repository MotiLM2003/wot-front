import React from 'react';

const Email = ({ width = '17', height = '17', fill = '#000' }) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 20 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M18 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H18C18.5523 15 19 14.5523 19 14V2C19 1.44772 18.5523 1 18 1Z'
				stroke={fill}
				stroke-width='2'
				stroke-linecap='round'
			/>
			<path
				d='M1 2.5L10 8L19 2.5'
				stroke={fill}
				stroke-width='2'
				stroke-linecap='round'
			/>
		</svg>
	);
};

export default Email;
