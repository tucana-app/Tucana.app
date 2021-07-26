import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";

const Fallback = () => {
  return (
    <Container className="vh-100">
      <Row className="h-100 align-items-center">
        <Col className="text-center">
          <div className="d-inline-flex align-items-center">
            <LoadingSpinner />
            <h1 className="m-0">
              Ride<span className="text-success">.</span>CR
            </h1>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Fallback;
