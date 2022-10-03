import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

import GoBack from "../../components/GoBack";

function Language() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container>
        <Row className="mb-5">
          <Col>
            <h1 className="title text-center">
              {t("translation:global.language")}
            </h1>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <p>
              {t("translation:languagePage.current")}:{" "}
              <span className="fw-bold">
                {t("translation:global.currentLanguage")}
              </span>
            </p>
            <Button
              onClick={() => changeLanguage("en")}
              variant="outline-dark"
              className="me-2"
            >
              <ReactCountryFlag countryCode="US" className="me-2 mb-1" svg />
              English
            </Button>
            <Button
              onClick={() => changeLanguage("es")}
              variant="outline-dark"
              className="me-2"
            >
              <ReactCountryFlag countryCode="CR" className="me-2 mb-1" svg />
              Español
            </Button>
            <Button onClick={() => changeLanguage("fr")} variant="outline-dark">
              <ReactCountryFlag countryCode="FR" className="me-2 mb-1" svg />
              Français
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Language;
