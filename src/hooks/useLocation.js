import { useState, useEffect } from "react";

const useLocation = () => {
  const [location, setLocation] = useState({});
  const [locationError, setLocationError] = useState(null);

  const onSuccess = (location) => {
    setLocation({
      lat: location.coords.latitude.toString(),
      lng: location.coords.longitude.toString(),
    });
  };

  const onError = (error) => {
    setLocationError(error.message);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      setLocationError("Geolocation is not supported");
    }
  }, []);

  return { location, locationError };
};

export default useLocation;
