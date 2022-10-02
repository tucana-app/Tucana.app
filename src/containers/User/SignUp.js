import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { Trans, useTranslation } from "react-i18next";

import { registerUser, setToast, resendConfirmationLink } from "../../redux";
import LoadingSpinner from "../../components/LoadingSpinner";
import EyePassword from "../../components/EyePassword";

require("yup-password")(Yup); // extend yup

const SignUp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isloadingSignup, isLoggedIn, signupUserSuccessful, signupErrorData } =
    useSelector((state) => state.user);
  const { labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );

  const [showAlertConfirmEmail, setShowAlertConfirmEmail] = useState(false);

  const form = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const schema = Yup.object().shape({
    firstName: Yup.string(labelStringField)
      .min(4, t("translation:global.errors.min4characters"))
      .max(20, t("translation:global.errors.max20characters"))
      .matches(
        /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
        t("translation:global.errors.validName")
      )
      .required(labelRequiredField),

    lastName: Yup.string(labelStringField)
      .min(4, t("translation:global.errors.min4characters"))
      .max(20, t("translation:global.errors.max20characters"))
      .matches(
        /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
        t("translation:global.errors.validName")
      )
      .required(labelRequiredField),

    email: Yup.string(labelStringField)
      .email(t("translation:global.errors.validEmail"))
      .required(labelRequiredField),

    username: Yup.string(labelStringField)
      .min(4, t("translation:global.errors.min4characters"))
      .max(20, t("translation:global.errors.max20characters"))
      .matches(
        /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$/,
        t("translation:global.errors.validUsername")
      )
      .required(labelRequiredField),

    password: Yup.string().password().required(labelRequiredField),

    checkTerms: Yup.bool().oneOf(
      [true],
      t("translation:global.errors.acceptTerms")
    ),

    checkNewsletter: Yup.bool().oneOf([true, false]),
  });

  const handleSubmit = (values, formikBag) => {
    if (phoneNumber && isValidPhoneNumber(phoneNumber)) {
      values.phoneNumber = phoneNumber;
      dispatch(registerUser(values));
      formikBag.setSubmitting(false);
    } else {
      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: t("translation:global.errors.validPhone"),
          variant: "warning",
        })
      );
      formikBag.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (signupErrorData) {
      signupErrorData.flag === "NOT_CONFIRMED"
        ? setShowAlertConfirmEmail(true)
        : setShowAlertConfirmEmail(false);
    }
  }, [signupErrorData]);

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
              checkTerms: false,
              checkNewsletter: false,
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

                  <Col xs={12} sm={6} className="mb-3">
                    <Form.Group className="input-password mb-3">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder={t("translation:global.password")}
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
                </Row>

                <Row className="mb-3 mb-md-4">
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Check
                        type="checkbox"
                        name="checkTerms"
                        label={
                          <small>
                            <Trans i18nKey="translation:signUp.agreement">
                              I agree with the{" "}
                              <Link
                                to="/terms"
                                className="link-success cursor-pointer text-decoration-underline"
                              >
                                terms &amp; conditions
                              </Link>{" "}
                              and the{" "}
                              <Link
                                to="/privacy"
                                className="link-success cursor-pointer text-decoration-underline"
                              >
                                privacy policy
                              </Link>
                            </Trans>
                          </small>
                        }
                        onChange={handleChange}
                        isInvalid={!!errors.checkTerms}
                        isValid={touched.checkTerms && !errors.checkTerms}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.checkTerms}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {/* <Col xs={12}>
                    <Form.Group>
                      <Form.Check
                        type="checkbox"
                        name="checkNewsletter"
                        label={
                          <small>{t("translation:signUp.newsletter")}</small>
                        }
                        onChange={handleChange}
                        isInvalid={!!errors.checkNewsletter}
                        isValid={
                          touched.checkNewsletter && !errors.checkNewsletter
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.checkNewsletter}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col> */}
                </Row>

                {signupErrorData ? (
                  signupErrorData.flag === "NOT_CONFIRMED" ? (
                    <>
                      <Alert variant="warning" show={showAlertConfirmEmail}>
                        {signupErrorData.message}.{" "}
                        <u
                          className="cursor-pointer text-primary"
                          onClick={() => {
                            dispatch(
                              resendConfirmationLink(signupErrorData.userId)
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
