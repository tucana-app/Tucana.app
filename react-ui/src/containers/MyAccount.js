import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";

const MyAccount = () => {
  return (
    <>
      <Container className="text-light text-center my-5">
        <Row>
          <Col>
            <h1>MyAccount</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Welcome to the MyAccount page</p>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default MyAccount;
