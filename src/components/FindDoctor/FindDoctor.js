import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import useLocation from "../../hooks/useLocation";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import customIcon from "./../../images/doctor-icon.png";
import usePlacesApi from "../../hooks/usePlacesApi";
import DoctorPopupTemplate from "./DoctorPopupTemplate";
import Modal from "./Modal";

const defaultMarker = L.icon({ iconUrl: icon });

const doctorIcon = L.icon({
  iconUrl: customIcon,
  iconRetinaUrl: customIcon,
  iconSize: [30, 30],
});

// could be made more generic to handle all posible positions
const MapCustomControl = (props) => {
  return (
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control">{props.children}</div>
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
  const height = "75vh";
  const zoomLevel = 13;
  const [mapCenter, setMapCenter] = useState([51.5074, 0.1278]); // London coordinates by default
  const [activeMarker, setActiveMarker] = useState(null);
  const { location, locationError } = useLocation();
  const { locations, loadingLocations, locationsError } = usePlacesApi(
    location.lat,
    location.lng
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (location.lat && location.lng) {
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
        {locations &&
          locations.map((location) => (
            <Marker
              key={location.place_id}
              icon={doctorIcon}
              position={[
                location.geometry.location.lat,
                location.geometry.location.lng,
              ]}
              // onClick doesn't work anymore in react-leaflet v3
              eventHandlers={{
                click: () => {
                  setActiveMarker(location);
                },
              }}
            >
              <Tooltip>{location.name}</Tooltip>
            </Marker>
          ))}
        {activeMarker && (
          <Popup
            position={[
              activeMarker.geometry.location.lat,
              activeMarker.geometry.location.lng,
            ]}
            onClose={() => {
              setActiveMarker(null);
            }}
          >
            <DoctorPopupTemplate
              place={activeMarker}
              onButtonClick={() => setShowModal(true)}
            ></DoctorPopupTemplate>
          </Popup>
        )}
        <MapCustomControl>
          {locationError && <h2>Couldn't retrieve your location...</h2>}
          {loadingLocations && <h2>Searching for nearby doctors ...</h2>}
          {locationsError && (
            <h2>Couldn't find any nearby doctors, sorry ...</h2>
          )}
        </MapCustomControl>
        <ChangeMapView coords={mapCenter} />
      </MapContainer>
      {showModal && (
        <Modal
          show={showModal}
          doctor={activeMarker}
          onClose={() => setShowModal(false)}
        ></Modal>
      )}
    </div>
  );
};

export default FindDoctor;
