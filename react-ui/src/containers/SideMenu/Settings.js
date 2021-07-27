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
            <p className="lead">You can adjust your settings here</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Settings;
