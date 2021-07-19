import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Container,
  Row,
  Col,
  Button,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { isStrongPassword } from "validator";

import * as signupActions from "../../redux/signup/signupActions";
import { checkDuplicateUsername, signupUser } from "../../redux";

import { Redirect } from "react-router-dom";

const SignUpStep2 = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const [loadingAPI, setLoadingAPI] = useState(false);

  const {
    isLoadingCheckDuplicatedUsername,
    // checkDuplicateUsernameSuccess,
    // checkDuplicateUsernameFail,
    isUsernameDuplicate,
    isStep1validated,
    firstName,
    lastName,
    email,
    dateOfBirth,
    phoneNumber,
    signupUserSuccess,
  } = useSelector((state) => state.signup);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [submited, setSubmited] = useState(false);

  const isPasswordStrongEnough = (password) => {
    return isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
  };

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

    // username errors
    const usernameRegex = new RegExp(
      "^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$"
    );

    if (!username || username === "")
      newErrors.username = "Please provide a username";
    else if (username && username.length > 30)
      newErrors.username = "Your username is too long (max. 30)";
    else if (username && username.length < 4)
      newErrors.username = "Your username is too short (min. 4 or blank)";
    else if (username && !usernameRegex.test(username))
      newErrors.username = "This is not a valid username";
    else {
      setLoadingAPI(true);

      dispatch(checkDuplicateUsername(form.username))
        .then((response) => {
          if (response.isUsernameDuplicate) {
            newErrors.username = response.message;
          } else {
            dispatch(signupActions.changeFormUsername(form.username));
          }
          setLoadingAPI(false);
        })
        .catch(() => {
          setLoadingAPI(false);
        });
    }

    if (!password || password === "")
      newErrors.password = "Please provide a password";
    else if (!isPasswordStrongEnough(password))
      newErrors.password = "Your password is not strong enough";

    return newErrors;
  };

  const handleSubmit = (event) => {
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
      if (
        !isLoadingCheckDuplicatedUsername &&
        !isUsernameDuplicate &&
        !loadingAPI
      ) {
        // If everything is okay, we fill up the Redux state
        // and carry on to the next step
        dispatch(
          signupUser({
            firstName,
            lastName,
            email,
            password: form.password,
            username: form.username,
            dateOfBirth,
            phoneNumber,
          })
        );
      } else {
        return;
      }
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/my-rides" />;
  }

  if (!isStep1validated) {
    return <Redirect to="/signup" />;
  }

  if (signupUserSuccess.isSuccessful) {
    return <Redirect to="/signup/signup-success" />;
  }

  return (
    <Container className="my-5" data-aos="fade-right">
      <Row className="mb-5">
        <Col className="text-center">
          <h1 className="text-success">Sign Up</h1>
          <p className="lead text-light">Final step, almost there!</p>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={10} lg={8} className="mx-auto">
          <p className="text-white fw-light">
            Choose a username and a strong password
          </p>
          <Form noValidate validated={submited}>
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={6} className="mb-3 mb-md-0">
                <Form.Label>
                  Username<span className="text-danger">*</span>
                </Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text className="rounded-0 bg-success">
                    @
                  </InputGroup.Text>
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
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} xs={12} md={6}>
                <Form.Label>
                  Password<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="rounded-0"
                  isInvalid={!!errors.password}
                  onChange={(e) => setField("password", e.target.value)}
                  required
                />
                <small className="text-secondary">
                  Min. 8 char., 1 uppercase, 1 number &amp; 1 symbol
                </small>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col}>
                <Button
                  variant="success"
                  className="rounded-0"
                  onClick={handleSubmit}
                  disabled={
                    isLoadingCheckDuplicatedUsername || loadingAPI
                      ? true
                      : false
                  }
                >
                  {isLoadingCheckDuplicatedUsername || loadingAPI ? (
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
                  Continue
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="align-middle ms-2"
                  />
                </Button>
              </Form.Group>
            </Row>

            <Row>
              <small className="text-small text-secondary mt-5 mb-3">
                <span className="text-danger">*</span> These fields are
                mandatory
              </small>
              <small className="text-small text-secondary mb-3">
                Your password is always encrypted. Therefore cannot be read by
                anyone, even by our team members.{" "}
                <Link to="/coming-soon" className="text-secondary">
                  Learn more
                </Link>
              </small>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpStep2;
