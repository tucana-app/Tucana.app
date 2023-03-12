import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";
import EyePassword from "../../components/EyePassword";

import { login, resendConfirmationLink } from "../../redux";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isloadingLogin, isLoggedIn, loginErrorData } = useSelector(
    (state) => state.user
  );
  const { labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );

  const [showAlertConfirmEmail, setShowAlertConfirmEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const schema = Yup.object().shape({
    credential: Yup.string(labelStringField).required(labelRequiredField),

    password: Yup.string().required(labelRequiredField),
  });

  // Handlers
  const handleSubmit = (values, formikBag) => {
    dispatch(login(values));
    formikBag.setSubmitting(false);
  };

  useEffect(() => {
    if (loginErrorData) {
      loginErrorData.flag === "NOT_CONFIRMED"
        ? setShowAlertConfirmEmail(true)
        : setShowAlertConfirmEmail(false);
    }
  }, [loginErrorData]);

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container data-aos="fade-in">
      <div className="position-absolute">
        <GoBack />
      </div>

      <Row className="min-vh-100 align-items-center">
        <Col>
          <Container className="p-0">
            <Row className="mb-4">
              <Col className="text-center p-0">
                <h1 className="text-success">
                  {" "}
                  {t("translation:global.logIn")}
                </h1>
              </Col>
            </Row>
            <Row>
              <Col xs={10} md={8} lg={6} xl={4} className="mx-auto p-0">
                <Formik
                  validationSchema={schema}
                  validateOnChange={false}
                  validateOnBlur={false}
                  onSubmit={handleSubmit}
                  initialValues={{
                    credential: "",
                    password: "",
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    // handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                    isSubmitting,
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Row>
                        <Col xs={12} className="mb-3 mb-md-4">
                          <Form.Group>
                            <Form.Control
                              type="text"
                              name="credential"
                              size="lg"
                              placeholder={t("translation:logIn.credential")}
                              onChange={handleChange}
                              isInvalid={!!errors.credential}
                              isValid={touched.credential && !errors.credential}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.credential}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col xs={12} className="mb-2">
                          <Form.Group className="input-password-lg">
                            <Form.Control
                              type={showPassword ? "text" : "password"}
                              name="password"
                              placeholder={t("translation:global.password")}
                              size="lg"
                              onChange={handleChange}
                              isInvalid={!!errors.password}
                              isValid={touched.password && !errors.password}
                              spellCheck="false"
                              autoCorrect="off"
                              autoCapitalize="off"
                              autoComplete="password"
                              required
                            />
                            <EyePassword
                              isShow={showPassword}
                              touched={touched.password}
                              setShowPassword={setShowPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col className="text-end mb-5">
                          <Link
                            to="/forgot-password"
                            className="link-secondary"
                          >
                            {t("translation:logIn.forgotPassword")}
                          </Link>
                        </Col>
                      </Row>

                      {loginErrorData ? (
                        loginErrorData.flag === "NOT_CONFIRMED" ? (
                          <>
                            <Alert
                              variant="warning"
                              show={showAlertConfirmEmail}
                            >
                              {loginErrorData.message}.{" "}
                              <u
                                className="cursor-pointer text-primary"
                                onClick={() => {
                                  dispatch(
                                    resendConfirmationLink(
                                      loginErrorData.userId
                                    )
                                  );
                                  setShowAlertConfirmEmail(false);
                                }}
                              >
                                {t("translation:global.resendLink")}
                              </u>
                            </Alert>
                          </>
                        ) : null
                      ) : null}

                      <Row className="mb-3">
                        <Col>
                          <Button
                            variant="success"
                            size="lg"
                            className="py-2 w-100"
                            type="submit"
                            disabled={isSubmitting || isloadingLogin}
                          >
                            {isSubmitting || isloadingLogin ? (
                              <span className="mx-2">
                                <LoadingSpinner />
                              </span>
                            ) : (
                              <span> {t("translation:global.logIn")}</span>
                            )}
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <LinkContainer to="/signup">
                            <Button
                              variant="outline-success"
                              size="lg"
                              className="py-2 w-100"
                              disabled={isSubmitting || isloadingLogin}
                            >
                              {t("translation:global.signUp")}
                            </Button>
                          </LinkContainer>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
