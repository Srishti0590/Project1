import React, { useReducer, useState, useContext } from "react";
import ReactDOM from "react-dom";

import axios from "axios";

import Navbar from "../components/ui/Navbar/Navbar";
import Form from "../components/ui/Form";
import Input from "../components/ui/Input";
import Footer from "../components/ui/Footer";
import Message from "../components/ui/Message";
import LoadingContext from "../context/LoadingContext/LoadingContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Select from "../components/ui/Select";

import addLocationImg from "../assets/Images/add-location-img.jpg";

const initialCoordsState = {
  latValue: "",
  lngValue: "",
  isLatValueValid: false,
  isLngValueValid: false,
};

const initialSpotState = {
  value: "",
  isValid: false,
};

const initialSpotPhoneState = {
  value: "",
  isValid: false,
  isLengthValid: false,
};

const initialSpotEmailState = {
  value: "",
  isValid: false,
};

const coordsReducer = (state, action) => {
  if (action.type === "USER_INPUT" && action.latVal) {
    return {
      latValue: action.latVal,
      lngValue: state.lngValue,
      isLatValueValid: action.latVal.length !== 0,
      isLngValueValid: state.isLngValueValid,
    };
  }

  if (action.type === "USER_INPUT" && action.lngVal) {
    return {
      latValue: state.latValue,
      lngValue: action.lngVal,
      isLatValueValid: state.isLatValueValid,
      isLngValueValid: action.lngVal.length !== 0,
    };
  }
  return initialCoordsState;
};
const spotReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length !== 0 };
  }
  return initialSpotState;
};

const spotPhoneReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.trim().length !== 0,
      isLengthValid: action.value.trim().length === 10,
    };
  }

  return initialSpotPhoneState;
};
const spotEmailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length !== 0 };
  }
};

