import { useState } from 'react';

export const useFetch = () => {
  const [fetchState, setFetchState] = useState({
    isLoading: false,
    hasError: null,
    isSuccessful: false
  });

  const handleIsLoading = bool => {
    setFetchState( prev => ({
      ...prev,
      isLoading: bool
    }))
  };

  const handleHasError = error => {
    setFetchState( prev => ({
      ...prev,
      hasError: error
    }));
  };

  const handleIsSuccessful = bool => {
    setFetchState( prev => ({
      ...prev,
      isSuccessful: bool
    }));
  };

  const handleStartFetching = () => {
    setFetchState( () => ({
      isLoading: true,
      hasError: null,
      isSuccessful: false
    }))
  }

  return {
    fetchState,
    handleIsLoading,
    handleHasError,
    handleIsSuccessful,
    handleStartFetching
  };
};
