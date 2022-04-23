import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Button } from "react-bootstrap";

const GoogleMapsDirections = () => {
  const { origin, destination } = useSelector((state) => state.ride);

  const [response, setResponse] = useState(null);
  const [originMap, setOriginMap] = useState("");
  const [destinationMap, setDestinationMap] = useState("");

  const directionsCallback = (response) => {
    // console.log(response);

    if (response !== null) {
      if (response.status === "OK") {
        setResponse(response);
      }
    }
  };

  const handleClick = () => {
    if (origin.address !== "" && destination.address !== "") {
      setOriginMap(origin.address);
      setDestinationMap(destination.address);
    }
  };

  return (
    <div className="map">
      <Button variant="success" className="mb-5" onClick={handleClick}>
        Build Route
      </Button>

      <div className="map-container">
        <GoogleMap
          // required
          id="direction-example"
          // required
          mapContainerStyle={{
            height: "400px",
            width: "100%",
          }}
          // required
          zoom={7}
          // required
          center={{
            lat: 9.9356284,
            lng: -84.1483647,
          }}
        >
          {origin.address !== "" && destination.address !== "" && (
            <DirectionsService
              // required
              options={{
                origin: originMap,
                destination: destinationMap,
                travelMode: "DRIVING",
              }}
              // required
              callback={directionsCallback}
            />
          )}

          {response !== null && (
            <DirectionsRenderer
              // required
              options={{
                directions: response,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};
export default GoogleMapsDirections;
