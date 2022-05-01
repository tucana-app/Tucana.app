import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { Form, Row, Col, Button } from "react-bootstrap";
import dateFormat from "dateformat";
import * as Yup from "yup";

import LoadingSpinner from "./LoadingSpinner";

import { submitFormFindRide } from "../redux";

const FormFilterRides = () => {
  const dispatch = useDispatch();

  const { provinces, labelRequiredField } = useSelector(
    (state) => state.global
  );

  const schema = Yup.object().shape({
    date: Yup.date()
      // if the date selected is not past 00:00:01
      // (midnight and 1 second) from today
      .min(new Date(), "The date must be in the future")
      .required(labelRequiredField),
  });

  const handleSubmit = (values, formikBag) => {
    values = {
      ...values,
      provinceOrigin:
        values.provinceOrigin === "" ? "Unknown" : values.provinceOrigin,
      provinceDestination:
        values.provinceDestination === ""
          ? "Unknown"
          : values.provinceDestination,
    };

    dispatch(submitFormFindRide(values));
    formikBag.setSubmitting(false);
  };

  return (
    <>
      <Row>
        <Col>
          <Formik
            validationSchema={schema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={handleSubmit}
            initialValues={{
              provinceOrigin: "",
              provinceDestination: "",
              date: "",
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
                <Row className="py-2">
                  <Col>
                    <Form.Group>
                      <Form.Select
                        name="provinceOrigin"
                        onChange={handleChange}
                        isInvalid={!!errors.provinceOrigin}
                        isValid={
                          touched.provinceOrigin && !errors.provinceOrigin
                        }
                      >
                        <option>Province origin</option>
                        {provinces.map((province, index) => (
                          <option key={index} value={province}>
                            {province}
                          </option>
                        ))}
                      </Form.Select>

                      <Form.Control.Feedback type="invalid">
                        {errors.provinceOrigin}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="py-2">
                  <Col>
                    <Form.Group>
                      <Form.Select
                        name="provinceDestination"
                        onChange={handleChange}
                        isInvalid={!!errors.provinceDestination}
                        isValid={
                          touched.provinceDestination &&
                          !errors.provinceDestination
                        }
                      >
                        <option>Province destination</option>
                        {provinces.map((province, index) => (
                          <option key={index} value={province}>
                            {province}
                          </option>
                        ))}
                      </Form.Select>

                      <Form.Control.Feedback type="invalid">
                        {errors.provinceDestination}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="align-items-center py-2">
                  <Col xs={2}>
                    <p className="mb-0">
                      Date<span className="text-danger">*</span>
                    </p>
                  </Col>
                  <Col className="mx-auto">
                    <Form.Group>
                      <Form.Control
                        type="date"
                        name="date"
                        min={dateFormat(new Date(), "yyyy-mm-dd")}
                        onChange={handleChange}
                        isInvalid={!!errors.date}
                        isValid={touched.date && !errors.date}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.date}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="py-2">
                  <Col>
                    <Form.Group className="text-end">
                      <Button
                        variant="success"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? <LoadingSpinner /> : null}
                        Find
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </>
  );
};

export default FormFilterRides;
