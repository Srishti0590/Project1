import React from "react";

const ShowMessageContext = React.createContext({
  showMessage: false,
  message: "",
  setShowMessage: (state, message) => {},
});

export default ShowMessageContext;
