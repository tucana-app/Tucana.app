import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const MyRides = () => {
  return (
    <>
      <Container className="text-center mx-auto">
        <Row>
          <Col>
            <h1>MyRides</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Welcome to the MyRides page</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyRides;
