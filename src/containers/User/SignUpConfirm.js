import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { confirmEmail } from "../../redux";
import LoadingSpinner from "../../components/LoadingSpinner";
import logo from "../../assets/images/logo-black.png";

const SignUpConfirm = () => {
  const { t } = useTranslation();
  const { uuid } = useParams();

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingConfirmEmail, confirmEmailData, confirmEmailError } =
    useSelector((state) => state.user);

  useEffect(() => {
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
            lg={8}
            xl={6}
            className="text-center mx-auto"
          >
            {confirmEmailData.message ? (
              <Alert variant="success">{confirmEmailData.message}</Alert>
            ) : confirmEmailError ? (
              <Alert variant="danger">{confirmEmailError}</Alert>
            ) : null}

            <Link to="/login" className="text-decoration-none px-0">
              <Button variant="success" size="lg">
                {t("translation:global.logIn")}
              </Button>
            </Link>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SignUpConfirm;
