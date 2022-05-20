import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import LoadingSpinner from "../../components/LoadingSpinner";

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

  const schema = Yup.object().shape({
    credential: Yup.string(labelStringField).required(labelRequiredField),

    password: Yup.string().required(labelRequiredField),
  });

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
    return <Redirect to="/find" />;
  }

  return (
    <Container data-aos="fade-in">
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
                          <Form.Group>
                            <Form.Control
                              type="password"
                              name="password"
                              placeholder={t("translation:global.password")}
                              onChange={handleChange}
                              isInvalid={!!errors.password}
                              isValid={touched.password && !errors.password}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col className="text-end mb-3 mb-md-4">
                          <Link to="/forgot-password" className="text-end">
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

                      <Row>
                        <Col className="d-inline-flex justify-content-end">
                          <LinkContainer to="/signup">
                            <Button
                              variant="outline-success"
                              className="me-5"
                              size="lg"
                            >
                              {t("translation:global.signUp")}
                            </Button>
                          </LinkContainer>
                          <Form.Group>
                            <Button
                              variant="success"
                              size="lg"
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
                          </Form.Group>
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
