import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

import GoBack from "../../components/GoBack";

function Language() {
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="my-5">
        <Row className="mb-5">
          <Col>
            <h1 className="text-success text-center">Language</h1>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <p>
              {t("languagePage.current")}: {t("global.language")}
            </p>
            <Button
              onClick={() => changeLanguage("en")}
              variant="outline-success"
              className="me-2"
            >
              English
            </Button>
            <Button
              onClick={() => changeLanguage("es")}
              variant="outline-success"
              className="me-2"
            >
              Español
            </Button>
            <Button
              onClick={() => changeLanguage("fr")}
              variant="outline-success"
            >
              Français
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Language;
