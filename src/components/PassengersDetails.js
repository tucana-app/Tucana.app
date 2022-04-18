import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import dateFormat from "dateformat";

import { getPassengersDetails } from "../redux";
import LoadingSpinner from "./LoadingSpinner";
import SendMessageButton from "./SendMessageButton";

const PassengersDetails = ({ rideId, booking }) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const { isLoadingPassengersDetails, passengersDetailsData } = useSelector(
    (state) => state.ride
  );

  // const difference = Math.abs(dateRide - today);
  // const diffHours = Math.ceil(difference / (1000 * 60 * 60));
  // const diffDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

  // // If the ride happens in the next 24h or happened within the last 7 days, unlock the passengers contact details
  // const lockPassengersDetails =
  //   (!isDateInPast(today, dateRide) && diffDays > daysLockPassengersDetails) ||
  //   diffHours > hoursUnlockPassengersDetail;

  // if (passengersDetailsData.length > 0) console.log(passengersDetailsData);

  const totalPassengers = passengersDetailsData.reduce(
    (accumulator, passengerDetails) =>
      accumulator + passengerDetails.seatsBooked,

    0
  );

  useEffect(() => {
    dispatch(getPassengersDetails(rideId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoadingPassengersDetails ? (
        <Row>
          <Col className="text-center my-3">
            <LoadingSpinner />
          </Col>
        </Row>
      ) : passengersDetailsData.length > 0 ? (
        <>
          <Row>
            <Col>
              <p>
                You have <span className="text-success">{totalPassengers}</span>{" "}
                passenger(s) for a total of{" "}
                <span className="text-success">
                  {passengersDetailsData.length}
                </span>{" "}
                of booking(s) on this ride
              </p>
            </Col>
          </Row>
          {passengersDetailsData.map((booking, index) => (
            <Row key={index} className="align-items-center">
              <Col xs={6} lg={4} className="mb-3">
                <p className="mb-0">
                  #{index + 1}: Passenger:{" "}
                  <span className="text-success">{booking.User.username}</span>
                </p>
                <p className="mb-0">
                  Seats booked:{" "}
                  <span className="text-success">{booking.seatsBooked}</span>{" "}
                  {/* / {booking.Ride.seatsAvailable} */}
                </p>
              </Col>
              <Col xs={6} lg={4} className="mb-3">
                <p className="mb-0">
                  Booking date: {dateFormat(booking.dateTime, "dd/mm/yyyy")}
                </p>
              </Col>

              <Col xs={6} lg={4}>
                {booking.commentPassenger ? (
                  <p className="mb-0">
                    Passenger comment: "<i>{booking.commentPassenger}</i>"
                  </p>
                ) : null}

                <SendMessageButton
                  type="link"
                  driverId={booking.DriverId}
                  userId={booking.UserId}
                  receiverName={booking.User.firstName}
                  rideId={booking.Ride}
                />
              </Col>
            </Row>
          ))}
        </>
      ) : (
        <Row>
          <Col>
            <p className="mb-0">You do not have passengers for this ride yet</p>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PassengersDetails;
