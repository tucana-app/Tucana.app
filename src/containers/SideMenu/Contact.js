import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Col, Container, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";
import SocialIcons from "../../components/SocialIcons";

import { submitFormContact } from "../../redux";

const Contact = () => {
  const dispatch = useDispatch();
  const {
    user: currentUser,
    isLoggedIn,
    isLoadingSubmitFormContact,
  } = useSelector((state) => state.user);
  const { labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );

  const schema = Yup.object().shape({
    fullname: Yup.string(labelStringField)
      .min(4, "Min. 4 characters")
      .max(20, "Max. 20 characters")
      .required(labelRequiredField),
    email: Yup.string(labelStringField)
      .email("Please enter a valid email address")
      .required(labelRequiredField),
    message: Yup.string()
      .min(20, "Min. 20 characters")
      .max(1000, "Max. 1000 characters")
      .required(labelRequiredField),
  });

  const handleSubmit = (values, formikBag) => {
    if (isLoggedIn) {
      dispatch(submitFormContact(currentUser, values));
    } else {
      dispatch(submitFormContact(null, values));
    }
    formikBag.setSubmitting(false);
    // formikBag.resetForm();
  };

  return (
    <>
      <GoBack />

      <Container fluid data-aos="fade-in">
        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="bg-white mx-auto"
          >
            <h1 className="title text-center">Get in touch</h1>
          </Col>
        </Row>

        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="bg-white mx-auto"
          >
            <Formik
              validationSchema={schema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={handleSubmit}
              initialValues={{
                fullname: isLoggedIn
                  ? `${currentUser.firstName} ${currentUser.lastName}`
                  : "",
                email: isLoggedIn ? currentUser.email : "",
                message: "",
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
                  <Container>
                    <Row className="my-3">
                      <Col>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="fullname"
                            placeholder="Fullname"
                            value={values.fullname}
                            onChange={handleChange}
                            isInvalid={!!errors.fullname}
                            isValid={touched.fullname && !errors.fullname}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.fullname}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="my-3">
                      <Col>
                        <Form.Group>
                          <Form.Control
                            type="email"
                            name="email"
                            value={values.email}
                            placeholder="Email"
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
                    </Row>
                    <Row className="my-3">
                      <Col>
                        <Form.Group>
                          <Form.Control
                            type="textarea"
                            name="message"
                            value={values.message}
                            placeholder="Message"
                            onChange={handleChange}
                            isInvalid={!!errors.message}
                            isValid={touched.message && !errors.message}
                            as="textarea"
                            rows="3"
                            className="rounded-3"
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col>
                        <Form.Group className="text-end mx-auto">
                          <Button
                            variant="success"
                            type="submit"
                            size="lg"
                            disabled={
                              isSubmitting || isLoadingSubmitFormContact
                            }
                          >
                            {isSubmitting || isLoadingSubmitFormContact ? (
                              <LoadingSpinner />
                            ) : null}
                            Send
                          </Button>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Container>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>

        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="bg-white text-center mx-auto py-3"
          >
            <SocialIcons />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
