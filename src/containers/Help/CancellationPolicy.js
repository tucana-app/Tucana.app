import React from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import GoBack from "../../components/GoBack";

const CancellationPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-5">
      <GoBack />

      <Container>
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <div className="mb-5">
              <h1 className="title text-center">
                {t("translation:cancellationPolicy.title")}
              </h1>
              <p>{t("translation:cancellationPolicy.message")}</p>
            </div>

            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Canceling a booking</Accordion.Header>
                <Accordion.Body>
                  <p>{t("translation:cancellationPolicy.later")}</p>
                  <div>
                    <p className="fw-bold mb-0">
                      {t("translation:cancellationPolicy.option1-title")}
                    </p>
                    <p>{t("translation:cancellationPolicy.option1-content")}</p>
                  </div>
                  <div>
                    <p className="fw-bold mb-0">
                      {t("translation:cancellationPolicy.option2-title")}
                    </p>
                    <p>{t("translation:cancellationPolicy.option2-content")}</p>
                  </div>
                  <div>
                    <p className="fw-bold mb-0">
                      {t("translation:cancellationPolicy.option3-title")}
                    </p>
                    <p>{t("translation:cancellationPolicy.option3-content")}</p>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Canceling a ride</Accordion.Header>
                <Accordion.Body>Later</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CancellationPolicy;
