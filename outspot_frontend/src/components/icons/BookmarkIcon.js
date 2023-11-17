import React from 'react';

import './Icon.css';

const BookmarkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="192"
      height="192"
      fill="#8f9a57"
      viewBox="0 0 256 256"
      className="icon"
    >
      <rect width="256" height="256" fill="none"></rect>
      <path
        d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z"
        fill="none"
        stroke="#8f9a57"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
    </svg>
  );
};

export default BookmarkIcon;
