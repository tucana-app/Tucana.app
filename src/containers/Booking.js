import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import dateFormat from "dateformat";
import { ChevronRightIcon, DotFillIcon } from "@primer/octicons-react";
import { useTranslation } from "react-i18next";

import LoadingSpinner from "../components/LoadingSpinner";
import FormDriverResponseBooking from "../components/FormDriverResponseBooking";

import GoBack from "../components/GoBack";
import SendMessageButton from "../components/SendMessageButton";
import DisplayRating from "../components/DisplayRating";

import { getBooking } from "../redux";
import { formatPrice, isDateInPast } from "../helpers";
import RideDetails from "../components/RideDetails";

const Booking = () => {
  const { t } = useTranslation();
  const { bookingId } = useParams();

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { srcAvatar } = useSelector((state) => state.global);
  const { bookingStatusVariant } = useSelector((state) => state.global);
  const { isloadingBooking, bookingData, bookingError } = useSelector(
    (state) => state.ride
  );

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
        ) : bookingData.id ? (
          currentUser.id === bookingData.User.id ||
          (currentUser.Driver &&
            currentUser.Driver.id === bookingData.DriverId) ? (
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
                              <strong>{bookingData.User.firstName} </strong>{" "}
                              {t("translation:booking.summary2")}
                            </>
                          )}{" "}
                          <strong>{bookingData.seatsBooked}</strong>{" "}
                          <span className="text-lowercase">
                            {t("translation:global.seat")}
                          </span>
                          {bookingData.seatsBooked > 1 ? "s" : null}{" "}
                          {t("translation:global.to")}{" "}
                          <strong>{bookingData.Ride.destination.city}</strong>{" "}
                          {t("translation:booking.summary4")}{" "}
                          {dateFormat(
                            bookingData.Ride.dateTimeOrigin,
                            "dd/mm/yy"
                          )}
                        </p>
                        <p className="mb-0">
                          {t("translation:global.status")}:{" "}
                          <span
                            className={`fw-bold text-${bookingStatusVariant(
                              bookingData.BookingStatusId
                            )}`}
                          >
                            <DotFillIcon size="16" verticalAlign="middle" />
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
                        {currentUser.Driver &&
                        currentUser.Driver.id === bookingData.DriverId ? (
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
                      <Col xs={7}>
                        <h1 className="mb-0">
                          {t("translation:global.total")}
                        </h1>
                      </Col>
                      <Col xs={5} className="text-center">
                        <h2 className="mb-0">
                          {currentUser.Driver &&
                          currentUser.Driver.id !== bookingData.DriverId
                            ? formatPrice(bookingData.totalPaidPassenger)
                            : formatPrice(bookingData.totalReceivedDriver)}
                        </h2>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>

              {/* If not a past booking */}
              {/* and the booking is still pending approval */}
              {currentUser.Driver &&
              currentUser.Driver.id === bookingData.DriverId &&
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

              {currentUser.Driver &&
              currentUser.Driver.id !== bookingData.DriverId ? (
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
                        to={`/driver/${bookingData.Ride.Driver.User.username}`}
                        className="cursor-pointer"
                      >
                        <Row className="align-items-center">
                          <Col xs={3} md={2} className="pe-0">
                            <img
                              src={srcAvatar(bookingData.Ride.Driver.User)}
                              alt="Avatar"
                              className="img-fluid rounded-round cursor-pointer img-avatar"
                            />
                          </Col>
                          <Col xs={6} className="text-start ps-0">
                            <p className="mb-0">
                              {bookingData.Ride.Driver.User.firstName}
                            </p>
                            <DisplayRating
                              rating={bookingData.Ride.Driver.User.Rating}
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

              <Row>
                <Col>
                  <h4 className="text-success text-center mt-3">
                    {t("translation:booking.rideDetails")}
                  </h4>
                </Col>
              </Row>

              <RideDetails ride={bookingData.Ride} />

              <Row>
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
            </div>
          ) : (
            // Viewer not the driver nor a passenger
            // Not authorized to see the booking's details
            <Redirect to="/bookings" />
          )
        ) : bookingError ? (
          <Redirect to="/" />
        ) : null}
      </Container>
    </div>
  );
};

export default Booking;
