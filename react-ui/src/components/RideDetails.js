import dateFormat from "dateformat";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const RideDetails = ({ rideData }) => {
  return (
    <Container className="my-3">
      <Row className="align-items-center">
        <Col xs={6} sm={3} lg={2} className="mb-3">
          <p className="mb-0">Origin:</p>
          <p className="mb-0">Province: </p>
        </Col>
        <Col xs={6} sm={3} lg={2} className="mb-3">
          <p className="text-warning mb-0">{rideData.ride.cityOrigin}</p>
          <p className="text-warning mb-0">{rideData.ride.provinceOrigin}</p>
        </Col>

        <Col xs={6} sm={3} lg={2} className="mb-3">
          <p className="mb-0">Destination:</p>
          <p className="mb-0">Province:</p>
        </Col>
        <Col xs={6} sm={3} lg={2} className="mb-3">
          <p className="text-success mb-0">{rideData.ride.cityDestination}</p>
          <p className="text-success mb-0">
            {rideData.ride.provinceDestination}
          </p>
        </Col>
        <Col lg={4}></Col>

        <Col xs={6} lg={4} className="mb-lg-3">
          <p className="mb-0">
            Date: {dateFormat(rideData.ride.dateTime, "dd/mm/yyyy")}
          </p>
          <p className="mb-0">
            Time: {dateFormat(rideData.ride.dateTime, "HH:MM TT")}
          </p>
        </Col>
        <Col xs={6} lg={4}>
          <p className="mb-0">
            Driver:{" "}
            <span className="text-success">
              {/* {rideData.ride.User.username} */}
            </span>
          </p>
          <p className="mb-0">
            Seats left:{" "}
            <span className="text-success">{rideData.ride.seatsLeft}</span> /{" "}
            {rideData.ride.seatsAvailable}
          </p>
        </Col>
        {!(rideData.ride.comment === "") ? (
          <Col xs={12} className="my-3 mt-lg-0">
            <p className="mb-0">Comment:</p>
            <i>"{rideData.ride.comment}"</i>
          </Col>
        ) : null}
        <Col xs={6} lg={4}>
          <p className="mb-0"></p>
        </Col>
      </Row>
    </Container>
  );
};

export default RideDetails;
