import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function OfflineBanner(props) {
  const { t } = useTranslation();

  return (
    <Container
      fluid
      className="fixed-top bg-danger text-white animate__animated animate__fadeInDown"
    >
      <Row className="mx-0">
        <Col className="text-center">{t("translation:global.offline")}</Col>
      </Row>
    </Container>
  );
}

export default OfflineBanner;
