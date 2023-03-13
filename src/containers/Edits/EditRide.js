import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";

import {
  getRide,
  getDriverBookingsRide,
  // submitEditRide
} from "../../redux";
import { isEmptyObject } from "../../helpers";

const EditRide = () => {
  const { t } = useTranslation();
  const { rideId } = useParams();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isLoadingRide,
    rideData,
    isloadingDriverRideBookings,
    driverRideBookingsData,
  } = useSelector((state) => state.ride);

  const [isFoundAcceptedBooking, setIsFoundAcceptedBooking] = useState(false);

  useEffect(() => {
    if (isEmptyObject(rideData)) {
      dispatch(getRide(rideId));
    }

    dispatch(getDriverBookingsRide(currentUser.Driver.id, rideId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (driverRideBookingsData.length) {
      driverRideBookingsData.map((booking) => {
        if (booking.BookingStatusId === 3) {
          setIsFoundAcceptedBooking(true);
        }
        return false;
      });
    }
  }, [driverRideBookingsData]);

  if (
    !isLoggedIn ||
    (rideData.ride &&
      currentUser.Driver &&
      currentUser.Driver.id !== rideData.ride.Driver.id)
  ) {
    return <Redirect to="/" />;
  }

  return isLoadingRide || isloadingDriverRideBookings ? (
    <Container className="my-5">
      <Row>
        <Col className="text-center">
          <LoadingSpinner />
        </Col>
      </Row>
    </Container>
  ) : (
    <div data-aos="fade-in">
      <GoBack />

      <Container>
        {rideData.ride ? (
          <>
            <Row className="mb-3">
              <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
                <h1 className="title text-center">
                  {t("translation:edit.ride.title")}
                </h1>
              </Col>
            </Row>

            {isFoundAcceptedBooking ? (
              !isloadingDriverRideBookings &&
              driverRideBookingsData.length > 0 ? (
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
                      <p>{t("translation:edit.ride.alreadyBookings")}</p>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col
                      xs={12}
                      sm={10}
                      md={8}
                      lg={6}
                      xl={4}
                      className="container-box border-warning px-3 py-3 my-3"
                    >
                      <p>{t("translation:cancelRide.existingBookings")}</p>
                      <p className="text-secondary mb-0">
                        {t("translation:global.existedAcceptedBookings")}:
                      </p>
                      <ul className="mb-0">
                        {driverRideBookingsData.map((booking, index) =>
                          booking.BookingStatus.id === 3 ? (
                            <li key={index}>
                              <strong>{booking.User.firstName}</strong>{" "}
                              {t("translation:booking.summary2")}{" "}
                              <span className="fw-bold">
                                {booking.seatsBooked}
                              </span>{" "}
                              <span className="text-lowercase">
                                {t("translation:global.seat")}
                              </span>
                              {booking.seatsBooked > 1 ? "s" : null}
                            </li>
                          ) : null
                        )}
                      </ul>
                    </Col>
                  </Row>
                </>
              ) : null
            ) : (
              <Row>
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  xl={4}
                  className="text-center mx-auto"
                >
                  <p className="lead">
                    {t("translation:comingSoon.subTitle")}
                    <br />
                    {t("translation:comingSoon.thankYou")}
                  </p>
                </Col>
              </Row>
            )}
          </>
        ) : null}
      </Container>
    </div>
  );
};

export default EditRide;
