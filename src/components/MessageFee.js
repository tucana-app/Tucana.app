import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const MessageFee = () => {
  return (
    <Container
      fluid
      className="border border-success border-end-0 border-start-0 border-top-0"
    >
      <Row>
        <Col className="mx-auto text-center">
          <small className="text-center font-title">
            For now, booking &amp; offering rides is <u>free</u>.{" "}
            <Link to="/coming-soon" className="text-success">
              Learn more
            </Link>
          </small>
        </Col>
      </Row>
    </Container>
  );
};

export default MessageFee;
