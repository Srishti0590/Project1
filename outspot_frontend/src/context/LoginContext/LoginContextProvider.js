import React, { useState, useEffect } from "react";

import axios from "axios";
import LoginContext from "./LoginContext";
import { useNavigate } from "react-router-dom";

const LoginContextProvider = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inValidCredentials, setInvalidCredentials] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:90/users/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        setIsLoggedIn(true);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("username", response.data.userName);
        navigate("/home");
      }
    } catch (err) {
      setInvalidCredentials(true);
      console.log(err);
    }
  };

  const logOutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
  };
  const loginContext = {
    isLoggedIn,
    inValidCredentials,
    setInvalidCredentials,
    setIsLoggedIn: loginHandler,
    logOutHandler,
  };
  return (
    <LoginContext.Provider value={loginContext}>
      {props.children}
    </LoginContext.Provider>
  );
};
export default LoginContextProvider;
