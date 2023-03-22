import { useState } from 'react';

export const useFetch = () => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: null,
    isSuccessful: false
  });

  const handleIsLoading = bool => {
    setState( prev => ({
      ...prev,
      isLoading: bool
    }))
  };

  const handleHasError = error => {
    setState( prev => ({
      ...prev,
      hasError: error
    }));
  };

  const handleIsSuccessful = bool => {
    setState( prev => ({
      ...prev,
      isSuccessful: bool
    }));
  };

  return {
    state,
    handleIsLoading,
    handleHasError,
    handleIsSuccessful
  };
};
