import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Form,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";

import { login } from "../redux";

const Login = (props) => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.user);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [submited, setSubmited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    // Check and see if errors exist,
    // and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };
  const findFormErrors = () => {
    const { username, password } = form;
    const newErrors = {};

    if (!username || username === "")
      newErrors.username = "Please provide a username";

    if (!password || password === "")
      newErrors.password = "Please provide a password";

    return newErrors;
  };

  const handleLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setSubmited(true);

    // Get the new errors
    const newErrors = findFormErrors();

    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors

      // If we are not waiting for a Promise to return
      // When we did an API call
      setLoading(true);
      setErrorLogin(false);

      dispatch(login(form.username, form.password))
        .then((response) => {
          setLoading(false);
        })
        .catch((error) => {
          setErrorLogin(true);
          setLoading(false);
        });
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/my-rides" />;
  }

  return (
    <Container className="my-5" data-aos="fade-in" data-aos-duration="1000">
      <Row className="mb-5">
        <Col className="text-center">
          <h1 className="text-info">Welcome back</h1>
          <p className="lead text-white">We are happy to see you again 😊</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
          <Form noValidate validated={submited}>
            <Form.Group as={Col} className="mb-3">
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                className="rounded-0"
                isInvalid={!!errors.username}
                onChange={(e) => setField("username", e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                className="rounded-0"
                isInvalid={!!errors.password}
                onChange={(e) => setField("password", e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            {errorLogin ? (
              <Alert variant="danger" className="rounded-0">
                The username / password combination didn't work
              </Alert>
            ) : null}

            <Form.Group>
              <Button
                variant="info"
                className="rounded-0"
                onClick={handleLogin}
                type="submit"
              >
                {loading ? (
                  <Spinner
                    animation="border"
                    role="status"
                    as="span"
                    aria-hidden="true"
                    className="align-middle me-2"
                    size="sm"
                  >
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                ) : null}
                Log In
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
