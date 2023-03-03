import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ArrowLeftIcon } from "@primer/octicons-react";
import { sendErrorReport, displayNavBar } from "../../redux";

// Importing assets
import logo from "../../assets/images/logo-full-black.png";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displayNavBar(false));

    if (process.env.NODE_ENV === "production") {
      dispatch(sendErrorReport(error.message, error.stack));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container className="mt-5">
        <Row className="mb-5">
          <Col xs={12} className="text-center">
            <img
              src={logo}
              width={300}
              alt="Tucána logo"
              className="img-fluid"
            />
          </Col>
        </Row>
        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mx-auto"
          >
            <h1 className="mb-0">
              {t("translation:global.errors.errorFallback")}
            </h1>
            <p>{t("translation:global.errors.errorPersist")}</p>
          </Col>
        </Row>
        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mb-3 mx-auto"
          >
            <a
              href={process.env.REACT_APP_URL_CLIENT}
              alt=""
              onClick={() => resetErrorBoundary()}
            >
              <Button variant="success" size="lg" className="py-2 w-100">
                <ArrowLeftIcon size={24} className="me-2" />
                {t("translation:navigationBar.home")}
              </Button>
            </a>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mx-auto"
          >
            <a href={`mailto:${process.env.REACT_APP_EMAIL_CONTACT}`} alt="">
              <Button
                variant="outline-success"
                size="lg"
                className="py-2 w-100"
              >
                {t("translation:global.contactUs")}
              </Button>
            </a>
          </Col>
        </Row>
        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mx-auto"
          >
            <p className="mb-0">
              {t("translation:global.errors.errorDetails")}:
            </p>
            <Alert variant="danger">{error.message}</Alert>
          </Col>
        </Row>
      </Container>

      {/* <Container>
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
      </Container> */}
    </>
  );
};

export default ErrorFallback;
