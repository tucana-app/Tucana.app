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
  Accordion,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";

import { getUserRides } from "../../redux";

const MyRidesDriver = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingUserRidesList, userRidesListData, userRidesListError } =
    useSelector((state) => state.ride);

  useEffect(() => {
    dispatch(getUserRides(currentUser.id));
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

      <Container className="mt-4 mb-5">
        {isLoadingUserRidesList ? (
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
            <Row className="justify-content-center">
              <Col>
                <div className="text-center mb-4">
                  <h1 className="font-title text-success mb-0">
                    Rides as a driver
                  </h1>
                  <p className="lead">All the rides you have driven</p>
                </div>
              </Col>
            </Row>

            {!(userRidesListData.length === 0) ? (
              <Row>
                {console.log(userRidesListData)}
                <Col xs={12} md={6} className="mx-auto">
                  <Accordion>
                    {userRidesListData.map((ride, index) => (
                      <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header>
                          <span className="fw-bolder">
                            {ride.Ride.cityOrigin} - {ride.Ride.cityDestination}{" "}
                            ({dateFormat(ride.Ride.dateTime, "dd-mm-yyyy")})
                          </span>
                        </Accordion.Header>
                        <Accordion.Body className="p-0">
                          <ListGroup className="border border-success border-3 rounded">
                            <ListGroup.Item>
                              <span className="text-success">Origin:</span>{" "}
                              {ride.Ride.cityOrigin} ({ride.Ride.provinceOrigin}
                              )
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <span className="text-danger">Destination:</span>{" "}
                              {ride.Ride.cityDestination} (
                              {ride.Ride.provinceDestination})
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Date/time:{" "}
                              {dateFormat(
                                ride.Ride.dateTime,
                                "dd-mm-yyyy @ HH:MM TT"
                              )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Seats left: {ride.Ride.seatsLeft}/
                              {ride.Ride.seatsAvailable}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Comment: {ride.Ride.comment}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <span className="text-warning fw-bold">
                                Status:
                              </span>{" "}
                              {ride.Ride.RideStatus.name}
                            </ListGroup.Item>
                          </ListGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col className="text-center">
                  <p>No rides for now</p>
                  <p>-</p>
                  <p>
                    Offer a ride by{" "}
                    <Link to="/offer-ride" className="text-success">
                      clicking here
                    </Link>
                  </p>
                </Col>
              </Row>
            )}
          </>
        )}
        {userRidesListError ? (
          <Row>
            <Col>
              <Alert variant="danger">
                An error occured while fetching your rides
              </Alert>
            </Col>
          </Row>
        ) : null}
      </Container>
    </div>
  );
};

export default MyRidesDriver;
