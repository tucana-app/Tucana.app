import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faHandHoldingUsd,
} from "@fortawesome/free-solid-svg-icons";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
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
              <Button variant="warning" className="rounded-0">
                <FontAwesomeIcon icon={faBitcoin} className="me-2" />
                Giveth.io
              </Button>
            </a>

            <a
              href="https://www.paypal.com/donate/?hosted_button_id=M4QRJF5GDHCKA"
              target={"blank"}
              className="me-3"
            >
              <Button variant="success" className="rounded-0">
                <FontAwesomeIcon icon={faDollarSign} className="me-2" />
                PayPal (donation)
              </Button>
            </a>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <a href="http://ridecr.atwebpages.com" target={"blank"}>
              <Button
                variant="outline-success"
                className="rounded-0"
                size={"lg"}
              >
                <FontAwesomeIcon icon={faHandHoldingUsd} className="me-2" />
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
