import React from "react";
import { Container, Row, Col, Accordion, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import GoBack from "../../components/GoBack";

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <div>
      <GoBack />

      <Container>
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <h1 className="title text-center">{t("translation:FAQ.title")}</h1>

            <p className="text-center">
              <Link to="/how-it-works">
                <Button size="sm" variant="success">
                  {t("translation:global.howItWorks")}
                </Button>
              </Link>
            </p>

            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  {t("translation:FAQ.question1")}
                </Accordion.Header>
                <Accordion.Body className="py-2">
                  <small>{t("translation:FAQ.answer1")}</small>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  {t("translation:FAQ.question2")}
                </Accordion.Header>
                <Accordion.Body className="py-2">
                  <small>{t("translation:FAQ.answer2")}</small>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FAQ;
