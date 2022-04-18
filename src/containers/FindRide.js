import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Col, Container, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faStar, faLock } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import dateFormat from "dateformat";

import LoadingSpinner from "../components/LoadingSpinner";
import FeedbackMessage from "../components/FeedbackMessage";
import MessageEmpty from "../components/MessageEmpty";

import { getAllRides } from "../redux";

const FindRide = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isloadingAllRidesList, allRidesListData } = useSelector(
    (state) => state.ride
  );

  useEffect(() => {
    if (allRidesListData.length === 0) dispatch(getAllRides());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container className="mt-4" data-aos="fade-in">
        <Row className="justify-content-center mb-4">
          <Col className="text-center">
            <div>
              <h1 className="font-title text-success mb-0">Find a ride</h1>
            </div>
          </Col>
        </Row>

        {isloadingAllRidesList ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : (
          <>
            {allRidesListData.length > 0 ? (
              <>
                {allRidesListData.map((ride, index) => (
                  <Row key={index} className="mb-3 mx-1 mx-sm-0">
                    <Col
                      xs={12}
                      sm={10}
                      md={8}
                      lg={6}
                      className="border shadow-sm rounded hvr-grow pb-3 mx-auto"
                    >
                      <LinkContainer
                        to={!isLoggedIn ? "/login" : `/ride/${ride.id}`}
                        className="cursor-pointer"
                      >
                        <Container className="p-2">
                          <Row className="mb-2">
                            <Col className="text-center">
                              {dateFormat(ride.dateTime, "dd/mm/yyyy")}
                            </Col>
                          </Row>
                          <Row className="mb-4">
                            <Col xs={2}>
                              <p className="text-end mb-0">
                                {dateFormat(ride.dateTime, "hh:mm")}
                              </p>
                            </Col>
                            <Col xs={7}>
                              <p className="fw-bold mb-0">{ride.cityOrigin}</p>
                              <p className="small mb-0">
                                {ride.provinceOrigin}
                              </p>

                              <FontAwesomeIcon
                                icon={faArrowDown}
                                className="text-success"
                              />

                              <p className="fw-bold mb-0">
                                {ride.cityDestination}
                              </p>
                              <p className="small mb-0">
                                {ride.provinceDestination}
                              </p>
                            </Col>
                            <Col xs={3} className="text-center mx-auto">
                              <p className="mb-0">Seats</p>
                              <p>
                                <span className="text-success">
                                  {ride.seatsLeft}
                                </span>
                                /{ride.seatsAvailable}
                              </p>
                            </Col>
                          </Row>
                          <Row className="align-items-center">
                            <Col xs={3} className="pe-0">
                              <p className="text-end mb-0">
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  className="text-secondary me-2"
                                  size="3x"
                                />
                              </p>
                            </Col>
                            <Col xs={5} className="ps-0">
                              <p className="mb-0">
                                {ride.Driver.User.firstName}
                              </p>
                              <p className="mb-0">
                                <FontAwesomeIcon
                                  icon={faStar}
                                  className="text-warning"
                                  size={"sm"}
                                />{" "}
                                <span>-</span>
                              </p>
                            </Col>
                            <Col xs={4} className="text-end mx-auto">
                              {!isLoggedIn ? (
                                <LinkContainer to="/login">
                                  <Button variant="warning">
                                    <FontAwesomeIcon icon={faLock} size="sm" />{" "}
                                    Login
                                  </Button>
                                </LinkContainer>
                              ) : ride.Driver.User.id === currentUser.id ? (
                                <LinkContainer to={`/ride/${ride.id}`}>
                                  <Button variant="info">Manage</Button>
                                </LinkContainer>
                              ) : (
                                <LinkContainer to={`/ride/${ride.id}`}>
                                  <Button variant="success">More</Button>
                                </LinkContainer>
                              )}
                            </Col>
                          </Row>
                        </Container>
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
                    <MessageEmpty title="rides" />
                  </Col>
                </Row>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default FindRide;
