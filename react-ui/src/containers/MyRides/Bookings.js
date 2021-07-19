import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Col, Container, Row, Spinner, Alert, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";

import { getDriverRidesRequests } from "../../redux";

const Bookings = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isLoadingDriverAllRidesRequests,
    driverAllRidesRequestsData,
    driverAllRidesRequestsError,
  } = useSelector((state) => state.message);

  useEffect(() => {
    if (driverAllRidesRequestsData.length === 0)
      dispatch(getDriverRidesRequests(currentUser.id));
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="mt-4" data-aos="fade-in" data-aos-duration="1000">
      <Row className="justify-content-center mb-4">
        <Col className="text-center">
          <div>
            <h1 className="font-title text-success mb-0">Your bookings</h1>
            <p className="lead">Manage all the rides you have booked</p>
          </div>
        </Col>
      </Row>

      {isLoadingDriverAllRidesRequests ? (
        <Row>
          <Col className="text-center">
            <Spinner
              animation="border"
              role="status"
              as="span"
              aria-hidden="true"
              className="align-middle me-2"
              variant="success"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
            Fetching your rides...
          </Col>
        </Row>
      ) : (
        <>
          {!(driverAllRidesRequestsData.length === 0) ? (
            <>
              {driverAllRidesRequestsData.map((request, index) => (
                <Row className="border">
                  <Col>
                    <p>ID Ride: {request.RideId}</p>
                    <p>Created At: {request.createdAt}</p>
                    <p>Seat(s) booked: {request.seatsBooked}</p>
                    <p>Status: {request.BookingStatus.name}</p>
                    <p>Your comment: {request.commentPassenger}</p>
                    <p>Driver's comment: {request.commentRefused}</p>
                  </Col>
                  <Col>
                    <p>Origin: {request.Ride.cityOrigin}</p>
                    <p>Destination: {request.Ride.cityDestination}</p>
                    <p>Driver: {request.Ride.User.username}</p>
                  </Col>
                </Row>
              ))}
            </>
          ) : (
            <>
              {driverAllRidesRequestsError ? (
                <Row>
                  <Col>
                    <Alert variant="danger">
                      An error occured while fetching all the rides
                    </Alert>
                  </Col>
                </Row>
              ) : null}
              <Row>
                <Col className="text-center">
                  <h1 className="display-2 text-info">No rides for now</h1>
                  <p>
                    Offer a ride by{" "}
                    <Link to="/offer-ride" className="text-success">
                      clicking here
                    </Link>
                  </p>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Bookings;
