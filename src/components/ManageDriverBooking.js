import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ChevronRightIcon, DotFillIcon } from "@primer/octicons-react";

import { getDriverBookingRide } from "../redux";
import { LinkContainer } from "react-router-bootstrap";

function ManageDriverBooking({ rideId }) {
  const { t } = useTranslation();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { bookingStatusVariant } = useSelector((state) => state.global);
  const { isloadingDriverRideBookingList, driverRideBookingData } = useSelector(
    (state) => state.ride
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getDriverBookingRide(currentUser.id, rideId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isloadingDriverRideBookingList && driverRideBookingData.length > 0 ? (
        <>
          {driverRideBookingData.map((booking, index) =>
            booking.BookingStatus.id < 3 ? (
              <LinkContainer
                to={`/booking/${booking.id}`}
                className="cursor-pointer"
                key={index}
              >
                <Row className="align-items-center mb-2">
                  <Col xs={11}>
                    <strong>{booking.User.firstName}</strong>{" "}
                    {t("translation:booking.summary2")}{" "}
                    <span className="text-success">{booking.seatsBooked}</span>{" "}
                    <span className="text-lowercase">
                      {t("translation:global.seat")}
                    </span>
                    {booking.seatsBooked > 1 ? "s" : null}:{" "}
                    <span
                      className={`text-${bookingStatusVariant(
                        booking.BookingStatusId
                      )}`}
                    >
                      <DotFillIcon size="16" verticalAlign="middle" />
                      {booking.BookingStatus.name}
                    </span>
                  </Col>
                  <Col xs={1} className="text-start ps-0">
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </Col>
                </Row>
              </LinkContainer>
            ) : null
          )}
        </>
      ) : (
        <p className="mb-0">
          {t("translation:ManageDriverBooking.noBookings")}
        </p>
      )}
    </>
  );
}

export default ManageDriverBooking;
