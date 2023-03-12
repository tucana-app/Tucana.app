import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { Trans, useTranslation } from "react-i18next";
import {
  FeedPersonIcon,
  KeyIcon,
  MentionIcon,
  PersonIcon,
} from "@primer/octicons-react";

import { registerUser, setToast, resendConfirmationLink } from "../../redux";

import { getYearsDiff } from "../../helpers";

import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";
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
      .min(3, t("translation:global.errors.min3characters"))
      .max(20, t("translation:global.errors.max20characters"))
      .matches(
        /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
        t("translation:global.errors.validName")
      )
      .required(labelRequiredField),

    lastName: Yup.string(labelStringField)
      .min(3, t("translation:global.errors.min3characters"))
      .max(20, t("translation:global.errors.max20characters"))
      .matches(
        /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
        t("translation:global.errors.validName")
      )
      .required(labelRequiredField),

    email: Yup.string(labelStringField)
      .email(t("translation:global.errors.validEmail"))
      .required(labelRequiredField),

    birthDay: Yup.number()
      .min(1, "1 - 31")
      .max(31, "1 - 31")
      .required(labelRequiredField),

    birthMonth: Yup.number()
      .min(1, "1 - 12")
      .max(12, "1 - 12")
      .required(labelRequiredField),

    birthYear: Yup.number()
      .min(1900, t("translation:global.errors.validYear"))
      .max(new Date().getFullYear(), `${t("translation:global.year")}`)
      .required(labelRequiredField),

    username: Yup.string(labelStringField)
      .min(4, t("translation:global.errors.min4characters"))
      .max(20, t("translation:global.errors.max20characters"))
      .matches(
        /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$/,
        t("translation:global.errors.validUsername")
      )
      .required(labelRequiredField),

    password: Yup.string()
      .password()
      .minSymbols(0)
      .minUppercase(0)
      .required(labelRequiredField),

    checkTerms: Yup.bool().oneOf(
      [true],
      t("translation:global.errors.acceptTerms")
    ),

    checkNewsletter: Yup.bool().oneOf([true, false]),
  });

  const handleSubmit = (values, formikBag) => {
    const { birthDay, birthMonth, birthYear } = values;

    if (
      getYearsDiff(new Date(birthYear, birthMonth - 1, birthDay), new Date()) >=
      18
    ) {
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
    } else {
      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: t("translation:signUp.ageWarning"),
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
    <Container data-aos="fade-in">
      <GoBack />

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
              birthDay: "",
              birthMonth: "",
              birthYear: "",
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
                    <InputGroup>
                      <InputGroup.Text className="pe-2">
                        <PersonIcon size={18} />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="firstName"
                        className="border-end-pill"
                        placeholder={t("translation:global.firstName")}
                        onChange={handleChange}
                        isInvalid={!!errors.firstName}
                        isValid={touched.firstName && !errors.firstName}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>

                  <Col xs={12} sm={6} className="mb-3 mb-md-4">
                    <InputGroup>
                      <InputGroup.Text className="pe-2">
                        <PersonIcon size={18} />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="lastName"
                        className="border-end-pill"
                        placeholder={t("translation:global.lastName")}
                        onChange={handleChange}
                        isInvalid={!!errors.lastName}
                        isValid={touched.lastName && !errors.lastName}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} sm={6} className="mb-3 mb-md-4">
                    <InputGroup>
                      <InputGroup.Text className="pe-2">
                        <MentionIcon size={18} />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="email"
                        className="border-end-pill"
                        placeholder={t("translation:global.email")}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        isValid={touched.email && !errors.email}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
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
                  <Col xs={12} sm={6} className="mb-3">
                    <InputGroup>
                      <InputGroup.Text className="pe-2">
                        <FeedPersonIcon size={18} />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder={t("translation:global.username")}
                        className="border-end-pill"
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                        isValid={touched.username && !errors.username}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>

                  <Col xs={12} sm={6} className="mb-4">
                    <InputGroup className="input-password">
                      <InputGroup.Text className="pe-2">
                        <KeyIcon size={18} />
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder={t("translation:global.password")}
                        className="border-end-pill"
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
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col xs={12}>
                    <p className="h4 text-center ms-1">
                      {t("translation:global.dateOfBirth")}{" "}
                    </p>
                  </Col>

                  <Col xs={4} className="text-center">
                    <Form.Group>
                      <Form.Control
                        type="number"
                        id="1"
                        name="birthDay"
                        placeholder={t("translation:global.day")}
                        min={1}
                        max={31}
                        value={values.birthDay}
                        onChange={(e) => {
                          return e.target.value.length <= 2
                            ? handleChange(e)
                            : null;
                        }}
                        maxLength={2}
                        isInvalid={!!errors.birthDay}
                        isValid={touched.birthDay && !errors.birthDay}
                        disabled={isloadingSignup}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.birthDay}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={4} className="text-center">
                    <Form.Group>
                      <Form.Control
                        type="number"
                        id="2"
                        name="birthMonth"
                        placeholder={t("translation:global.month")}
                        min={1}
                        max={12}
                        value={values.birthMonth}
                        onChange={(e) => {
                          return e.target.value.length <= 2
                            ? handleChange(e)
                            : null;
                        }}
                        isInvalid={!!errors.birthMonth}
                        isValid={touched.birthMonth && !errors.birthMonth}
                        disabled={isloadingSignup}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.birthMonth}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={4} className="text-center">
                    <Form.Group>
                      <Form.Control
                        type="number"
                        name="birthYear"
                        placeholder={t("translation:global.year")}
                        min={1900}
                        max={new Date().getFullYear() - 17}
                        value={values.birthYear}
                        onChange={(e) => {
                          return e.target.value.length <= 4
                            ? handleChange(e)
                            : null;
                        }}
                        isInvalid={!!errors.birthYear}
                        isValid={touched.birthYear && !errors.birthYear}
                        disabled={isloadingSignup}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.birthYear}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} className="text-center mt-2 mb-3 mb-md-4">
                    <small className="text-secondary">
                      {t("translation:signUp.ageWarning")}
                    </small>
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
                    <Button
                      variant="success"
                      size="lg"
                      className="py-2 w-100"
                      type="submit"
                      disabled={isSubmitting || isloadingSignup}
                    >
                      {isSubmitting || isloadingSignup ? (
                        <LoadingSpinner />
                      ) : null}
                      {t("translation:global.signUp")}
                    </Button>
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
