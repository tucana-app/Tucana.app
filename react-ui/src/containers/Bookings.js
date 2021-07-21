import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row, ListGroup, Button } from "react-bootstrap";
import dateFormat from "dateformat";

import LoadingMessage from "../components/LoadingMessage";
import NoRidesMessage from "../components/NoRidesMessage";
import FeedbackMessage from "../components/FeedbackMessage";
import { LinkContainer } from "react-router-bootstrap";

import { getUserBookings } from "../redux";

const Bookings = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingUserBookings, userBookingsData } = useSelector(
    (state) => state.ride
  );

  useEffect(() => {
    dispatch(getUserBookings(currentUser.id));
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
              <p className="lead">See all the bookings you have made</p>
              <p className="lead">
                Total booking you've made:{" "}
                <span className="fw-bold text-success">
                  {!(userBookingsData.length === 0) || !isLoadingUserBookings
                    ? userBookingsData.length
                    : "-"}
                </span>
              </p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <hr className="w-75 mx-auto my-3" />
          </Col>
        </Row>

        {isLoadingUserBookings ? (
          <Row>
            <Col className="text-center">
              <LoadingMessage />
            </Col>
          </Row>
        ) : userBookingsData.length > 0 ? (
          <>
            {userBookingsData.map((booking, index) => (
              <Row
                key={index}
                className="justify-content-center align-items-center text-center"
              >
                <Col xs={12} className="text-center mb-3">
                  <Link
                    to={`/booking/${booking.id}`}
                    className="text-white text-decoration-none"
                  >
                    <u>
                      #{index + 1} - {booking.Ride.cityOrigin}{" "}
                      <FontAwesomeIcon icon={faArrowRight} size="sm" />{" "}
                      {booking.Ride.cityDestination} -{" "}
                      {dateFormat(booking.Ride.dateTime, "dd/mm/yyyy")}
                    </u>
                  </Link>
                </Col>

                <Col xs={12}>
                  <p className="mb-0">
                    Seats booked:{" "}
                    <span className="text-success">{booking.seatsBooked}</span>
                  </p>
                </Col>

                <Col xs={12}>
                  <p>
                    Seats left: {booking.Ride.seatsLeft} /{" "}
                    {booking.Ride.seatsAvailable}
                  </p>
                </Col>

                <Col xs={12}>
                  <p>
                    Status:{" "}
                    <span className="text-success">
                      {booking.BookingStatus.name}
                    </span>
                  </p>
                </Col>

                <Col className="text-center">
                  <LinkContainer
                    to={`/ride/${booking.RideId}`}
                    className="me-3"
                  >
                    <Button variant="info" className="rounded-0 text-uppercase">
                      View ride
                    </Button>
                  </LinkContainer>
                  <LinkContainer to={`/booking/${booking.id}`}>
                    <Button
                      variant="success"
                      className="rounded-0 text-uppercase"
                    >
                      View booking
                    </Button>
                  </LinkContainer>
                </Col>

                {index !== userBookingsData.length - 1 ? (
                  <Col xs={12} className="text-center">
                    <hr className="w-75 mx-auto my-4" />
                  </Col>
                ) : null}
              </Row>
            ))}
          </>
        ) : (
          <>
            <Row>
              <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
                <FeedbackMessage />
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <NoRidesMessage />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Bookings;
