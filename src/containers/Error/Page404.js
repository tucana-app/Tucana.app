import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import GoBack from "../../components/GoBack";

const Page404 = () => {
  const { t } = useTranslation();

  return (
    <>
      <GoBack />
      <Container className="text-center py-5" data-aos="fade-in">
        <Row className="h-100 align-items-center">
          <Col>
            <div>
              <h1 className="display-4 text-warning">
                404: {t("translation:404.notFound")}
              </h1>
            </div>
            <div>
              <p className="lead">{t("translation:404.message")}</p>
              <p>
                {t("translation:404.back1")}{" "}
                <Link to="/" className="text-success">
                  <u>{t("translation:404.back2")}</u>
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Page404;
