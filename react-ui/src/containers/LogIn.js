import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const LogIn = () => {
  return (
    <>
      <Container className="text-center mx-auto">
        <Row>
          <Col>
            <h1>LogIn</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Welcome to the LogIn page</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LogIn;
