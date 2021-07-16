import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { isEmail, isDate, isMobilePhone, isAlpha } from "validator";

import * as signupActions from "../redux/signup/signupActions";
import {
  checkDuplicateEmail,
  checkDuplicatePhoneNumber,
  validateStep1,
} from "../redux";

import Footer from "../components/Footer";
import { Redirect } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const [loadingAPI, setLoadingAPI] = useState(false);

  const {
    isLoadingCheckDuplicatedEmail,
    // checkDuplicateEmailSuccess,
    // checkDuplicateEmailFail,
    isLoadingCheckDuplicatedPhoneNumber,
    // checkDuplicatePhoneNumberSuccess,
    // checkDuplicatePhoneNumberFail,
    isEmailDuplicate,
    isPhoneNumberDuplicate,
    isStep1validated,
  } = useSelector((state) => state.signup);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [submited, setSubmited] = useState(false);

  // Handle redirection in case the user is already logged in
  // Or if the form has already be submitted successfully
  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  if (isStep1validated) {
    return <Redirect to="/signup/step-2" />;
  }

  // Check for the errors in the form
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
    const { firstName, lastName, email, phoneNumber, dateOfBirth, terms } =
      form;
    const newErrors = {};

    // firstName errors
    if (!firstName || firstName === "")
      newErrors.firstName = "Please provide your first name";
    else if (firstName.length < 4)
      newErrors.firstName = "Your first name is too short";
    else if (firstName.length > 30)
      newErrors.firstName = "Your first name is too long";
    else if (!isAlpha(firstName))
      newErrors.firstName = "Please enter a valid name";

    // lastName errors
    if (!lastName || lastName === "")
      newErrors.lastName = "Please provide your last name";
    else if (lastName.length < 4)
      newErrors.firstName = "Your last name is too short";
    else if (lastName.length > 30)
      newErrors.lastName = "Your last name is too long";
    else if (!isAlpha(lastName))
      newErrors.lastName = "Please enter a valid name";

    // email errors
    if (!email || email === "") newErrors.email = "Please provide an email";
    else if (!isEmail(email)) newErrors.email = "This is not a valid email";
    else {
      setLoadingAPI(true);

      dispatch(checkDuplicateEmail(form.email))
        .then((response) => {
          if (response.isEmailDuplicate) newErrors.email = response.message;
          setLoadingAPI(false);
        })
        .catch(() => {
          setLoadingAPI(false);
        });
    }

    // phoneNumber errors
    if (!phoneNumber || phoneNumber === "")
      newErrors.phoneNumber = "Please provide a phone number";
    else if (!isMobilePhone(phoneNumber))
      newErrors.phoneNumber = "This is not a valid phone number";
    else {
      setLoadingAPI(true);

      dispatch(checkDuplicatePhoneNumber(form.phoneNumber))
        .then((response) => {
          // props.history.push("/dashboard");
          // window.location.reload();
          if (response.isPhoneNumberDuplicate)
            newErrors.phoneNumber = response.message;
          setLoadingAPI(false);
        })
        .catch(() => {
          setLoadingAPI(false);
        });
    }

    // dateOfBirth errors
    if (!dateOfBirth || dateOfBirth === "")
      newErrors.dateOfBirth = "Please provide your date of birth";
    else if (!isDate(dateOfBirth))
      newErrors.dateOfBirth = "This is not a valid date";

    // terms errors
    if (!terms) newErrors.terms = "You need to check it first";

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
        !isLoadingCheckDuplicatedEmail &&
        !isEmailDuplicate &&
        !isLoadingCheckDuplicatedPhoneNumber &&
        !isPhoneNumberDuplicate &&
        !loadingAPI
      ) {
        // If everything is okay, we fill up the Redux state
        // and carry on to the next step
        dispatch(signupActions.changeFormEmail(form.email));
        dispatch(signupActions.changeFormFirstName(form.firstName));
        dispatch(signupActions.changeFormLastName(form.lastName));
        dispatch(signupActions.changeFormDateOfBirth(form.dateOfBirth));
        dispatch(signupActions.changeFormPhoneNumber(form.phoneNumber));

        dispatch(validateStep1());
      } else {
        return;
      }
    }
  };

  return (
    <div data-aos="fade-right">
      <Container className="my-5">
        <Row className="mb-5">
          <Col className="text-center">
            <h1 className="text-success">Sign Up</h1>
            <p className="lead text-light">
              You need to sign up to access our service
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={10} lg={8} className="mx-auto">
            <Form noValidate validated={submited}>
              <Row className="mb-3">
                <Form.Group as={Col} xs={12} md={6} className="mb-3 mb-md-0">
                  <Form.Label>
                    First name<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    placeholder="First name"
                    className="rounded-0"
                    isInvalid={!!errors.firstName}
                    onChange={(e) => setField("firstName", e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label>
                    Last name<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    placeholder="Last name"
                    className="rounded-0"
                    isInvalid={!!errors.lastName}
                    onChange={(e) => setField("lastName", e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Label>
                  Email address<span className="text-danger">*</span>
                </Form.Label>
                <Form.Group as={Col}>
                  <Form.Control
                    type="email"
                    name="email"
                    className="rounded-0"
                    placeholder="Email"
                    isInvalid={!!errors.email}
                    feedback={errors.email}
                    onChange={(e) => setField("email", e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} xs={12} md={6} className="mb-3 mb-md-0">
                  <Form.Label>
                    Phone number<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="phonenumber"
                    placeholder="Phone number"
                    className="rounded-0"
                    isInvalid={!!errors.phoneNumber}
                    onChange={(e) => setField("phoneNumber", e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label>
                    Date of Birth<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfBirth"
                    className="rounded-0"
                    isInvalid={!!errors.dateOfBirth}
                    onChange={(e) => setField("dateOfBirth", e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dateOfBirth}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="my-4">
                <Form.Group as={Col}>
                  <Form.Check>
                    <Form.Check.Input
                      type="checkbox"
                      className="me-2"
                      isInvalid={!!errors.terms}
                      feedback={errors.terms}
                      onChange={(e) => setField("terms", e.target.checked)}
                      required
                    />

                    <Form.Check.Label>
                      Agree to{" "}
                      <Link to="/coming-soon" className="text-info">
                        terms and conditions
                      </Link>
                    </Form.Check.Label>
                  </Form.Check>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col}>
                  <Button
                    variant="success"
                    className="rounded-0"
                    onClick={handleSubmit}
                    type="submit"
                    disabled={
                      isLoadingCheckDuplicatedEmail ||
                      isLoadingCheckDuplicatedPhoneNumber ||
                      loadingAPI
                        ? true
                        : false
                    }
                  >
                    {isLoadingCheckDuplicatedEmail ||
                    isLoadingCheckDuplicatedPhoneNumber ||
                    loadingAPI ? (
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
                  You will type in your password at the end.{" "}
                  <Link to="/coming-soon" className="text-secondary">
                    Learn why
                  </Link>
                </small>
                <small className="text-small text-secondary mb-3">
                  The information you are providing will be checked later by a
                  moderator. Please make sure they are the most acurate
                  possible.{" "}
                  <Link to="/coming-soon" className="text-secondary">
                    Learn more
                  </Link>
                </small>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default SignUp;
