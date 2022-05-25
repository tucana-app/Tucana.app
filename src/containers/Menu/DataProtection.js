import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import GoBack from "../../components/GoBack";

const DataProtection = () => {
  const { t } = useTranslation();

  return (
    <div>
      <GoBack />

      <Container>
        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mx-auto"
          >
            <h1 className="title">{t("translation:dataProtection.title")}</h1>
            <p>{t("translation:global.comingSoon")}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DataProtection;
