import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";

import LoadingSpinner from "../../components/LoadingSpinner";

import { submitEditPassword } from "../../redux";
import GoBack from "../../components/GoBack";

require("yup-password")(Yup); // extend yup

const EditPassword = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const {
    user: currentUser,
    isLoggedIn,
    isLoadingSubmitEditPassword,
    submitEditPasswordSuccess,
  } = useSelector((state) => state.user);
  const { labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );

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
    dispatch(submitEditPassword(currentUser, values));
    formikBag.setSubmitting(false);
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container>
        <Row className="mb-3">
          <Col>
            <h1 className="title text-center">
              {t("translation:edit.password.title")}
            </h1>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <Formik
              validationSchema={schema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={handleSubmit}
              initialValues={{
                currentPassword: "",
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
                  <Form.Group className="mb-4">
                    <Form.Label>
                      {t("translation:edit.password.oldPassword")}
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="currentPassword"
                      placeholder={t("translation:global.password")}
                      onChange={handleChange}
                      isInvalid={!!errors.currentPassword}
                      isValid={
                        touched.currentPassword && !errors.currentPassword
                      }
                      disabled={submitEditPasswordSuccess.flag === "SUCCESS"}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.currentPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      {t("translation:createNewPassword.newPassword")}
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password1"
                      placeholder={t("translation:global.password")}
                      onChange={handleChange}
                      isInvalid={!!errors.password1}
                      isValid={touched.password1 && !errors.password1}
                      disabled={submitEditPasswordSuccess.flag === "SUCCESS"}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password1}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      {t("translation:createNewPassword.retypePassword")}
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password2"
                      placeholder={t("translation:global.password")}
                      onChange={handleChange}
                      disabled={submitEditPasswordSuccess.flag === "SUCCESS"}
                      isInvalid={!!errors.password2}
                      isValid={touched.password2 && !errors.password2}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password2}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="text-end">
                    <Button
                      variant="success"
                      size="lg"
                      type="submit"
                      disabled={
                        submitEditPasswordSuccess.flag === "SUCCESS" ||
                        isSubmitting ||
                        isLoadingSubmitEditPassword
                      }
                    >
                      {isSubmitting || isLoadingSubmitEditPassword ? (
                        <LoadingSpinner />
                      ) : null}
                      {t("translation:global.update")}
                    </Button>
                  </Form.Group>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <p className="text-secondary">
              {t("translation:edit.password.forgotPassword")}
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditPassword;
