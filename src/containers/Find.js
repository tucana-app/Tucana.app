import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";
import { ArrowDownIcon, ArrowRightIcon } from "@primer/octicons-react";
import { PersonCircle } from "react-bootstrap-icons";

import LoadingSpinner from "../components/LoadingSpinner";
import MessageEmpty from "../components/MessageEmpty";
import FormSearchRides from "../components/FormSearchRides";
import DisplayRating from "../components/DisplayRating";

import { formatPrice, formatTimeSecond } from "../helpers";

import { showSearchForm, displayNavBar } from "../redux";

const Find = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { commission } = useSelector((state) => state.global);
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
                className="bg-light border border-success shadow-sm rounded-5 mx-auto mt-2"
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
                        {dateFormat(formSearchRide.date, "dd/mm/yyyy")}
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
                      className="bg-light border shadow rounded-5 pb-3 mx-auto hvr-grow hvr-grow-sm"
                    >
                      <LinkContainer
                        to={`/ride/${ride.rideDetails.id}`}
                        onClick={() => dispatch(displayNavBar(false))}
                        className="cursor-pointer"
                      >
                        <Container className="p-2">
                          <Row className="mb-3">
                            <Col className="text-center">
                              {dateFormat(
                                ride.rideDetails.dateTimeOrigin,
                                "dd/mm/yyyy"
                              )}
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={2} className="mt-1 px-0">
                              <p className="smaller line-height-md text-secondary text-end mb-2">
                                {dateFormat(
                                  ride.rideDetails.dateTimeOrigin,
                                  "HH:MM TT"
                                )}
                              </p>
                              <p className="smaller fw-bold line-height-md text-secondary text-end mb-0">
                                {formatTimeSecond(
                                  ride.rideDetails.ETA.durationValue
                                )}
                              </p>
                            </Col>
                            <Col>
                              <p className="line-height-md mb-0">
                                <strong>
                                  {ride.rideDetails.origin.city},{" "}
                                </strong>
                                <small>
                                  {ride.rideDetails.origin.province}
                                </small>
                              </p>
                              <small className="smaller text-secondary">
                                <span className="text-primary">
                                  {(
                                    ride.distanceFromOrigin[index]
                                      .distanceValue / 1000
                                  ).toFixed(2)}
                                </span>{" "}
                                km {t("translation:find.distanceOrigin")}
                              </small>
                              <p>
                                <ArrowDownIcon
                                  size={24}
                                  className="text-success"
                                />
                              </p>
                            </Col>
                          </Row>
                          <Row className="mb-4">
                            <Col xs={2} className="px-0">
                              <p className="smaller line-height-md text-secondary text-end mb-0">
                                {dateFormat(
                                  ride.rideDetails.dateTimeOrigin,
                                  "hh:MM TT"
                                )}
                              </p>
                            </Col>
                            <Col xs={7}>
                              <p className="line-height-md mb-0">
                                <strong>
                                  {ride.rideDetails.destination.city},{" "}
                                </strong>
                                <small>
                                  {ride.rideDetails.destination.province}
                                </small>
                              </p>
                              <small className="smaller text-secondary">
                                <span className="text-primary">
                                  {(
                                    ride.distanceFromDestination[index]
                                      .distanceValue / 1000
                                  ).toFixed(2)}
                                </span>{" "}
                                km {t("translation:find.distanceDestination")}
                              </small>
                            </Col>
                            <Col xs={3}></Col>
                          </Row>
                          <Row className="align-items-center">
                            <Col xs={3} className="pe-0">
                              <p className="text-end mb-0">
                                <PersonCircle
                                  size={48}
                                  className="text-secondary me-2"
                                />
                              </p>
                            </Col>
                            <Col xs={5} className="ps-0">
                              <p className="mb-0">
                                {ride.rideDetails.Driver.User.firstName}
                              </p>
                              <DisplayRating
                                rating={ride.rideDetails.Driver.User.Rating}
                                type="driver"
                              />
                            </Col>
                            <Col xs={4} className="text-center mx-auto">
                              <p className="line-height-sm mb-0">
                                <span className="fw-bold mb-0">
                                  {formatPrice(
                                    ride.rideDetails.price * commission
                                  )}
                                </span>
                                <br />
                                <span className="smaller text-secondary">
                                  {t("translation:global.perSeat")}
                                </span>
                              </p>
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
                className="bg-light shadow rounded-5 mt-2 mx-auto"
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
