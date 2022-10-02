import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { Redirect, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";

import LoadingSpinner from "../../components/LoadingSpinner";
import logo from "../../assets/images/logo-black.png";

import {
  resetPassword,
  checkDeprecatedLinkResetPassword,
  displayNavBar,
} from "../../redux";
import EyePassword from "../../components/EyePassword";

require("yup-password")(Yup); // extend yup

const CreateNewPassword = () => {
  const { t } = useTranslation();
  const { uuid } = useParams();

  const dispatch = useDispatch();
  const {
    isLoggedIn,
    isLoadingCheckDeprecatedLinkResetPassword,
    checkDeprecatedLinkResetPasswordError,
    isLoadingResetPassword,
    resetPasswordData,
  } = useSelector((state) => state.user);
  const { labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const schema = Yup.object().shape({
    password1: Yup.string().required(labelRequiredField).password(),
    password2: Yup.string(labelStringField)
      .required(labelRequiredField)
      .password()
      .oneOf(
        [Yup.ref("password1"), null],
        t("translation:global.errors.passwordsMatch")
      ),
  });

  const handleSubmit = (values, formikBag) => {
    dispatch(resetPassword(values, uuid));
    formikBag.setSubmitting(false);
  };

  useEffect(() => {
    dispatch(displayNavBar(false));

    if (!isLoggedIn) dispatch(checkDeprecatedLinkResetPassword(uuid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle redirection in case the user is already logged in
  if (isLoggedIn) {
    return <Redirect to="/find" />;
  }

  return (
    <>
      <Container>
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

        {isLoadingCheckDeprecatedLinkResetPassword ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : checkDeprecatedLinkResetPasswordError.flag === "FAIL" ? (
          <Row>
            <Col className="text-center">
              <h1>{t("translation:createNewPassword.linkDeprecated")}</h1>
            </Col>
          </Row>
        ) : resetPasswordData.flag === "RESET_PASSWORD_SUCCESS" ? (
          <Row>
            <Col
              xs={12}
              sm={10}
              ms={8}
              lg={6}
              xl={4}
              className="text-center mx-auto"
            >
              <Alert variant="success">
                {t("translation:createNewPassword.success")}
              </Alert>

              <h3 className="mt-3">{t("translation:global.goBackApp")}</h3>
            </Col>
          </Row>
        ) : (
          <>
            <Row className="mb-3">
              <Col className="text-center">
                <h1>{t("translation:createNewPassword.title")}</h1>
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
                <Formik
                  validationSchema={schema}
                  validateOnChange={false}
                  validateOnBlur={false}
                  onSubmit={handleSubmit}
                  initialValues={{
                    password1: "",
                    password2: "",
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
                          <p>
                            {t("translation:createNewPassword.newPassword")}
                          </p>
                          <Form.Group className="input-password">
                            <Form.Control
                              type={showPassword1 ? "text" : "password"}
                              name="password1"
                              placeholder={t("translation:global.password")}
                              onChange={handleChange}
                              isInvalid={!!errors.password1}
                              isValid={touched.password1 && !errors.password1}
                              disabled={
                                resetPasswordData.flag ===
                                "RESET_PASSWORD_SUCCESS"
                              }
                              spellCheck="false"
                              autoCorrect="off"
                              autoCapitalize="off"
                              autoComplete="password1"
                              required
                            />
                            <EyePassword
                              isShow={showPassword1}
                              touched={touched.password1}
                              setShowPassword={setShowPassword1}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password1}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col xs={12} className="mb-3 mb-md-4">
                          <p>
                            {t("translation:createNewPassword.retypePassword")}
                            <span className="text-danger">*</span>
                          </p>
                          <Form.Group className="input-password">
                            <Form.Control
                              type={showPassword2 ? "text" : "password"}
                              name="password2"
                              placeholder={t("translation:global.password")}
                              onChange={handleChange}
                              disabled={
                                resetPasswordData.flag ===
                                "RESET_PASSWORD_SUCCESS"
                              }
                              isInvalid={!!errors.password2}
                              isValid={touched.password2 && !errors.password2}
                              spellCheck="false"
                              autoCorrect="off"
                              autoCapitalize="off"
                              autoComplete="password2"
                              required
                            />
                            <EyePassword
                              isShow={showPassword2}
                              touched={touched.password2}
                              setShowPassword={setShowPassword2}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password2}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col xs={12} className="mb-3">
                          <Form.Group className="text-end">
                            <Button
                              variant="success"
                              size="lg"
                              type="submit"
                              disabled={
                                isSubmitting ||
                                isLoadingResetPassword ||
                                resetPasswordData.flag ===
                                  "RESET_PASSWORD_SUCCESS"
                              }
                            >
                              {isSubmitting || isLoadingResetPassword ? (
                                <LoadingSpinner />
                              ) : null}
                              {t("translation:createNewPassword.reset")}
                            </Button>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <p className="small">
                  <span className="text-danger">*</span>
                  <span className="text-secondary">
                    {t("translation:global.mandatory")}
                  </span>
                </p>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default CreateNewPassword;
