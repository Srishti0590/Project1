import React, { useCallback, useEffect, useState, useContext } from "react";

import { MapContainer, Popup, TileLayer, Marker } from "react-leaflet";

import axios from "axios";

import Navbar from "../components/ui/Navbar/Navbar";
import Footer from "../components/ui/Footer";

import SpotSection from "./SpotSection/SpotSection";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import LoadingContext from "../context/LoadingContext/LoadingContext";

const AllSpotPage = () => {
  const { setIsLoading, isLoading } = useContext(LoadingContext);

  const [coordsData, setCoordsData] = useState([]);
  const [spotData, setSpotData] = useState([]);

  const getCoordsData = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:90/spots/all/coords");
      console.log(res.data.allCoords);

      return res.data.allCoords;
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  const getAllSpots = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:90/spots/all");
      return res.data.data;
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  useEffect(() => {
    const getAllData = async () => {
      setIsLoading(true);

      const res = await Promise.all([getAllSpots(), getCoordsData()]);

      setSpotData(res[0]);
      setCoordsData(res[1]);
      setIsLoading(false);
    };

    getAllData();
  }, [setIsLoading, getCoordsData, getAllSpots]);

  return coordsData.length === 0 || spotData.length === 0 ? (
    isLoading && <LoadingSpinner />
  ) : (
    <React.Fragment>
      <Navbar />
      {coordsData.length === 0 ? (
        ""
      ) : (
        <MapContainer
          id="map"
          center={[+coordsData[0].latitude, +coordsData[0].longitude]}
          zoom={8}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />

          {coordsData.map((coords, i) => {
            return (
              <Marker
                key={i}
                riseOnHover={true}
                position={[+coords.latitude, +coords.longitude]}
              >
                <Popup>
                  <p className={"popup-para"}>{coords.name}.</p>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}
      {spotData.length === 0 ? (
        ""
      ) : (
        <SpotSection
          headingStyle={"heading-style"}
          sectionHeading={"All Locations"}
          spotData={spotData}
        />
      )}
      <Footer />
    </React.Fragment>
  );
};

export default AllSpotPage;
