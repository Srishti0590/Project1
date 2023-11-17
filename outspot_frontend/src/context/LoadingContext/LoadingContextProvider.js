import React, { useCallback, useState } from "react";

import LoadingContext from "./LoadingContext";

const LoadingContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const loadingHandler = useCallback(
    (loadingState) => {
      setIsLoading(loadingState);
    },
    [setIsLoading]
  );

  const loadingContext = {
    isLoading,
    setIsLoading: loadingHandler,
  };

  return (
    <LoadingContext.Provider value={loadingContext}>
      {children}
    </LoadingContext.Provider>
  );
};
export default LoadingContextProvider;