const AddLocationPage = () => {
  const loadingCtx = useContext(LoadingContext);

  const [coordsState, dispatchCoords] = useReducer(
    coordsReducer,
    initialCoordsState
  );

  const [spotNameState, dispatchSpotName] = useReducer(
    spotReducer,
    initialSpotState
  );
  const [spotAddressState, dispatchSpotAddress] = useReducer(
    spotReducer,
    initialSpotState
  );
  const [spotNoState, dispatchSpotNo] = useReducer(
    spotReducer,
    initialSpotState
  );
  const [spotTypeState, dispatchSpotType] = useReducer(
    spotReducer,
    initialSpotState
  );
  const [spotPhoneState, dispatchSpotPhone] = useReducer(
    spotPhoneReducer,
    initialSpotPhoneState
  );
  const [spotEmailState, dispatchSpotEmail] = useReducer(
    spotEmailReducer,
    initialSpotEmailState
  );
  const [spotPriceState, dispatchSpotPrice] = useReducer(
    spotReducer,
    initialSpotState
  );
  const [spotDescriptionState, dispatchSpotDescription] = useReducer(
    spotReducer,
    initialSpotState
  );

  const [spotNameError, setSpotNameError] = useState(false);
  const [spotAddressError, setSpotAddressError] = useState(false);
  const [spotNoError, setSpotNoError] = useState(false);
  const [spotTypeError, setSpotTypeError] = useState(false);
  const [spotLatitudeError, setSpotLatitudeError] = useState(false);
  const [spotLongitudeError, setSpotLongitudeError] = useState(false);
  const [spotEmailError, setSpotEmailError] = useState(false);
  const [spotPriceError, setSpotPriceError] = useState(false);
  const [spotDescriptionError, setSpotDescriptionError] = useState(false);
  const [spotPhoneError, setSpotPhoneError] = useState(false);

  const [uploadedImage, setUploadedImage] = useState();

  const [isSpotCreated, setIsSpotCreated] = useState(false);
  const [spotCreateError, setSpotCreateError] = useState(false);

  const spotNameChangeHandler = (e) => {
    dispatchSpotName({ type: "USER_INPUT", value: e.target.value });
  };
  const spotAddressChangeHandler = (e) => {
    dispatchSpotAddress({ type: "USER_INPUT", value: e.target.value });
  };
  const spotNoChangeHandler = (e) => {
    dispatchSpotNo({ type: "USER_INPUT", value: e.target.value });
  };

  const latitudeChangeHandler = (e) => {
    console.log(e.target.value);
    dispatchCoords({ type: "USER_INPUT", latVal: e.target.value });
  };
  const longitudeChangeHandler = (e) => {
    dispatchCoords({ type: "USER_INPUT", lngVal: e.target.value });
  };

  const spotPhoneChangeHandler = (e) => {
    dispatchSpotPhone({ type: "USER_INPUT", value: e.target.value });
  };
  const spotEmailChangeHandler = (e) => {
    dispatchSpotEmail({ type: "USER_INPUT", value: e.target.value });
  };
  const spotPriceChangeHandler = (e) => {
    dispatchSpotPrice({ type: "USER_INPUT", value: e.target.value });
  };
  const spotDescriptionChangeHandler = (e) => {
    dispatchSpotDescription({ type: "USER_INPUT", value: e.target.value });
  };

  const spotTypeChangeHandler = (e) => {
    dispatchSpotType({ type: "USER_INPUT", value: e.target.value });
  };

  const imageUploadHandler = (e) => {
    setUploadedImage(e.target.files[0]);
  };

  const resetError = () => {
    setSpotNameError(false);
    setSpotAddressError(false);
    setSpotEmailError(false);
    setSpotLatitudeError(false);
    setSpotLongitudeError(false);
    setSpotPriceError(false);
    setSpotTypeError(false);
    setSpotNoError(false);
    setSpotDescriptionError(false);
    setSpotPhoneError(false);
  };

  const addLocationFormSubmitHandler = async (e) => {
    e.preventDefault();

    resetError();

    console.log(spotPhoneState.value);

    if (!spotNameState.isValid) {
      setSpotNameError(true);
      return;
    }

    if (!spotAddressState.isValid) {
      setSpotAddressError(true);
      return;
    }

    if (!spotNoState.isValid) {
      setSpotNoError(true);
      return;
    }

    if (!spotTypeState.isValid) {
      setSpotTypeError(true);
      return;
    }

    if (!coordsState.isLatValueValid) {
      setSpotLatitudeError(true);
      return;
    }

    if (!coordsState.isLngValueValid) {
      setSpotLongitudeError(true);
      return;
    }

    if (!spotPhoneState.isValid) {
      setSpotPhoneError(true);
      return;
    }

    if (!spotEmailState.isValid) {
      setSpotEmailError(true);
      return;
    }

    if (!spotPriceState.isValid) {
      setSpotPriceError(true);
      return;
    }

    if (!spotDescriptionState.isValid) {
      setSpotDescriptionError(true);
      return;
    }

    const data = new FormData();

    data.append("name", spotNameState.value);
    data.append("address", spotAddressState.value);
    data.append("availableSpotNo", +spotNoState.value);
    data.append("type", spotTypeState.value);
    data.append("latitude", coordsState.latValue);
    data.append("longitude", coordsState.lngValue);
    data.append("phoneNo", spotPhoneState.value);
    data.append("email", spotEmailState.value);
    data.append("price", +spotPriceState.value);
    data.append("description", spotDescriptionState.value);
    data.append("img", uploadedImage);

    try {
      loadingCtx.setIsLoading(true);

      const res = await axios.post("http://localhost:90/spots/add", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setIsSpotCreated(true);
      loadingCtx.setIsLoading(false);
      setSpotCreateError(false);
      console.log(res);
    } catch (err) {
      if (err.response.data.message) {
        loadingCtx.setIsLoading(false);
        setSpotCreateError(true);
      }
    }
  };

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (e) => {
          dispatchCoords({ type: "USER_INPUT", lngVal: e.coords.longitude });
          dispatchCoords({ type: "USER_INPUT", latVal: e.coords.latitude });
        },
        () => {
          alert("Could not get your position!");
        }
      );
    }
  };

  const removeMessageHandler = () => {
    setIsSpotCreated(false);
    setSpotCreateError(false);
  };

  return (
    <React.Fragment>
      {loadingCtx.isLoading && <LoadingSpinner />}
      {ReactDOM.createPortal(
        <Message
          state={`${
            spotCreateError ? "error" : isSpotCreated ? "success" : ""
          }`}
          className={isSpotCreated || spotCreateError ? "reveal" : ""}
          message={
            spotCreateError
              ? "Spot name already exists!"
              : isSpotCreated
              ? "Spot created successfully!"
              : ""
          }
          onClick={removeMessageHandler}
          containerName={
            spotCreateError
              ? "error-message-container"
              : isSpotCreated
              ? "success-message-container"
              : ""
          }
        />,
        document.getElementById("message-root")
      )}
      <Navbar />
      <Form
        onSubmit={addLocationFormSubmitHandler}
        img={addLocationImg}
        heading={"Add spot details"}
        className={"add-location-container"}
      >
        <Input
          id="spotName"
          type="text"
          placeholder="Enter full name of the spot"
          label="Spot name"
          onChanged={spotNameChangeHandler}
        />
        {spotNameError ? (
          <p className="error-message">*Spot name can not be empty.</p>
        ) : (
          ""
        )}
        <Input
          id="spotAddress"
          type="text"
          placeholder="Enter full address of the spot"
          label="Spot address"
          onChanged={spotAddressChangeHandler}
        />
        {spotAddressError ? (
          <p className="error-message">*Spot address can not be empty.</p>
        ) : (
          ""
        )}
        <Input
          id="spotNoAvailable"
          type="number"
          placeholder="Enter no of spot available"
          label="Available spot no"
          onChanged={spotNoChangeHandler}
        />
        {spotNoError ? (
          <p className="error-message">*Spot number can not be empty.</p>
        ) : (
          ""
        )}
        <Select
          onChanged={spotTypeChangeHandler}
          id="spotType"
          label="Select spot type"
        />
        {spotTypeError ? (
          <p className="error-message">*Type must be selected.</p>
        ) : (
          ""
        )}
        <div className={"coords-container"}>
          <label htmlFor="latitude">Spot coordinates</label>
          <div className={"inputs-container"}>
            <input
              type="number"
              id="latitude"
              placeholder="Lat value"
              onChange={latitudeChangeHandler}
              value={coordsState.latValue}
            />

            <input
              type="number"
              id="longitude"
              placeholder="Lng value"
              onChange={longitudeChangeHandler}
              value={coordsState.lngValue}
            />

            <button
              onClick={getCurrentPosition}
              className={"btn-coords bnt-custom"}
            >
              Get current location
            </button>
          </div>
        </div>
        {spotLatitudeError || spotLongitudeError ? (
          <p className="error-message">
            *Latitude and Longitude value are required.
          </p>
        ) : (
          ""
        )}

        <Input
          id="spotPhone"
          type="text"
          placeholder="Enter spot phone number"
          label="Spot phone"
          onChanged={spotPhoneChangeHandler}
        />
        {spotPhoneError ? (
          <p className="error-message">*Phone number can not be empty.</p>
        ) : (
          ""
        )}
        <Input
          id="spotEmail"
          type="email"
          placeholder="Enter spot email address"
          label="Spot email"
          onChanged={spotEmailChangeHandler}
        />
        {spotEmailError ? (
          <p className="error-message">*Email can not be empty.</p>
        ) : (
          ""
        )}
        <Input
          id="spotPrice"
          type="number"
          placeholder="Enter spot price"
          label="Spot price"
          min="1"
          step="1"
          onChanged={spotPriceChangeHandler}
        />
        {spotPriceError ? (
          <p className="error-message">*Spot price can not be empty.</p>
        ) : (
          ""
        )}
        <div className={"description-container"}>
          <label htmlFor="description">Spot description</label>
          <textarea
            id="description"
            placeholder="Enter brief description of the spot"
            onChange={spotDescriptionChangeHandler}
          ></textarea>
        </div>
        {spotDescriptionError ? (
          <p className="error-message">*Spot description can not be empty.</p>
        ) : (
          ""
        )}
        <Input
          id="spotImg"
          type="file"
          label="Add spot image"
          onChanged={imageUploadHandler}
        />
        <button className={`${"btn--add-spot btn-custom"}`} type="submit">
          Add spot
        </button>
      </Form>
      <Footer />
    </React.Fragment>
  );
};

export default AddLocationPage;
