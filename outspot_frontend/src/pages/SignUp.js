import React, { useState, useReducer, useContext } from "react";
import Form from "../components/ui/Form";
import ReactDOM from "react-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import signUpImage from "../assets/Images/signup-img.jpg";
import Input from "../components/ui/Input";
import Footer from "../components/ui/Footer";
import Message from "../components/ui/Message";
import Navbar from "../components/ui/Navbar/Navbar";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import LoadingContext from "../context/LoadingContext/LoadingContext";

const initialEmailState = {
  value: "",
  isValid: false,
};

const initialPasswordState = {
  value: "",
  isValid: false,
};

// To check the loadingSpinner:

const simulateLoading = (sec) => {
  return new Promise((resolve, _) => {
    setTimeout(resolve, sec * 1000);
  });
};
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().includes("@") };
  }
  if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: state.value.trim().includes("@") };
  }
  return initialEmailState;
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim() > 6 };
  }
  if (action.type === "USER_BLUR") {
    return { value: state.val, isValid: state.val.trim() > 6 };
  }
  return initialPasswordState;
};

const SignUp = () => {
  const LoadingCtx = useContext(LoadingContext);
  const navigate = useNavigate();

  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    initialEmailState
  );
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialPasswordState
  );
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredDob, setEnteredDob] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [entredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [userExistsError, setUserExistsError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [phoneLengthError, setPhoneLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const firstNameChangeHandler = (e) => {
    setEnteredFirstName(e.target.value);
  };
  const lastNameChangeHandler = (e) => {
    setEnteredLastName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    dispatchEmail({ type: "USER_INPUT", val: e.target.value });
  };
  const phoneNumberChangeHandler = (e) => {
    setEnteredPhone(e.target.value);
  };
  const dobChangeHandler = (e) => {
    setEnteredDob(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    dispatchPassword({ type: "USER_INPUT", val: e.target.value });
  };
  const confirmPasswordChangeHandler = (e) => {
    setEnteredConfirmPassword(e.target.value);
  };

  const resetError = () => {
    setFirstNameError(false);
    setLastNameError(false);
    setDobError(false);
    setPhoneLengthError(false);
    setConfirmPasswordError(false);
    setEmailError(false);
  };

  const resetValue = () => {
    setEnteredFirstName("");
    setEnteredLastName("");
    setEnteredDob("");
    setEnteredPhone("");
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    resetError();
    if (enteredFirstName.length === 0) {
      setFirstNameError(true);
      return;
    }

    if (enteredLastName.length === 0) {
      setLastNameError(true);
      return;
    }

    if (emailState.value.length === 0) {
      setEmailError(true);
      return;
    }
    if (enteredDob.length === 0) {
      setDobError(true);
      return;
    }
    if (enteredPhone.length !== 10) {
      setPhoneLengthError(true);
      return;
    }

    if (entredConfirmPassword !== passwordState.value) {
      setConfirmPasswordError(true);
      return;
    }

    const data = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: emailState.value,
      dob: new Date(enteredDob).toISOString(),
      password: passwordState.value,
      phoneNo: enteredPhone,
    };
    try {
      LoadingCtx.setIsLoading(true);

      await simulateLoading(2);

      await axios.post("http://localhost:90/users/register", data);
      LoadingCtx.setIsLoading(false);
      navigate("/login");
      resetValue();
    } catch (err) {
      console.log(err);
      if (err.response.data.message) {
        setUserExistsError(true);
        LoadingCtx.setIsLoading(false);
      }
    }
  };

  const removeErrorMessageHandler = () => {
    setUserExistsError(false);
  };

  return (
    <>
      {LoadingCtx.isLoading && <LoadingSpinner />}
      {ReactDOM.createPortal(
        <Message
          containerName={"success-message-container"}
          state="error"
          className={userExistsError && "reveal"}
          message="User already exists"
          onClick={removeErrorMessageHandler}
        />,
        document.getElementById("message-root")
      )}
      <Navbar />
      <Form
        onSubmit={formSubmitHandler}
        img={signUpImage}
        heading={"Create Your account"}
        alt="Sign Up Image"
      >
        <Input
          id="firstName"
          type="text"
          placeholder="Enter FirstName"
          label="First Name"
          onChanged={firstNameChangeHandler}
        />
        {firstNameError ? (
          <p className="error-message">*First name can not be empty.</p>
        ) : (
          ""
        )}
        <Input
          id="lastName"
          type="text"
          placeholder="Enter lastName"
          label="Last Name"
          onChanged={lastNameChangeHandler}
        />
        {lastNameError && (
          <p className="error-message">*Last name cannot be empty</p>
        )}
        <Input
          isValid={emailState.isValid}
          id="email"
          type="email"
          placeholder="name@example.com"
          label="Email"
          onChanged={emailChangeHandler}
        />
        {emailError && <p className="error-message">*Enter email address</p>}
        <Input
          id="dob"
          type="date"
          placeholder="2000-01-01"
          label="Date of Birth"
          onChanged={dobChangeHandler}
        />
        {dobError && (
          <p className="error-message">Please enter date of birth</p>
        )}
        <Input
          id="phone"
          type="text"
          placeholder="98*********"
          label="Phone Number"
          onChanged={phoneNumberChangeHandler}
        />
        {phoneLengthError && (
          <p className="error-message">Phone number length must be ten.</p>
        )}
        <Input
          isValid={passwordState.isValid}
          id="password"
          type="password"
          placeholder="●●●●●●"
          label="Password"
          onChanged={passwordChangeHandler}
        />
        <Input
          id="confirmPassword"
          type="password"
          placeholder="●●●●●●"
          label="Confirm Password"
          onChanged={confirmPasswordChangeHandler}
        />
        {confirmPasswordError && (
          <p className="error-message">
            {" "}
            Password and confirm password should match
          </p>
        )}

        <button className=" btn-custom btn--signup" type="submit">
          SignUp
        </button>
      </Form>
      <Footer />
    </>
  );
};

export default SignUp;
