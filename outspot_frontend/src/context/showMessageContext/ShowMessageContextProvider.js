import React, { useState } from "react";
import ShowMessageContext from "./show-message-context";
const ShowMessageContextProvider = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const handleMessageState = (state, message) => {
    setShowMessage(state);
    setMessage(message);
  };

  const showMessageContext = {
    setShowMessage: handleMessageState,
    showMessage,
    message,
  };

  return (
    <ShowMessageContext.Provider value={showMessageContext}>
      {props.children}
    </ShowMessageContext.Provider>
  );
};

export default ShowMessageContextProvider;
