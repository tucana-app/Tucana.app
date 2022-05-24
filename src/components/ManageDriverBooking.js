import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ChevronRightIcon } from "@primer/octicons-react";

import { getDriverBookingRide } from "../redux";
import dateFormat from "dateformat";
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
          {driverRideBookingData.map((booking, index) => (
            <LinkContainer
              to={`/booking/${booking.id}`}
              className="cursor-pointer"
              key={index}
            >
              <Row className="align-items-center mb-2">
                <Col xs={11}>
                  {dateFormat(booking.createdAt, "dd/mm")}:{" "}
                  {t("translation:global.seat")}
                  {booking.seatsBooked > 1 ? "s" : null}:{" "}
                  <span className="text-success">{booking.seatsBooked}</span> |{" "}
                  <span>
                    {t("translation:global.by")}: {booking.User.firstName}
                  </span>{" "}
                  | {t("translation:global.status")}:{" "}
                  <span
                    className={`text-${bookingStatusVariant(
                      booking.BookingStatusId
                    )}`}
                  >
                    {booking.BookingStatus.name}
                  </span>
                </Col>
                <Col xs={1} className="text-start ps-0">
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </Col>
              </Row>
            </LinkContainer>
          ))}
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
