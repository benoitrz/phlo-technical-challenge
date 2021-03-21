import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Popup,
  useMap,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import useLocation from '../hooks/useLocation';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultMarker = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

// Classes used by Leaflet to position controls.
const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

const MapCustomControl = (props) => {
  const { position, containerProps, children } = props;
  return (
    <div className={POSITION_CLASSES[position]}>
      <div className="leaflet-control" {...containerProps}>
        {children}
      </div>
    </div>
  );
};

// need to set map center from child component as mapContainer props are immutable (only for initialization)
const ChangeMapView = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords, map]);
  return null;
};

const FindDoctor = () => {
  const height = "400px";
  const zoomLevel = 15;
  const [mapCenter, setMapCenter] = useState([51.5074, 0.1278]); // London coordinates by default
  const { location, error } = useLocation();

  useEffect(() => {
    if (location.lat) {
      setMapCenter([location.lat, location.lng]);
    }
  }, [location]);

  return (
    <div>
      <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location.lat && (
          <Marker icon={defaultMarker} position={[location.lat, location.lng]}>
            <Tooltip>This is your current location.</Tooltip>
            <Popup>This is your current location.</Popup>
          </Marker>
        )}
        <MapCustomControl position="bottomleft">
          {error && <h2>Couldn't retrieve your location...</h2>}
        </MapCustomControl>
        <ChangeMapView coords={mapCenter} />
      </MapContainer>
    </div>
  );
};

export default FindDoctor;
