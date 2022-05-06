import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import dateFormat from "dateformat";
import {
  LinkExternalIcon,
  PencilIcon,
  CheckIcon,
} from "@primer/octicons-react";

import LocationSearchInput from "./LocationSearchInput";

import {
  setSearchOrigin,
  setSearchDestination,
  setSearchDate,
  getFilteredRides,
  setToast,
} from "../redux";

const FormFilterRides = () => {
  const dispatch = useDispatch();

  const {
    location,
    formSearchRide,
    // isLoadingSubmitFormSearchRide,
    // submitFormSearchRideSuccess,
  } = useSelector((state) => state.ride);

  const [date, setDate] = useState(formSearchRide.date);

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [stepThree, setStepThree] = useState(false);

  // Steps
  const handleClickStepOne = () => {
    if (location.city !== "" || formSearchRide.origin.city !== "") {
      if (location.city !== "") {
        dispatch(setSearchOrigin(location));
      } else if (formSearchRide.origin.city !== "") {
        dispatch(setSearchOrigin(formSearchRide.origin));
      }
      setStepOne(false);
      setStepTwo(true);
    }
  };

  const handleEditOne = () => {
    setStepOne(true);
    setStepTwo(false);
  };

  const handleClickStepTwo = () => {
    if (location.city !== "" || formSearchRide.destination.city !== "") {
      if (location.city !== "") {
        dispatch(setSearchDestination(location));
      } else if (formSearchRide.destination.city !== "") {
        dispatch(setSearchDestination(formSearchRide.destination));
      }
      setStepTwo(false);
      setStepThree(true);
    }
  };

  const handleEditTwo = () => {
    setStepTwo(true);
    setStepThree(false);
  };

  // Handlers
  const handleChangeDate = (e) => {
    setDate(e.target.value);
    dispatch(setSearchDate(e.target.value));
  };

  const handleSubmit = () => {
    if (
      date !== "" &&
      formSearchRide.origin.city !== "" &&
      formSearchRide.destination.city !== ""
    ) {
      if (
        new Date(date.slice(0, 4), date.slice(5, 7) - 1, date.slice(8, 10)) <=
        new Date()
      ) {
        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: "The date needs to be in the future",
            variant: "warning",
          })
        );
      } else {
        dispatch(getFilteredRides(formSearchRide.date));
      }
    } else {
      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: "Please fill up all the information",
          variant: "warning",
        })
      );
    }
  };

  return (
    <>
      <Row>
        <Col>
          <p className="mb-0">From:</p>
          {stepOne ? (
            <>
              {location.city !== "" ? (
                <>
                  <h3 className="fw-light mt-3">Selected:</h3>
                  <p>
                    City: <strong>{location.city}</strong>,{" "}
                    <small>{location.province}</small>
                  </p>
                  <p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${location.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="me-2"
                    >
                      <Button variant="outline-success">
                        Verify
                        <LinkExternalIcon size={24} className="ms-2" />
                      </Button>
                    </a>
                    <Button
                      onClick={handleClickStepOne}
                      variant="success"
                      className="ms-2"
                    >
                      Confirm
                      <CheckIcon size={24} className="ms-2" />
                    </Button>
                  </p>
                </>
              ) : (
                <LocationSearchInput />
              )}
            </>
          ) : formSearchRide.origin.city !== "" ? (
            <Container className="px-0">
              <Row>
                <Col xs={8} className="text-start pe-0">
                  <p className="mb-0">
                    <strong>{formSearchRide.origin.city}</strong>,{" "}
                    <small>{formSearchRide.origin.province}</small>
                  </p>
                </Col>
                <Col xs={4} className="text-end ps-0">
                  <Button
                    size={"sm"}
                    onClick={handleEditOne}
                    variant="outline-warning"
                  >
                    <PencilIcon size={24} className="me-2" />
                    Edit
                  </Button>
                </Col>
              </Row>
            </Container>
          ) : null}
        </Col>
      </Row>

      <Row className="my-2">
        <Col>
          <p className="mb-0">To:</p>
          {stepTwo ? (
            <>
              <LocationSearchInput />
              {location.city !== "" ? (
                <>
                  <h3 className="fw-light mt-3">Selected:</h3>
                  <p>
                    City: <strong>{location.city}</strong>,{" "}
                    <small>{location.province}</small>
                  </p>
                  <p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${location.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="me-2"
                    >
                      <Button variant="outline-success">
                        Verify
                        <LinkExternalIcon size={24} className="ms-2" />
                      </Button>
                    </a>
                    <Button
                      onClick={handleClickStepTwo}
                      variant="success"
                      className="ms-2"
                    >
                      Confirm
                      <CheckIcon size={24} className="ms-2" />
                    </Button>
                  </p>
                </>
              ) : formSearchRide.destination.city !== "" ? (
                <>
                  <h3 className="fw-light mt-3">Selected:</h3>
                  <p>
                    City: <strong>{formSearchRide.destination.city}</strong>,{" "}
                    <small>{formSearchRide.destination.province}</small>
                  </p>
                  <p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${formSearchRide.destination.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="me-2"
                    >
                      <Button variant="outline-success">
                        Verify
                        <LinkExternalIcon size={24} className="ms-2" />
                      </Button>
                    </a>
                    <Button
                      onClick={handleClickStepTwo}
                      variant="success"
                      className="ms-2"
                    >
                      Confirm
                      <CheckIcon size={24} className="ms-2" />
                    </Button>
                  </p>
                </>
              ) : null}
            </>
          ) : formSearchRide.destination.city !== "" ? (
            <Container className="px-0">
              <Row>
                <Col xs={8} className="text-start pe-0">
                  <p className="mb-0">
                    <strong>{formSearchRide.destination.city}</strong>,{" "}
                    <small>{formSearchRide.destination.province}</small>
                  </p>
                </Col>
                <Col xs={4} className="text-end ps-0">
                  <Button
                    size={"sm"}
                    onClick={handleEditTwo}
                    variant="outline-warning"
                  >
                    <PencilIcon size={24} className="me-2" />
                    Edit
                  </Button>
                </Col>
              </Row>
            </Container>
          ) : (
            <Form.Control disabled />
          )}
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
              value={date}
              min={dateFormat(new Date(), "yyyy-mm-dd")}
              onChange={handleChangeDate}
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
