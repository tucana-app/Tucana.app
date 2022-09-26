import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";

import { submitEditBio } from "../../redux";

const EditBio = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    user: currentUser,
    isLoggedIn,
    isLoadingSubmitEditBio,
    submitEditBioSuccess,
  } = useSelector((state) => state.user);
  const { labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );

  const schema = Yup.object().shape({
    bio: Yup.string(labelStringField)
      .required(labelRequiredField)
      .min(10, t("translation:global.errors.min10characters")),
  });

  const handleSubmit = (bio, formikBag) => {
    dispatch(submitEditBio(currentUser.id, bio));
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
              {t("translation:edit.bio.update")}
            </h1>
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
                bio: currentUser.biography,
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
                  <Form.Group>
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows={3}
                      name="bio"
                      value={values.bio}
                      placeholder={t("translation:edit.bio.placeholder")}
                      onChange={handleChange}
                      isInvalid={!!errors.bio}
                      isValid={touched.bio && !errors.bio}
                      className="rounded"
                      disabled={submitEditBioSuccess.flag === "SUCCESS"}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.bio}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="text-end mt-5">
                    <Button
                      variant="success"
                      size="lg"
                      type="submit"
                      disabled={
                        isSubmitting ||
                        submitEditBioSuccess.flag === "SUCCESS" ||
                        isLoadingSubmitEditBio ||
                        values.bio === currentUser.biography ||
                        values.bio.length < 10
                      }
                    >
                      {isSubmitting || isLoadingSubmitEditBio ? (
                        <span className="me-2">
                          <LoadingSpinner />
                        </span>
                      ) : null}
                      {t("translation:global.update")}
                    </Button>
                  </Form.Group>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditBio;
