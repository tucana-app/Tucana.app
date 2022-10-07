import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ArrowLeftIcon } from "@primer/octicons-react";
import { sendErrorReport } from "../../redux";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      dispatch(sendErrorReport(error.message, error.stack));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        <Row className="min-vh-100 align-items-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <Container>
              <Row>
                <Col className="text-center container-box pt-3 pb-1">
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
