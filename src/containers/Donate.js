import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import GoBack from "../components/GoBack";

const Donate = () => {
  const { t } = useTranslation();

  return (
    <>
      <GoBack />

      <Container data-aos="fade-in">
        <Row>
          <Col className="text-center">
            <h1 className="title">{t("translation:donate.title")}</h1>
            <p className="lead">{t("translation:donate.subTitle")}</p>
            <p className="lead">{t("translation:donate.paragraph")}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="text-center">
            <a
              href="https://giveth.io/project/Carpooling-App-in-Costa-Rica-0"
              target={"blank"}
              className="me-3"
            >
              <Button variant="warning" size={"lg"}>
                Giveth.io
              </Button>
            </a>

            <a
              href="https://www.paypal.com/donate/?hosted_button_id=M4QRJF5GDHCKA"
              target={"blank"}
              className="me-3"
            >
              <Button variant="success" size={"lg"}>
                PayPal
              </Button>
            </a>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <a href="http://ridecr.atwebpages.com" target={"blank"}>
              <Button variant="outline-success" size={"lg"}>
                {t("translation:donate.crowdfunding")}
              </Button>
            </a>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Donate;
