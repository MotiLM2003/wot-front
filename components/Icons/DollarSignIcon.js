import React from 'react';

const DollarSignIcon = ({ width = '17', height = '17', fill = '#000' }) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 21 21'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M10.5 13.125C8.89 13.125 8.75 12.3725 8.75 12.25H7C7 13.055 7.5775 14.4812 9.625 14.805V15.75H11.375V14.805C13.125 14.5075 14 13.3787 14 12.25C14 11.27 13.545 9.625 10.5 9.625C8.75 9.625 8.75 9.07375 8.75 8.75C8.75 8.42625 9.3625 7.875 10.5 7.875C11.6375 7.875 11.7162 8.435 11.725 8.75H13.475C13.4632 8.15391 13.2488 7.5796 12.8671 7.12159C12.4854 6.66357 11.9592 6.34912 11.375 6.23V5.25H9.625V6.20375C7.875 6.4925 7 7.62125 7 8.75C7 9.73 7.455 11.375 10.5 11.375C12.25 11.375 12.25 11.97 12.25 12.25C12.25 12.53 11.7075 13.125 10.5 13.125Z'
				fill={fill}
			/>
			<path
				d='M4.375 1.75H1.75V3.5H3.5V18.375C3.5 18.6071 3.59219 18.8296 3.75628 18.9937C3.92038 19.1578 4.14294 19.25 4.375 19.25H16.625C16.8571 19.25 17.0796 19.1578 17.2437 18.9937C17.4078 18.8296 17.5 18.6071 17.5 18.375V3.5H19.25V1.75H4.375ZM15.75 17.5H5.25V3.5H15.75V17.5Z'
				fill={fill}
			/>
		</svg>
	);
};

export default DollarSignIcon;
