import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import GoBack from "../components/GoBack";
import { Apple, Phone } from "react-bootstrap-icons";

const Download = () => {
  return (
    <>
      <GoBack />

      <Container data-aos="fade-in">
        <Row className="mb-5">
          <Col className="text-center">
            <h1 className="title">Download the app</h1>

            <p className="lead">
              Make sure you take Tucána everywhere with you!
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p>Follow the instruction to "install" the app on your device</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <a
              href="https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DAndroid&oco=1"
              alt=""
              target="_blank"
              rel="noreferrer"
              className="text-success me-4"
            >
              <Button variant="success" size="lg">
                <Phone className="mb-1 me-2" />
                Android
              </Button>
            </a>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Developer_guide/Installing#safari_for_ios_iphoneos_ipados"
              alt=""
              target="_blank"
              rel="noreferrer"
              className="text-success"
            >
              <Button variant="success" size="lg">
                <Apple className="mb-1 me-2" />
                Apple
              </Button>
            </a>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Download;
