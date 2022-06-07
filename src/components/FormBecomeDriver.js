import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";
import { Formik } from "formik";
import * as Yup from "yup";

import { submitFormBecomeDriver } from "../redux";
import LoadingSpinner from "./LoadingSpinner";

const FormBecomeDriver = ({ ride }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoadingSubmitFormBecomeDriver } = useSelector(
    (state) => state.user
  );
  const { labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );

  const schema = Yup.object().shape({
    maker: Yup.string(labelStringField)
      .min(4, t("translation:global.errors.min4characters"))
      .max(20, t("translation:global.errors.max20characters"))
      .required(labelRequiredField),
    numberPlate: Yup.string(labelStringField)
      .matches(
        `^([0-9]{3}|[a-zA-Z]{3})[0-9]{3}$`,
        t("translation:global.errors.validNumberPlage")
      )
      .required(labelRequiredField),
    model: Yup.string(labelStringField)
      .min(4, t("translation:global.errors.min4characters"))
      .max(20, t("translation:global.errors.max20characters")),
    color: Yup.string(labelStringField),
    year: Yup.number()
      .min(1900, t("translation:global.errors.validYear"))
      .max(new Date().getFullYear(), t("translation:global.errors.validYear")),
  });

  const handleSubmit = (values, formikBag) => {
    dispatch(submitFormBecomeDriver(currentUser, values));

    formikBag.setSubmitting(false);
  };

  return (
    <>
      <Row className="mb-2">
        <Col
          xs={12}
          md={10}
          sm={8}
          lg={6}
          xl={4}
          className="mx-auto text-center"
        >
          <h2>{t("translation:becomeDriver.titleVehicle")}</h2>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={10} sm={8} lg={6} xl={4} className="mx-auto">
          <Formik
            validationSchema={schema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={handleSubmit}
            initialValues={{
              maker: "",
              numberPlate: "",
              model: "",
              color: "",
              // year: 0,
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
                  <Col xs={12} md={6} className="mb-2">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="maker"
                        placeholder={`${t("translation:becomeDriver.maker")}*`}
                        onChange={handleChange}
                        isInvalid={!!errors.maker}
                        isValid={touched.maker && !errors.maker}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.maker}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} className="mb-2">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="numberPlate"
                        placeholder={`${t(
                          "translation:becomeDriver.numberPlate"
                        )}*`}
                        onChange={handleChange}
                        isInvalid={!!errors.numberPlate}
                        isValid={touched.numberPlate && !errors.numberPlate}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.numberPlate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6} className="mb-2">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="model"
                        placeholder={t("translation:becomeDriver.model")}
                        onChange={handleChange}
                        isInvalid={!!errors.model}
                        isValid={touched.model && !errors.model}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.model}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} className="mb-2">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="color"
                        placeholder={t("translation:becomeDriver.color")}
                        onChange={handleChange}
                        isInvalid={!!errors.color}
                        isValid={touched.color && !errors.color}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.color}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={12} md={6} className="mx-auto">
                    <Form.Group>
                      <Form.Control
                        type="number"
                        name="year"
                        placeholder={t("translation:becomeDriver.year")}
                        min={1900}
                        max={dateFormat(new Date().getFullYear(), "yyyy-mm-dd")}
                        onChange={handleChange}
                        isInvalid={!!errors.year}
                        isValid={touched.year && !errors.year}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.year}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="text-end mx-auto">
                      <Button
                        type="submit"
                        variant="success"
                        size="lg"
                        disabled={
                          isSubmitting || isLoadingSubmitFormBecomeDriver
                        }
                      >
                        {isSubmitting || isLoadingSubmitFormBecomeDriver ? (
                          <LoadingSpinner />
                        ) : null}{" "}
                        {t("translation:becomeDriver.button")}
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
        <Col xs={12} md={10} sm={8} lg={6} xl={4} className="mx-auto ">
          <p className="small text-secondary mb-0">
            {t("translation:becomeDriver.message")}
          </p>
        </Col>
      </Row>
    </>
  );
};

export default FormBecomeDriver;
