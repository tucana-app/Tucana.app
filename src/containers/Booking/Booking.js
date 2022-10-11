import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import dateFormat from "dateformat";
import { ChevronRightIcon, DotFillIcon } from "@primer/octicons-react";
import { useTranslation } from "react-i18next";

import LoadingSpinner from "../../components/LoadingSpinner";
import FormDriverResponseBooking from "../../components/FormDriverResponseBooking";

import GoBack from "../../components/GoBack";
import SendMessageButton from "../../components/SendMessageButton";
import DisplayRating from "../../components/DisplayRating";

import { getBooking } from "../../redux";
import { formatPrice, isDateInPast } from "../../helpers";
import RideDetails from "../../components/RideDetails";

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
              <Row>
                <Col>
                  <h2 className="title text-center">
                    {t("translation:booking.title")}
                  </h2>
                </Col>
              </Row>

              <Row className="mb-3 mx-1 mx-sm-0">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  xl={4}
                  className="container-box"
                >
                  <Container className="py-3 px-2">
                    <Row className="align-items-center">
                      <Col>
                        <p>
                          {t("translation:global.passenger")}:{" "}
                          {currentUser.id === bookingData.User.id ? (
                            <strong>{t("translation:global.you")}</strong>
                          ) : (
                            <strong>{bookingData.User.firstName}</strong>
                          )}
                        </p>
                        <p>
                          {t("translation:booking.seatsBooked")}:{" "}
                          <strong>
                            {bookingData.seatsBooked}{" "}
                            <span className="text-lowercase">
                              {t("translation:global.seat")}
                              {bookingData.seatsBooked > 1 ? "s" : null}
                            </span>
                          </strong>
                        </p>
                        <p>
                          {t("translation:global.created")}:{" "}
                          <strong>
                            {dateFormat(bookingData.createdAt, "dd/mm/yy")}
                          </strong>
                        </p>
                        <p className="mb-0">
                          {t("translation:global.status")}:{" "}
                          <span
                            className={`fw-bold text-${bookingStatusVariant(
                              bookingData.BookingStatusId
                            )}`}
                          >
                            <DotFillIcon size="16" verticalAlign="middle" />
                            {t(
                              `translation:global.statuses.booking.${bookingData.BookingStatus.id}`
                            )}
                          </span>
                        </p>
                        {bookingData.commentPassenger !== "" &&
                        bookingData.commentPassenger !== null ? (
                          <p className="mt-3 mb-0">
                            {t("translation:global.passengerComment")}: "
                            {bookingData.commentPassenger}"
                          </p>
                        ) : null}
                        {bookingData.commentDriver !== "" &&
                        bookingData.commentDriver !== null ? (
                          <p className="mt-3 mb-0">
                            {t("translation:global.driverComment")}: "
                            {bookingData.commentDriver}"
                          </p>
                        ) : null}
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>

              {currentUser.Driver &&
              currentUser.Driver.id === bookingData.DriverId ? (
                <Row className="mb-3 mx-1 mx-sm-0">
                  <Col
                    xs={12}
                    sm={10}
                    md={8}
                    lg={6}
                    xl={4}
                    className="container-box"
                  >
                    <Container className="py-3 px-2">
                      <LinkContainer
                        to={`/profile/${bookingData.User.username}`}
                        className="cursor-pointer"
                      >
                        <Row className="align-items-center">
                          <Col xs={3} md={2} className="pe-0">
                            <img
                              src={srcAvatar(bookingData.User)}
                              alt="Avatar"
                              className="img-fluid cursor-pointer avatar-img-sm mx-2"
                              width="50px"
                            />
                          </Col>
                          <Col xs={6} className="text-start ps-0 ps-md-2">
                            <p className="mb-0">{bookingData.User.firstName}</p>
                            <DisplayRating
                              rating={bookingData.User.Rating}
                              type="passenger"
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
                      <Row>
                        <Col>
                          <hr />
                          <SendMessageButton
                            type="link"
                            driverId={bookingData.DriverId}
                            user={bookingData.User}
                            receiverName={bookingData.User.firstName}
                            rideId={bookingData.RideId}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              ) : null}

              <Row className="mb-3 mx-1 mx-sm-0">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  xl={4}
                  className="container-box"
                >
                  <Container className="py-3 px-2">
                    <Row className="align-items-center">
                      <Col xs={7}>
                        <h1 className="mb-0 ms-2">
                          {t("translation:global.total")}
                        </h1>
                      </Col>
                      <Col xs={5} className="text-end pe-3">
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

              {/* Cancel the booking */}
              {currentUser.id === bookingData.User.id &&
              !isDateInPast(bookingData.Ride.dateTimeOrigin, new Date()) &&
              bookingData.Ride.RideStatusId === 1 &&
              bookingData.BookingStatusId < 4 ? (
                <Row className="mb-3 mx-1 mx-sm-0">
                  <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
                    <ListGroup variant="flush">
                      <LinkContainer
                        to={`/booking/${bookingData.id}/cancel`}
                        className="cursor-pointer"
                      >
                        <ListGroup.Item className="border-0 cursor-pointer px-0">
                          <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                            <p className="mb-0">
                              {t("translation:cancelBooking.title")}
                            </p>
                            <ChevronRightIcon
                              size={24}
                              verticalAlign="middle"
                            />
                          </div>
                        </ListGroup.Item>
                      </LinkContainer>
                    </ListGroup>
                  </Col>
                </Row>
              ) : null}

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
                    className="container-box"
                  >
                    <Container className="py-3 px-2">
                      <FormDriverResponseBooking bookingId={bookingId} />
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

              {currentUser.Driver.id !== bookingData.DriverId ? (
                <Row className="mb-3 mx-1 mx-sm-0">
                  <Col
                    xs={12}
                    sm={10}
                    md={8}
                    lg={6}
                    xl={4}
                    className="container-box"
                  >
                    <Container className="py-3 px-2">
                      <LinkContainer
                        to={`/profile/${bookingData.Ride.Driver.User.username}`}
                        className="cursor-pointer"
                      >
                        <Row className="align-items-center">
                          <Col xs={3} md={2} className="pe-0">
                            <img
                              src={srcAvatar(bookingData.Ride.Driver.User)}
                              alt="Avatar"
                              className="img-fluid cursor-pointer avatar-img-sm"
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
                              user={currentUser}
                              receiverName={
                                bookingData.Ride.Driver.User.firstName
                              }
                              rideId={bookingData.RideId}
                            />
                          </Col>
                        </Row>
                      ) : null}
                    </Container>
                  </Col>
                </Row>
              ) : null}

              <RideDetails ride={bookingData.Ride} />
            </div>
          ) : (
            // Viewer not the driver nor a passenger
            // Not authorized to see the booking's details
            <Redirect to="/bookings" />
          )
        ) : bookingError ? (
          <Redirect to="/bookings" />
        ) : null}
      </Container>
    </div>
  );
};

export default Booking;
