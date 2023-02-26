import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
} from "@primer/octicons-react";

import LoadingSpinner from "../../components/LoadingSpinner";
import MessageEmpty from "../../components/MessageEmpty";
import DisplayRating from "../../components/DisplayRating";

import { formatDistance, formatPrice, formatTimeSecond } from "../../helpers";

import {
  showSearchForm,
  displayNavBar,
  setSearchDate,
  getFilteredRides,
} from "../../redux";
import {
  ArrowLeftCircleFill,
  ArrowRightCircleFill,
} from "react-bootstrap-icons";
import { Redirect } from "react-router-dom";

const SearchResults = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { srcAvatar } = useSelector((state) => state.global);
  const {
    isloadingFilteredRides,
    filteredRidesData,
    isFormSearchRideSubmitted,
    formSearchRide,
  } = useSelector((state) => state.ride);

  const handleDayBefore = () => {
    let dayBefore = new Date(
      formSearchRide.date.getFullYear(),
      formSearchRide.date.getMonth(),
      formSearchRide.date.getDate() - 1
    );
    dispatch(setSearchDate(dayBefore));
    dispatch(
      getFilteredRides(
        formSearchRide.origin,
        formSearchRide.destination,
        dayBefore,
        formSearchRide.seats
      )
    );
  };

  const handleDayAfter = () => {
    let dayAfter = new Date(
      formSearchRide.date.getFullYear(),
      formSearchRide.date.getMonth(),
      formSearchRide.date.getDate() + 1
    );
    dispatch(setSearchDate(dayAfter));
    dispatch(
      getFilteredRides(
        formSearchRide.origin,
        formSearchRide.destination,
        dayAfter,
        formSearchRide.seats
      )
    );
  };

  return (
    <>
      <Container>
        {isFormSearchRideSubmitted ? (
          <>
            <Row className="sticky-top mt-4 mb-2 mx-1 mx-sm-0">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="container-box border-success bg-white"
              >
                <Container className="p-2">
                  <Row
                    className="align-items-center cursor-pointer"
                    onClick={() => dispatch(showSearchForm())}
                  >
                    <Col xs={1}>
                      <ChevronLeftIcon size={24} />
                    </Col>
                    <Col>
                      <p className="small fw-bold mb-0">
                        {formSearchRide.origin.placeName}{" "}
                        <ArrowRightIcon size={24} className="text-success" />{" "}
                        {formSearchRide.destination.placeName}
                      </p>
                      <p className="small mb-0">
                        {dateFormat(formSearchRide.date, "dd/mm/yyyy")}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>

            <Row className="mb-3 mx-1 mx-sm-0">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="mx-auto px-0"
              >
                <Container className="p-0">
                  <Row>
                    <Col className="text-start small">
                      <Button
                        onClick={handleDayBefore}
                        variant="outline-dark"
                        size="sm"
                      >
                        <ArrowLeftCircleFill className="mb-1 me-2" />
                        {t("translation:find.dayBefore")}
                      </Button>
                    </Col>
                    <Col xs={6} className="text-end small">
                      <Button
                        onClick={handleDayAfter}
                        variant="outline-dark"
                        size="sm"
                      >
                        {t("translation:find.dayAfter")}
                        <ArrowRightCircleFill className="mb-1 ms-2" />
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
                      className="container-box pb-1 hvr-grow hvr-grow-sm"
                    >
                      <LinkContainer
                        to={`/ride/${ride.rideDetails.id}`}
                        onClick={() => dispatch(displayNavBar(false))}
                        className="cursor-pointer px-2"
                      >
                        <Container>
                          <Row>
                            <Col className="text-center">
                              <p className="small mb-2">
                                {dateFormat(
                                  ride.rideDetails.dateTimeOrigin,
                                  "dd/mm/yyyy"
                                )}
                              </p>
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
                                  {ride.rideDetails.origin.placeName}
                                </strong>
                                ,{" "}
                                <small>
                                  {ride.rideDetails.origin.placeDetails}
                                </small>
                              </p>
                              <small className="smaller text-secondary">
                                <span className="text-primary">
                                  {formatDistance(
                                    ride.distanceFromOrigin.distanceValue
                                  )}
                                </span>{" "}
                                km {t("translation:find.distanceOrigin")}
                              </small>
                              <p className="mb-0">
                                <ArrowDownIcon
                                  size={24}
                                  className="text-success"
                                />
                              </p>
                            </Col>
                          </Row>
                          <Row className="align-items-center mb-2">
                            <Col xs={2} className="px-0">
                              <p className="smaller line-height-md text-secondary text-end mb-0">
                                {dateFormat(
                                  ride.rideDetails.dateTimeDestination,
                                  "hh:MM TT"
                                )}
                              </p>
                            </Col>
                            <Col>
                              <p className="line-height-md mb-0">
                                <strong>
                                  {ride.rideDetails.destination.placeName}
                                </strong>
                                ,{" "}
                                <small>
                                  {ride.rideDetails.destination.placeDetails}
                                </small>
                              </p>
                              <small className="smaller text-secondary">
                                <span className="text-primary">
                                  {formatDistance(
                                    ride.distanceFromDestination.distanceValue
                                  )}
                                </span>{" "}
                                km {t("translation:find.distanceDestination")}
                              </small>
                            </Col>
                          </Row>
                          <Row className="align-items-center">
                            <Col xs={2} className="">
                              <p className="text-end mb-0">
                                <img
                                  src={srcAvatar(ride.rideDetails.Driver.User)}
                                  alt="Avatar"
                                  className="img-fluid cursor-pointer avatar-img-sm me-2"
                                />
                              </p>
                            </Col>
                            <Col xs={6} className="ps-0">
                              <p className="mb-0">
                                {ride.rideDetails.Driver.User.firstName}
                              </p>
                              <DisplayRating
                                rating={ride.rideDetails.Driver.User.Rating}
                                type="driver"
                              />
                            </Col>
                            <Col xs={4} className="text-center">
                              <p className="line-height-sm mb-0">
                                <span className="fw-bold mb-0">
                                  {formatPrice(ride.rideDetails.price)}
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
                  className="container-box bg-white mx-auto"
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
          <Redirect to="/find" />
        )}
      </Container>
    </>
  );
};

export default SearchResults;
