import React from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import dateFormat from "dateformat";

import LocationSearchInput from "./LocationSearchInput";

import { submitFormFindRide } from "../redux";

const FormFilterRides = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.target.value);
  };

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
  };

  return (
    <>
      <Row>
        <Col>
          <p className="mb-0">From:</p>
          <LocationSearchInput />
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <p className="mb-0">To:</p>
          <LocationSearchInput />
        </Col>
      </Row>
      <Row className="align-items-center py-3">
        <Col xs={2}>
          <p className="mb-0">Date</p>
        </Col>
        <Col className="mx-auto">
          <Form.Group>
            <Form.Control
              type="date"
              name="date"
              min={dateFormat(new Date(), "yyyy-mm-dd")}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="py-2">
        <Col className="text-end">
          <Button onClick={handleSubmit} variant="success" type="submit">
            Find
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default FormFilterRides;
