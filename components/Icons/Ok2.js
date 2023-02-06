import React from "react";

const Ok2 = ({ size = 71, color = "#27CD27", stroke = "#27CD27" }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 71 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 37L32 47L48.6667 27"
        stroke={color}
        stroke-width="7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M35.3333 68.6667C53.7428 68.6667 68.6667 53.7428 68.6667 35.3333C68.6667 16.9238 53.7428 2 35.3333 2C16.9238 2 2 16.9238 2 35.3333C2 53.7428 16.9238 68.6667 35.3333 68.6667Z"
        stroke={stroke}
        stroke-width="4"
      />
    </svg>
  );
};

export default Ok2;
