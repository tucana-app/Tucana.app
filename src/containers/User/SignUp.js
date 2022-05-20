import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useTranslation } from "react-i18next";

import { registerUser, setToast } from "../../redux";
import LoadingSpinner from "../../components/LoadingSpinner";

require("yup-password")(Yup); // extend yup

const SignUp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    isloadingSignup,
    isLoggedIn,
    signupUserSuccessful,
    signupErrorFlag,
    signupErrorMessage,
  } = useSelector((state) => state.user);
  const { feedback, labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );

  const form = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");

  const schema = Yup.object().shape({
    firstName: Yup.string(labelStringField)
      .min(4, "Min. 4 characters")
      .max(20, "Max. 20 characters")
      .matches(
        /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
        "Please enter a valid name"
      )
      .required(labelRequiredField),

    lastName: Yup.string(labelStringField)
      .min(4, "Min. 4 characters")
      .max(20, "Max. 20 characters")
      .matches(
        /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
        "Please enter a valid name"
      )
      .required(labelRequiredField),

    email: Yup.string(labelStringField)
      .email("Please enter a valid email address")
      .required(labelRequiredField),

    // phoneNumber: Yup.string(labelStringField)
    //   .matches(
    //     /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
    //     "Please enter a valid phone number"
    //   )
    //   .min(8, "Please enter a valid phone number")
    //   .max(15, "Please enter a valid phone number")
    //   .required(labelRequiredField),

    username: Yup.string(labelStringField)
      .min(4, "Min. 4 characters")
      .max(20, "Max. 20 characters")
      .matches(
        /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$/,
        "Please enter a valid name (only letters and numbers)"
      )
      .required(labelRequiredField),

    password: Yup.string().password().required(labelRequiredField),
  });

  const handleSubmit = (values, formikBag) => {
    if (phoneNumber && isValidPhoneNumber(phoneNumber)) {
      values.phoneNumber = phoneNumber;
      dispatch(registerUser(values));

      // form.current.reset();
      formikBag.setSubmitting(false);
    } else {
      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: "Please enter a valid phone number",
          variant: "warning",
        })
      );
      formikBag.setSubmitting(false);
    }
  };

  // Handle redirection in case the user is already logged in
  if (isLoggedIn) {
    return <Redirect to="/find" />;
  }

  if (signupUserSuccessful) {
    return <Redirect to="/signup-successful" />;
  }

  return (
    <Container className="my-5" data-aos="fade-in">
      <Row className="mb-3">
        <Col className="text-center">
          <h1 className="text-success">{t("translation:global.signUp")}</h1>
          <p className="lead">{t("translation:signUp.subTitle")}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
          <Formik
            validationSchema={schema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={handleSubmit}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              username: "",
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
              <Form noValidate onSubmit={handleSubmit} ref={form}>
                <Row>
                  <Col xs={12} sm={6} className="mb-3 mb-md-4">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder={t("translation:global.firstName")}
                        onChange={handleChange}
                        isInvalid={!!errors.firstName}
                        isValid={touched.firstName && !errors.firstName}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6} className="mb-3 mb-md-4">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder={t("translation:global.lastName")}
                        onChange={handleChange}
                        isInvalid={!!errors.lastName}
                        isValid={touched.lastName && !errors.lastName}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} sm={6} className="mb-3 mb-md-4">
                    <Form.Group>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder={t("translation:global.email")}
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

                  <Col xs={12} sm={6} className="mb-3 mb-md-4">
                    <Form.Group>
                      <PhoneInput
                        international
                        defaultCountry="CR"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        name="phoneNumber"
                        error={
                          phoneNumber
                            ? isValidPhoneNumber(phoneNumber)
                              ? undefined
                              : "Invalid phone number"
                            : "Phone number required"
                        }
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.phoneNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} sm={6} className="mb-3 mb-md-4">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder={t("translation:global.username")}
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                        isValid={touched.username && !errors.username}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6} className="mb-3 mb-md-4">
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder={t("translation:global.username")}
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
                </Row>

                {signupErrorFlag === "NOT_CONFIRMED" ? (
                  <Alert variant="warning">
                    {signupErrorMessage}.{" "}
                    <Link to="/coming-soon">
                      {" "}
                      {t("translation:global.resendLink")}
                    </Link>
                  </Alert>
                ) : (
                  feedback.message && (
                    <Alert variant={feedback.variant}>{feedback.message}</Alert>
                  )
                )}

                <Row>
                  <Col>
                    <Form.Group className="text-end">
                      <Button
                        variant="success"
                        size="lg"
                        type="submit"
                        disabled={isSubmitting || isloadingSignup}
                      >
                        {isSubmitting || isloadingSignup ? (
                          <LoadingSpinner />
                        ) : null}
                        {t("translation:global.submit")}
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs={12} sm={10} md={8} lg={6} className="mt-2 mx-auto">
          <p className="small text-secondary mb-3">
            {t("translation:signUp.agreement1")}{" "}
            <Link to="/terms" className="link-secondary">
              {t("translation:signUp.agreement2")}
            </Link>
            .
          </p>
          <p className="small text-secondary mb-3">
            {t("translation:signUp.paragraphInfo")}{" "}
            <Link to="/how-it-works" className="text-secondary">
              {t("translation:global.learnMore")}
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
