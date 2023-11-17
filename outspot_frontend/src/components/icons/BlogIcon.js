import React from 'react';

import './Icon.css';

const BlogIcon = () => {
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
      <polygon
        points="128 160 96 160 96 128 192 32 224 64 128 160"
        fill="none"
        stroke="#8f9a57"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></polygon>
      <line
        x1="168"
        y1="56"
        x2="200"
        y2="88"
        fill="none"
        stroke="#8f9a57"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <path
        d="M216,120v88a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h88"
        fill="none"
        stroke="#8f9a57"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
    </svg>
  );
};

export default BlogIcon;
