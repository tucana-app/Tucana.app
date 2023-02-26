import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import dateFormat from "dateformat";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";
import MessageEmpty from "../../components/MessageEmpty";

import { getDriverBookings } from "../../redux";
import { ChevronRightIcon, DotFillIcon } from "@primer/octicons-react";
import { ChevronRight } from "react-bootstrap-icons";
import { isDateInPast } from "../../helpers";

const DriverBookings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingDriverBookings, driverBookingsData } = useSelector(
    (state) => state.ride
  );
  const { bookingStatusVariant } = useSelector((state) => state.global);

  const countBookingsPending = (bookings) => {
    const bks = bookings.filter(
      (booking) =>
        isDateInPast(new Date(), booking.Ride.dateTimeOrigin) &&
        booking.BookingStatus.id === 1
    );

    return bks.length;
  };

  const countBookingsAccepted = (bookings) => {
    const bks = bookings.filter(
      (booking) =>
        isDateInPast(new Date(), booking.Ride.dateTimeOrigin) &&
        booking.BookingStatus.id === 3
    );
    return bks.length;
  };

  useEffect(() => {
    if (isLoggedIn && currentUser.Driver) {
      dispatch(getDriverBookings(currentUser.Driver.id));
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
            <h1 className="title mb-0">
              {" "}
              {t("translation:ridesBookings.title")}
            </h1>
            <p className="lead">{t("translation:ridesBookings.subTitle")}</p>
          </Col>
        </Row>

        {isLoadingDriverBookings ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : driverBookingsData.length > 0 ? (
          <>
            {countBookingsPending(driverBookingsData) > 0 ? (
              <>
                <Row>
                  <Col
                    xs={12}
                    sm={10}
                    md={8}
                    lg={6}
                    xl={4}
                    className="text-center mx-auto"
                  >
                    <p className="text-warning mb-1">
                      {t("translation:global.bookings")}{" "}
                      <span className="text-lowercase">
                        {t("translation:global.pending")}
                      </span>
                    </p>
                  </Col>
                </Row>

                {driverBookingsData.map((booking, index) =>
                  isDateInPast(new Date(), booking.Ride.dateTimeOrigin) &&
                  booking.BookingStatus.id === 1 ? (
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
                          <Link
                            to={`/booking/${booking.id}`}
                            className="text-decoration-none link-dark"
                          >
                            <Row className="align-items-center mx-0">
                              <Col className="ms-2">
                                <small className="text-secondary">
                                  {dateFormat(booking.createdAt, "dd/mm/yyyy")}
                                </small>
                                <p className="mb-1">
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
                                      {{
                                        cityOrigin:
                                          booking.Ride.origin.placeName,
                                      }}
                                    </strong>{" "}
                                    to{" "}
                                    <strong>
                                      {{
                                        cityDestination:
                                          booking.Ride.destination.placeName,
                                      }}
                                    </strong>
                                  </Trans>
                                </p>
                              </Col>
                              <Col xs={2} className="text-center rounded">
                                <ChevronRight />
                              </Col>
                            </Row>
                          </Link>

                          <Row className="justify-content-center border border-bottom-0 border-start-0 border-end-0 mx-0">
                            <Col xs={12} className="ms-2">
                              <small className="text-secondary mb-0">
                                {t("translation:global.booking")}:
                              </small>
                              <small
                                className={`text-${bookingStatusVariant(
                                  booking.BookingStatusId
                                )}`}
                              >
                                <DotFillIcon size="16" verticalAlign="middle" />
                                {t(
                                  `translation:global.statuses.booking.${booking.BookingStatus.id}`
                                )}
                              </small>
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  ) : null
                )}
              </>
            ) : null}

            {countBookingsAccepted(driverBookingsData) > 0 ? (
              <>
                <Row className="mt-4">
                  <Col
                    xs={12}
                    sm={10}
                    md={8}
                    lg={6}
                    xl={4}
                    className="text-center mx-auto"
                  >
                    <p className="text-success mb-1">
                      {t("translation:global.bookings")}{" "}
                      <span className="text-lowercase">
                        {t("translation:global.accepted")}
                      </span>
                    </p>
                  </Col>
                </Row>

                {driverBookingsData.map((booking, index) =>
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
                          <Link
                            to={`/booking/${booking.id}`}
                            className="text-decoration-none link-dark"
                          >
                            <Row className="align-items-center mx-0">
                              <Col className="ms-2">
                                <small className="text-secondary">
                                  {dateFormat(booking.createdAt, "dd/mm/yyyy")}
                                </small>
                                <p className="mb-1">
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
                                      {{
                                        cityOrigin:
                                          booking.Ride.origin.placeName,
                                      }}
                                    </strong>{" "}
                                    to{" "}
                                    <strong>
                                      {{
                                        cityDestination:
                                          booking.Ride.destination.placeName,
                                      }}
                                    </strong>
                                  </Trans>
                                </p>
                              </Col>
                              <Col xs={2} className="text-center rounded">
                                <ChevronRight />
                              </Col>
                            </Row>
                          </Link>

                          <Row className="justify-content-center border border-bottom-0 border-start-0 border-end-0 mx-0">
                            <Col className="ms-2">
                              <small className="text-secondary mb-0">
                                {t("translation:global.booking")}:
                              </small>
                              <small
                                className={`text-${bookingStatusVariant(
                                  booking.BookingStatusId
                                )}`}
                              >
                                <DotFillIcon size="16" verticalAlign="middle" />
                                {t(
                                  `translation:global.statuses.booking.${booking.BookingStatus.id}`
                                )}
                              </small>
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
                <Link
                  to="/driver/past-bookings"
                  className="text-decoration-none"
                >
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
              <MessageEmpty title="bookings" />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default DriverBookings;
