import React, { useContext, useReducer, useState } from "react";
import ReactDOM from "react-dom";
import Form from "../components/ui/Form";
import Input from "../components/ui/Input";
import LoginImg from "../assets/Images/login-img.jpg";
import LoginContext from "../context/LoginContext/LoginContext";
import Message from "../components/ui/Message";
import Navbar from "../components/ui/Navbar/Navbar";
const initialEmailState = {
  value: "",
  isValid: false,
};

const initialPasswordState = {
  value: "",
  isValid: false,
};

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().includes("@") };
  }
  return initialPasswordState;
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim() > 6 };
  }
  return initialPasswordState;
};
const Login = () => {
  const LoginCtx = useContext(LoginContext);
  console.log(LoginCtx);
  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    initialEmailState
  );

  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialPasswordState
  );
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const emailChangeHandler = (e) => {
    dispatchEmail({ type: "USER_INPUT", val: e.target.value });
  };
  const passwordChangeHandler = (e) => {
    dispatchPassword({ type: "USER_INPUT", val: e.target.value });
  };
  const resetError = () => {
    setEmailError(false);
    setPasswordError(false);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    resetError();
    console.log(emailState.value, passwordState.value);
    if (!emailState.isValid && emailState.value.length === 0) {
      setEmailError(true);
      return;
    }
    if (!passwordState.isValid && passwordState.value.length === 0) {
      setPasswordError(true);
      return;
    }
    LoginCtx.setIsLoggedIn(emailState.value, passwordState.value);
  };

  const removeErrorMessageHandler = () => {
    LoginCtx.setInvalidCredentials(false);
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Message
          state="error"
          containerName="error-message-container"
          className={LoginCtx.inValidCredentials && "reveal"}
          message="Invalid Credentials"
          onClick={removeErrorMessageHandler}
        />,
        document.getElementById("message-root")
      )}
      <Navbar />
      <Form
        img={LoginImg}
        heading="Login to your account"
        onSubmit={onSubmitHandler}
      >
        <Input
          isValid={emailState.isValid}
          type="email"
          id="email"
          placeholder="Enter your email"
          label="Email address"
          onChanged={emailChangeHandler}
        />
        {emailError && <p className="error-message">Email cannot be empty </p>}
        <Input
          isValid={passwordState.isValid}
          type="password"
          id="password"
          placeholder="Enter your email"
          label="Password"
          onChanged={passwordChangeHandler}
        />
        {passwordError && (
          <p className="error-message">Password cannot be empty</p>
        )}
        <button className="btn-custom btn-login">Login</button>
      </Form>
    </>
  );
};
export default Login;
