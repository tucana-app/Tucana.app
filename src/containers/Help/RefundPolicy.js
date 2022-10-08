import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import GoBack from "../../components/GoBack";

const RefundPolicy = () => {
  const { t } = useTranslation();

  return (
    <div>
      <GoBack />

      <Container>
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <div className="mb-5">
              <h1 className="title text-center">
                {t("translation:refundPolicy.title")}
              </h1>
              <p>{t("translation:refundPolicy.message")}</p>
            </div>

            <p>{t("translation:refundPolicy.later")}</p>
            <div>
              <p className="fw-bold mb-0">
                {t("translation:refundPolicy.option1-title")}
              </p>
              <p>{t("translation:refundPolicy.option1-content")}</p>
            </div>
            <div>
              <p className="fw-bold mb-0">
                {t("translation:refundPolicy.option2-title")}
              </p>
              <p>{t("translation:refundPolicy.option2-content")}</p>
            </div>
            <div>
              <p className="fw-bold mb-0">
                {t("translation:refundPolicy.option3-title")}
              </p>
              <p>{t("translation:refundPolicy.option3-content")}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RefundPolicy;
