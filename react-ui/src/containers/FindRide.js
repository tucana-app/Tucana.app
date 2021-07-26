import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Col, Container, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLock } from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";

import LoadingSpinner from "../components/LoadingSpinner";
import FeedbackMessage from "../components/FeedbackMessage";
import NoRidesMessage from "../components/NoRidesMessage";

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
    <Container
      fluid
      className="mt-4"
      data-aos="fade-in"
      data-aos-duration="1000"
    >
      <Row className="justify-content-center mb-4">
        <Col className="text-center">
          <div>
            <h1 className="font-title text-success mb-0">Find your ride</h1>
            <p className="lead">
              Total rides available:{" "}
              <span className="fw-bold text-success">
                {!(allRidesListData.length === 0) || !isloadingAllRidesList
                  ? allRidesListData.length
                  : "-"}
              </span>
            </p>
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
                <Row
                  className="border border-start-0 border-end-0 py-3 mx-1 mx-sm-2 mx-md-5"
                  data-aos="fade-zoom-in"
                  data-aos-delay={index * 150}
                  data-aos-once="true"
                  key={index}
                >
                  <Col>
                    <Container fluid className="p-0 m-0">
                      <Row className="align-items-center mb-2">
                        <Col className="text-center">
                          <Link to={`/ride/${ride.id}`} className="link-info">
                            <h1 className="h5">
                              {ride.cityOrigin}{" "}
                              <FontAwesomeIcon icon={faArrowRight} size="sm" />{" "}
                              {ride.cityDestination} -{" "}
                              {dateFormat(ride.dateTime, "dd/mm/yyyy")}
                            </h1>
                          </Link>
                        </Col>
                      </Row>
                      <Row className="align-items-center text-center">
                        <Col xs={12} md={6} lg={4} xl={3}>
                          <p className="mb-0">
                            <span>Origin:</span>{" "}
                            <span className="text-warning">
                              {ride.cityOrigin}{" "}
                            </span>
                          </p>
                          <p>
                            <span>Province:</span>{" "}
                            <span className="text-warning">
                              {ride.provinceOrigin}
                            </span>
                          </p>
                        </Col>
                        <Col xs={12} md={6} lg={4} xl={3}>
                          <p className="mb-0">
                            <span>Destination:</span>{" "}
                            <span className="text-success">
                              {ride.cityDestination}
                            </span>
                          </p>
                          <p>
                            <span>Province:</span>{" "}
                            <span className="text-success">
                              {ride.provinceDestination}
                            </span>
                          </p>
                        </Col>
                        <Col
                          xs={12}
                          md={6}
                          lg={{ span: 4, order: 4 }}
                          xl={{ span: 2, order: 3 }}
                          className="mb-3 mb-md-0"
                        >
                          <p className="mb-0">
                            <span>Date:</span>{" "}
                            {dateFormat(ride.dateTime, "dd/mm/yyyy")}
                          </p>
                          <p className="mb-0">
                            <span>Time:</span>{" "}
                            {dateFormat(ride.dateTime, "HH:MM TT")}
                          </p>
                        </Col>
                        <Col
                          xs={12}
                          md={6}
                          lg={{ span: 4, order: 5 }}
                          xl={{ span: 2, order: 4 }}
                          className=""
                        >
                          <p className="mb-0">
                            <span>Seats left:</span>{" "}
                            <span className="text-success">
                              {ride.seatsLeft} / {ride.seatsAvailable}
                            </span>
                          </p>
                          <p className="mb-0">
                            <span>Driver:</span>{" "}
                            {ride.Driver.User
                              ? ride.Driver.User.username
                              : null}
                          </p>
                        </Col>
                        <Col
                          xs={10}
                          sm={8}
                          md={6}
                          lg={{ span: 4, order: 3 }}
                          xl={{ span: 2, order: 5 }}
                          className="mb-3 mx-auto"
                        >
                          {!isLoggedIn ? (
                            <LinkContainer to="/signup" className="w-100 mt-3">
                              <Button variant="warning rounded-0 fw-bold text-uppercase">
                                <FontAwesomeIcon icon={faLock} size="sm" />{" "}
                                Signup to book
                              </Button>
                            </LinkContainer>
                          ) : ride.Driver.User.id === currentUser.id ? (
                            <LinkContainer
                              to={`/ride/${ride.id}`}
                              className="w-100 mt-3"
                            >
                              <Button variant="info rounded-0 fw-bold text-uppercase">
                                Manage
                              </Button>
                            </LinkContainer>
                          ) : (
                            <LinkContainer
                              to={`/ride/${ride.id}`}
                              className="w-100 mt-3"
                            >
                              <Button variant="success rounded-0 fw-bold text-uppercase">
                                View &amp; book
                              </Button>
                            </LinkContainer>
                          )}
                        </Col>
                      </Row>
                    </Container>
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
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default FindRide;
