import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";
import GoBack from "../../components/GoBack";
import LocationSearchInput from "../../components/LocationSearchInput";

function AdminGoogleMaps() {
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { result, LatLng } = useSelector((state) => state.ride);
  const { distanceLatLng, isEmptyObject } = useSelector(
    (state) => state.global
  );

  const distance = useRef(0);

  useEffect(() => {
    if (isLoggedIn && currentUser.adminId) {
      // dispatch(admin_sendTestEmail(currentUser));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    distance.current = distanceLatLng(
      { lat: 9.248746, lng: -83.789015 },
      LatLng
    );
  }, [LatLng, distanceLatLng]);

  // Handle redirection in case the user is already logged in
  if (!isLoggedIn || !currentUser.adminId) {
    return <Redirect to="/page-404" />;
  }

  return (
    <div>
      <GoBack />

      <Container className="py-5">
        <Row>
          <Col className="text-center">
            <LocationSearchInput />
          </Col>
          <Col>
            {!isEmptyObject(result) ? (
              <div>
                <p>City: {result.address_components[0].long_name}</p>
                <p>
                  Province:{" "}
                  {result.address_components[1].long_name.replace(
                    " Province",
                    ""
                  )}
                </p>
                <p>Distance: {distance.current.toFixed(2)} km</p>
                <p>
                  LatLng: {LatLng.lat}, {LatLng.lng}
                </p>
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminGoogleMaps;
