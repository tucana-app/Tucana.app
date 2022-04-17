import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import dateFormat from "dateformat";

import SendMessageButton from "../components/SendMessageButton";

import { getPassengersDetails } from "../redux";

const PassengersDetails = ({ rideId, booking }) => {
  const dispatch = useDispatch();
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
      {!isLoadingPassengersDetails && passengersDetailsData.length > 0 ? (
        <>
          <Row>
            <Col>
              <p>
                <span className="text-success">{totalPassengers}</span>{" "}
                passenger{totalPassengers > 1 ? "s" : null} with{" "}
                <span className="text-success">
                  {passengersDetailsData.length}
                </span>{" "}
                bookings
              </p>
            </Col>
          </Row>

          {passengersDetailsData.map((passenger, index) => (
            <Row key={index} className="align-items-center mb-2">
              <Col xs={10} md={8}>
                {dateFormat(passenger.createdAt, "dd/mm")}: Seats:{" "}
                <span className="text-success">{passenger.seatsBooked}</span> |{" "}
                <span>By: {passenger.User.firstName}</span>
              </Col>
              <Col xs={2} md={4} className="text-end ps-0">
                <SendMessageButton booking={passenger} />
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
