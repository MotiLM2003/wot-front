import React from 'react';

const VwithGreenCircle = ({ size = '20', color = '#29DC26' }) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 22 22'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M6.79932 11.15L9.69932 14.05L14.5327 8.25'
				stroke={color}
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path
				d='M10.6667 20.3333C16.0054 20.3333 20.3333 16.0054 20.3333 10.6667C20.3333 5.32791 16.0054 1 10.6667 1C5.32791 1 1 5.32791 1 10.6667C1 16.0054 5.32791 20.3333 10.6667 20.3333Z'
				stroke={color}
				stroke-width='1.5'
			/>
		</svg>
	);
};

export default VwithGreenCircle;
