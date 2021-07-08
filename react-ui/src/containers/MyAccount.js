import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const MyAccount = () => {
  return (
    <>
      <Container className="text-center mx-auto">
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
    </>
  );
};

export default MyAccount;
