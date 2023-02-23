import React from 'react';

const PlusSignWithBGIcon = ({
	size = 22,
	color = '#F8F8F8',
	stroke = '#27CD27',
}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 22 21'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M11 0C8.22562 0.0334721 5.57431 1.15047 3.61239 3.11239C1.65047 5.07431 0.533472 7.72562 0.5 10.5C0.533472 13.2744 1.65047 15.9257 3.61239 17.8876C5.57431 19.8495 8.22562 20.9665 11 21C13.7744 20.9665 16.4257 19.8495 18.3876 17.8876C20.3495 15.9257 21.4665 13.2744 21.5 10.5C21.4665 7.72562 20.3495 5.07431 18.3876 3.11239C16.4257 1.15047 13.7744 0.0334721 11 0V0ZM17 11.25H11.75V16.5H10.25V11.25H5V9.75H10.25V4.5H11.75V9.75H17V11.25Z'
				fill={color}
			/>
		</svg>
	);
};

export default PlusSignWithBGIcon;
