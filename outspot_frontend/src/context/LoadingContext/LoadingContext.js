import React from "react";

const LoadingContext = React.createContext({
  isLoading: false,
  setIsLoading: (loadingState) => {},
});
export default LoadingContext;
