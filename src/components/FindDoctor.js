import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useState } from 'react';

const FindDoctor = () => {
  const height = "400px";
  const zoomLevel = 15;
  const [mapCenter, setMapCenter] = useState([51.5074, 0.1278]); // London coordinates by default

  return (
    <div>
      <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default FindDoctor;
