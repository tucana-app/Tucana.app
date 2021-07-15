import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const MyAccount = () => {
  return (
    <>
      <Container className="footer">
        <Row>
          <Col className="text-success text-center">&copy; Ride.Cr</Col>
        </Row>
      </Container>
    </>
  );
};

export default MyAccount;
