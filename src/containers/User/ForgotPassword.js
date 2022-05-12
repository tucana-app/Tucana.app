import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";

import { submitEmailForgotPassword } from "../../redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoadingSendEmailForgotPassword } = useSelector(
    (state) => state.user
  );
  const { labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );

  const schema = Yup.object().shape({
    email: Yup.string(labelStringField)
      .email("Invalid email address format")
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

      <Container className="my-5" data-aos="fade-in">
        <Row className="mb-4">
          <Col className="text-center">
            <h1 className="text-warning">Password reset</h1>
            <p className="lead">
              Please enter your email address to receive a link to reset your
              password
            </p>
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
                          placeholder="Type your email address here"
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
                          Send reset link
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
