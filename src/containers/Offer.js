import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import dateFormat from "dateformat";
import {
  AlertIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  LinkExternalIcon,
} from "@primer/octicons-react";

import {
  setOrigin,
  setDestination,
  setRideDate,
  setRideTime,
  setRideSeats,
  setRideComment,
  submitFormOfferRide,
  setToast,
} from "../redux";
import LoadingSpinner from "../components/LoadingSpinner";
import LocationSearchInput from "../components/LocationSearchInput";

const Offer = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    location,
    formOfferRide,
    isLoadingSubmitFormOfferRide,
    submitFormOfferRideSuccess,
  } = useSelector((state) => state.ride);
  const { seatsMax, distanceLatLng } = useSelector((state) => state.global);

  const [date, setDate] = useState(formOfferRide.date);
  const [time, setTime] = useState(formOfferRide.time);
  const [seats, setSeats] = useState(formOfferRide.seats);
  const [comment, setComment] = useState(formOfferRide.comment);

  // Steps
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [stepVerify, setStepVerify] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleClickStepOne = () => {
    if (location.city !== "" || formOfferRide.origin.city !== "") {
      setStepOne(false);
      setStepTwo(true);
      if (location.city !== "") {
        dispatch(setOrigin(location));
      } else if (formOfferRide.origin.city !== "") {
        dispatch(setOrigin(formOfferRide.origin));
      }
    }
  };

  const handleBackToStepOne = () => {
    setStepOne(true);
    setStepTwo(false);
  };

  const handleClickStepTwo = () => {
    if (location.city !== "" || formOfferRide.destination.city !== "") {
      setStepTwo(false);
      setStepThree(true);
      if (location.city !== "") {
        dispatch(setDestination(location));
      } else if (formOfferRide.destination.city !== "") {
        dispatch(setDestination(formOfferRide.destination));
      }
    }
  };

  const handleBackToStepTwo = () => {
    setStepTwo(true);
    setStepThree(false);
  };

  const handleClickStepThree = () => {
    if (date !== "" && time !== "" && seats !== 0) {
      if (
        new Date(
          date.slice(0, 4),
          date.slice(5, 7) - 1,
          date.slice(8, 10),
          time.slice(0, 2),
          time.slice(3, 5)
        ) <= new Date()
      ) {
        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: "The date needs to be in the future",
            variant: "warning",
          })
        );
      } else if (isNaN(seats) || seats <= 0 || seats > seatsMax) {
        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText:
              "You need to choose the amount of seats you have available",
            variant: "warning",
          })
        );
      } else {
        setStepThree(false);
        setStepFour(true);
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

  const handleBackToStepThree = () => {
    setStepThree(true);
    setStepFour(false);
  };

  const handleClickStepFour = () => {
    setStepFour(false);
    setStepVerify(true);
  };

  const handleBackToStepFour = () => {
    setStepFour(true);
  };

  // Handlers
  const handleChangeDate = (e) => {
    setDate(e.target.value);
    dispatch(setRideDate(e.target.value));
  };

  const handleChangeTime = (e) => {
    setTime(e.target.value);
    dispatch(setRideTime(e.target.value));
  };

  const handleChangeSeats = (e) => {
    setSeats(e.target.value);
    dispatch(setRideSeats(e.target.value));
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
    dispatch(setRideComment(e.target.value));
  };

  const handleSubmit = () => {
    setStepVerify(false);
    setSubmitted(true);
    dispatch(submitFormOfferRide(currentUser, formOfferRide));
  };

  var seatsMaxList = [];
  const makeSeatsMaxList = () => {
    for (var i = 1; i <= seatsMax; i++) {
      seatsMaxList.push(i);
    }
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container data-aos="fade-in">
      {currentUser.Driver ? (
        stepOne ? (
          <>
            <Row className="mt-5 mb-3">
              <Col className="text-center">
                <p className="text-secondary mb-0">
                  Step <span className="text-success">1</span> / 4
                </p>
                <h2>Where are you leaving from?</h2>
              </Col>
            </Row>
            <Row>
              <Col xs={10} md={8} lg={6} className="mx-auto">
                <LocationSearchInput />
              </Col>
            </Row>
            {location.city !== "" ? (
              <>
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
                    </p>
                  </Col>
                </Row>

                <Row className="mt-5">
                  <Col className="text-end">
                    <Button onClick={handleClickStepOne} variant="success">
                      Next
                      <ArrowRightIcon size={24} className="ms-2" />
                    </Button>
                  </Col>
                </Row>
              </>
            ) : formOfferRide.origin.city !== "" ? (
              <>
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
                      City: <strong>{formOfferRide.origin.city}</strong>,{" "}
                      <small>{formOfferRide.origin.province}</small>
                    </p>
                    <p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${formOfferRide.origin.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="me-2"
                      >
                        <Button variant="outline-success">
                          Verify
                          <LinkExternalIcon size={24} className="ms-2" />
                        </Button>
                      </a>
                    </p>
                  </Col>
                </Row>

                <Row className="mt-5">
                  <Col className="text-end">
                    <Button onClick={handleClickStepOne} variant="success">
                      Next
                      <ArrowRightIcon size={24} className="ms-2" />
                    </Button>
                  </Col>
                </Row>
              </>
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
                <h2>Where are you heading to?</h2>
              </Col>
            </Row>
            <Row>
              <Col xs={10} md={8} lg={6} className="mx-auto">
                <LocationSearchInput />
              </Col>
            </Row>
            {location.city !== "" ? (
              <>
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
                    </p>
                  </Col>
                </Row>

                <Row className="mt-5">
                  <Col className="text-end">
                    <Button onClick={handleClickStepTwo} variant="success">
                      Next
                      <ArrowRightIcon size={24} className="ms-2" />
                    </Button>
                  </Col>
                </Row>
              </>
            ) : formOfferRide.destination.city !== "" ? (
              <>
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
                      City: <strong>{formOfferRide.destination.city}</strong>,{" "}
                      <small>{formOfferRide.destination.province}</small>
                    </p>
                    <p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${formOfferRide.destination.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="me-2"
                      >
                        <Button variant="outline-success">
                          Verify
                          <LinkExternalIcon size={24} className="ms-2" />
                        </Button>
                      </a>
                    </p>
                  </Col>
                </Row>

                <Row className="mt-5">
                  <Col className="text-end">
                    <Button onClick={handleClickStepTwo} variant="success">
                      Next
                      <ArrowRightIcon size={24} className="ms-2" />
                    </Button>
                  </Col>
                </Row>
              </>
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
                <h2>Details about your ride</h2>
              </Col>
            </Row>

            <Row className="mb-4">
              <Form.Group
                as={Col}
                xs={12}
                sm={6}
                md={4}
                className="text-center mx-auto"
              >
                <Form.Label>
                  Day<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={date}
                  min={dateFormat(new Date(), "yyyy-mm-dd")}
                  onChange={handleChangeDate}
                  required
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group
                as={Col}
                xs={12}
                sm={6}
                md={4}
                className="text-center mx-auto"
              >
                <Form.Label>
                  Time<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={time}
                  min="00:00"
                  max="23:59"
                  onChange={handleChangeTime}
                  required
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              {makeSeatsMaxList()}

              <Form.Group
                as={Col}
                xs={12}
                sm={6}
                md={4}
                className="text-center mx-auto"
              >
                <Form.Label>
                  Seats<span className="text-danger">*</span>
                </Form.Label>

                <Form.Select
                  name="seats"
                  onChange={handleChangeSeats}
                  value={seats}
                  required
                >
                  <option>Select a number</option>
                  {seatsMaxList.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mt-5">
              <Col className="text-end">
                <Button onClick={handleClickStepThree} variant="success">
                  Next
                  <ArrowRightIcon size={24} className="ms-2" />
                </Button>
              </Col>
            </Row>
          </>
        ) : stepFour ? (
          <>
            {backButton(handleBackToStepThree)}

            <Row className="pt-5 mb-3">
              <Col className="text-center">
                <p className="text-secondary mb-0">
                  Step <span className="text-success">4</span> / 4
                </p>
                <h2>Any comments?</h2>
              </Col>
            </Row>

            <Row>
              <Form.Group
                as={Col}
                xs={12}
                sm={6}
                md={4}
                className="text-center mx-auto"
              >
                <Form.Control
                  name="comment"
                  as="textarea"
                  rows={2}
                  type="textarea"
                  value={comment}
                  placeholder="Want to share the road you'll take or a precision on your destination?"
                  className="mb-3"
                  onChange={handleChangeComment}
                />
                <Form.Label>
                  <p className="small text-secondary">
                    <AlertIcon size={24} className="text-warning me-2" />
                    Do not share any contact info (phone, email, etc), they will
                    be shared within the platform when a booking is made.
                  </p>
                </Form.Label>
              </Form.Group>
            </Row>

            <Row className="mt-5">
              <Col className="text-end">
                <Button onClick={handleClickStepFour} variant="success">
                  Next
                  <ArrowRightIcon size={24} className="ms-2" />
                </Button>
              </Col>
            </Row>
          </>
        ) : stepVerify ? (
          <>
            {backButton(handleBackToStepFour)}

            <Row className="pt-5 mb-3">
              <Col className="text-center">
                <p className="text-secondary mb-0">Double check</p>
                <h2>Summary</h2>
              </Col>
            </Row>

            <Row className="justify-content-center mb-3">
              <Col xs={12} md={6} lg={4} className="text-center mb-3 mb-md-0">
                <p className="mb-0">Origin:</p>
                <h4>
                  <strong>{formOfferRide.origin.city}</strong>,{" "}
                  <small>{formOfferRide.origin.province}</small>
                </h4>
              </Col>
              <Col xs={12} md={6} lg={4} className="text-center mb-3 mb-md-0">
                <p className="mb-0">Destination:</p>
                <h4>
                  <strong>{formOfferRide.destination.city}</strong>,{" "}
                  <small>{formOfferRide.destination.province}</small>
                </h4>
              </Col>
            </Row>

            <Row>
              <Col className="text-center">
                <p className="mb-1">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&origin=${formOfferRide.origin.address}&destination=${formOfferRide.destination.address}&travelmode=driving`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline-success">
                      Preview on Google Maps
                      <LinkExternalIcon size={24} className="ms-2" />
                    </Button>
                  </a>
                </p>

                <p>
                  ~{" "}
                  {distanceLatLng(
                    formOfferRide.origin.latLng,
                    formOfferRide.destination.latLng
                  )}{" "}
                  km
                </p>
              </Col>
            </Row>

            <Row className="justify-content-center mb-md-3">
              <Col xs={12} md={6} lg={4} className="text-center mb-3 mb-md-0">
                <p className="mb-0">Date:</p>
                <h4>{dateFormat(formOfferRide.date, "dd/mm/yyyy")}</h4>
              </Col>

              <Col xs={12} md={6} lg={4} className="text-center mb-3 mb-md-0">
                <p className="mb-0">Time:</p>
                <h4>
                  {dateFormat(
                    new Date(
                      formOfferRide.date.slice(0, 4),
                      formOfferRide.date.slice(5, 7) - 1,
                      formOfferRide.date.slice(8, 10),
                      formOfferRide.time.slice(0, 2),
                      formOfferRide.time.slice(3, 5)
                    ),
                    "hh:MM TT"
                  )}
                  {/* {formOfferRide.time} */}
                </h4>
              </Col>
            </Row>

            <Row>
              <Col className="text-center">
                <p className="mb-0">Comment:</p>
                <h4>{formOfferRide.comment}</h4>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col className="text-end">
                <Button onClick={handleSubmit} size={"lg"} variant="success">
                  Submit
                </Button>
              </Col>
            </Row>
          </>
        ) : submitted ? (
          <>
            {isLoadingSubmitFormOfferRide ? (
              <Row>
                <Col className="text-center">
                  <LoadingSpinner />
                </Col>
              </Row>
            ) : submitFormOfferRideSuccess ? (
              <Row className="mt-5">
                <Col className="text-center">
                  <h1 className="text-success">Congratulations</h1>
                  <p>
                    Your ride is now online, check it out{" "}
                    <LinkContainer
                      to="/rides/driver"
                      className="cursor-pointer"
                    >
                      <u className="link-primary">here</u>
                    </LinkContainer>
                  </p>
                </Col>
              </Row>
            ) : null}
          </>
        ) : null
      ) : (
        <Row className="mt-5">
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="bg-white text-center shadow-lg rounded mx-auto py-3"
          >
            <Container>
              <Row>
                <Col>
                  <h1 className="title display-4">Offer a ride</h1>
                  <p className="mb-0">
                    You can offer rides only when you are a verified driver
                  </p>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <p>
                    <Link to="/become-driver">
                      <Button variant="success" size="lg">
                        Become a driver
                      </Button>
                    </Link>
                  </p>
                  <p className="mb-0">
                    <Link to="/find">
                      <Button variant="warning">Find a ride</Button>
                    </Link>
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Offer;
