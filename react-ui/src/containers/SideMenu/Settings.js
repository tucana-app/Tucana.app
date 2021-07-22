import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import GoBack from "../../components/GoBack";

function Settings() {
  return (
    <div data-aos="slide-left">
      <GoBack />

      <Container className="py-5 text-center">
        <Row>
          <Col>
            <h1 className="display-4 text-success">Settings</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-light">Coming soon</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Settings;
