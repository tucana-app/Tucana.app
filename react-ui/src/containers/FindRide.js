import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Col, Container, Row, Spinner, Alert, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";

import { getAllRides } from "../redux";

const FindRide = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isloadingAllRidesList, allRidesListData, allRidesListError } =
    useSelector((state) => state.ride);

  useEffect(() => {
    if (allRidesListData.length === 0) dispatch(getAllRides());
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="mt-4" data-aos="fade-in" data-aos-duration="1000">
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
          {!(allRidesListData.length === 0) ? (
            <>
              {allRidesListData.map((ride, index) => (
                <Row
                  className="border  border-start-0 border-end-0 py-3 mx-1 mx-sm-2 mx-md-5"
                  data-aos="fade-zoom-in"
                  data-aos-delay={index * 150}
                  data-aos-once="true"
                  key={index}
                >
                  <Col>
                    <Container className="p-0 m-0">
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
                            <strong>Origin:</strong>{" "}
                            <span className="text-warning">
                              {ride.cityOrigin}{" "}
                            </span>
                          </p>
                          <p>
                            <strong>Province:</strong>{" "}
                            <span className="text-warning">
                              {ride.provinceOrigin}
                            </span>
                          </p>
                        </Col>
                        <Col xs={12} md={6} lg={4} xl={3}>
                          <p className="mb-0">
                            <strong>Destination:</strong>{" "}
                            <span className="text-success">
                              {ride.cityDestination}
                            </span>
                          </p>
                          <p>
                            <strong>Province:</strong>{" "}
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
                            <strong>Date:</strong>{" "}
                            {dateFormat(ride.dateTime, "dd/mm/yyyy")}
                          </p>
                          <p className="mb-0">
                            <strong>Time:</strong>{" "}
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
                            <strong>Seats left:</strong>{" "}
                            <span className="text-success">
                              {ride.seatsLeft} / {ride.seatsAvailable}
                            </span>
                          </p>
                          <p className="mb-0">
                            <strong>Driver:</strong>{" "}
                            {ride.User ? ride.User.username : null}
                          </p>
                        </Col>
                        <Col
                          xs={12}
                          lg={{ span: 4, order: 3 }}
                          xl={{ span: 2, order: 5 }}
                          className="mb-3"
                        >
                          <LinkContainer
                            to={`/ride/${ride.id}`}
                            className="w-100 mt-3"
                          >
                            <Button variant="success rounded-0 fw-bold">
                              VIEW &amp; BOOK
                            </Button>
                          </LinkContainer>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              ))}
            </>
          ) : (
            <>
              {allRidesListError ? (
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

export default FindRide;
