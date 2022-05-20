import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ChevronRightIcon,
  ArrowDownIcon,
  // StarFillIcon,
  CircleIcon,
  LinkExternalIcon,
} from "@primer/octicons-react";
import dateFormat from "dateformat";

import ManageDriverBooking from "../components/ManageDriverBooking";
import ManagePassengerBooking from "../components/ManagePassengerBooking";
import LoadingSpinner from "../components/LoadingSpinner";
import FormBookRide from "../components/FormBookRide";

import PassengersDetails from "../components/PassengersDetails";
import GoBack from "../components/GoBack";
import MessageEmpty from "../components/MessageEmpty";
import FormConfirmRide from "../components/FormConfirmRide";
import SendMessageButton from "../components/SendMessageButton";

import { getRide, getUserBookingRide, getRidesToConfirm } from "../redux";

const Ride = () => {
  const { t } = useTranslation();
  const { rideId } = useParams();

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { rideStatusVariant, isDateInPast } = useSelector(
    (state) => state.global
  );
  const {
    isloadingRide,
    rideData,
    isloadingUserRideBookingList,
    userRideBookingData,
    isLoadingRidesToConfirm,
    ridesToConfirmData,
  } = useSelector((state) => state.ride);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getRide(rideId));
      dispatch(getRidesToConfirm(currentUser.id));
      dispatch(getUserBookingRide(currentUser.id, rideId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rideToConfirm = () => {
    return ridesToConfirmData.find((ride) => ride.id === parseInt(rideId));
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <GoBack />

      <Container className="mb-5">
        {isloadingRide ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : rideData.ride ? (
          <div data-aos="fade-in">
            <Row>
              <Col>
                <h1 className="title text-center">
                  {t("translation:ride.title")}
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
                className="border shadow-sm rounded mx-auto"
              >
                <Container className="py-3 px-2">
                  <Row className="mb-2">
                    <Col className="text-center">
                      <p className="mb-0">
                        {dateFormat(rideData.ride.dateTime, "dd/mm/yyyy")}
                      </p>
                      <p className="fw-bold text-success mb-0">
                        {dateFormat(rideData.ride.dateTime, "hh:MM TT")}
                      </p>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col className="text-center">
                      <h2 className="fw-bold mb-0">
                        {rideData.ride.origin.city}
                      </h2>
                      <p className="small mb-0">
                        {rideData.ride.origin.province}
                      </p>

                      <ArrowDownIcon size={24} className="text-success" />

                      <h2 className="fw-bold mb-0">
                        {rideData.ride.destination.city}
                      </h2>
                      <p className="small mb-0">
                        {rideData.ride.destination.province}
                      </p>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col className="text-center">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&origin=${rideData.ride.origin.address}&destination=${rideData.ride.destination.address}&travelmode=driving`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline-success">
                          {t("translation:ride.viewTrip")}
                          <LinkExternalIcon size={24} className="ms-2" />
                        </Button>
                      </a>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>

            {!isLoadingRidesToConfirm && rideToConfirm() ? (
              <Row className="mb-2 mx-1 mx-sm-0">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  xl={4}
                  className="border border-2 border-warning shadow-sm rounded mx-auto"
                >
                  <Container className="py-3 px-2">
                    <Row>
                      <Col>
                        <h3 className="text-center">
                          {t("translation:ride.reviewRide")}
                        </h3>
                      </Col>
                    </Row>

                    <FormConfirmRide ride={rideToConfirm()} />
                  </Container>
                </Col>
              </Row>
            ) : null}

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
                  <Row className="align-items-center">
                    <Col xs={6} className="text-center">
                      <p className="mb-0">
                        {t("translation:global.seatsAvailable")}:
                      </p>
                      <p className="mb-0">
                        <span className="text-success">
                          {rideData.ride.seatsLeft}
                        </span>{" "}
                        / {rideData.ride.seatsAvailable}
                      </p>
                    </Col>
                    <Col xs={6} className="text-center">
                      <p className="mb-0">
                        {t("translation:global.status")}:{" "}
                        <span
                          className={`text-${rideStatusVariant(
                            rideData.ride.RideStatus.id
                          )}`}
                        >
                          {rideData.ride.RideStatus.name}
                        </span>
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>

            {/* Display past booking for this ride by this user */}
            {!(rideData.ride.DriverId === currentUser.id) ? (
              <>
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
                      <LinkContainer
                        to="/coming-soon"
                        className="cursor-pointer"
                      >
                        <Row className="align-items-center mb-3">
                          <Col xs={3} md={2} className="text-end pe-0">
                            <CircleIcon size={56} className="text-secondary" />
                          </Col>
                          <Col xs={6} className="text-start">
                            <p className="mb-0">
                              {rideData.ride.Driver.User.firstName}
                            </p>
                            {/* RATINGS */}
                            {/* <p className="mb-0">
                              <StarFillIcon
                                size={18}
                                verticalAlign="middle"
                                className="text-warning me-2"
                              />

                              <span>-/5 | - ratings</span>
                            </p> */}
                          </Col>
                          <Col className="text-end">
                            <ChevronRightIcon
                              size={24}
                              verticalAlign="middle"
                            />
                          </Col>
                        </Row>
                      </LinkContainer>
                      <Row>
                        <Col>
                          <SendMessageButton
                            type="link"
                            driverId={rideData.ride.DriverId}
                            userId={currentUser.id}
                            receiverName={rideData.ride.Driver.User.firstName}
                            rideId={rideData.ride}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {!(rideData.ride.comment === "") ? (
                            <>
                              <hr />
                              <p className="mb-0">
                                {t("translation:global.comment")}:{" "}
                                {rideData.ride.comment}
                              </p>
                            </>
                          ) : null}
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>

                {!isloadingUserRideBookingList &&
                userRideBookingData.length > 0 ? (
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
                          <Col>
                            <p className="lead">
                              {t("translation:global.bookings")}
                            </p>
                          </Col>
                        </Row>

                        <ManagePassengerBooking rideId={rideId} />
                      </Container>
                    </Col>
                  </Row>
                ) : null}

                {/* If it is not a past ride, and if there are still */}
                {/* seats left, users can book */}
                {!isDateInPast(new Date(rideData.ride.dateTime), new Date()) &&
                rideData.ride.seatsLeft > 0 ? (
                  <Row className="mb-2 mx-1 mx-sm-0">
                    <Col
                      xs={12}
                      sm={10}
                      md={8}
                      lg={6}
                      className="border shadow-sm rounded mx-auto"
                    >
                      <Container className="py-3 px-2">
                        <Row>
                          <Col>
                            <p className="lead">
                              {t("translation:ride.bookThisRide")}
                            </p>
                          </Col>
                        </Row>

                        <FormBookRide rideId={rideId} />
                      </Container>
                    </Col>
                  </Row>
                ) : null}
              </>
            ) : (
              <>
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
                        <Col>
                          <p className="lead">
                            {t("translation:ride.manageBookingRequests")}
                          </p>
                        </Col>
                      </Row>

                      <ManageDriverBooking rideId={rideId} />
                    </Container>
                  </Col>
                </Row>

                {!isDateInPast(new Date(rideData.ride.dateTime), new Date()) &&
                rideData.ride.seatsLeft === 0 ? (
                  <Row className="mb-2 mx-1 mx-sm-0">
                    <Col
                      xs={12}
                      sm={10}
                      md={8}
                      lg={6}
                      xl={4}
                      className="border border-success shadow-sm rounded mx-auto"
                    >
                      <Container fluid className="p-2">
                        <Row>
                          <Col className="text-center ">
                            <h1 className="text-success fw-light mb-0">
                              {t("translation:global.congratulations")}
                            </h1>
                            <p className="fw-light mb-0">
                              {t("translation:ride.allSeatsBooked")}
                            </p>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                  </Row>
                ) : null}

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
                        <Col>
                          <p className="lead mb-0">
                            {t("translation:global.passengerDetails")}
                          </p>
                        </Col>
                      </Row>

                      <PassengersDetails rideId={rideId} />
                    </Container>
                  </Col>
                </Row>
              </>
            )}
          </div>
        ) : (
          <Row>
            <Col className="text-center">
              <MessageEmpty title="ride" />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Ride;
