import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ChevronRightIcon, AlertIcon } from "@primer/octicons-react";

import ManageDriverBooking from "../components/ManageDriverBooking";
import ManagePassengerBooking from "../components/ManagePassengerBooking";
import LoadingSpinner from "../components/LoadingSpinner";

import PassengersDetails from "../components/PassengersDetails";
import GoBack from "../components/GoBack";
import SendMessageButton from "../components/SendMessageButton";
import DisplayRating from "../components/DisplayRating";

import { isDateInPast } from "../helpers";

import {
  getRide,
  getUserBookingsRide,
  getRidesToConfirm,
  displayNavBar,
} from "../redux";

import car from "../assets/images/car.png";
import RideDetails from "../components/RideDetails";

const Ride = () => {
  const { t } = useTranslation();
  const { rideId } = useParams();

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { srcAvatar } = useSelector((state) => state.global);
  const {
    isLoadingRide,
    rideData,
    rideError,
    isloadingUserRideBookings,
    userRideBookingsData,
  } = useSelector((state) => state.ride);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getRide(rideId));
      dispatch(getRidesToConfirm(currentUser));
      dispatch(getUserBookingsRide(currentUser.id, rideId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="pb-3">
      <span onClick={() => dispatch(displayNavBar(true))}>
        <GoBack />
      </span>

      {/* currentUser.Driver &&
        currentUser.Driver.id === rideData.ride.Driver.User.id ? null : */}
      {rideData.ride &&
      !isDateInPast(new Date(rideData.ride.dateTimeOrigin), new Date()) &&
      rideData.ride.seatsLeft > 0 ? (
        currentUser.Driver &&
        currentUser.Driver.id === rideData.ride.Driver.id ? null : (
          <div className="book-button">
            <Link to={`/book/${rideData.ride.id}`}>
              <Button variant="success" size="lg">
                {t("translation:global.bookThisRide")}
              </Button>
            </Link>
            {!isloadingUserRideBookings && userRideBookingsData.length > 0 ? (
              <p className="smaller text-center text-warning mb-0">
                <AlertIcon size={24} className="me-2" />
                {t("translation:global.alreadyBooking")}
              </p>
            ) : null}
          </div>
        )
      ) : null}

      <Container className="mb-5">
        {isLoadingRide ? (
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

            <RideDetails ride={rideData.ride} />

            {/* Display past booking for this ride by this user */}
            {currentUser.Driver &&
            rideData.ride.DriverId === currentUser.Driver.id ? (
              <>
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

                {!isDateInPast(
                  new Date(rideData.ride.dateTimeOrigin),
                  new Date()
                ) && rideData.ride.seatsLeft === 0 ? (
                  <Row className="mb-2 mx-1 mx-sm-0">
                    <Col
                      xs={12}
                      sm={10}
                      md={8}
                      lg={6}
                      xl={4}
                      className="border border-success shadow rounded-5 mx-auto"
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
                    className="border shadow rounded-5 mx-auto"
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
            ) : (
              <>
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
                      <LinkContainer
                        to={`/driver/${rideData.ride.Driver.User.username}`}
                        className="cursor-pointer"
                      >
                        <Row className="align-items-center">
                          <Col xs={3} md={2} className="text-end pe-0">
                            <img
                              src={srcAvatar(rideData.ride.Driver.User)}
                              alt="Avatar"
                              className="img-fluid rounded-round cursor-pointer img-avatar mx-2"
                              width="50px"
                            />
                          </Col>
                          <Col xs={6} className="text-start">
                            <p className="mb-0">
                              {rideData.ride.Driver.User.firstName}
                            </p>
                            <DisplayRating
                              rating={rideData.ride.Driver.User.Rating}
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
                      <Row>
                        <Col>
                          <hr />
                          <SendMessageButton
                            type="link"
                            driverId={rideData.ride.DriverId}
                            user={currentUser}
                            receiverName={rideData.ride.Driver.User.firstName}
                            rideId={rideData.ride.id}
                          />
                          <hr />
                        </Col>
                      </Row>
                      <Row className="align-items-center my-0 py-0">
                        <Col xs={3} md={2} className="text-center pe-0">
                          <img src={car} alt="" height={36} />
                        </Col>
                        <Col>
                          <p className="mb-0">
                            {rideData.ride.Driver.Car.maker}{" "}
                            {rideData.ride.Driver.Car.model}
                          </p>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>

                {!isloadingUserRideBookings &&
                userRideBookingsData.length > 0 ? (
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
              </>
            )}
          </div>
        ) : rideError ? (
          <Redirect to="/" />
        ) : null}
      </Container>
    </div>
  );
};

export default Ride;
