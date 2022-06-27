import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ArrowLeftIcon } from "@primer/octicons-react";

import NavigationBar from "../components/NavigationBar";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation();

  return (
    <>
      {console.log(error)}

      <NavigationBar />

      <Container className="mt-5 pt-5">
        <Row className="mb-3 mx-1 mx-sm-0">
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="bg-light border shadow rounded-5 mx-auto"
          >
            <Container className="pt-3 px-2">
              <Row>
                <Col className="text-center">
                  <h1 className="title">
                    {t("translation:global.errors.errorFallback")}
                  </h1>
                  <p>{t("translation:global.errors.errorPersist")}</p>
                  <p>
                    <a
                      href={process.env.REACT_APP_URL_CLIENT}
                      className="link-success me-2"
                      alt=""
                      onClick={() => resetErrorBoundary()}
                    >
                      <Button variant="success">
                        <ArrowLeftIcon size={24} className="me-2" />
                        {t("translation:navigationBar.home")}
                      </Button>
                    </a>
                    <a
                      href={`mailto:${process.env.REACT_APP_EMAIL_CONTACT}`}
                      alt=""
                    >
                      <Button variant="warning">
                        {t("translation:global.contactUs")}
                      </Button>
                    </a>
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ErrorFallback;
