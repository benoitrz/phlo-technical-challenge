import { useEffect, useState } from 'react';
import axios from 'axios';

const useGooglePlacesApi = (lat, lng) => {
  // this is set on the client, we can imagine a different client (eg. mobile) using a different value
  const radius = "2000"; // in meters
  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [locationsError, setLocationsError] = useState(false);

  useEffect(() => {
    if (lat && lng) {
      setLoadingLocations(true);
      axios
        .get(`/doctors?lat=${lat}&lng=${lng}&radius=${radius}`)
        .then((res) => {
          setLocations(res.data.results);
          setLoadingLocations(false);
        })
        .catch(() => {
          setLocationsError(true);
          setLoadingLocations(false);
        });
    }
  }, [lat, lng]);

  return { locations, loadingLocations, locationsError };
};

export default useGooglePlacesApi;
