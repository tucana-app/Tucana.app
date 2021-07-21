import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import dateFormat from "dateformat";

import { getPassengersDetails } from "../redux";
import LoadingMessage from "./LoadingMessage";
import FeedbackMessage from "./FeedbackMessage";
import { Link } from "react-router-dom";

const PassengersDetails = ({ rideId }) => {
  const dispatch = useDispatch();
  const { hoursUnlockPassengersDetail, daysLockPassengersDetails } =
    useSelector((state) => state.global);
  const { isLoadingPassengersDetails, passengersDetailsData, rideData } =
    useSelector((state) => state.ride);

  const dateInPastArrow = (firstDate, secondDate) =>
    firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0);

  const today = new Date();
  const dateRide = new Date(rideData.ride.dateTime);
  const difference = Math.abs(dateRide - today);
  const diffHours = Math.ceil(difference / (1000 * 60 * 60));
  const diffDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

  // If the ride happens in the next 24h or happened within the last 7 days, unlock the passengers contact details
  const lockPassengersDetails =
    (dateInPastArrow(dateRide, today) &&
      diffDays > daysLockPassengersDetails) ||
    diffHours > hoursUnlockPassengersDetail;

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
            <LoadingMessage />
          </Col>
        </Row>
      ) : passengersDetailsData.length > 0 ? (
        <>
          <Row>
            <Col>
              <p>
                You have{" "}
                <span className="text-success">
                  {passengersDetailsData.length}
                </span>{" "}
                passenger(s) on this ride
              </p>
            </Col>
          </Row>
          {dateInPastArrow(dateRide, today) ? (
            <div className="text-warning mb-3">
              Contact details available {daysLockPassengersDetails} days after
              the ride
            </div>
          ) : null}
          {lockPassengersDetails ? (
            <Row>
              <Col>
                <p className="text-warning mb-0">
                  You can only access your passenger's contact details{" "}
                  {hoursUnlockPassengersDetail}h prior the ride (in{" "}
                  {diffDays - 1} days) or {daysLockPassengersDetails} days after
                  the ride
                </p>
                <p className="text-warning mb-0">
                  Please{" "}
                  <Link to="/contact" className="link-warning">
                    contact us
                  </Link>{" "}
                  to request them now as a special request
                </p>
              </Col>
            </Row>
          ) : (
            passengersDetailsData.map((passenger, index) => (
              <Row key={index} className="align-items-center">
                <Col xs={6} lg={4} className="mb-3">
                  <p className="mb-0">
                    Passenger:{" "}
                    <span className="text-success">
                      {passenger.User.firstName} {passenger.User.lastName}{" "}
                      <span className="text-succees">
                        ({passenger.User.username}){" "}
                      </span>
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

                {passenger.commentPassenger ? (
                  <Col xs={12}>
                    <p className="mb-0">
                      Passenger comment: "<i>{passenger.commentPassenger}</i>"
                    </p>
                  </Col>
                ) : null}

                <Col xs={12} className="mb-3">
                  <p className="mb-0">Email: {passenger.User.email}</p>
                  <p className="mb-0">
                    Phone number: {passenger.User.phoneNumber}
                  </p>
                </Col>

                {/* Do not display the bottom border for the last passenger */}
                {!(index === passengersDetailsData.length - 1) ? (
                  <Col xs={12} className="text-center">
                    <hr />
                  </Col>
                ) : null}
              </Row>
            ))
          )}
        </>
      ) : (
        <FeedbackMessage />
      )}
    </Container>
  );
};

export default PassengersDetails;
