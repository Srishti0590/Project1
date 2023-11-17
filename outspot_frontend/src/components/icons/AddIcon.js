import React from 'react';

import './Icon.css';

const AddIcon = () => {
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
      <circle
        cx="128"
        cy="128"
        r="96"
        fill="none"
        stroke="#8f9a57"
        strokeMiterlimit="10"
        strokeWidth="16"
      ></circle>
      <line
        x1="88"
        y1="128"
        x2="168"
        y2="128"
        fill="none"
        stroke="#8f9a57"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <line
        x1="128"
        y1="88"
        x2="128"
        y2="168"
        fill="none"
        stroke="#8f9a57"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
    </svg>
  );
};

export default AddIcon;
