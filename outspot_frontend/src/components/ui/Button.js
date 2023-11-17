import React from "react";

const Button = ({ disabled, className, type, onClick, children }) => {
  <button
    disabled={disabled}
    className={`btn-custom ${className}
  `}
    type={type ? type : "button"}
    onClick={onClick}
  >
    {children}
  </button>;
};
export default Button;
