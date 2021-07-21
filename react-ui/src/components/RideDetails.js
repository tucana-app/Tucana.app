import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import dateFormat from "dateformat";

const RideDetails = ({ rideData, driverUsername }) => {
  return (
    <Container className="my-3">
      <Row className="align-items-center">
        <Col xs={6} sm={3} lg={2} className="mb-3">
          <p className="mb-0">Origin:</p>
          <p className="mb-0">Province: </p>
        </Col>
        <Col xs={6} sm={3} lg={2} className="mb-3">
          <p className="text-warning mb-0">{rideData.cityOrigin}</p>
          <p className="text-warning mb-0">{rideData.provinceOrigin}</p>
        </Col>

        <Col xs={6} sm={3} lg={2} className="mb-3">
          <p className="mb-0">Destination:</p>
          <p className="mb-0">Province:</p>
        </Col>
        <Col xs={6} sm={3} lg={2} className="mb-3">
          <p className="text-success mb-0">{rideData.cityDestination}</p>
          <p className="text-success mb-0">{rideData.provinceDestination}</p>
        </Col>
        <Col lg={4}></Col>

        <Col xs={6} lg={4} className="mb-lg-3">
          <p className="mb-0">
            Date: {dateFormat(rideData.dateTime, "dd/mm/yyyy")}
          </p>
          <p className="mb-0">
            Time: {dateFormat(rideData.dateTime, "HH:MM TT")}
          </p>
        </Col>
        <Col xs={6} lg={4}>
          <p className="mb-0">
            Driver: <span className="text-success">{driverUsername}</span>
          </p>
          <p className="mb-0">
            Seats left:{" "}
            <span className="text-success">{rideData.seatsLeft}</span> /{" "}
            {rideData.seatsAvailable}
          </p>
        </Col>
        {!(rideData.comment === "") ? (
          <Col xs={12} className="my-3 mt-lg-0">
            <p className="mb-0">Comment:</p>
            <i>"{rideData.comment}"</i>
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
