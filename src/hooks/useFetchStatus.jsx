import { useState } from 'react';

export const useFetchStatus = () => {
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    hasError: null,
    isSuccessful: false
  });

  const handleIsLoading = bool => {
    setFetchStatus( prev => ({
      ...prev,
      isLoading: bool
    }))
  };

  const handleHasError = error => {
    setFetchStatus( prev => ({
      ...prev,
      hasError: error
    }));
  };

  const handleIsSuccessful = bool => {
    setFetchStatus( prev => ({
      ...prev,
      isSuccessful: bool
    }));
  };

  const handleStartFetching = () => {
    setFetchStatus( () => ({
      isLoading: true,
      hasError: null,
      isSuccessful: false
    }))
  }

  return {
    fetchStatus,
    handleIsLoading,
    handleHasError,
    handleIsSuccessful,
    handleStartFetching
  };
};
