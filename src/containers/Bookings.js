import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@primer/octicons-react";
import dateFormat from "dateformat";

import GoBack from "../components/GoBack";
import LoadingSpinner from "../components/LoadingSpinner";

import { getUserBookings } from "../redux";

const Bookings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { bookingStatusVariant, isDateInPast } = useSelector(
    (state) => state.global
  );
  const { isLoadingUserBookings, userBookingsData } = useSelector(
    (state) => state.ride
  );

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
        <Row className="justify-content-center mb-4">
          <Col className="text-center">
            <div>
              <h1 className="title mb-0">{t("translation:global.bookings")}</h1>
              <p className="lead">{t("translation:bookings.subTitle")}</p>
            </div>
          </Col>
        </Row>

        {isLoadingUserBookings ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : userBookingsData.length > 0 ? (
          userBookingsData.map((booking, index) => (
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
                  <Row className="mb-3">
                    <Col>
                      <h4 className="text-center">
                        {dateFormat(booking.createdAt, "dd/mm/yyyy")}
                      </h4>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col className="text-center">
                      <p className="mb-0">
                        <span className="fw-bold">
                          {booking.Ride.origin.city}
                        </span>
                        <ArrowRightIcon
                          size={24}
                          className="text-success ms-1"
                        />{" "}
                        <span className="fw-bold">
                          {booking.Ride.destination.city}
                        </span>
                      </p>
                      <p
                        className={
                          isDateInPast(booking.Ride.dateTime, new Date())
                            ? "text-warning"
                            : null
                        }
                      >
                        ({dateFormat(booking.Ride.dateTime, "dd/mm/yy")})
                      </p>
                    </Col>
                  </Row>
                  <Row className="align-items-center mb-3">
                    <Col xs={6} className="text-center">
                      <h4>
                        {t("translation:global.seat")}
                        {booking.seatsBooked > 1 ? "s" : null}:{" "}
                        <span className="text-success">
                          {booking.seatsBooked}
                        </span>
                      </h4>
                    </Col>
                    <Col xs={6} className="text-center">
                      <h4>
                        {t("translation:global.status")}:{" "}
                        <span
                          className={`text-${bookingStatusVariant(
                            booking.BookingStatus.id
                          )}`}
                        >
                          {booking.BookingStatus.name}
                        </span>
                      </h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <LinkContainer to={`/ride/${booking.RideId}`}>
                        <Button variant="light" className="me-2">
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
          ))
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
