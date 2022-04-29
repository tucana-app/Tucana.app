import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import LoadingSpinner from "../../components/LoadingSpinner";
import FeedbackMessage from "../../components/FeedbackMessage";

import { clearFeedback, login, resendConfirmationLink } from "../../redux";

const Login = () => {
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
    dispatch(clearFeedback());
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
    <Container className="my-5" data-aos="fade-in">
      <Row className="mb-4">
        <Col className="text-center">
          <h1 className="text-success">Welcome back</h1>
          <p className="lead">We are happy to see you again</p>
        </Col>
      </Row>
      <Row>
        <Col xs={10} md={8} lg={6} xl={4} className="mx-auto">
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
                      <Form.Label>Email or Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="credential"
                        placeholder="Email or Username"
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
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
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
                      Forgot your password?
                    </Link>
                  </Col>
                </Row>

                <FeedbackMessage />

                {loginErrorData ? (
                  loginErrorData.flag === "NOT_CONFIRMED" ? (
                    <>
                      <Alert variant="warning" show={showAlertConfirmEmail}>
                        {loginErrorData.message}.{" "}
                        <u
                          className="cursor-pointer text-primary"
                          onClick={() => {
                            dispatch(
                              resendConfirmationLink(loginErrorData.userId)
                            );
                            setShowAlertConfirmEmail(false);
                          }}
                        >
                          Resend the confirmation link
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
                        Sign Up
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
                          <LoadingSpinner />
                        ) : null}
                        Login
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
  );
};

export default Login;
