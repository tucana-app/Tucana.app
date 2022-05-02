import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Col, Container, Row, Button } from "react-bootstrap";
import {
  CircleIcon,
  StarFillIcon,
  LockIcon,
  ArrowDownIcon,
  ArrowRightIcon,
} from "@primer/octicons-react";
import dateFormat from "dateformat";

import LoadingSpinner from "../components/LoadingSpinner";
import MessageEmpty from "../components/MessageEmpty";
import FormFilterRides from "../components/FormFilterRides";

import { getAllRides, resetFormFindRide } from "../redux";

const Find = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isloadingAllRidesList,
    allRidesListData,
    submitFormFindRideRequested,
    findRideProvinceOrigin,
    findRideProvinceDestination,
    findRideDate,
  } = useSelector((state) => state.ride);

  var filteredRides =
    allRidesListData.length > 0 &&
    allRidesListData.filter((ride) => {
      return new Date(ride.dateTime).setHours(0, 0, 0, 0) ===
        new Date(
          findRideDate.slice(0, 4),
          findRideDate.slice(5, 7) - 1,
          findRideDate.slice(8, 10)
        ).setHours(0, 0, 0, 0) &&
        ride.origin.province === findRideProvinceOrigin &&
        ride.destination.province === findRideProvinceDestination
        ? ride
        : null;
    });

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
        {submitFormFindRideRequested ? (
          <>
            <Row className="mb-3 mx-1 mx-sm-0">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                className="border shadow-sm rounded mx-auto"
              >
                <Container className="p-2">
                  <Row className="align-items-center">
                    <Col>
                      <p className="text-secondary small mb-0">Filters</p>
                      <p className="mb-0">
                        {findRideProvinceOrigin}{" "}
                        <ArrowRightIcon size={24} className="text-success" />{" "}
                        {findRideProvinceDestination}
                      </p>
                      <p className="mb-0">
                        {findRideDate.slice(8, 10)}/{findRideDate.slice(5, 7)}/
                        {findRideDate.slice(0, 4)}
                      </p>
                    </Col>
                    <Col xs={"auto"}>
                      <Button
                        onClick={() => dispatch(resetFormFindRide())}
                        variant="warning"
                        className="mb-0"
                      >
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>

            {isloadingAllRidesList ? (
              <Row>
                <Col className="text-center">
                  <LoadingSpinner />
                </Col>
              </Row>
            ) : allRidesListData.length > 0 ? (
              <>
                {filteredRides.map((ride, index) => (
                  <Row key={index} className="mb-3 mx-1 mx-sm-0">
                    <Col
                      xs={12}
                      sm={10}
                      md={8}
                      lg={6}
                      className="border shadow-sm rounded pb-3 mx-auto"
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
                          <Row className="align-items-center">
                            <Col xs={3} className="pe-0">
                              <p className="text-end mb-0">
                                <CircleIcon
                                  size={56}
                                  className="text-secondary me-2"
                                />
                              </p>
                            </Col>
                            <Col xs={5} className="ps-0">
                              <p className="mb-0">
                                {ride.Driver.User.firstName}
                              </p>
                              <p className="mb-0">
                                <StarFillIcon
                                  size={18}
                                  verticalAlign="middle"
                                  className="text-warning"
                                />{" "}
                                <span>-</span>
                              </p>
                            </Col>
                            <Col xs={4} className="text-end mx-auto">
                              {!isLoggedIn ? (
                                <LinkContainer to="/login">
                                  <Button variant="warning">
                                    <LockIcon
                                      size={18}
                                      verticalAlign="middle"
                                      className="mb-1"
                                    />{" "}
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
              <Row>
                <Col className="text-center">
                  <MessageEmpty title="rides" />
                </Col>
              </Row>
            )}
          </>
        ) : (
          <Row className="mb-2 mx-1 mx-sm-0">
            <Col
              xs={12}
              sm={10}
              md={8}
              lg={6}
              className="border border-success shadow-sm rounded mx-auto"
            >
              <Container className="py-3 px-2">
                <Row className="align-items-center">
                  <Col>
                    <FormFilterRides />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Find;
