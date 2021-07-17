import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const Fallback = () => {
  return (
    <Container className="vh-100">
      <Row className="h-100 align-items-center">
        <Col className="text-center">
          <div className="d-inline-flex align-items-center">
            <Spinner
              animation="border"
              role="status"
              as="span"
              aria-hidden="true"
              className="text-success me-3"
              size="lg"
            />
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
