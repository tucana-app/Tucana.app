import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";

const FindRide = () => {
  return (
    <>
      <Container className="text-light text-center my-5">
        <Row>
          <Col>
            <h1>FindRide</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Welcome to the FindRide page</p>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default FindRide;
