import { useState, useEffect } from 'react';

const useLocation = () => {
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);

  const onSuccess = (location) => {
    setLocation({
      lat: location.coords.latitude.toString(),
      lng: location.coords.longitude.toString(),
    });
  };

  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      setError("Geolocation is not supported");
    }
  }, []);

  return { location, error };
};

export default useLocation;
