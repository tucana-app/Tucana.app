import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import GoBack from "../components/GoBack";

const Donate = () => {
  return (
    <>
      <GoBack />

      <Container data-aos="slide-left">
        <Row className="py-5 text-center">
          <Col>
            <h1 className="text-success">Donate</h1>
            <p className="lead">
              Thank you so much for your consideration
              <br />
              We are in search for funds to hire more people and improve our
              platform
            </p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="text-center">
            <a
              href="https://giveth.io/project/Carpooling-App-in-Costa-Rica-0"
              target={"blank"}
              className="me-3"
            >
              <Button variant="warning">Giveth.io</Button>
            </a>

            <a
              href="https://www.paypal.com/donate/?hosted_button_id=M4QRJF5GDHCKA"
              target={"blank"}
              className="me-3"
            >
              <Button variant="success">PayPal</Button>
            </a>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <a href="http://ridecr.atwebpages.com" target={"blank"}>
              <Button variant="outline-success" size={"lg"}>
                Crowdfunding website
              </Button>
            </a>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Donate;
