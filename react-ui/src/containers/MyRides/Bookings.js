import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Spinner,
  Alert,
  ListGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { getDriverRidesRequests } from "../../redux";

const Bookings = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { feedback } = useSelector((state) => state.global);
  const { isLoadingDriverAllRidesRequests, driverAllRidesRequestsData } =
    useSelector((state) => state.ride);

  useEffect(() => {
    if (driverAllRidesRequestsData.length === 0)
      dispatch(getDriverRidesRequests(currentUser.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="slide-right">
      <ListGroup variant="flush">
        <Link to="/my-rides" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-3">
              <span>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-success me-3"
                />{" "}
                Go back
              </span>
            </div>
          </ListGroup.Item>
        </Link>
      </ListGroup>

      <Container className="mt-4">
        <Row className="justify-content-center mb-4">
          <Col className="text-center">
            <div>
              <h1 className="font-title text-success mb-0">Your bookings</h1>
              <p className="lead">Manage all the rides you have booked</p>
              <p className="lead">
                Total booking you've made:{" "}
                <span className="fw-bold text-success">
                  {!(driverAllRidesRequestsData.length === 0) ||
                  !isLoadingDriverAllRidesRequests
                    ? driverAllRidesRequestsData.length
                    : "-"}
                </span>
              </p>
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
        ) : driverAllRidesRequestsData.length > 0 ? (
          <>
            {driverAllRidesRequestsData.map((request, index) => (
              <Row key={index} className="border">
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
        {feedback.message && (
          <Alert variant={feedback.variant} className="mt-3">
            {feedback.message}
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default Bookings;
