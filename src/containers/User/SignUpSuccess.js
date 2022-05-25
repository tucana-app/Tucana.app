import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SignUpSuccess(props) {
  const { t } = useTranslation();
  const { isLoggedIn, signupUserSuccessful } = useSelector(
    (state) => state.user
  );

  if (isLoggedIn) {
    return <Redirect to="/rides" />;
  }

  if (!signupUserSuccessful) {
    return <Redirect to="/signup" />;
  }

  return (
    <>
      <Container className="py-5 text-center">
        <Row className="mb-5">
          <Col>
            <h1 className="text-success">
              {t("translation:signUpSuccess.title")}!
            </h1>
            <p className="lead">{t("translation:signUpSuccess.subTitle")}</p>
          </Col>
        </Row>
        <Row>
          <Col>{t("translation:signUpSuccess.text")}</Col>
        </Row>
      </Container>
    </>
  );
}

export default SignUpSuccess;
