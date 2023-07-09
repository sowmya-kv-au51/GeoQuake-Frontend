import axios from "axios";
import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import './App.css';

export default function App() {
  const [geoQuake, setGeoQuake] = useState([]);

  React.useEffect(() => {
    axios.get("https://geoquake-backend.onrender.com/geodata").then((response) => {
      setGeoQuake(response.data)
    });
  }, [])

  return (
    <MapContainer center={[-7.17, 129.62]} zoom={5} id="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {geoQuake.map((geodata, index) => {
        return (
          <Marker
            key={index}
            position={[geodata.latitude,
            geodata.longitude]}
          >
            <Tooltip>{geodata.region} (Magnitude: {geodata.magnitude})</Tooltip>
          </Marker>
        )
      })}
    </MapContainer>
  );
}


