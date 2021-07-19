import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Alert,
  Spinner,
  Badge,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCarAlt,
  faCar,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";

// import { getDriverNewRidesRequests } from "../redux";

const Messages = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingDriverNewRidesRequests, driverNewRidesRequestsData } =
    useSelector((state) => state.message);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in" data-aos-duration="1000">
      <ListGroup variant="flush">
        <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
          <div className="d-inline-flex justify-content-between w-100 py-3">
            <span>
              {driverNewRidesRequestsData.count > 0 ? (
                <>
                  <FontAwesomeIcon icon={faCar} className="text-success me-3" />{" "}
                  <span>
                    New notifications
                    <Badge bg="danger" className="ms-2">
                      {driverNewRidesRequestsData.count}
                    </Badge>
                  </span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-warning me-3"
                  />{" "}
                  <span>
                    No new notifications
                    <Badge bg="danger" className="ms-2">
                      0
                    </Badge>
                  </span>
                </>
              )}
            </span>
          </div>
        </ListGroup.Item>
      </ListGroup>

      {/* Display past booking for this ride by this user */}
      {isLoadingDriverNewRidesRequests ? (
        <Container>
          <hr className="w-75 mx-auto my-2" />
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
              Fetching your notifications
            </Col>
          </Row>
        </Container>
      ) : driverNewRidesRequestsData.count > 0 ? (
        <ListGroup variant="flush">
          <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0">
            <div className="d-inline-flex justify-content-between w-100 py-2">
              <span>New bookings for your ride(s)</span>
            </div>
          </ListGroup.Item>

          {driverNewRidesRequestsData.rows.map((booking, index) => (
            <Link
              to={`/ride/${booking.Ride.id}`}
              className="text-light text-decoration-none"
              key={index}
            >
              <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0 py-3">
                <small className="text-secondary">
                  {dateFormat(booking.createdAt, "dd/mm/yyyy HH:MM")}
                </small>{" "}
                Ride:{" "}
                <span className="text-success">{booking.Ride.cityOrigin}</span>{" "}
                to{" "}
                <span className="text-success">
                  {booking.Ride.cityDestination}
                </span>{" "}
                ({dateFormat(booking.Ride.dateTime, "dd/mm/yyyy")}) - Seats
                booked:{" "}
                <span className="text-success">{booking.seatsBooked}</span> /{" "}
                {booking.Ride.seatsAvailable}{" "}
                <span>
                  by{" "}
                  <span className="text-success">{booking.User.username}</span>
                </span>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      ) : null}
    </div>
  );
};

export default Messages;
