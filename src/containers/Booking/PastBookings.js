import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { DotFillIcon } from "@primer/octicons-react";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";

import { getUserBookings } from "../../redux";
import { ChevronRight } from "react-bootstrap-icons";
import { isDateInPast } from "../../helpers";

const PastBookings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { bookingStatusVariant } = useSelector((state) => state.global);
  const { isLoadingUserBookings, userBookingsData } = useSelector(
    (state) => state.ride
  );

  useEffect(() => {
    if (isLoggedIn || userBookingsData.length === 0) {
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
            <h1 className="title mb-0">
              {t("translation:global.pastBookings")}
            </h1>
          </Col>
        </Row>

        {isLoadingUserBookings ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : userBookingsData.length > 0 ? (
          userBookingsData.map((booking, index) =>
            isDateInPast(booking.Ride.dateTimeOrigin, new Date()) ||
            booking.Ride.RideStatusId > 2 ||
            booking.BookingStatusId > 3 ? (
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
                      <Col xs={6} className="text-center">
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
                            <DotFillIcon size="16" verticalAlign="middle" />
                            {t(
                              `translation:global.statuses.booking.${booking.BookingStatus.id}`
                            )}
                          </span>
                        </p>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            ) : null
          )
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

export default PastBookings;
