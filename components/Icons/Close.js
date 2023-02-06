import React, { useState, useEffect } from 'react';

const Close = ({ color = '#999FC0', secondaryColor = 'green' }) => {
  const [currentColor, setCurrentColor] = useState(color);
  return (
    <svg
      onMouseOver={() => {
        setCurrentColor(secondaryColor);
      }}
      onMouseOut={() => {
        setCurrentColor(color);
      }}
      width='14'
      color={color}
      height='14'
      viewBox='0 0 14 14'
      fill={color}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7 0.875C5.38161 0.894525 3.83502 1.5461 2.69056 2.69056C1.5461 3.83502 0.894525 5.38161 0.875 7C0.894525 8.61839 1.5461 10.165 2.69056 11.3094C3.83502 12.4539 5.38161 13.1055 7 13.125C8.61839 13.1055 10.165 12.4539 11.3094 11.3094C12.4539 10.165 13.1055 8.61839 13.125 7C13.1055 5.38161 12.4539 3.83502 11.3094 2.69056C10.165 1.5461 8.61839 0.894525 7 0.875ZM10.5 7.4375H7.4375V10.5H6.5625V7.4375H3.5V6.5625H6.5625V3.5H7.4375V6.5625H10.5V7.4375Z'
        fill={currentColor}
        fill-opacity='1'
      />
    </svg>
  );
};

export default Close;
