import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";

import { submitEmailForgotPassword } from "../../redux";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    isLoadingSendEmailForgotPassword,
    sendEmailForgotPasswordData,
    sendEmailForgotPasswordError,
  } = useSelector((state) => state.user);
  const { labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );

  const schema = Yup.object().shape({
    email: Yup.string(labelStringField)
      .email(t("translation:global.errors.validEmail"))
      .required(labelRequiredField),
  });

  const handleSubmit = (email, formikBag) => {
    dispatch(submitEmailForgotPassword(email));
    formikBag.setSubmitting(false);
  };

  if (isLoggedIn) {
    return <Redirect to="/find" />;
  }

  return (
    <>
      <GoBack />

      <Container data-aos="fade-in">
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <div className="text-center">
              <h2 className="title">{t("translation:resetPassword.title")}</h2>
              <p className="lead">{t("translation:resetPassword.subTitle")}</p>
            </div>

            {sendEmailForgotPasswordData.message &&
            sendEmailForgotPasswordData.message !== "" ? (
              <Row>
                <Col>
                  <Alert variant="success">
                    {sendEmailForgotPasswordData.message}
                  </Alert>
                </Col>
              </Row>
            ) : sendEmailForgotPasswordError !== "" ? (
              <Row>
                <Col>
                  <Alert variant="warning">
                    {sendEmailForgotPasswordError}
                  </Alert>
                </Col>
              </Row>
            ) : null}

            <Formik
              validationSchema={schema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={handleSubmit}
              initialValues={{
                email: "",
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
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder={t("translation:resetPassword.typeEmail")}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                          isValid={touched.email && !errors.email}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="text-end">
                        <Button
                          variant="success"
                          size="lg"
                          type="submit"
                          disabled={
                            isSubmitting || isLoadingSendEmailForgotPassword
                          }
                        >
                          {isSubmitting || isLoadingSendEmailForgotPassword ? (
                            <LoadingSpinner />
                          ) : null}
                          {t("translation:resetPassword.sendLink")}
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
    </>
  );
};

export default ForgotPassword;
