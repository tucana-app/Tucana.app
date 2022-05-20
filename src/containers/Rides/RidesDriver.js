import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import dateFormat from "dateformat";
import { ArrowDownIcon } from "@primer/octicons-react";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";
import MessageEmpty from "../../components/MessageEmpty";

import { getDriverRides } from "../../redux";

const RidesDriver = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingDriverRides, driverRidesData } = useSelector(
    (state) => state.ride
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getDriverRides(currentUser.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="mt-4 mb-5">
        {isLoadingDriverRides ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : (
          <>
            <Row className="justify-content-center">
              <Col>
                <div className="text-center mb-4">
                  <h1 className="title mb-0">Rides offered</h1>
                  <p className="lead">All the rides you have submitted</p>
                </div>
              </Col>
            </Row>

            {driverRidesData.length > 0 ? (
              <>
                {driverRidesData.map((ride, index) => (
                  <Row key={index} className="mb-3 mx-1 mx-sm-0">
                    <Col
                      xs={12}
                      sm={10}
                      md={8}
                      lg={6}
                      xl={4}
                      className="border shadow-sm rounded pb-3 mx-auto"
                    >
                      <LinkContainer
                        to={`/ride/${ride.id}`}
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
                                {dateFormat(ride.dateTime, "hh:MM TT")}
                              </p>
                            </Col>
                            <Col xs={7}>
                              <p className="fw-bold mb-0">{ride.origin.city}</p>
                              <p className="small mb-0">
                                {ride.origin.province}
                              </p>

                              <ArrowDownIcon
                                size={24}
                                className="text-success"
                              />

                              <p className="fw-bold mb-0">
                                {ride.destination.city}
                              </p>
                              <p className="small mb-0">
                                {ride.destination.province}
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
                          <Row>
                            <Col className="text-center">
                              <LinkContainer to={`/ride/${ride.id}`}>
                                <Button variant="success" className="me-2">
                                  See ride
                                </Button>
                              </LinkContainer>
                            </Col>
                          </Row>
                        </Container>
                      </LinkContainer>
                    </Col>
                  </Row>
                ))}
              </>
            ) : (
              <Row>
                <Col className="text-center">
                  <MessageEmpty title="rides" />
                </Col>
              </Row>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default RidesDriver;
