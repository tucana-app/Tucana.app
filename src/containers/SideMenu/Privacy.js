import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import GoBack from "../../components/GoBack";

function Privacy() {
  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="my-5">
        <Row className="mb-5">
          <Col>
            <h1 className="text-success text-center">Privacy</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Privacy;
