import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import GoBack from "../../components/GoBack";

const Hiring = () => {
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
            <h1 className="title">{t("translation:hiring.title")}</h1>
            <p>{t("translation:hiring.message")} 🙂</p>
            <p className="mt-3">
              <a href="mailto:info@tucana.app" className="link-success">
                info@tucana.app
              </a>{" "}
            </p>

            <Link to="/contact">
              <Button variant="success" size="lg" className="mt-3">
                {t("translation:global.contact")}
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hiring;
