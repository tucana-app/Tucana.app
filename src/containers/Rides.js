import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Badge, Col, Container, ListGroup, Row } from "react-bootstrap";
import { ChevronRightIcon } from "@primer/octicons-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  getDriverRides,
  getUserBookings,
  getDriverBookings,
  getRidesToConfirm,
} from "../redux";

import car from "../assets/images/undraw_Order_ride.svg";

import LoadingSpinner from "../components/LoadingSpinner";

const Rides = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isDateInPast, countDriverRides } = useSelector(
    (state) => state.global
  );
  const {
    isLoadingDriverRides,
    driverRidesData,
    isLoadingUserBookings,
    userBookingsData,
    isLoadingRidesToConfirm,
    ridesToConfirmData,
    isLoadingDriverBookings,
    driverBookingsData,
  } = useSelector((state) => state.ride);

  const countUserBookings = (userBookingsData) => {
    let count = 0;

    userBookingsData.map((booking, index) => {
      return booking.BookingStatusId === 3 &&
        !isDateInPast(booking.Ride.dateTime, new Date())
        ? count++
        : null;
    });

    return count;
  };

  const countDriverBookings = (driverBookingsData) => {
    let count = 0;

    driverBookingsData.map((booking, index) => {
      return booking.BookingStatusId === 1 &&
        !isDateInPast(booking.Ride.dateTime, new Date()) &&
        booking.Ride.seatsLeft > 0
        ? count++
        : null;
    });

    return count;
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getDriverRides(currentUser.id));
      dispatch(getUserBookings(currentUser.id));
      dispatch(getDriverBookings(currentUser.id));
      dispatch(getRidesToConfirm(currentUser.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container fluid data-aos="fade-in">
      <Row className="my-4">
        <Col className="text-center">
          <img src={car} alt="Car" width={400} className="img-fluid" />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="p-0 mx-auto">
          <hr className="my-2" />

          <ListGroup variant="flush">
            <Link to="/bookings" className="text-light text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <div>
                    {t("translation:global.bookings")}
                    {userBookingsData.length > 0 ? (
                      countUserBookings(userBookingsData) ? (
                        <Badge bg="primary" className="ms-2">
                          {isLoadingUserBookings ? (
                            <LoadingSpinner size="sm" />
                          ) : (
                            countUserBookings(userBookingsData)
                          )}
                        </Badge>
                      ) : null
                    ) : null}
                  </div>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>

            <hr className="my-2" />

            {currentUser.Driver ? (
              <>
                <Link
                  to="/rides/driver"
                  className="text-light text-decoration-none"
                >
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <div>
                        {t("translation:rides.ridesOffered")}
                        {driverRidesData.length > 0 ? (
                          countDriverRides(driverRidesData) ? (
                            <Badge bg="success" className="text-dark ms-2">
                              {isLoadingDriverRides ? (
                                <LoadingSpinner size="sm" />
                              ) : (
                                countDriverRides(driverRidesData)
                              )}
                            </Badge>
                          ) : null
                        ) : null}
                      </div>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>

                <Link
                  to="/rides/bookings"
                  className="text-light text-decoration-none"
                >
                  <ListGroup.Item className="border-0 ">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <div>
                        {t("translation:rides.bookingsReceived")}
                        {driverBookingsData.length > 0 ? (
                          countDriverBookings(driverBookingsData) ? (
                            <Badge bg="info" className="text-dark ms-2">
                              {isLoadingDriverBookings ? (
                                <LoadingSpinner size="sm" />
                              ) : (
                                countDriverBookings(driverBookingsData)
                              )}
                            </Badge>
                          ) : null
                        ) : null}
                      </div>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>

                {!isLoadingRidesToConfirm && ridesToConfirmData.length ? (
                  <div>
                    <hr className="my-2" />

                    <Link
                      to="/rides/rides-to-confirm"
                      className="text-light text-decoration-none"
                    >
                      <ListGroup.Item className="border-0">
                        <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                          <div>
                            <span className="fw-bold">
                              {t("translation:rides.ridesToConfirm")}
                            </span>
                            <Badge
                              bg="warning"
                              className="text-dark ms-2 animate__animated animate__heartBeat animate__slower animate__infinite"
                            >
                              {ridesToConfirmData.length}
                            </Badge>
                          </div>
                          <ChevronRightIcon size={24} verticalAlign="middle" />
                        </div>
                      </ListGroup.Item>
                    </Link>

                    <hr className="mt-2 mb-4" />
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <Link
                  to="/become-driver"
                  className="text-light text-decoration-none mt-4"
                >
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <p className="text-success fw-bold mb-0">
                        {t("translation:global.becomeDriver")}
                      </p>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>
              </>
            )}

            <Link to="/help" className="text-light text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  {t("translation:global.help")}
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Rides;
