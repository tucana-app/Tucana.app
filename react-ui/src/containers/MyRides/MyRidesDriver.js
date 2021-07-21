import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Col, Container, Row, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";

import LoadingMessage from "../../components/LoadingMessage";
import FeedbackMessage from "../../components/FeedbackMessage";
import NoRidesMessage from "../../components/NoRidesMessage";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

import { getDriverRides } from "../../redux";

const MyRidesDriver = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingDriverRidesList, userRidesListData } = useSelector(
    (state) => state.ride
  );

  useEffect(() => {
    dispatch(getDriverRides(currentUser.id));
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

      <Container className="mt-4 mb-5">
        {isLoadingDriverRidesList ? (
          <Row>
            <Col className="text-center">
              <LoadingMessage />
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
                  <p className="lead">All the rides you have submitted</p>
                </div>
              </Col>
            </Row>

            {!(userRidesListData.length === 0) ? (
              <>
                {userRidesListData.map((ride, index) => (
                  <Row
                    className="justify-content-center justify-content-md-start justify-content-lg-center align-items-center border border-start-0 border-end-0 py-3 mx-1 mx-sm-2"
                    data-aos="fade-zoom-in"
                    data-aos-delay={index * 150}
                    data-aos-once="true"
                    key={index}
                  >
                    <Col xs={6} sm={3} lg={2} className="mb-3">
                      <p className="mb-0">Origin:</p>
                      <p className="mb-0">Province: </p>
                    </Col>
                    <Col xs={6} sm={3} lg={2} className="mb-3">
                      <p className="text-warning mb-0">{ride.cityOrigin}</p>
                      <p className="text-warning mb-0">{ride.provinceOrigin}</p>
                    </Col>

                    <Col xs={6} sm={3} lg={2} className="mb-3">
                      <p className="mb-0">Destination:</p>
                      <p className="mb-0">Province:</p>
                    </Col>
                    <Col xs={6} sm={3} lg={2} className="mb-3">
                      <p className="text-success mb-0">
                        {ride.cityDestination}
                      </p>
                      <p className="text-success mb-0">
                        {ride.provinceDestination}
                      </p>
                    </Col>

                    <Col xs={6} md={4} lg={2} className="mb-3 mb-lg-3">
                      <p className="mb-0">
                        Date: {dateFormat(ride.dateTime, "dd/mm/yyyy")}
                      </p>
                      <p className="mb-0">
                        Time: {dateFormat(ride.dateTime, "HH:MM TT")}
                      </p>
                    </Col>

                    <Col xs={6} md={4} lg={3} className="">
                      <p className="mb-0">
                        Created:{" "}
                        <span>{dateFormat(ride.createdAt, "dd/mm/yyyy")}</span>
                      </p>
                      <p className="mb-0">
                        Seats left:{" "}
                        <span className="text-success">{ride.seatsLeft}</span> /{" "}
                        {ride.seatsAvailable}
                      </p>
                    </Col>

                    <Col xs={6} md={4} lg={3} className="my-3">
                      Status:{" "}
                      <span className="text-success">
                        {ride.RideStatus.name}
                      </span>
                    </Col>

                    <Col
                      xs={6}
                      md={0}
                      lg={0}
                      xl={0}
                      xxl={0}
                      className="d-md-none"
                    ></Col>

                    {!(ride.comment === "") ? (
                      <Col
                        xs={12}
                        xl={3}
                        className="text-lg-center text-xl-start mt-lg-3"
                      >
                        <p className="mb-0">Your comment:</p>
                        <i>"{ride.comment}"</i>
                      </Col>
                    ) : null}

                    <Col xs={12} className="text-center mx-auto my-3">
                      <LinkContainer to={`/ride/${ride.id}`}>
                        <Button variant="success rounded-0 fw-bold text-uppercase">
                          Manage
                        </Button>
                      </LinkContainer>
                    </Col>
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

                {/* <Row>
                <Col xs={12} md={6} className="mx-auto">
                  <Accordion>
                    {userRidesListData.map((ride, index) => (
                      <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header>
                          <span className="fw-bolder">
                            {ride.cityOrigin} - {ride.cityDestination} (
                            {dateFormat(ride.dateTime, "dd-mm-yyyy")})
                          </span>
                        </Accordion.Header>
                        <Accordion.Body className="p-0">
                          <ListGroup className="border border-success border-3 rounded">
                            <ListGroup.Item>
                              <span className="text-success">Origin:</span>{" "}
                              {ride.cityOrigin} ({ride.provinceOrigin})
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <span className="text-danger">Destination:</span>{" "}
                              {ride.cityDestination} ({ride.provinceDestination}
                              )
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Date/time:{" "}
                              {dateFormat(
                                ride.dateTime,
                                "dd-mm-yyyy @ HH:MM TT"
                              )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Seats left: {ride.seatsLeft}/{ride.seatsAvailable}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Comment: {ride.comment}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <span className="text-warning fw-bold">
                                Status:
                              </span>{" "}
                              {ride.RideStatus.name}
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
              <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
                <FeedbackMessage />
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <NoRidesMessage />
              </Col>
            </Row>
            )}
          </>
        )} */}
              </>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default MyRidesDriver;
