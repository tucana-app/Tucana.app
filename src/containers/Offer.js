import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import dateFormat from "dateformat";
import {
  AlertIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  LinkExternalIcon,
} from "@primer/octicons-react";
import { Formik } from "formik";
import * as Yup from "yup";

import { setOrigin, setDestination, submitFormOfferRide } from "../redux";
import LoadingSpinner from "../components/LoadingSpinner";
import LocationSearchInput from "../components/LocationSearchInput";

const Offer = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    location,
    origin,
    destination,
    isLoadingSubmitFormOfferRide,
    submitFormOfferRideSuccess,
  } = useSelector((state) => state.ride);
  const { provinces, labelStringField, labelRequiredField, distanceLatLng } =
    useSelector((state) => state.global);

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);

  const handleClickStepOne = () => {
    setStepOne(false);
    setStepTwo(true);
    if (location.city !== "") {
      dispatch(setOrigin(location));
    } else if (origin.city !== "") {
      dispatch(setOrigin(origin));
    }
  };

  const handleBackToStepOne = () => {
    setStepOne(true);
    setStepTwo(false);
  };

  const handleClickStepTwo = () => {
    setStepTwo(false);
    setStepThree(true);
    if (location.city !== "") {
      dispatch(setDestination(location));
    } else if (destination.city !== "") {
      dispatch(setDestination(destination));
    }
  };

  const handleBackToStepTwo = () => {
    setStepTwo(true);
    setStepThree(false);
  };

  const handleClickStepThree = () => {
    setStepThree(false);
    setStepFour(true);
    // dispatch(setDestination(location));
  };

  const handleBackToStepThree = () => {
    setStepThree(true);
    setStepFour(false);
    // dispatch(setDestination(location));
  };

  const handleClickStepFour = () => {
    setStepFour(false);
  };

  const handleBackToStepFour = () => {
    setStepFour(true);
    // dispatch(setDestination(location));
  };

  const backButton = (handleBackToStep) => {
    return (
      <div style={{ position: "absolute" }} className="pt-3 ps-2">
        <Button
          size={"sm"}
          onClick={handleBackToStep}
          variant="outline-secondary"
        >
          <ArrowLeftIcon size={24} className="me-2" />
          Back
        </Button>
      </div>
    );
  };

  const form = useRef();

  const schema = Yup.object().shape({
    cityOrigin: Yup.string(labelStringField)
      .min(4, "Min. 4 characters")
      .max(20, "Max. 20 characters")
      .matches(/^[a-zA-Z0-9\u00C0-\u00FF ]*$/, "Only letters & numbers allowed")
      .required(labelRequiredField),
    provinceOrigin: Yup.mixed()
      .oneOf(provinces, "Must be a Costa Rican province")
      .required(labelRequiredField),
    cityDestination: Yup.string(labelStringField)
      .min(4, "Min. 4 characters")
      .max(20, "Max. 20 characters")
      .matches(/^[a-zA-Z0-9\u00C0-\u00FF ]*$/, "Only letters & numbers allowed")
      .required(labelRequiredField),
    provinceDestination: Yup.mixed()
      .oneOf(provinces, "Must be a Costa Rican province")
      .required(labelRequiredField),
    date: Yup.date()
      // if the date selected is not past 00:00:01
      // (midnight and 1 second) from today
      .min(new Date(), "The date must be in the future")
      .required(labelRequiredField),
    time: Yup.string(labelStringField).required(labelRequiredField),
    seatsAvailable: Yup.number()
      .required(labelRequiredField)
      .min(1, "Min. 1 passenger required")
      .max(6, "Max. 6 passengers"),
    comment: Yup.string(labelStringField),
  });

  const handleSubmit = () => {
    setStepFour(false);
    dispatch(submitFormOfferRide(currentUser));
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container data-aos="fade-in">
      {stepOne ? (
        <>
          <Row className="mt-5 mb-3">
            <Col className="text-center">
              <p className="text-secondary mb-0">
                Step <span className="text-success">1</span> / 4
              </p>
              <h2 className="">Where are you leaving from?</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
              <LocationSearchInput />
            </Col>
          </Row>
          {location.city !== "" ? (
            <Row>
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                className="text-center mx-auto"
              >
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
                  <Button onClick={handleClickStepOne} variant="success">
                    Next
                    <ArrowRightIcon size={24} className="ms-2" />
                  </Button>
                </p>
              </Col>
            </Row>
          ) : origin.city !== "" ? (
            <Row>
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                className="text-center mx-auto"
              >
                <h3 className="fw-light mt-3">Selected:</h3>
                <p>
                  City: <strong>{origin.city}</strong>,{" "}
                  <small>{origin.province}</small>
                </p>
                <p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${origin.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-2"
                  >
                    <Button variant="outline-success">
                      Verify
                      <LinkExternalIcon size={24} className="ms-2" />
                    </Button>
                  </a>
                  <Button onClick={handleClickStepOne} variant="success">
                    Next
                    <ArrowRightIcon size={24} className="ms-2" />
                  </Button>
                </p>
              </Col>
            </Row>
          ) : null}
        </>
      ) : stepTwo ? (
        <>
          {backButton(handleBackToStepOne)}

          <Row className="pt-5 mb-3">
            <Col className="text-center">
              <p className="text-secondary mb-0">
                Step <span className="text-success">2</span> / 4
              </p>
              <h2 className="">Where are you heading to?</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
              <LocationSearchInput />
            </Col>
          </Row>
          {location.city !== "" ? (
            <Row>
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                className="text-center mx-auto"
              >
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
                  <Button onClick={handleClickStepTwo} variant="success">
                    Next
                    <ArrowRightIcon size={24} className="ms-2" />
                  </Button>
                </p>
              </Col>
            </Row>
          ) : destination.city !== "" ? (
            <Row>
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                className="text-center mx-auto"
              >
                <h3 className="fw-light mt-3">Selected:</h3>
                <p>
                  City: <strong>{destination.city}</strong>,{" "}
                  <small>{destination.province}</small>
                </p>
                <p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${destination.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-2"
                  >
                    <Button variant="outline-success">
                      Verify
                      <LinkExternalIcon size={24} className="ms-2" />
                    </Button>
                  </a>
                  <Button onClick={handleClickStepTwo} variant="success">
                    Next
                    <ArrowRightIcon size={24} className="ms-2" />
                  </Button>
                </p>
              </Col>
            </Row>
          ) : null}
        </>
      ) : stepThree ? (
        <>
          {backButton(handleBackToStepTwo)}

          <Row className="pt-5 mb-3">
            <Col className="text-center">
              <p className="text-secondary mb-0">
                Step <span className="text-success">3</span> / 4
              </p>
              <h2 className="">Day | Time | Seats</h2>
            </Col>
          </Row>

          <Button onClick={handleClickStepThree} variant="success">
            Next
            <ArrowRightIcon size={24} className="ms-2" />
          </Button>
        </>
      ) : stepFour ? (
        <>
          {backButton(handleBackToStepThree)}

          <Row className="pt-5 mb-3">
            <Col className="text-center">
              <p className="text-secondary mb-0">
                Step <span className="text-success">4</span> / 4
              </p>
              <h2 className="">Comment | Submit</h2>
            </Col>
          </Row>

          <Button onClick={handleClickStepFour} variant="success">
            Next
            <ArrowRightIcon size={24} className="ms-2" />
          </Button>
        </>
      ) : (
        <>
          {backButton(handleBackToStepFour)}

          <Row className="pt-5 mb-3">
            <Col className="text-center">
              <p className="text-secondary mb-0">Verify info</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <p>
                City origin: {origin.city}, {origin.province}
              </p>
              <p>
                City destination: {destination.city}, {destination.province}
              </p>
              <p>
                Distance: {distanceLatLng(origin.latLng, destination.latLng)} km
              </p>
            </Col>
          </Row>

          <Button onClick={handleSubmit} variant="success">
            Submit
          </Button>
        </>
      )}
    </Container>
  );
};

export default Offer;
