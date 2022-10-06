import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { Redirect, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { displayNavBar, confirmEmail } from "../../redux";
import LoadingSpinner from "../../components/LoadingSpinner";
import logo from "../../assets/images/logo-full-black.png";

const SignUpConfirm = () => {
  const { t } = useTranslation();
  const { uuid } = useParams();

  const dispatch = useDispatch();
  const {
    isLoggedIn,
    isLoadingConfirmEmail,
    confirmEmailData,
    confirmEmailError,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(displayNavBar(false));

    if (!isLoggedIn) dispatch(confirmEmail(uuid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle redirection in case the user is already logged in
  if (isLoggedIn) {
    return <Redirect to="/find" />;
  }

  return (
    <Container data-aos="fade-in">
      <Row className="my-5">
        <Col className="text-center">
          <img
            src={logo}
            alt="Tucána logo"
            className="img-fluid"
            style={{ maxWidth: "300px" }}
          />
        </Col>
      </Row>

      {isLoadingConfirmEmail ? (
        <Col className="text-center">
          <LoadingSpinner />
        </Col>
      ) : (
        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mx-auto"
          >
            {confirmEmailData.message ? (
              <>
                <Alert variant="success">{confirmEmailData.message}</Alert>
                <h3 className="mt-3">{t("translation:global.goBackApp")}</h3>
              </>
            ) : confirmEmailError ? (
              <Alert variant="danger">{confirmEmailError}</Alert>
            ) : null}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SignUpConfirm;
