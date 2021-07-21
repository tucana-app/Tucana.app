import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import { login } from "../../redux";

const Login = () => {
  const dispatch = useDispatch();
  const { isloadingLogin, isLoggedIn } = useSelector((state) => state.user);
  const { feedback, labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );

  const schema = Yup.object().shape({
    credential: Yup.string(labelStringField).required(labelRequiredField),

    password: Yup.string().required(labelRequiredField),
  });

  const handleSubmit = (values, formikBag) => {
    dispatch(login(values));
    formikBag.setSubmitting(false);
  };

  if (isLoggedIn) {
    return <Redirect to="/find-ride" />;
  }

  return (
    <Container className="my-5" data-aos="fade-in" data-aos-duration="1000">
      <Row className="mb-4">
        <Col className="text-center">
          <h1 className="text-info">Welcome back</h1>
          <p className="lead text-white">We are happy to see you again 😊</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
          <Formik
            validationSchema={schema}
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
                      <Form.Label>
                        Username or Email<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="credential"
                        placeholder="Username or Email"
                        className="rounded-0"
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

                  <Col xs={12} className="mb-3 mb-md-4">
                    <Form.Group>
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

                {feedback.message && (
                  <Alert variant={feedback.variant}>{feedback.message}</Alert>
                )}

                <Row>
                  <Col>
                    <Form.Group className="text-end">
                      <Button
                        variant="success"
                        size="lg"
                        className="rounded-0"
                        type="submit"
                        disabled={isSubmitting || isloadingLogin}
                      >
                        {isSubmitting || isloadingLogin ? (
                          <Spinner
                            animation="border"
                            role="status"
                            as="span"
                            aria-hidden="true"
                            className="align-middle me-2"
                          >
                            <span className="sr-only">Loading...</span>
                          </Spinner>
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
    </Container>
  );
};

export default Login;
