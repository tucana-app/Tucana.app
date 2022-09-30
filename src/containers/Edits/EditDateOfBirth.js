import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";

import { submitEditDateOfBirth } from "../../redux";

const EditDateOfBirth = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    user: currentUser,
    isLoggedIn,
    isLoadingSubmitEditDateOfBirth,
    submitEditDateOfBirthSuccess,
  } = useSelector((state) => state.user);
  const { labelRequiredField } = useSelector((state) => state.global);

  const schema = Yup.object().shape({
    day: Yup.number()
      .min(1, "1 - 31")
      .max(31, "1 - 31")
      .required(labelRequiredField),
    month: Yup.number()
      .min(1, "1 - 12")
      .max(12, "1 - 12")
      .required(labelRequiredField),
    year: Yup.number()
      .min(1900)
      .max(new Date().getFullYear(), `${t("translation:global.year")}`)
      .required(labelRequiredField),
  });

  const handleSubmit = (values, formikBag) => {
    dispatch(submitEditDateOfBirth(currentUser.id, values));
    formikBag.setSubmitting(false);
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container>
        <Row className="mb-3">
          <Col>
            <h1 className="title text-center">
              {t("translation:edit.dateOfBirth.title")}
            </h1>
          </Col>
          <Col xs={12} className="text-center">
            <p className="mb-0">{t("translation:edit.dateOfBirth.content1")}</p>
            <p>
              <Trans i18nKey={"translation:edit.dateOfBirth.content2"}>
                It is <strong>DD/MM/YYYY</strong>
              </Trans>
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
                day: "",
                month: "",
                year: "",
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
                    <Row>
                      <Col xs={4} className="text-center">
                        <Form.Group>
                          <Form.Label className="mb-0">
                            {t("translation:global.day")}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            id="1"
                            name="day"
                            min={1}
                            max={31}
                            value={values.day}
                            onChange={(e) => {
                              return e.target.value.length <= 2
                                ? handleChange(e)
                                : null;
                            }}
                            maxLength={2}
                            isInvalid={!!errors.day}
                            isValid={touched.day && !errors.day}
                            disabled={
                              submitEditDateOfBirthSuccess.flag === "SUCCESS" ||
                              currentUser.dateOfBirth
                            }
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.day}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col xs={4} className="text-center">
                        <Form.Group>
                          <Form.Label className="mb-0">
                            {t("translation:global.month")}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            id="2"
                            name="month"
                            min={1}
                            max={12}
                            value={values.month}
                            onChange={(e) => {
                              return e.target.value.length <= 2
                                ? handleChange(e)
                                : null;
                            }}
                            isInvalid={!!errors.month}
                            isValid={touched.month && !errors.month}
                            disabled={
                              submitEditDateOfBirthSuccess.flag === "SUCCESS" ||
                              currentUser.dateOfBirth
                            }
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.month}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col xs={4} className="text-center">
                        <Form.Group>
                          <Form.Label className="mb-0">
                            {t("translation:global.year")}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            name="year"
                            min={1900}
                            max={new Date().getFullYear() - 17}
                            value={values.year}
                            onChange={(e) => {
                              return e.target.value.length <= 4
                                ? handleChange(e)
                                : null;
                            }}
                            isInvalid={!!errors.year}
                            isValid={touched.year && !errors.year}
                            disabled={
                              submitEditDateOfBirthSuccess.flag === "SUCCESS" ||
                              currentUser.dateOfBirth
                            }
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.year}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Form.Group className="text-end mt-5">
                        <Button
                          variant="success"
                          size="lg"
                          type="submit"
                          disabled={
                            isSubmitting ||
                            submitEditDateOfBirthSuccess.flag === "SUCCESS" ||
                            isLoadingSubmitEditDateOfBirth ||
                            currentUser.dateOfBirth
                          }
                        >
                          {isSubmitting || isLoadingSubmitEditDateOfBirth ? (
                            <span className="me-2">
                              <LoadingSpinner />
                            </span>
                          ) : null}
                          {t("translation:global.add")}
                        </Button>
                      </Form.Group>
                    </Row>
                  </Container>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditDateOfBirth;
