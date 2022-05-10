import React from "react";
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
import FormSearchRides from "../components/FormSearchRides";

import background from "../assets/images/mountain-landscape.jpg";

import { resetSearchForm } from "../redux";

const Find = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { distanceLatLng } = useSelector((state) => state.global);
  const {
    isloadingFilteredRides,
    filteredRidesData,
    isFormSearchRideSubmitted,
    formSearchRide,
  } = useSelector((state) => state.ride);

  // var filteredRides =
  //   filteredRidesData.length > 0 &&
  //   filteredRidesData.filter((ride) => {
  //     return new Date(ride.dateTime).setHours(0, 0, 0, 0) ===
  //       new Date(
  //         formSearchRide.date.slice(0, 4),
  //         formSearchRide.date.slice(5, 7) - 1,
  //         formSearchRide.date.slice(8, 10)
  //       ).setHours(0, 0, 0, 0) &&
  //       ride.origin.province === formSearchRide.origin &&
  //       ride.destination.province === formSearchRide.destination
  //       ? ride
  //       : null;
  //   });

  return (
    <>
      <Container
        className="py-5 mx-0"
        // data-aos="fade-in"
        id="container-find-ride"
      >
        <Row className="justify-content-center mb-4">
          <Col className="text-center">
            <div>
              <h1 className="display-5 text-success text-shadow fw-bold mb-0">
                Find your next trip across Costa Rica
              </h1>
            </div>
          </Col>
        </Row>
        {isFormSearchRideSubmitted ? (
          <>
            <Row className="mb-3 mx-1 mx-sm-0">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                className="border shadow-sm rounded bg-light mx-auto"
              >
                <Container className="p-2">
                  <Row className="align-items-center">
                    <Col>
                      <p className="mb-0">
                        {formSearchRide.origin.city}{" "}
                        <ArrowRightIcon size={24} className="text-success" />{" "}
                        {formSearchRide.destination.city}
                      </p>
                      <p className="mb-0">
                        {formSearchRide.date.slice(8, 10)}/
                        {formSearchRide.date.slice(5, 7)}/
                        {formSearchRide.date.slice(0, 4)}
                      </p>
                    </Col>
                    <Col xs={"auto"}>
                      <Button
                        onClick={() => dispatch(resetSearchForm())}
                        variant="warning"
                        className="mb-0"
                      >
                        Change
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>

            {isloadingFilteredRides ? (
              <Row>
                <Col className="text-center">
                  <LoadingSpinner />
                </Col>
              </Row>
            ) : filteredRidesData.length > 0 ? (
              <>
                {filteredRidesData.map((ride, index) => (
                  <Row key={index} className="mb-3 mx-1 mx-sm-0">
                    <Col
                      xs={12}
                      sm={10}
                      md={8}
                      lg={6}
                      className="border shadow-sm rounded bg-white pb-3 mx-auto"
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
                              <p className="small mb-0">
                                <span className="text-warning">
                                  {distanceLatLng(
                                    ride.origin.latLng,
                                    formSearchRide.origin.latLng
                                  )}
                                </span>{" "}
                                km away
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
                              <p className="small mb-0">
                                <span className="text-warning">
                                  {distanceLatLng(
                                    ride.destination.latLng,
                                    formSearchRide.destination.latLng
                                  )}
                                </span>{" "}
                                km away
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
              className="border border-success shadow-sm rounded bg-white mx-auto"
            >
              <Container className="py-3 px-2">
                <FormSearchRides />
              </Container>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Find;
