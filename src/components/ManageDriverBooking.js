import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { ChevronRightIcon } from "@primer/octicons-react";

import { getDriverBookingRide } from "../redux";
import dateFormat from "dateformat";
import { LinkContainer } from "react-router-bootstrap";

function ManageDriverBooking({ rideId }) {
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
                  {dateFormat(booking.createdAt, "dd/mm")}: Seats:{" "}
                  <span className="text-success">{booking.seatsBooked}</span> |
                  Status:{" "}
                  <span
                    className={`text-${bookingStatusVariant(
                      booking.BookingStatusId
                    )}`}
                  >
                    {booking.BookingStatus.name}
                  </span>{" "}
                  | <span>By: {booking.User.firstName}</span>
                </Col>
                <Col xs={1} className="text-start ps-0">
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </Col>
              </Row>
            </LinkContainer>
          ))}
        </>
      ) : (
        <p className="mb-0">You do not have any bookings for this ride yet</p>
      )}
    </>
  );
}

export default ManageDriverBooking;
