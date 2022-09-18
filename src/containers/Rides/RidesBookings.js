import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import dateFormat from "dateformat";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";
import MessageEmpty from "../../components/MessageEmpty";

import { getDriverBookings } from "../../redux";

const RidesBookings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingDriverBookingsList, driverBookingsData } = useSelector(
    (state) => state.ride
  );
  const { bookingStatusVariant, rideStatusVariant } = useSelector(
    (state) => state.global
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getDriverBookings(currentUser.id));
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
        {isLoadingDriverBookingsList ? (
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
                  <h1 className="title text-success mb-0">
                    {t("translation:ridesBookings.title")}
                  </h1>
                  <p className="lead">
                    {t("translation:ridesBookings.subTitle")}
                  </p>
                </div>
              </Col>
            </Row>

            {driverBookingsData.length > 0 ? (
              <>
                {driverBookingsData.map(
                  (booking, index) => (
                    // !isDateInPast(booking.Ride.dateTimeOrigin, new Date()) &&
                    // booking.BookingStatusId < 3 &&
                    // booking.Ride.seatsLeft > 0 ? (
                    <Row key={index} className="mb-2 mx-1 mx-sm-0">
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
                            <Col>
                              <p>
                                <Trans i18nKey="translation:ridesBookings.summary">
                                  <strong>
                                    {{ firstName: booking.User.firstName }}
                                  </strong>
                                  booked
                                  <strong>
                                    {{ seatsBooked: booking.seatsBooked }}
                                  </strong>{" "}
                                  seat(s) from{" "}
                                  <strong>
                                    {{ cityOrigin: booking.Ride.origin.city }}
                                  </strong>{" "}
                                  to{" "}
                                  <strong>
                                    {{
                                      cityDestination:
                                        booking.Ride.destination.city,
                                    }}
                                  </strong>
                                </Trans>
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p>
                                <span className="text-secondary">
                                  {t("translation:global.date")}:
                                </span>{" "}
                                {dateFormat(booking.createdAt, "dd/mm/yyyy")}
                              </p>
                              <p>
                                <span className="text-secondary">
                                  {t("translation:global.booking")}:
                                </span>{" "}
                                <span
                                  className={`fw-bold text-${bookingStatusVariant(
                                    booking.BookingStatusId
                                  )}`}
                                >
                                  {booking.BookingStatus.name}
                                </span>
                              </p>

                              <p>
                                <span className="text-secondary">
                                  {t("translation:global.ride")}:
                                </span>{" "}
                                <span
                                  className={`fw-bold text-${rideStatusVariant(
                                    booking.Ride.RideStatusId
                                  )}`}
                                >
                                  {booking.Ride.RideStatus.name}
                                </span>
                              </p>
                            </Col>
                          </Row>

                          <Row>
                            <Col xs={12} className="text-center mb-2">
                              <LinkContainer
                                to={`/ride/${booking.RideId}`}
                                className="me-3"
                              >
                                <Button variant="outline-success">
                                  {t("translation:global.seeRide")}
                                </Button>
                              </LinkContainer>
                              <LinkContainer to={`/booking/${booking.id}`}>
                                <Button variant="success">
                                  {t("translation:global.seeBooking")}
                                </Button>
                              </LinkContainer>
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  )
                  // ) : null
                )}
              </>
            ) : (
              <Row>
                <Col className="text-center">
                  <MessageEmpty title="bookings" />
                </Col>
              </Row>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default RidesBookings;
