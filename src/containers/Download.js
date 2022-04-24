import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import GoBack from "../components/GoBack";

const Download = () => {
  return (
    <>
      <GoBack />

      <Container className="py-5 text-center" data-aos="slide-left">
        <Row className="mb-5">
          <Col>
            <h1 className="text-success font-title">Download the app</h1>

            <p className="lead">
              Make sure you take Ride.CR everywhere with you!
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={10} md={8} lg={6} className="mx-auto">
            <p>
              You won't find Ride.CR in the App Store or the Play Store yet, but
              you can follow instruction to "install" it on your device:
            </p>
            <p>
              <a
                href="https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DAndroid&oco=1"
                alt=""
                target="_blank"
                rel="noreferrer"
                className="text-success"
              >
                For Android &amp; Google Chrome (desktop)
              </a>
            </p>
            <p>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Developer_guide/Installing#safari_for_ios_iphoneos_ipados"
                alt=""
                target="_blank"
                rel="noreferrer"
                className="text-success"
              >
                For iOS / iPhoneOS / iPadOS
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Download;
