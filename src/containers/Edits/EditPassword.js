import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";

import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";

import { submitEditPassword } from "../../redux";
import { InfoIcon } from "@primer/octicons-react";
import EyePassword from "../../components/EyePassword";

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

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const schema = Yup.object().shape({
    currentPassword: Yup.string().required(labelRequiredField),
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
                  <p className="mb-2">
                    {t("translation:edit.password.oldPassword")}
                  </p>
                  <Form.Group className="input-password mb-4">
                    <Form.Control
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      placeholder={t("translation:global.password")}
                      onChange={handleChange}
                      isInvalid={!!errors.currentPassword}
                      isValid={
                        touched.currentPassword && !errors.currentPassword
                      }
                      disabled={submitEditPasswordSuccess.flag === "SUCCESS"}
                      spellCheck="false"
                      autoCorrect="off"
                      autoCapitalize="off"
                      autoComplete="currentPassword"
                      required
                    />
                    <EyePassword
                      isShow={showCurrentPassword}
                      touched={touched.currentPassword}
                      setShowPassword={setShowCurrentPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.currentPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <p className="mb-2">
                    {t("translation:createNewPassword.newPassword")}
                  </p>
                  <Form.Group className="input-password mb-4">
                    <Form.Control
                      type={showPassword1 ? "text" : "password"}
                      name="password1"
                      placeholder={t("translation:global.password")}
                      onChange={handleChange}
                      isInvalid={!!errors.password1}
                      isValid={touched.password1 && !errors.password1}
                      disabled={submitEditPasswordSuccess.flag === "SUCCESS"}
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

                  <p className="mb-2">
                    {t("translation:createNewPassword.retypePassword")}
                    <span className="text-danger">*</span>
                  </p>
                  <Form.Group className="input-password mb-4">
                    <Form.Control
                      type={showPassword2 ? "text" : "password"}
                      name="password2"
                      placeholder={t("translation:global.password")}
                      onChange={handleChange}
                      disabled={submitEditPasswordSuccess.flag === "SUCCESS"}
                      isInvalid={!!errors.password2}
                      isValid={touched.password2 && !errors.password2}
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
              <InfoIcon size="20" verticalAlign="middle" />{" "}
              <span className="align-middle">
                {t("translation:edit.password.forgotPassword")}
              </span>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditPassword;
