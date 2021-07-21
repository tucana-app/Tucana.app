import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import dateFormat from "dateformat";

import { getPassengersDetails } from "../redux";
import LoadingMessage from "./LoadingMessage";

const PassengersDetails = ({ bookingId, rideId }) => {
  const dispatch = useDispatch();

  const { isLoadingPassengersDetails, passengersDetailsData } = useSelector(
    (state) => state.ride
  );

  useEffect(() => {
    dispatch(getPassengersDetails(bookingId, rideId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <hr className="w-75 mx-auto my-3" />
        </Col>
      </Row>

      <Row>
        <Col>
          <h1 className="text-info fw-light mb-0">Passengers details</h1>
        </Col>
      </Row>

      {isLoadingPassengersDetails ? (
        <Row>
          <Col>
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
                passengers on this ride
              </p>
            </Col>
          </Row>

          {passengersDetailsData.map((passenger, index) => (
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
                  <span className="text-success">{passenger.seatsBooked}</span>{" "}
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
          ))}
        </>
      ) : (
        <p>NO RIDES</p>
      )}
    </Container>
  );
};

export default PassengersDetails;
