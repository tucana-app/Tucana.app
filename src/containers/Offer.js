import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";
import {
  AlertIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  LinkExternalIcon,
  PencilIcon,
} from "@primer/octicons-react";

import {
  resetOfferOrigin,
  resetOfferDestination,
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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    formOfferRide,
    isLoadingSubmitFormOfferRide,
    submitFormOfferRideSuccess,
  } = useSelector((state) => state.ride);
  const { seatsMax } = useSelector((state) => state.global);

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
    setStepOne(false);
    setStepTwo(true);
  };

  const handleEditOrigin = () => {
    dispatch(resetOfferOrigin());
  };

  const handleClickStepTwo = () => {
    setStepTwo(false);
    setStepThree(true);
  };

  const handleBackToStepOne = () => {
    setStepOne(true);
    setStepTwo(false);
  };

  const handleEditDestination = () => {
    dispatch(resetOfferDestination());
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
            headerText: t("translation:global.errors.error"),
            bodyText: t("translation:global.errors.dateFuture"),
            variant: "warning",
          })
        );
      } else if (isNaN(seats) || seats <= 0 || seats > seatsMax) {
        dispatch(
          setToast({
            show: true,
            headerText: t("translation:global.errors.error"),
            bodyText: t("translation:global.errors.chooseSeatsAvailable"),
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
          headerText: t("translation:global.errors.error"),
          bodyText: t("translation:global.errors.missingInfo"),
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
    <Container fluid data-aos="fade-in">
      {currentUser.Driver ? (
        stepOne ? (
          <>
            <Row className="mt-5 mb-3">
              <Col className="text-center">
                <p className="text-secondary mb-0">
                  {t("translation:offer.step")}{" "}
                  <span className="text-success">1</span> / 4
                </p>
                <h2>{t("translation:offer.whereFrom")}</h2>
              </Col>
            </Row>
            <Row>
              <Col xs={10} md={8} lg={6} xl={4} className="mx-auto">
                {formOfferRide.origin.city !== "" ? (
                  <Container className="px-0">
                    <Row className="mb-3">
                      <Col xs={12} className="text-center">
                        <h3 className="mb-0">
                          <strong>{formOfferRide.origin.city}</strong>,{" "}
                          <small>{formOfferRide.origin.province}</small>
                        </h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} className="text-center">
                        <Button
                          size={"sm"}
                          onClick={handleEditOrigin}
                          variant="outline-warning"
                          className="me-2"
                        >
                          <PencilIcon size={24} className="me-2" />
                          {t("translation:global.edit")}
                        </Button>
                        <Button
                          size={"sm"}
                          onClick={handleClickStepOne}
                          variant="success"
                        >
                          {t("translation:global.next")}
                          <ArrowRightIcon size={24} className="ms-2" />
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                ) : (
                  <LocationSearchInput inputLocation="offerOrigin" />
                )}
              </Col>
            </Row>
          </>
        ) : stepTwo ? (
          <>
            {backButton(handleBackToStepOne)}

            <Row className="pt-5 mb-3">
              <Col className="text-center">
                <p className="text-secondary mb-0">
                  {t("translation:offer.step")}{" "}
                  <span className="text-success">2</span> / 4
                </p>
                <h2>{t("translation:offer.whereTo")}</h2>
              </Col>
            </Row>
            <Row>
              <Col xs={10} md={8} lg={6} xl={4} className="mx-auto">
                {formOfferRide.destination.city !== "" ? (
                  <Container className="px-0">
                    <Row className="mb-3">
                      <Col xs={12} className="text-center">
                        <h3 className="mb-0">
                          <strong>{formOfferRide.destination.city}</strong>,{" "}
                          <small>{formOfferRide.destination.province}</small>
                        </h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} className="text-center">
                        <Button
                          size={"sm"}
                          onClick={handleEditDestination}
                          variant="outline-warning"
                          className="me-2"
                        >
                          <PencilIcon size={24} className="me-2" />
                          {t("translation:global.edit")}
                        </Button>
                        <Button
                          size={"sm"}
                          onClick={handleClickStepTwo}
                          variant="success"
                        >
                          {t("translation:global.next")}
                          <ArrowRightIcon size={24} className="ms-2" />
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                ) : (
                  <LocationSearchInput inputLocation="offerDestination" />
                )}
              </Col>
            </Row>
          </>
        ) : stepThree ? (
          <>
            {backButton(handleBackToStepTwo)}

            <Row className="pt-5 mb-3">
              <Col className="text-center">
                <p className="text-secondary mb-0">
                  {t("translation:offer.step")}{" "}
                  <span className="text-success">3</span> / 4
                </p>
                <h2>{t("translation:offer.details")}</h2>
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
                  {t("translation:global.day")}
                  <span className="text-danger">*</span>
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
                  {t("translation:global.time")}
                  <span className="text-danger">*</span>
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
                  {t("translation:global.seat")}(s)
                  <span className="text-danger">*</span>
                </Form.Label>

                <Form.Select
                  name="seats"
                  onChange={handleChangeSeats}
                  value={seats}
                  required
                >
                  <option>{t("translation:offer.selectNumber")}</option>
                  {seatsMaxList.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mt-5">
              <Col xs={12} sm={6} md={4} className="text-end mx-auto">
                <Button onClick={handleClickStepThree} variant="success">
                  {t("translation:global.next")}
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
                  {t("translation:offer.step")}{" "}
                  <span className="text-success">4</span> / 4
                </p>
                <h2>{t("translation:offer.comment")}</h2>
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
                  placeholder={t("translation:offer.placeholderComment")}
                  className="rounded mb-3"
                  onChange={handleChangeComment}
                />
                <Form.Label>
                  <p className="small text-secondary">
                    <AlertIcon size={24} className="text-warning me-2" />
                    {t("translation:global.doNotShare")}
                  </p>
                </Form.Label>
              </Form.Group>
            </Row>

            <Row className="mt-5">
              <Col xs={12} sm={6} md={4} className="text-end mx-auto">
                <Button onClick={handleClickStepFour} variant="success">
                  {t("translation:global.next")}
                  <ArrowRightIcon size={24} className="ms-2" />
                </Button>
              </Col>
            </Row>
          </>
        ) : stepVerify ? (
          <div className="mb-5">
            {backButton(handleBackToStepFour)}

            <Row className="pt-5 mb-3">
              <Col className="text-center">
                <p className="text-secondary mb-0">
                  {t("translation:offer.summary.subTitle")}
                </p>
                <h2>{t("translation:offer.summary.title")}</h2>
              </Col>
            </Row>

            <Row className="justify-content-center mb-3">
              <Col xs={12} md={6} lg={4} className="text-center mb-3 mb-md-0">
                <p className="mb-0">{t("translation:global.origin")}:</p>
                <h4>
                  <strong>{formOfferRide.origin.city}</strong>,{" "}
                  <small>{formOfferRide.origin.province}</small>
                </h4>
              </Col>
              <Col xs={12} md={6} lg={4} className="text-center mb-3 mb-md-0">
                <p className="mb-0">{t("translation:global.destination")}:</p>
                <h4>
                  <strong>{formOfferRide.destination.city}</strong>,{" "}
                  <small>{formOfferRide.destination.province}</small>
                </h4>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col className="text-center">
                <p className="mb-1">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&origin=${formOfferRide.origin.address}&destination=${formOfferRide.destination.address}&travelmode=driving`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline-success">
                      {t("translation:offer.preview")}
                      <LinkExternalIcon size={24} className="ms-2" />
                    </Button>
                  </a>
                </p>
              </Col>
            </Row>

            <Row className="justify-content-center mb-md-3">
              <Col xs={12} md={6} lg={4} className="text-center mb-3 mb-md-0">
                <p className="mb-0">{t("translation:global.date")}:</p>
                <h4>{dateFormat(formOfferRide.date, "dd/mm/yyyy")}</h4>
              </Col>

              <Col xs={12} md={6} lg={4} className="text-center mb-3 mb-md-0">
                <p className="mb-0">{t("translation:global.time")}:</p>
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
                <p className="mb-0">{t("translation:global.comment")}:</p>
                <h4>{formOfferRide.comment}</h4>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col className="text-end">
                <Button onClick={handleSubmit} size={"lg"} variant="success">
                  {t("translation:global.submit")}
                </Button>
              </Col>
            </Row>
          </div>
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
                  <h1 className="text-success">
                    {t("translation:global.congratulations")}
                  </h1>
                  <p>
                    {t("translation:offer.rideOnline1")}{" "}
                    <LinkContainer
                      to="/rides/driver"
                      className="cursor-pointer"
                    >
                      <u className="link-primary">
                        {t("translation:offer.rideOnline2")}
                      </u>
                    </LinkContainer>
                  </p>
                </Col>
              </Row>
            ) : null}
          </>
        ) : null
      ) : (
        <Row className="mt-5 mx-1 mx-sm-0">
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="border shadow-sm rounded text-center pt-3 pb-4 mx-auto"
          >
            <Container>
              <Row>
                <Col>
                  <h1 className="title display-4">
                    {t("translation:offer.title")}
                  </h1>
                  <p className="mb-0">
                    {t("translation:offer.onlyVerifiedDriver")}
                  </p>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <p>
                    <Link to="/become-driver">
                      <Button variant="success" size="lg">
                        {t("translation:global.becomeDriver")}
                      </Button>
                    </Link>
                  </p>
                  <p className="mb-0">
                    <Link to="/find">
                      <Button variant="warning">
                        {t("translation:offer.findRide")}
                      </Button>
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
