import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";

const Fallback = () => {
  return (
    <Container>
      <Row className="min-vh-100 align-items-center">
        <Col className="text-center">
          <div className="d-inline-flex align-items-center">
            <LoadingSpinner />
            <h1 className="my-0 ms-3 p-0">Tucána</h1>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Fallback;
