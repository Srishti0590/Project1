import React from "react";

const LoginContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: (email, password) => {},
  logOutHandler: () => {},
  setInvalidCredentials: (invalidState) => {},
  inValidCredentials: false,
});

export default LoginContext;
