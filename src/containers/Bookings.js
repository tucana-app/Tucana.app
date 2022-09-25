import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Col, Container, Row, Button, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ChevronRightIcon, DotFillIcon } from "@primer/octicons-react";
import dateFormat from "dateformat";

import GoBack from "../components/GoBack";
import LoadingSpinner from "../components/LoadingSpinner";

import { getUserBookings } from "../redux";
import { ChevronRight } from "react-bootstrap-icons";
import { isDateInPast } from "../helpers";

const Bookings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { bookingStatusVariant, rideStatusVariant } = useSelector(
    (state) => state.global
  );
  const { isLoadingUserBookings, userBookingsData } = useSelector(
    (state) => state.ride
  );

  const countBookingsPending = (bookings) => {
    const bks = bookings.filter(
      (booking) =>
        isDateInPast(new Date(), booking.Ride.dateTimeOrigin) &&
        booking.BookingStatus.id === 1
    );

    return bks.length;
  };

  const countBookingsAccepted = (bookings) => {
    const bks = bookings.filter((booking) => {
      return (
        isDateInPast(new Date(), booking.Ride.dateTimeOrigin) &&
        booking.BookingStatus.id === 3
      );
    });
    return bks.length;
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserBookings(currentUser.id));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="mb-5">
        <Row className="justify-content-center text-center mb-3">
          <Col>
            <h1 className="title mb-0">{t("translation:global.bookings")}</h1>
            <p className="lead">{t("translation:bookings.subTitle")}</p>
          </Col>
        </Row>

        {isLoadingUserBookings ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : userBookingsData.length > 0 ? (
          <>
            {countBookingsAccepted(userBookingsData) > 0 ? (
              <>
                <Row>
                  <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
                    <p className="text-success mb-1">
                      {t("translation:global.bookings")}{" "}
                      <span className="text-lowercase">
                        {t("translation:global.accepted")}
                      </span>
                    </p>
                  </Col>
                </Row>

                {userBookingsData.map((booking, index) =>
                  isDateInPast(new Date(), booking.Ride.dateTimeOrigin) &&
                  booking.BookingStatus.id === 3 ? (
                    <Row key={index} className="mb-2 mx-1 mx-sm-0">
                      <Col
                        xs={12}
                        sm={10}
                        md={8}
                        lg={6}
                        xl={4}
                        className="container-box"
                      >
                        <Container className="mt-1 px-0">
                          <LinkContainer
                            to={`/booking/${booking.id}`}
                            className="cursor-pointer"
                          >
                            <Row className="align-items-center mx-2 my-1">
                              <Col xs={5} className="text-center">
                                <p className="fw-bold mb-0">
                                  {booking.Ride.origin.city}
                                </p>
                                <p className="small mb-0">
                                  {booking.Ride.origin.province}
                                </p>
                              </Col>
                              <Col xs={1} className="text-lowercase">
                                {t("translation:global.to")}
                              </Col>
                              <Col xs={5} className="text-center">
                                <p className="fw-bold mb-0">
                                  {booking.Ride.destination.city}
                                </p>
                                <p className="small mb-0">
                                  {booking.Ride.destination.province}
                                </p>
                              </Col>
                              <Col xs={1}>
                                <ChevronRight />
                              </Col>
                            </Row>
                          </LinkContainer>

                          <Row className="small justify-content-center border border-start-0 border-end-0 mx-0 py-1">
                            <Col xs={6}>
                              <p className="mb-0">
                                {t("translation:global.seat")}
                                {booking.seatsBooked > 1 ? "s" : null}:{" "}
                                <span className="text-success">
                                  {booking.seatsBooked}
                                </span>
                              </p>
                            </Col>

                            <Col xs={6}>
                              <p className="mb-0">
                                {t("translation:global.status")}:{" "}
                                <span
                                  className={`text-${bookingStatusVariant(
                                    booking.BookingStatus.id
                                  )}`}
                                >
                                  <DotFillIcon
                                    size="16"
                                    verticalAlign="middle"
                                  />
                                  {booking.BookingStatus.name}
                                </span>
                              </p>
                            </Col>
                          </Row>

                          <Row className="small text-secondary justify-content-center border border-start-0 border-end-0 mx-0 py-1">
                            <Col xs={6}>
                              <p className="mb-0">
                                {t("translation:global.ride")}:{" "}
                                {dateFormat(
                                  booking.Ride.dateTimeOrigin,
                                  "dd/mm/yyyy"
                                )}
                              </p>
                            </Col>

                            <Col xs={6}>
                              <p className="mb-0">
                                {t("translation:global.status")}:{" "}
                                <span
                                  className={`text-${rideStatusVariant(
                                    booking.Ride.RideStatus.id
                                  )}`}
                                >
                                  <DotFillIcon
                                    size="16"
                                    verticalAlign="middle"
                                  />
                                  {booking.Ride.RideStatus.name}
                                </span>
                              </p>
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  ) : null
                )}
              </>
            ) : null}

            {countBookingsPending(userBookingsData) > 0 ? (
              <>
                <Row className="mt-4">
                  <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
                    <p className="text-warning mb-1">
                      {t("translation:global.bookings")}{" "}
                      <span className="text-lowercase">
                        {t("translation:global.pending")}
                      </span>
                    </p>
                  </Col>
                </Row>

                {userBookingsData.map((booking, index) =>
                  isDateInPast(new Date(), booking.Ride.dateTimeOrigin) &&
                  booking.BookingStatus.id === 1 ? (
                    <Row key={index} className="mb-2 mx-1 mx-sm-0">
                      <Col
                        xs={12}
                        sm={10}
                        md={8}
                        lg={6}
                        xl={4}
                        className="border shadow-sm rounded mx-auto px-0 mb-2"
                      >
                        <Container className="mt-1 px-0">
                          <LinkContainer
                            to={`/booking/${booking.id}`}
                            className="cursor-pointer"
                          >
                            <Row className="align-items-center mx-2 my-1">
                              <Col xs={5} className="text-center">
                                <p className="fw-bold mb-0">
                                  {booking.Ride.origin.city}
                                </p>
                                <p className="small mb-0">
                                  {booking.Ride.origin.province}
                                </p>
                              </Col>
                              <Col xs={1} className="text-lowercase">
                                {t("translation:global.to")}
                              </Col>
                              <Col xs={5} className="text-center">
                                <p className="fw-bold mb-0">
                                  {booking.Ride.destination.city}
                                </p>
                                <p className="small mb-0">
                                  {booking.Ride.destination.province}
                                </p>
                              </Col>
                              <Col xs={1}>
                                <ChevronRight />
                              </Col>
                            </Row>
                          </LinkContainer>

                          <Row className="small justify-content-center border border-start-0 border-end-0 mx-0 py-1">
                            <Col xs={6}>
                              <p className="mb-0">
                                {t("translation:global.seat")}
                                {booking.seatsBooked > 1 ? "s" : null}:{" "}
                                <span className="text-success">
                                  {booking.seatsBooked}
                                </span>
                              </p>
                            </Col>

                            <Col xs={6}>
                              <p className="mb-0">
                                {t("translation:global.status")}:{" "}
                                <span
                                  className={`text-${bookingStatusVariant(
                                    booking.BookingStatus.id
                                  )}`}
                                >
                                  <DotFillIcon
                                    size="16"
                                    verticalAlign="middle"
                                  />
                                  {booking.BookingStatus.name}
                                </span>
                              </p>
                            </Col>
                          </Row>

                          <Row className="small text-secondary justify-content-center border border-start-0 border-end-0 mx-0 py-1">
                            <Col xs={6}>
                              <p className="mb-0">
                                {t("translation:global.ride")}:{" "}
                                {dateFormat(
                                  booking.Ride.dateTimeOrigin,
                                  "dd/mm/yyyy"
                                )}
                              </p>
                            </Col>

                            <Col xs={6}>
                              <p className="mb-0">
                                {t("translation:global.status")}:{" "}
                                <span
                                  className={`text-${rideStatusVariant(
                                    booking.Ride.RideStatus.id
                                  )}`}
                                >
                                  <DotFillIcon
                                    size="16"
                                    verticalAlign="middle"
                                  />
                                  {booking.Ride.RideStatus.name}
                                </span>
                              </p>
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  ) : null
                )}
              </>
            ) : null}

            <Row className="mt-5">
              <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
                <Link to="/past-bookings" className="text-decoration-none">
                  <ListGroup.Item className="border-0 px-2">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <p className="mb-0">
                        {t("translation:global.pastBookings")}
                      </p>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col className="text-center">
              <p>{t("translation:bookings.noBookings")}</p>
              <Link to="/find">
                <Button variant="success">
                  {t("translation:global.bookRide")}
                </Button>
              </Link>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Bookings;
