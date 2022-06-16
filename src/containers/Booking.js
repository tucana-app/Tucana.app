import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import dateFormat from "dateformat";
import {
  // StarFillIcon,
  ChevronRightIcon,
} from "@primer/octicons-react";
import { useTranslation } from "react-i18next";

import LoadingSpinner from "../components/LoadingSpinner";
import FormDriverResponseBooking from "../components/FormDriverResponseBooking";

import MessageEmpty from "../components/MessageEmpty";
import GoBack from "../components/GoBack";
import SendMessageButton from "../components/SendMessageButton";
import DisplayRating from "../components/DisplayRating";

import { getBooking } from "../redux";
import { isEmptyObject, isDateInPast } from "../helpers";
import RideDetails from "../components/RideDetails";
import { PersonCircle } from "react-bootstrap-icons";

const Booking = () => {
  const { t } = useTranslation();
  const { bookingId } = useParams();

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { bookingStatusVariant, rideStatusVariant } = useSelector(
    (state) => state.global
  );
  const { isloadingBooking, bookingData } = useSelector((state) => state.ride);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getBooking(bookingId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <GoBack />

      <Container className="mb-5">
        {isloadingBooking ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : !isEmptyObject(bookingData) && bookingData !== null ? (
          currentUser.id === bookingData.User.id ||
          currentUser.id === bookingData.DriverId ? (
            <div data-aos="fade-in">
              <h2 className="text-success text-center">
                {t("translation:booking.title")}
              </h2>

              <Row className="mb-3 mx-1 mx-sm-0">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  xl={4}
                  className="border shadow rounded-5 mx-auto"
                >
                  <Container className="py-3 px-2">
                    <Row className="align-items-center">
                      <Col>
                        <p>
                          {currentUser.id === bookingData.User.id ? (
                            t("translation:booking.summary1")
                          ) : (
                            <>
                              <span className="text-success">
                                {bookingData.User.firstName}{" "}
                              </span>{" "}
                              {t("translation:booking.summary2")}
                            </>
                          )}{" "}
                          <span className="text-success">
                            {bookingData.seatsBooked}
                          </span>{" "}
                          {t("translation:global.seat")}
                          {bookingData.seatsBooked > 1 ? "s" : null} to{" "}
                          <span className="text-success">
                            {bookingData.Ride.destination.city}
                          </span>{" "}
                          {t("translation:booking.summary4")}{" "}
                          {dateFormat(
                            bookingData.Ride.dateTimeOrigin,
                            "dd/mm/yy"
                          )}
                        </p>
                        <p className="mb-0">
                          {t("translation:global.status")}:{" "}
                          <span
                            className={`text-${bookingStatusVariant(
                              bookingData.BookingStatusId
                            )}`}
                          >
                            {bookingData.BookingStatus.name}
                          </span>
                        </p>
                        {bookingData.commentPassenger !== "" &&
                        bookingData.commentPassenger !== null ? (
                          <>
                            <p className="mt-3 mb-0">
                              {t("translation:global.passengerComment")}:{" "}
                            </p>
                            <p>"{bookingData.commentPassenger}"</p>
                          </>
                        ) : null}
                        {bookingData.commentDriver !== "" &&
                        bookingData.commentDriver !== null ? (
                          <>
                            <p className="mt-3 mb-0">
                              {t("translation:global.driverComment")}:{" "}
                            </p>
                            <p className="mb-0">
                              "{bookingData.commentDriver}"
                            </p>
                          </>
                        ) : null}
                        {currentUser.id === bookingData.DriverId ? (
                          <p className="mt-2 mb-0">
                            <SendMessageButton
                              type="link"
                              driverId={bookingData.DriverId}
                              userId={bookingData.UserId}
                              receiverName={bookingData.User.firstName}
                              rideId={bookingData.Ride}
                            />
                          </p>
                        ) : null}
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>

              {/* If not a past booking */}
              {/* and the booking is still pending approval */}
              {currentUser.id === bookingData.DriverId &&
              !isDateInPast(bookingData.Ride.dateTimeOrigin, new Date()) &&
              bookingData.BookingStatusId === 1 ? (
                <Row className="mb-3 mx-1 mx-sm-0">
                  <Col
                    xs={12}
                    sm={10}
                    md={8}
                    lg={6}
                    xl={4}
                    className="border shadow rounded-5 mx-auto"
                  >
                    <Container className="py-3 px-2">
                      <FormDriverResponseBooking bookingId={bookingId} />
                    </Container>
                  </Col>
                </Row>
              ) : null}

              {currentUser.id !== bookingData.DriverId ? (
                <Row className="mb-4 mx-1 mx-sm-0">
                  <Col
                    xs={12}
                    sm={10}
                    md={8}
                    lg={6}
                    xl={4}
                    className="border shadow rounded-5 mx-auto"
                  >
                    <Container className="py-3 px-2">
                      <LinkContainer
                        to="/coming-soon"
                        className="cursor-pointer"
                      >
                        <Row className="align-items-center">
                          <Col xs={3} md={2} className="text-end pe-0">
                            <PersonCircle
                              size={48}
                              className="text-secondary"
                            />
                          </Col>
                          <Col xs={6} className="text-start">
                            <p className="mb-0">
                              {bookingData.Ride.Driver.User.firstName}
                            </p>
                            <DisplayRating
                              user={bookingData.Ride.Driver.User}
                              type="driver"
                            />
                          </Col>
                          <Col className="text-end">
                            <ChevronRightIcon
                              size={24}
                              verticalAlign="middle"
                            />
                          </Col>
                        </Row>
                      </LinkContainer>
                      {currentUser.id === bookingData.User.id ? (
                        <Row className="mt-3">
                          <Col>
                            <SendMessageButton
                              type="link"
                              driverId={bookingData.Ride.DriverId}
                              userId={currentUser.id}
                              receiverName={
                                bookingData.Ride.Driver.User.firstName
                              }
                              rideId={bookingData.Ride}
                            />
                          </Col>
                        </Row>
                      ) : null}
                    </Container>
                  </Col>
                </Row>
              ) : null}

              <h2 className="text-success text-center mt-3">
                {t("translation:booking.rideDetails")}
              </h2>

              <RideDetails ride={bookingData.Ride} />

              <Row className="mb-3 mx-1 mx-sm-0">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  xl={4}
                  className="border shadow rounded-5 mx-auto"
                >
                  <Container className="py-3 px-2">
                    <Row className="align-items-center">
                      <Col xs={6} className="text-center">
                        <p className="mb-0">
                          {t("translation:global.seatsAvailable")}:
                        </p>
                        <p className="mb-0">
                          <span className="text-success">
                            {bookingData.Ride.seatsLeft}
                          </span>{" "}
                          / {bookingData.Ride.seatsAvailable}
                        </p>
                      </Col>
                      <Col xs={6} className="text-center">
                        <p className="mb-0">
                          {t("translation:global.status")}:{" "}
                          <span
                            className={`text-${rideStatusVariant(
                              bookingData.Ride.RideStatus.id
                            )}`}
                          >
                            {bookingData.Ride.RideStatus.name}
                          </span>
                        </p>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col className="text-center">
                        <LinkContainer
                          to={`/ride/${bookingData.RideId}`}
                          className="cursor-pointer"
                        >
                          <Button variant="success">
                            {t("translation:global.seeRide")}
                          </Button>
                        </LinkContainer>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </div>
          ) : (
            // Viewer not the driver nor a passenger
            // Not authorized to see the booking's details
            <Redirect to="/bookings" />
          )
        ) : (
          <Row>
            <Col className="text-center">
              <MessageEmpty title="booking" />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Booking;
