import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Col, Container, Row } from "react-bootstrap";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import Reaptcha from "reaptcha";
import * as Yup from "yup";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";
import SocialIcons from "../../components/SocialIcons";

import { submitContactForm, setToast } from "../../redux";

const Contact = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    user: currentUser,
    isLoggedIn,
    isLoadingSubmitContactForm,
  } = useSelector((state) => state.user);
  const { labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );

  const constants = JSON.parse(localStorage.getItem("constants"));
  const contactSubjects = JSON.parse(constants.CONTACT_SUBJECTS);

  const [captcha, setCaptcha] = useState(false);
  const [captchaReady, setCaptchaReady] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  var arraySubjects = [];
  contactSubjects.map((subject, index) => {
    return arraySubjects.push(
      <option key={index} value={subject}>
        {subject}
      </option>
    );
  });

  const schema = Yup.object().shape({
    fullname: Yup.string(labelStringField)
      .min(4, t("translation:global.errors.min4characters"))
      .max(20, t("translation:global.errors.max20characters"))
      .required(labelRequiredField),
    email: Yup.string(labelStringField)
      .email(t("translation:global.errors.validEmail"))
      .required(labelRequiredField),
    subject: Yup.mixed()
      .oneOf(contactSubjects, labelRequiredField)
      .required(labelRequiredField),
    message: Yup.string()
      .min(20, t("translation:contact.min20characters"))
      .max(1000, t("translation:contact.max1000characters"))
      .required(labelRequiredField),
  });

  const onLoad = () => {
    setCaptchaReady(true);
  };

  const onVerify = (recaptchaResponse) => {
    setCaptchaVerified(true);
  };

  const onExpire = () => {
    setCaptchaVerified(false);
  };

  const handleSubmit = (values, formikBag) => {
    if (captchaVerified) {
      setCaptchaVerified(false);

      dispatch(
        setToast({
          show: true,
          headerText: "Yes",
          bodyText: "Please fill",
          variant: "success",
        })
      );
      if (isLoggedIn) {
        dispatch(submitContactForm(currentUser, values));
      } else {
        dispatch(submitContactForm(null, values));
      }

      captcha.reset();
      formikBag.setSubmitting(false);
      formikBag.resetForm();
    } else {
      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: t("translation:global.errors.captcha"),
          variant: "warning",
        })
      );
    }
  };

  return (
    <>
      <GoBack />

      <Container fluid data-aos="fade-in" className="pb-5">
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <h1 className="title text-center">
              {t("translation:contact.title")}
            </h1>
          </Col>
        </Row>

        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mx-auto py-3"
          >
            <SocialIcons />
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
                fullname: isLoggedIn
                  ? `${currentUser.firstName} ${currentUser.lastName}`
                  : "",
                email: isLoggedIn ? currentUser.email : "",
                subject: "",
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
                      <Col xs={12} md={6} className="my-2 my-md-0 mx-auto">
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="fullname"
                            placeholder={t("translation:global.fullname")}
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
                      <Col xs={12} md={6} className="mt-2 my-md-0 mx-auto">
                        <Form.Group>
                          <Form.Control
                            type="email"
                            name="email"
                            value={values.email}
                            placeholder={t("translation:global.email")}
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

                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Select
                            name="subject"
                            onChange={handleChange}
                            isInvalid={!!errors.subject}
                            isValid={touched.subject && !errors.subject}
                            disabled={isSubmitting}
                          >
                            <option value={0}>
                              {t("translation:contact.subject")}
                            </option>
                            {arraySubjects}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.subject}
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
                            as="textarea"
                            value={values.message}
                            placeholder={t("translation:global.message")}
                            onChange={handleChange}
                            isInvalid={!!errors.message}
                            isValid={touched.message && !errors.message}
                            className="rounded-0"
                            rows="4"
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Reaptcha
                          sitekey={
                            process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY
                          }
                          ref={(e) => setCaptcha(e)}
                          onVerify={onVerify}
                          onLoad={onLoad}
                          onExpire={onExpire}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col>
                        <Form.Group className="text-end mx-auto">
                          <Button
                            variant="success"
                            type="submit"
                            size="lg"
                            disabled={
                              isSubmitting ||
                              isLoadingSubmitContactForm ||
                              !captchaReady | !captchaVerified
                            }
                          >
                            {isSubmitting ||
                            isLoadingSubmitContactForm ||
                            !captchaReady ? (
                              <LoadingSpinner />
                            ) : null}
                            {t("translation:global.send")}
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
      </Container>
    </>
  );
};

export default Contact;
