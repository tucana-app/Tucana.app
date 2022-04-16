import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import dateFormat from "dateformat";

import { getPassengersDetails } from "../redux";
import LoadingSpinner from "./LoadingSpinner";

const PassengersDetails = ({ rideId, booking }) => {
  const dispatch = useDispatch();
  const {
    // hoursUnlockPassengersDetail,
    daysLockPassengersDetails,
    isDateInPast,
  } = useSelector((state) => state.global);
  const { isLoadingPassengersDetails, passengersDetailsData, rideData } =
    useSelector((state) => state.ride);

  const today = new Date();
  const dateRide = new Date(rideData.ride.dateTime);
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
    <Container className="my-3">
      <Row>
        <Col>
          <h1 className="text-info fw-light mb-0">Passengers details</h1>
        </Col>
      </Row>

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
          {isDateInPast(dateRide, today) ? (
            <div className="text-warning mb-3">
              You can contact passengers up to {daysLockPassengersDetails} days
              after the ride
            </div>
          ) : (
            passengersDetailsData.map((passenger, index) => (
              <Row key={index} className="align-items-center">
                <Col xs={6} lg={4} className="mb-3">
                  <p className="mb-0">
                    #{index + 1}: Passenger:{" "}
                    <span className="text-success">
                      {passenger.User.username}
                    </span>
                  </p>
                  <p className="mb-0">
                    Seats booked:{" "}
                    <span className="text-success">
                      {passenger.seatsBooked}
                    </span>{" "}
                    {/* / {passenger.Ride.seatsAvailable} */}
                  </p>
                </Col>
                <Col xs={6} lg={4} className="mb-3">
                  <p className="mb-0">
                    Booking date: {dateFormat(passenger.dateTime, "dd/mm/yyyy")}
                  </p>
                </Col>

                <Col xs={6} lg={4}>
                  {passenger.commentPassenger ? (
                    <p className="mb-0">
                      Passenger comment: "<i>{passenger.commentPassenger}</i>"
                    </p>
                  ) : null}

                  {/* <SendMessageButton booking={booking} /> */}
                </Col>
              </Row>
            ))
          )}
        </>
      ) : (
        <Row>
          <Col>
            <p className="lead">You do not have passengers for this ride yet</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PassengersDetails;
