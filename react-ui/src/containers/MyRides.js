import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";

const MyRides = () => {
  return (
    <div data-aos="fade-right">
      <Container className="text-light text-center my-5">
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

      <Footer />
    </div>
  );
};

export default MyRides;
