import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button, Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";
import DatePicker, { registerLocale } from "react-datepicker";
import en from "date-fns/locale/en-US";
import es from "date-fns/locale/es";
import fr from "date-fns/locale/fr";
import i18n from "i18next";
import Select from "react-select";
import {
  AlertIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  LinkExternalIcon,
  PencilIcon,
} from "@primer/octicons-react";

import {
  resetPublishOrigin,
  resetPublishDestination,
  setRideDate,
  setRideTime,
  setRideSeats,
  setRidePrice,
  setRideComment,
  submitFormPublishRide,
  getETA,
  setToast,
  ridesToConfirm,
} from "../../redux";

import {
  getArrayTimeRide,
  formatPrice,
  formatTimeSecond,
  formatDistance,
} from "../../helpers";
import LoadingSpinner from "../../components/LoadingSpinner";
import InputSearchLocation from "../../components/InputSearchLocation";
import ErrorFallback from "../Error/ErrorFallback";
import { DashCircle, PlusCircle } from "react-bootstrap-icons";
import { LinkContainer } from "react-router-bootstrap";

// Enable translation for the date picker
registerLocale("en", en);
registerLocale("es", es);
registerLocale("fr", fr);

const Publish = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    formPublishRide,
    isLoadingSubmitFormPublishRide,
    submitFormPublishRideData,
    isLoadingGetETA,
    getETAData,
    isLoadingRidesToConfirm,
    ridesToConfirmData,
  } = useSelector((state) => state.ride);
  const { seatsMax, priceMin, priceMax, commissionOnDriver } = useSelector(
    (state) => state.global
  );

  const [date, setDate] = useState(formPublishRide.date);
  const [time, setTime] = useState(formPublishRide.time);
  const [seats, setSeats] = useState(formPublishRide.seats);
  const [price, setPrice] = useState(formPublishRide.price);
  const [comment, setComment] = useState(formPublishRide.comment);

  const timeOrigin = useRef(new Date());
  const timeDestination = useRef(new Date());

  // Steps
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [stepFive, setStepFive] = useState(false);
  const [stepSix, setStepSix] = useState(false);
  const [stepVerify, setStepVerify] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const intervalPriceDecreaseRef = useRef(null);
  const intervalPriceIncreaseRef = useRef(null);

  var now = new Date();
  var dateMax;
  if (now.getMonth() === 11) {
    dateMax = new Date(now.getFullYear() + 1, 2, 0);
  } else {
    dateMax = new Date(now.getFullYear(), now.getMonth() + 4, 0);
  }

  const backButton = (handleBackToStep) => {
    return (
      <Row className="my-3">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
          <Button
            size={"sm"}
            onClick={handleBackToStep}
            variant="outline-secondary"
          >
            <ArrowLeftIcon size={24} className="me-2" />
            {t("translation:global.goBack")}
          </Button>
        </Col>
      </Row>
    );
  };

  // Step 1
  const handleClickStepOne = () => {
    setStepOne(false);
    setStepTwo(true);
  };

  const handleEditOrigin = () => {
    dispatch(resetPublishOrigin());
  };

  // Step 2
  const handleClickStepTwo = () => {
    setStepTwo(false);
    setStepThree(true);
    dispatch(getETA(formPublishRide.origin, formPublishRide.destination));
  };

  const handleEditDestination = () => {
    dispatch(resetPublishDestination());
  };

  const handleBackToStepOne = () => {
    setStepOne(true);
    setStepTwo(false);
  };

  // Step 3
  const handleClickStepThree = () => {
    if (date !== "") {
      setStepThree(false);
      setStepFour(true);
    } else {
      dispatch(
        setToast({
          show: true,
          headerText: t("translation:global.errors.error"),
          bodyText: t("translation:global.errors.chooseDate"),
          variant: "warning",
        })
      );
    }
  };

  const handleBackToStepTwo = () => {
    setStepTwo(true);
    setStepThree(false);
  };

  // Step 4
  const handleClickStepFour = () => {
    if (time.value === "" || time.value === undefined) {
      dispatch(
        setToast({
          show: true,
          headerText: t("translation:global.errors.error"),
          bodyText: t("translation:global.errors.chooseTime"),
          variant: "warning",
        })
      );
    } else {
      timeOrigin.current.setHours(time.value.slice(0, time.value.indexOf(":")));
      timeOrigin.current.setMinutes(
        time.value.slice(time.value.indexOf(":") + 1, time.value.length)
      );

      setStepFour(false);
      setStepFive(true);
    }
  };

  const handleBackToStepThree = () => {
    setStepThree(true);
    setStepFour(false);
  };

  // Step 5
  const handleClickStepFive = () => {
    if (seats !== "") {
      if (isNaN(seats) || seats <= 0 || seats > seatsMax) {
        dispatch(
          setToast({
            show: true,
            headerText: t("translation:global.errors.error"),
            bodyText: t("translation:global.errors.chooseSeatsAvailable"),
            variant: "warning",
          })
        );
      } else {
        dispatch(setRideSeats(seats));

        setStepFive(false);
        setStepSix(true);
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

  const handleBackToStepFour = () => {
    setStepFour(true);
    setStepFive(false);
  };

  // Step 6
  const handleClickStepSix = () => {
    if (seats !== "") {
      if (isNaN(seats) || seats <= 0 || seats > seatsMax) {
        dispatch(
          setToast({
            show: true,
            headerText: t("translation:global.errors.error"),
            bodyText: t("translation:global.errors.chooseSeatsAvailable"),
            variant: "warning",
          })
        );
      } else {
        dispatch(setRidePrice(price));

        setStepSix(false);
        setStepVerify(true);
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

  const handleBackToStepFive = () => {
    setStepFive(true);
    setStepSix(false);
  };

  // Step verify
  const handleBackToStepSix = () => {
    setStepSix(true);
    setStepVerify(false);
  };

  // Submit
  const handleSubmit = () => {
    setStepVerify(false);
    setSubmitted(true);
    dispatch(submitFormPublishRide(currentUser, formPublishRide, getETAData));
  };

  // Handlers
  const handleChangeDate = (date) => {
    setDate(date);
    dispatch(setRideDate(date));
  };

  const handleChangeTime = (time) => {
    setTime(time);
    dispatch(setRideTime(time));
  };

  const handleDecreaseSeats = () => {
    setSeats(seats <= 1 ? 1 : seats - 1);
  };

  const handleIncreaseSeats = () => {
    setSeats(seats >= seatsMax ? seatsMax : seats + 1);
  };

  // Decrease price
  const handleDecreasePriceSingle = () => {
    setPrice(price <= priceMin ? priceMin : price - 500);
  };

  const handleDecreasePrice = () => {
    if (intervalPriceDecreaseRef.current) return;
    intervalPriceDecreaseRef.current = setInterval(() => {
      setPrice((price) => (price <= priceMin ? priceMin : price - 500));
    }, 250);
  };

  const stopCounterDecrease = () => {
    if (intervalPriceDecreaseRef.current) {
      clearInterval(intervalPriceDecreaseRef.current);
      intervalPriceDecreaseRef.current = null;
    }
  };

  // Increase price
  const handleIncreasePriceSingle = () => {
    setPrice(price >= priceMax ? priceMax : price + 500);
  };

  const handleIncreasePrice = () => {
    if (intervalPriceIncreaseRef.current) return;
    intervalPriceIncreaseRef.current = setInterval(() => {
      setPrice((price) => (price >= priceMax ? priceMax : price + 500));
    }, 250);
  };

  const stopCounterIncrease = () => {
    if (intervalPriceIncreaseRef.current) {
      clearInterval(intervalPriceIncreaseRef.current);
      intervalPriceIncreaseRef.current = null;
    }
  };

  // Change comment
  const handleChangeComment = (e) => {
    setComment(e.target.value);
    dispatch(setRideComment(e.target.value));
  };

  useEffect(() => {
    if (isLoggedIn && currentUser.Driver)
      dispatch(ridesToConfirm(currentUser.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      stopCounterDecrease();
      stopCounterIncrease();
    };
  }, []);

  useEffect(() => {
    if (getETAData.durationValue) {
      timeDestination.current.setTime(
        timeOrigin.current.getTime() + getETAData.durationValue * 1000
      );
    }
  }, [formPublishRide, getETAData]);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container fluid data-aos="fade-in">
      {isLoadingRidesToConfirm ? (
        <Row className="min-vh-100 align-items-center">
          <Col className="text-center">
            <LoadingSpinner />
          </Col>
        </Row>
      ) : ridesToConfirmData.length ? (
        <Row className="mt-5 pt-5 mx-1 mx-sm-0">
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="container-box text-center"
          >
            <Container className="py-3 px-2">
              <Row>
                <Col>
                  <h3 className="fw-norml mb-3">
                    {t("translation:global.errors.completeFirst")}
                  </h3>

                  <div>
                    <Link to="/rides/rides-to-complete">
                      <Button variant="success">
                        {t("translation:ridesToConfirm.title")}{" "}
                        <Badge bg="danger">{ridesToConfirmData.length}</Badge>{" "}
                        <ArrowRightIcon size="24" />
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      ) : currentUser.Driver ? (
        stepOne ? (
          <>
            <Row className="mt-5 pt-3 mb-3">
              <Col className="text-center">
                <h2>{t("translation:publish.whereFrom")}</h2>
              </Col>
            </Row>
            <Row>
              <Col xs={10} md={8} lg={6} xl={4} className="mx-auto">
                {formPublishRide.origin.city !== "" ? (
                  <Container className="px-0">
                    <Row className="mb-3">
                      <Col xs={12} className="text-center">
                        <h3 className="mb-0">
                          <strong>{formPublishRide.origin.city}</strong>,{" "}
                          <small>{formPublishRide.origin.province}</small>
                        </h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} className="text-center">
                        <Button
                          onClick={handleEditOrigin}
                          variant="warning"
                          className="me-2"
                        >
                          <PencilIcon size={24} className="me-2" />
                          {t("translation:global.edit")}
                        </Button>
                        <Button onClick={handleClickStepOne} variant="success">
                          {t("translation:global.next")}
                          <ArrowRightIcon size={24} className="ms-2" />
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                ) : (
                  <InputSearchLocation inputLocation="publishOrigin" />
                )}
              </Col>
            </Row>
          </>
        ) : stepTwo ? (
          <>
            {backButton(handleBackToStepOne)}

            <Row className="mb-3">
              <Col className="text-center">
                <h2>{t("translation:publish.whereTo")}</h2>
              </Col>
            </Row>
            <Row>
              <Col xs={10} md={8} lg={6} xl={4} className="mx-auto">
                {formPublishRide.destination.city !== "" ? (
                  <Container className="px-0">
                    <Row className="mb-3">
                      <Col xs={12} className="text-center">
                        <h3 className="mb-0">
                          <strong>{formPublishRide.destination.city}</strong>,{" "}
                          <small>{formPublishRide.destination.province}</small>
                        </h3>
                      </Col>
                    </Row>
                    {formPublishRide.destination.city ===
                      formPublishRide.origin.city &&
                    formPublishRide.destination.province ===
                      formPublishRide.origin.province ? (
                      <p className="text-danger">
                        <AlertIcon size="24" className="me-2" />
                        {t("translation:global.errors.samePlaces")}
                      </p>
                    ) : null}
                    <Row>
                      <Col xs={12} className="text-center">
                        <Button
                          onClick={handleEditDestination}
                          variant="warning"
                          className="me-2"
                        >
                          <PencilIcon size={24} className="me-2" />
                          {t("translation:global.edit")}
                        </Button>
                        <Button
                          onClick={handleClickStepTwo}
                          variant="success"
                          disabled={
                            formPublishRide.destination.city ===
                              formPublishRide.origin.city &&
                            formPublishRide.destination.province ===
                              formPublishRide.origin.province
                          }
                        >
                          {t("translation:global.next")}
                          <ArrowRightIcon size={24} className="ms-2" />
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                ) : (
                  <InputSearchLocation inputLocation="publishDestination" />
                )}
              </Col>
            </Row>
          </>
        ) : stepThree ? (
          <>
            {backButton(handleBackToStepTwo)}

            <Row className="mb-3">
              <Col className="text-center">
                <h2>{t("translation:publish.when")}</h2>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col className="text-center">
                <DatePicker
                  selected={date}
                  onChange={handleChangeDate}
                  minDate={now}
                  maxDate={dateMax}
                  locale={i18n.language}
                  inline
                />
              </Col>
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

            <Row className="mb-3">
              <Col className="text-center">
                <h2>{t("translation:publish.whatTime")}</h2>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={10} md={8} lg={6} xl={4} className="text-center mx-auto">
                <Select
                  placeholder={t("translation:publish.chooseTime")}
                  value={time}
                  onChange={handleChangeTime}
                  options={getArrayTimeRide()}
                />
              </Col>
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
        ) : stepFive ? (
          <>
            {backButton(handleBackToStepFour)}

            <Row className="mb-3">
              <Col className="text-center">
                <h2>{t("translation:publish.seatsAvailable")}</h2>
              </Col>
            </Row>

            <Row className="justify-content-center mb-4">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="text-center mx-auto"
              >
                <Container>
                  <Row className="align-items-center">
                    <Col xs={3}>
                      {seats === 1 ? (
                        <span
                          variant="outline-success"
                          className="text-secondary"
                        >
                          <DashCircle size={36} />
                        </span>
                      ) : (
                        <span
                          onClick={handleDecreaseSeats}
                          variant="outline-success"
                          className="cursor-pointer text-success"
                        >
                          <DashCircle size={36} />
                        </span>
                      )}
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        plaintext
                        readOnly
                        value={seats}
                        className="h1 fw-bold text-center"
                      />
                    </Col>
                    <Col xs={3}>
                      {seats === seatsMax ? (
                        <span
                          variant="outline-success"
                          className="text-secondary"
                        >
                          <PlusCircle size={36} />
                        </span>
                      ) : (
                        <span
                          onClick={handleIncreaseSeats}
                          variant="outline-success"
                          disabled={seats === seatsMax}
                          className="cursor-pointer text-success"
                        >
                          <PlusCircle size={36} />
                        </span>
                      )}
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col xs={12} sm={6} md={4} className="text-end mx-auto">
                <Button onClick={handleClickStepFive} variant="success">
                  {t("translation:global.next")}
                  <ArrowRightIcon size={24} className="ms-2" />
                </Button>
              </Col>
            </Row>
          </>
        ) : stepSix ? (
          <>
            {backButton(handleBackToStepFive)}

            <Row className="mb-3">
              <Col className="text-center">
                <h2>{t("translation:publish.priceTitle")}</h2>
              </Col>
            </Row>

            <Row className="justify-content-center mb-4">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="text-center mx-auto"
              >
                <Container>
                  <Row className="align-items-center">
                    <Col xs={3}>
                      {price === priceMin ? (
                        <span
                          variant="outline-success"
                          className="text-secondary"
                        >
                          <DashCircle size={36} />
                        </span>
                      ) : (
                        <span
                          onClick={handleDecreasePriceSingle}
                          onMouseDown={handleDecreasePrice}
                          onMouseUp={stopCounterDecrease}
                          onTouchStart={handleDecreasePrice}
                          onTouchEnd={stopCounterDecrease}
                          onTouchCancel={stopCounterDecrease}
                          onMouseLeave={stopCounterDecrease}
                          variant="outline-success"
                          className="cursor-pointer text-success"
                        >
                          <DashCircle size={36} />
                        </span>
                      )}
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        plaintext
                        readOnly
                        value={formatPrice(price)}
                        className="h1 fw-bold text-center"
                      />
                    </Col>
                    <Col xs={3}>
                      {price === priceMax ? (
                        <div
                          variant="outline-success"
                          className="text-secondary"
                        >
                          <DashCircle size={36} />
                        </div>
                      ) : (
                        <span
                          onClick={handleIncreasePriceSingle}
                          onMouseDown={handleIncreasePrice}
                          onMouseUp={stopCounterIncrease}
                          onMouseLeave={stopCounterIncrease}
                          onTouchStart={handleIncreasePrice}
                          onTouchEnd={stopCounterIncrease}
                          onTouchCancel={stopCounterIncrease}
                          variant="outline-success"
                          className="cursor-pointer text-success"
                        >
                          <PlusCircle size={36} />
                        </span>
                      )}
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col xs={12} sm={6} md={4} className="text-end mx-auto">
                <Button onClick={handleClickStepSix} variant="success">
                  {t("translation:global.next")}
                  <ArrowRightIcon size={24} className="ms-2" />
                </Button>
              </Col>
            </Row>
          </>
        ) : stepVerify ? (
          isLoadingGetETA ? (
            <Row className="min-vh-100 align-items-center">
              <Col className="text-center">
                <LoadingSpinner />
              </Col>
            </Row>
          ) : (
            <div className="mb-5">
              {backButton(handleBackToStepSix)}

              <Row className="mb-3">
                <Col className="text-center">
                  <h2>{t("translation:publish.summary")}</h2>
                </Col>
              </Row>

              <Row className="mb-3 mx-1 mx-sm-0">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  xl={4}
                  className="container-box"
                >
                  <Container className="p-2">
                    <Row className="mb-3">
                      <Col className="text-center">
                        {dateFormat(formPublishRide.date, "dd/mm/yyyy")}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={2} className="mt-1 px-0">
                        <p className="smaller line-height-md text-secondary text-end mb-2">
                          {dateFormat(timeOrigin.current, "HH:MM TT")}
                        </p>
                        <p className="smaller fw-bold line-height-md text-secondary text-end mb-0">
                          {formatTimeSecond(getETAData.durationValue)}
                        </p>
                      </Col>
                      <Col xs={8}>
                        <p className="line-height-md mb-1">
                          <strong>{formPublishRide.origin.city}, </strong>
                          <small>{formPublishRide.origin.province}</small>
                        </p>
                        <p className="mb-2">
                          <ArrowDownIcon size={24} className="text-success" />
                        </p>
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col xs={2} className="px-0">
                        <p className="smaller line-height-md text-secondary text-end mb-0">
                          {dateFormat(timeDestination.current, "HH:MM TT")}
                        </p>
                      </Col>
                      <Col xs={7}>
                        <p className="line-height-md mb-0">
                          <strong>{formPublishRide.destination.city}, </strong>
                          <small>{formPublishRide.destination.province}</small>
                        </p>
                      </Col>
                      <Col xs={3}></Col>
                    </Row>
                    <hr />
                    <Row className="align-items-center">
                      <Col xs={12} md={8}>
                        <p className="mb-0">
                          {t("translation:publish.estimatedTime")}:{" "}
                          <strong>
                            {formatTimeSecond(getETAData.durationValue)}
                          </strong>
                        </p>
                        <p className="mb-0">
                          {t("translation:publish.estimatedDistance")}:{" "}
                          <strong>
                            {formatDistance(getETAData.distanceValue)}
                          </strong>
                        </p>
                      </Col>
                      <Col xs={12} md={4} className="text-center mt-3 mt-md-0">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&origin=${formPublishRide.origin.address}&destination=${formPublishRide.destination.address}&travelmode=driving`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline-success" size="sm">
                            {t("translation:ride.viewTrip")}
                            <LinkExternalIcon size={18} className="ms-2" />
                          </Button>
                        </a>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>

              <Row className="mb-2 mx-1 mx-sm-0">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  xl={4}
                  className="bg-light container-box"
                >
                  <Container className="py-3 px-2">
                    <Row className="align-items-center">
                      <Col xs={7}>
                        <p className="mb-2 ms-3">
                          {t("translation:global.seat")}
                          {seats > 1 ? "s" : null}
                        </p>
                      </Col>
                      <Col xs={5} className="text-end pe-4">
                        <p className="mb-0">x{seats}</p>
                      </Col>
                    </Row>
                    <Row className="align-items-center">
                      <Col xs={7}>
                        <p className="mb-2 ms-3">
                          {t("translation:publish.priceTitle")}
                        </p>
                      </Col>
                      <Col xs={5} className="text-end pe-4">
                        <p className="fw-bold mb-0">{formatPrice(price)}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={7}>
                        <p className="mb-0 ms-3">
                          {t("translation:book.fees")}
                        </p>
                      </Col>
                      <Col xs={5} className="text-end pe-4">
                        <p className="mb-0">
                          {formatPrice(
                            price * seats - price * seats * commissionOnDriver
                          )}
                          <span className="text-danger fw-bold">*</span>
                        </p>
                      </Col>
                    </Row>

                    <hr className="mx-2" />

                    <Row className="align-items-center">
                      <Col xs={8}>
                        <h5 className="mb-0 ms-3">
                          {t("translation:publish.youGet")}
                        </h5>
                      </Col>
                      <Col xs={4} className="text-end pe-4">
                        <h2 className="mb-0">
                          {formatPrice(price * seats * commissionOnDriver)}
                        </h2>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>

              <Row className="mx-1 mx-sm-0">
                <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
                  <p className="fw-light small">
                    <span className="text-danger">*</span>
                    {t("translation:global.messageFree")}{" "}
                    <LinkContainer
                      to="/faq"
                      className="cursor-pointer text-primary"
                    >
                      <u>{t("translation:global.learnMore")}</u>
                    </LinkContainer>
                    .
                  </p>
                </Col>
              </Row>

              <Row className="mb-3 mx-1 mx-sm-0">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  xl={4}
                  className="bg-light container-box"
                >
                  <Container className="py-3 px-2">
                    <Row>
                      <Col xs={12} className="text-center">
                        <p>{t("translation:global.comment")}</p>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="text-center">
                        <Form.Group>
                          <Form.Control
                            name="comment"
                            as="textarea"
                            rows={2}
                            type="textarea"
                            value={comment}
                            placeholder={t(
                              "translation:publish.placeholderComment"
                            )}
                            className="rounded mb-3"
                            onChange={handleChangeComment}
                          />
                          <Form.Label className="mb-0">
                            <p className="mb-0">
                              <AlertIcon
                                size={24}
                                className="text-warning me-2"
                              />
                              {t("translation:global.doNotShare")}
                            </p>
                          </Form.Label>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>

              <Row className="mb-3 mx-1 mx-sm-0">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  xl={4}
                  className="text-end mx-auto"
                >
                  <Button onClick={handleSubmit} size={"lg"} variant="success">
                    {t("translation:global.submit")}
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
                  <p className="small text-secondary">
                    {t("translation:publish.legalConsent")}
                  </p>
                </Col>
              </Row>
            </div>
          )
        ) : submitted ? (
          <>
            {isLoadingSubmitFormPublishRide ? (
              <Row className="min-vh-100 align-items-center">
                <Col className="text-center">
                  <LoadingSpinner />
                </Col>
              </Row>
            ) : submitFormPublishRideData.flag === "SUCCESS" ? (
              <Row className="mt-5 pt-5">
                <Col className="text-center">
                  <h1 className="text-success">
                    {t("translation:global.congratulations")} 🎉
                  </h1>
                  <p>{t("translation:global.rideOnline")}</p>
                  <p>
                    <Link
                      to={`/ride/${submitFormPublishRideData.ride.id}`}
                      className="cursor-pointer"
                    >
                      <Button variant="success" size="lg">
                        {t("translation:publish.checkItOut")}
                      </Button>
                    </Link>
                  </p>
                </Col>
              </Row>
            ) : (
              <ErrorFallback />
            )}
          </>
        ) : null
      ) : (
        <Row className="mt-5 pt-5 mx-1 mx-sm-0">
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="container-box text-center"
          >
            <Container className="py-3 px-2">
              <Row className="mb-3">
                <Col>
                  <h1 className="title display-4">
                    {t("translation:publish.title")}
                  </h1>
                  <p className="mb-0">
                    {t("translation:publish.onlyVerifiedDriver")}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    <Link to="/apply-driver">
                      <Button variant="success" size="lg">
                        {t("translation:global.becomeDriver")}
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

export default Publish;
