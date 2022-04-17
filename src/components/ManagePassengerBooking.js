import React from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ChevronRightIcon } from "@primer/octicons-react";

import dateFormat from "dateformat";

function ManagePassengerBooking({ rideId }) {
  const { bookingStatusVariant } = useSelector((state) => state.global);
  const { isloadingUserRideBookingList, userRideBookingData } = useSelector(
    (state) => state.ride
  );

  return (
    <>
      {!isloadingUserRideBookingList && userRideBookingData.length > 0 ? (
        <>
          {userRideBookingData.map((booking, index) => (
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
                  </span>
                </Col>
                <Col xs={1} className="text-start ps-0">
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </Col>
              </Row>
            </LinkContainer>
          ))}
        </>
      ) : null}
    </>
  );
}

export default ManagePassengerBooking;