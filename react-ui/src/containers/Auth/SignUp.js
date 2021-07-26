import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import { registerUser } from "../../redux";
import LoadingSpinner from "../../components/LoadingSpinner";

require("yup-password")(Yup); // extend yup

const SignUp = () => {
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

    phoneNumber: Yup.string(labelStringField)
      .min(8, "Please enter a valid phone number")
      .required(labelRequiredField),

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
    dispatch(registerUser(values));

    form.current.reset();
    formikBag.setSubmitting(false);
  };

  // Handle redirection in case the user is already logged in
  if (isLoggedIn) {
    return <Redirect to="/find-ride" />;
  }

  if (signupUserSuccessful) {
    return <Redirect to="/signup-successful" />;
  }

  return (
    <Container className="my-5" data-aos="fade-in" data-aos-duration="1000">
      <Row className="mb-3">
        <Col className="text-center">
          <h1 className="text-success">Sign Up</h1>
          <p className="lead text-light">Sign up to access the plateform</p>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={10} lg={8} className="mx-auto">
          <Formik
            validationSchema={schema}
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
                      <Form.Label>
                        First name<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        className="rounded-0"
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
                      <Form.Label>
                        Last name<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        className="rounded-0"
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
                      <Form.Label>
                        Email<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="rounded-0"
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
                      <Form.Label>
                        Phone number<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone number"
                        className="rounded-0"
                        onChange={handleChange}
                        isInvalid={!!errors.phoneNumber}
                        isValid={touched.phoneNumber && !errors.phoneNumber}
                        required
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
                      <Form.Label>
                        Username<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="rounded-0"
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
                      <Form.Label>
                        Password<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="rounded-0"
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
                    <Link to="/coming-soon">Resend the confirmation link</Link>
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
                        className="rounded-0"
                        type="submit"
                        disabled={isSubmitting || isloadingSignup}
                      >
                        {isSubmitting || isloadingSignup ? (
                          <LoadingSpinner />
                        ) : null}
                        Submit
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
        <Col xs={12} sm={10} md={8} lg={6} className="mt-2 mx-auto">
          <p className="small text-secondary mb-3">
            <span className="text-danger">*</span> These fields are mandatory
          </p>
          <p className="small text-secondary mb-3">
            If you chose to sign up, you agree with our{" "}
            <Link to="/coming-soon" className="link-secondary">
              terms and conditions
            </Link>
            .
          </p>
          <p className="small text-secondary mb-3">
            The information you are providing will be checked later by a
            moderator. Please make sure they are the most acurate possible.{" "}
            <Link to="/coming-soon" className="text-secondary">
              Learn more
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
