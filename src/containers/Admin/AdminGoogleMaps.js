import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";

import GoBack from "../../components/GoBack";
import LocationSearchInput from "../../components/LocationSearchInput";
// import GoogleMapsDirections from "../../components/GoogleMapsDirections";

function AdminGoogleMaps() {
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { origin, destination } = useSelector((state) => state.ride);
  const { distanceLatLng, isEmptyObject } = useSelector(
    (state) => state.global
  );

  useEffect(() => {
    if (isLoggedIn && currentUser.adminId) {
      // dispatch(admin_sendTestEmail(currentUser));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cityOrigin = useRef("");
  const provinceOrigin = useRef("");
  const cityDestination = useRef("");
  const provinceDestination = useRef("");

  useEffect(() => {
    if (!isEmptyObject(origin.result)) {
      cityOrigin.current = origin.result.address_components.find((address) =>
        address.types.find(
          (type) => type === "neighborhood" || type === "locality"
        )
      );
      provinceOrigin.current = origin.result.address_components.find(
        (address) =>
          address.types.find((type) => type === "administrative_area_level_1")
      );
    }

    if (!isEmptyObject(destination.result)) {
      cityDestination.current = destination.result.address_components.find(
        (address) =>
          address.types.find(
            (type) => type === "neighborhood" || type === "locality"
          )
      );
      provinceDestination.current = destination.result.address_components.find(
        (address) =>
          address.types.find((type) => type === "administrative_area_level_1")
      );
    }
  }, [origin, destination, isEmptyObject]);

  // Handle redirection in case the user is already logged in
  if (!isLoggedIn || !currentUser.adminId) {
    return <Redirect to="/page-404" />;
  }

  return (
    <div>
      <GoBack />

      <Container className="py-5">
        <Row>
          <Col>
            <div className="text-center mb-5">
              <LocationSearchInput location="origin" />
            </div>
            {!isEmptyObject(origin.result) ? (
              <div className="border rounded p-2">
                <p>City: {cityOrigin.current.long_name}</p>
                <p>
                  Province:{" "}
                  {
                    provinceOrigin.current.long_name
                    // .replace(" Province", "")
                    // .replace("Provincia de ", "")
                  }
                </p>
                <p>
                  LatLng: {origin.latLng.lat}, {origin.latLng.lng}
                </p>
              </div>
            ) : null}
          </Col>
          <Col>
            <div className="text-center mb-5">
              <LocationSearchInput location="destination" />
            </div>
            {!isEmptyObject(destination.result) ? (
              <div className="border rounded p-2">
                <p>City: {cityDestination.current.long_name}</p>
                <p>
                  Province:{" "}
                  {
                    provinceDestination.current.long_name
                    // .replace(" Province", "")
                    // .replace("Provincia de ", "")
                  }
                </p>
                <p>
                  LatLng: {destination.latLng.lat}, {destination.latLng.lng}
                </p>
              </div>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              Distance:{" "}
              {distanceLatLng(origin.latLng, destination.latLng).toFixed(2)} km
            </p>
          </Col>
        </Row>

        <Row>
          <Col>{/* <GoogleMapsDirections /> */}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminGoogleMaps;
