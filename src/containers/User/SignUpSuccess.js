import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";
import {
  ArrowLeft,
  Envelope,
  Messenger,
  Whatsapp,
} from "react-bootstrap-icons";

import { isEmptyObject } from "../../helpers";

function SignUpSuccess(props) {
  const { t } = useTranslation();
  const { isLoggedIn, signupUserSuccess } = useSelector((state) => state.user);

  if (isLoggedIn) {
    return <Redirect to="/rides" />;
  }

  if (isEmptyObject(signupUserSuccess)) {
    return <Redirect to="/signup" />;
  }

  return (
    <>
      <Container className="py-5 text-center">
        <Row className="mb-4">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <h1 className="text-success">
              {t("translation:signUpSuccess.title")}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <p>{t("translation:signUpSuccess.text")}</p>
            <h3 className="fw-normal">
              {t("translation:signUpSuccess.emailSent")}
              <br />"<strong>{signupUserSuccess.email}</strong>"
            </h3>
            <div className="mt-3">
              <p className="small text-secondary mb-0">
                {t("translation:signUpSuccess.wrongEmail")}
              </p>
              <p>
                <a
                  href="https://wa.me/50687882262/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hvr-grow text-dark me-3"
                >
                  <Whatsapp className="mb-1" size="24" />
                </a>
                <a
                  href="https://m.me/tucanaapp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hvr-grow text-dark me-3"
                >
                  <Messenger className="mb-1" size="24" />
                </a>
                <a
                  href="mailto:info@tucana.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hvr-grow text-dark me-3"
                >
                  <Envelope className="mb-1" size="30" />
                </a>
              </p>
            </div>
            <p className="mt-5">
              <LinkContainer to="/">
                <Button variant="success" size="lg">
                  <ArrowLeft size="24" className="me-2" />
                  {t("translation:global.homepage")}
                </Button>
              </LinkContainer>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SignUpSuccess;
