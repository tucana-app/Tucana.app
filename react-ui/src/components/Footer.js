import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="footer my-5">
      <Row>
        <Col className="text-success text-center">&copy; Ride.CR</Col>
      </Row>
    </Container>
  );
};

export default Footer;