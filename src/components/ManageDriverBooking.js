import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ChevronRightIcon, DotFillIcon } from "@primer/octicons-react";

import { getDriverBookingsRide } from "../redux";
import { LinkContainer } from "react-router-bootstrap";

function ManageDriverBooking({ rideId }) {
  const { t } = useTranslation();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { bookingStatusVariant } = useSelector((state) => state.global);
  const { isloadingDriverRideBookings, driverRideBookingsData } = useSelector(
    (state) => state.ride
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && currentUser.Driver) {
      dispatch(getDriverBookingsRide(currentUser.Driver.id, rideId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isloadingDriverRideBookings && driverRideBookingsData.length > 0 ? (
        <>
          {driverRideBookingsData.map((booking, index) =>
            booking.BookingStatus.id !== 4 ? (
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
                      {t(
                        `translation:global.statuses.booking.${booking.BookingStatus.id}`
                      )}
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
