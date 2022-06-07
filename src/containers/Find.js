import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";
import {
  CircleIcon,
  // StarFillIcon,
  LockIcon,
  ArrowDownIcon,
  ArrowRightIcon,
} from "@primer/octicons-react";

import LoadingSpinner from "../components/LoadingSpinner";
import MessageEmpty from "../components/MessageEmpty";
import FormSearchRides from "../components/FormSearchRides";

import { showSearchForm } from "../redux";

var distance = require("hpsweb-google-distance");
distance.apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Find = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isloadingFilteredRides,
    filteredRidesData,
    isFormSearchRideSubmitted,
    formSearchRide,
  } = useSelector((state) => state.ride);

  // const filteredRides = useRef([]);

  // useEffect(() => {
  //   // If we have received the rides
  //   if (filteredRidesData.length > 0) {
  //     // We add the distance between the ride origin and
  //     // the user search origin to each ride object
  //     filteredRides.current = filteredRidesData.map((ride) => {
  //       return {
  //         ...ride,
  //         distance: distanceLatLng(
  //           ride.origin.latLng,
  //           formSearchRide.origin.latLng
  //         ),
  //       };
  //     });

  //     // Then we sort the array of object by distance
  //     filteredRides.current = filteredRides.current.sort((ride1, ride2) => {
  //       return ride1.distance - ride2.distance;
  //     });
  //   }
  // }, [filteredRidesData, filteredRides, distanceLatLng, formSearchRide]);

  // useEffect(() => {
  // console.log(filteredRidesData);
  // }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Container className="py-5">
        {isFormSearchRideSubmitted ? (
          <>
            <Row>
              <Col xs={12}>
                <h1 className="title display-5 text-center mb-0">
                  {t("translation:global.searchResults")}
                </h1>
              </Col>
            </Row>
            <Row className="sticky-top mb-3 mx-1 mx-sm-0">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="bg-light border border-success shadow-sm rounded mx-auto mt-2"
              >
                <Container className="p-2">
                  <Row className="align-items-center">
                    <Col>
                      <p className="small fw-bold mb-0">
                        {formSearchRide.origin.city}{" "}
                        <ArrowRightIcon size={24} className="text-success" />{" "}
                        {formSearchRide.destination.city}
                      </p>
                      <p className="small mb-0">
                        {formSearchRide.date.getDate()}/
                        {formSearchRide.date.getMonth() + 1}/
                        {formSearchRide.date.getFullYear()}
                      </p>
                    </Col>
                    <Col xs={"auto"}>
                      <Button
                        onClick={() => dispatch(showSearchForm())}
                        variant="warning"
                        className="mb-0"
                      >
                        {t("translation:find.change")}
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
                      xl={4}
                      className="bg-light border shadow-sm rounded pb-3 mx-auto"
                    >
                      <LinkContainer
                        to={`/ride/${ride.rideDetails.id}`}
                        className="cursor-pointer"
                      >
                        <Container className="p-2">
                          <Row className="mb-2">
                            <Col className="text-center">
                              {dateFormat(
                                ride.rideDetails.dateTime,
                                "dd/mm/yyyy"
                              )}
                            </Col>
                          </Row>
                          <Row className="mb-4">
                            <Col xs={2}>
                              <p className="text-end mb-0">
                                {dateFormat(
                                  ride.rideDetails.dateTime,
                                  "hh:MM TT"
                                )}
                              </p>
                            </Col>
                            <Col xs={7}>
                              <p className="mb-0">
                                <strong>
                                  {ride.rideDetails.origin.city},{" "}
                                </strong>
                                <small>
                                  {ride.rideDetails.origin.province}
                                </small>
                              </p>
                              <p className="small text-secondary mb-0">
                                <span className="text-primary">
                                  {(
                                    ride.distanceFromOrigin.distanceValue / 1000
                                  ).toFixed(2)}
                                </span>{" "}
                                km {t("translation:find.distanceOrigin")}
                              </p>

                              <ArrowDownIcon
                                size={24}
                                className="text-success"
                              />

                              <p className="mb-0">
                                <strong>
                                  {ride.rideDetails.destination.city},{" "}
                                </strong>
                                <small>
                                  {ride.rideDetails.destination.province}
                                </small>
                              </p>
                              {/* <p className="small text-secondary mb-0">
                                <span className="text-primary">
                                  {distanceLatLng(
                                    ride.rideDetails.destination.latLng,
                                    formSearchRide.rideDetails.destination.latLng
                                  )}
                                </span>{" "}
                                km {t("translation:find.distanceDestination")}
                              </p> */}
                            </Col>
                            <Col xs={3} className="text-center mx-auto">
                              <p className="mb-0">
                                {t("translation:global.seat")}
                                {ride.rideDetails.seatsAvailable > 1
                                  ? "s"
                                  : null}
                              </p>
                              <p>
                                <span className="text-success">
                                  {ride.rideDetails.seatsLeft}
                                </span>
                                /{ride.rideDetails.seatsAvailable}
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
                                {ride.rideDetails.Driver.User.firstName}
                              </p>
                              {/* RATINGS */}
                              {/* <p className="mb-0">
                                <StarFillIcon
                                  size={18}
                                  verticalAlign="middle"
                                  className="text-warning"
                                />{" "}
                                <span>-</span>
                              </p> */}
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
                                    {t("translation:global.logIn")}
                                  </Button>
                                </LinkContainer>
                              ) : ride.rideDetails.Driver.User.id ===
                                currentUser.id ? (
                                <LinkContainer
                                  to={`/ride/${ride.rideDetails.id}`}
                                >
                                  <Button variant="info">
                                    {t("translation:global.manage")}
                                  </Button>
                                </LinkContainer>
                              ) : (
                                <LinkContainer
                                  to={`/ride/${ride.rideDetails.id}`}
                                >
                                  <Button variant="success">
                                    {t("translation:global.more")}
                                  </Button>
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
              <Row className="mb-2 mx-1 mx-sm-0">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  xl={4}
                  className="border shadow-sm rounded mx-auto"
                >
                  <Container className="py-3 px-2">
                    <Row>
                      <Col className="text-center">
                        <MessageEmpty title="rides" />
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            )}
          </>
        ) : (
          <>
            <Row className="justify-content-center mb-4">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="text-center mx-auto"
              >
                <h1 className="title display-5 mb-0">
                  {t("translation:find.catchPhrase")}
                </h1>
              </Col>
            </Row>
            <Row className="mb-2 mx-1 mx-sm-0">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="bg-light shadow mt-2 mx-auto"
                style={{ borderRadius: "15px" }}
              >
                <Container className="py-3 px-2">
                  <FormSearchRides />
                </Container>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Find;
