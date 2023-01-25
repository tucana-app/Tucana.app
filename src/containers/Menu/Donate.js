import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import GoBack from "../../components/GoBack";
import DonateComponent from "../../components/DonateComponent";
import { t } from "i18next";

const Donate = () => {
  return (
    <>
      <GoBack />

      <Container data-aos="fade-in">
        <Row>
          <Col className="text-center">
            <h1 className="title">{t("translation:donate.title")}</h1>
          </Col>
        </Row>
        <DonateComponent />
      </Container>
    </>
  );
};

export default Donate;
