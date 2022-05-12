import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Row, Col, Button, Modal } from "react-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { CheckIcon } from "@primer/octicons-react";
import { Formik } from "formik";
import * as Yup from "yup";

import LoadingSpinner from "../../components/LoadingSpinner";

import { resetPassword, checkDeprecatedLinkResetPassword } from "../../redux";

require("yup-password")(Yup); // extend yup

const CreateNewPassword = () => {
  const { uuid } = useParams();

  const dispatch = useDispatch();
  const {
    isLoggedIn,
    isLoadingCheckDeprecatedLinkResetPassword,
    checkDeprecatedLinkResetPasswordError,
    isLoadingResetPassword,
    resetPasswordData,
  } = useSelector((state) => state.user);
  const { labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );

  const [showModalPasswordReset, setShowModalPasswordReset] = useState(false);

  const schema = Yup.object().shape({
    password1: Yup.string().required(labelRequiredField).password(),
    password2: Yup.string(labelStringField)
      .required(labelRequiredField)
      .password()
      .oneOf([Yup.ref("password1"), null], "Passwords must match"),
  });

  const handleSubmit = (values, formikBag) => {
    dispatch(resetPassword(values, uuid));
    formikBag.setSubmitting(false);
  };

  useEffect(() => {
    if (!isLoggedIn) dispatch(checkDeprecatedLinkResetPassword(uuid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resetPasswordData.flag === "RESET_PASSWORD_SUCCESS") {
      setShowModalPasswordReset(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPasswordData]);

  // Handle redirection in case the user is already logged in
  if (isLoggedIn) {
    return <Redirect to="/find" />;
  }

  return (
    <>
      {isLoadingCheckDeprecatedLinkResetPassword ? (
        <LoadingSpinner />
      ) : checkDeprecatedLinkResetPasswordError.flag === "FAIL" ? (
        <Container>
          <Row className="py-5 text-center">
            <Col className="text-center">
              <h1 className="display-4">This link is deprecated</h1>
              <h3 className="fw-light">
                Return to the{" "}
                <Link to="/login" className="link-success">
                  login page
                </Link>
              </h3>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row className="py-5 text-center">
            <Col className="text-center">
              <h1 className="display-4">Create a new password</h1>
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
                  password1: "",
                  password2: "",
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
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="password1"
                            placeholder="Password"
                            onChange={handleChange}
                            isInvalid={!!errors.password1}
                            isValid={touched.password1 && !errors.password1}
                            disabled={
                              resetPasswordData.flag ===
                              "RESET_PASSWORD_SUCCESS"
                            }
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password1}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col xs={12} className="mb-3 mb-md-4">
                        <Form.Group>
                          <Form.Label>
                            Retype password
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="password"
                            name="password2"
                            placeholder="Password"
                            onChange={handleChange}
                            disabled={
                              resetPasswordData.flag ===
                              "RESET_PASSWORD_SUCCESS"
                            }
                            isInvalid={!!errors.password2}
                            isValid={touched.password2 && !errors.password2}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password2}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col xs={12} className="mb-3">
                        <Form.Group className="text-end">
                          <Button
                            variant="success"
                            size="lg"
                            type="submit"
                            disabled={
                              isSubmitting ||
                              isLoadingResetPassword ||
                              resetPasswordData.flag ===
                                "RESET_PASSWORD_SUCCESS"
                            }
                          >
                            {isSubmitting || isLoadingResetPassword ? (
                              <LoadingSpinner />
                            ) : null}
                            Reset password
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
            <Col className="text-center">
              <p className="small">
                <span className="text-danger">*</span>
                <span className="text-secondary">Mandatory field</span>
              </p>
            </Col>
          </Row>
        </Container>
      )}

      <Modal
        show={showModalPasswordReset}
        onHide={() => setShowModalPasswordReset(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">
            <CheckIcon size={24} className="me-2" />
            Success
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="text-dark mb-0">
            Your password has been successfully reset.
          </p>
          <p>
            You can now{" "}
            <LinkContainer to="/login" className="cursor-pointer">
              <u className="text-primary">login</u>
            </LinkContainer>
          </p>
        </Modal.Body>

        <Modal.Footer>
          <LinkContainer to="/login">
            <Button variant="success">Login</Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateNewPassword;
