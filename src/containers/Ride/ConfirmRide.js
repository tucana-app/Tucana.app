import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Alert, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ArrowLeftIcon,
  XIcon,
  CheckIcon,
  StarFillIcon,
} from "@primer/octicons-react";
import { LinkContainer } from "react-router-bootstrap";

import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";

import { rideToConfirm, setToast, submitFormConfirmRide } from "../../redux";

import RideDetails from "../../components/RideDetails";

const ConfirmRide = () => {
  const { t } = useTranslation();
  const { bookingId } = useParams();

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isLoadingRideToConfirm,
    rideToConfirmData,
    rideToConfirmError,
    isloadingSubmitFormConfirmRide,
    submitFormConfirmRideData,
    submitFormConfirmRideError,
  } = useSelector((state) => state.ride);
  const { nbReasonNotComplete } = useSelector((state) => state.global);

  const [submitted, setSubmitted] = useState(false);
  const [submittedNo, setSubmittedNo] = useState(false);
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  let arrayReasons = [];
  for (let i = 1; i <= nbReasonNotComplete; i++) {
    arrayReasons.push(
      <option key={i} value={t(`translation:global.statuses.reasons.${i}`)}>
        {t(`translation:global.statuses.reasons.${i}`)}
      </option>
    );
  }
  arrayReasons.push(
    <option key={"other"} value={nbReasonNotComplete + 1}>
      {t(`translation:global.statuses.reasons.other`)}
    </option>
  );

  const handleChangeReason = (e) => {
    setReason(e.target.value);
    if (e.target.value !== `${nbReasonNotComplete + 1}`) {
      setComment("");
    }
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (isCompleted) => {
    if (!isCompleted) {
      if (!reason) {
        dispatch(
          setToast({
            show: true,
            headerText: t("translation:global.errors.error"),
            bodyText: t("translation:global.errors.labelRequiredField"),
            variant: "warning",
          })
        );
      } else if (reason === `${nbReasonNotComplete + 1}`) {
        if (!comment || comment.length < 10) {
          dispatch(
            setToast({
              show: true,
              headerText: t("translation:global.errors.error"),
              bodyText: t("translation:global.errors.min10characters"),
              variant: "warning",
            })
          );
        } else {
          dispatch(
            submitFormConfirmRide(
              currentUser,
              rideToConfirmData.id,
              rideToConfirmData.RideId,
              comment,
              isCompleted
            )
          );
          setSubmitted(true);
        }
      } else {
        dispatch(
          submitFormConfirmRide(
            currentUser,
            rideToConfirmData.id,
            rideToConfirmData.RideId,
            reason,
            isCompleted
          )
        );
        setSubmitted(true);
      }
    } else {
      dispatch(
        submitFormConfirmRide(
          currentUser,
          rideToConfirmData.id,
          rideToConfirmData.RideId,
          null,
          isCompleted
        )
      );
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(rideToConfirm(currentUser.id, bookingId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="pb-3">
      <GoBack />

      <Container className="mb-5">
        {isLoadingRideToConfirm ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : rideToConfirmData.id ? (
          <div data-aos="fade-in">
            <Row>
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="text-center mx-auto"
              >
                <h1 className="title">{t("translation:confirmRide.title")}</h1>
                <p>{t("translation:confirmRide.message")}</p>
              </Col>
            </Row>

            <Row className="mb-3 mx-1 mx-sm-0">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className={
                  submitted && !submittedNo
                    ? "border border-2 border-success shadow rounded-5 mx-auto"
                    : "border border-2 border-warning shadow rounded-5 mx-auto"
                }
              >
                <Container className="px-2">
                  <Row className="mt-3 mb-4">
                    <Col className="text-center">
                      <Link to="/faq">
                        <small>{t("translation:confirmRide.question")}</small>
                      </Link>
                    </Col>
                  </Row>

                  {submitted && submitFormConfirmRideError !== "" ? (
                    <Alert variant="danger" className="text-center mb-0">
                      {submitFormConfirmRideError}
                    </Alert>
                  ) : submitted &&
                    submitFormConfirmRideData.flag === "SUCCESS" ? (
                    <Row>
                      <Col xs={12} className="text-center">
                        <h3 className="text-center mb-3">
                          {t("translation:confirmRide.answer")}
                        </h3>
                      </Col>

                      {submittedNo ? (
                        <div className="mb-3">
                          <Col xs={12} className="text-center mb-3">
                            {t("translation:confirmRide.answerNo")}
                          </Col>
                          <Col xs={12} className="text-center">
                            <LinkContainer to="/contact">
                              <Button variant="success" size="lg">
                                {t("translation:confirmRide.tellUsWhy")}
                              </Button>
                            </LinkContainer>
                          </Col>
                        </div>
                      ) : (
                        <div className="mb-3">
                          <Col xs={12} className="text-center">
                            <LinkContainer
                              to={`/ratings/new-rating/${rideToConfirmData.RideId}`}
                            >
                              <Button
                                variant="outline-dark"
                                size="lg"
                                className="animate__animated animate__heartBeat animate__slower animate__infinite me-2"
                              >
                                {t("translation:confirmRide.rateRide")}
                                <StarFillIcon
                                  size={24}
                                  className="text-warning ms-2"
                                  verticalAlign="middle"
                                />
                              </Button>
                            </LinkContainer>
                          </Col>
                        </div>
                      )}
                    </Row>
                  ) : isloadingSubmitFormConfirmRide ? (
                    <Row>
                      <Col className="text-center">
                        <LoadingSpinner />
                      </Col>
                    </Row>
                  ) : submittedNo ? (
                    // &&
                    // (submitFormConfirmRideError !== "" ||
                    //   submitFormConfirmRideData.flag !== "SUCCESS")
                    <Row className="mb-4">
                      <Col className="text-center px-0 mx-auto">
                        <h3 className="text-center mb-3">
                          {t("translation:confirmRide.confirmNoRide")}
                        </h3>

                        <Form.Group className="mb-3">
                          <Form.Select
                            name="reason"
                            onChange={handleChangeReason}
                          >
                            <option value={0}>
                              {t("translation:global.reason")}
                            </option>
                            {arrayReasons}
                          </Form.Select>
                        </Form.Group>

                        {reason === `${nbReasonNotComplete + 1}` ? (
                          <Col xs={12}>
                            <Form.Group className="mb-3">
                              <Form.Control
                                type="text"
                                name="comment"
                                value={comment}
                                placeholder={t("translation:global.reason")}
                                onChange={handleChangeComment}
                                minLength={10}
                                required
                              />
                            </Form.Group>
                          </Col>
                        ) : null}

                        <Button
                          variant="warning"
                          type="button"
                          className="me-2"
                          onClick={() => setSubmittedNo(false)}
                        >
                          <span>
                            <ArrowLeftIcon size={24} className="me-2" />
                            {t("translation:global.goBack")}
                          </span>
                        </Button>

                        <Button
                          variant="dark"
                          type="submit"
                          onClick={() => handleSubmit(false)}
                        >
                          <span>
                            <XIcon size={24} className="me-2" />
                            {t("translation:confirmRide.confirm")}
                          </span>
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    <div className="mb-4">
                      <Row>
                        <Col className="mx-auto">
                          <h3 className="text-center mb-3">
                            {t("translation:confirmRide.confirmRideMessage")}
                          </h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="text-center mx-auto">
                          <Button
                            variant="danger"
                            type="submit"
                            className="me-2"
                            disabled={
                              submitted || isloadingSubmitFormConfirmRide
                            }
                            onClick={() => setSubmittedNo(true)}
                          >
                            <span>
                              <XIcon size={24} className="me-2" />
                              {t("translation:global.no")}
                            </span>
                          </Button>

                          <Button
                            variant="success"
                            type="submit"
                            disabled={
                              submitted || isloadingSubmitFormConfirmRide
                            }
                            onClick={() => {
                              setSubmittedNo(false);
                              handleSubmit(true);
                            }}
                          >
                            <span>
                              <CheckIcon size={24} className="me-2" />
                              {t("translation:global.yes")}
                            </span>
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Container>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col className="text-center">
                <p>
                  <Link to="/contact" className="text-secondary">
                    {t("translation:confirmRide.complaint")}
                  </Link>
                </p>
              </Col>
            </Row>

            <Row>
              <Col>
                <h4 className="text-success text-center mt-3">
                  {t("translation:booking.rideDetails")}
                </h4>
              </Col>
            </Row>

            <RideDetails ride={rideToConfirmData.Ride} />
          </div>
        ) : rideToConfirmError ? (
          <Redirect to="/rides/rides-to-complete" />
        ) : null}
      </Container>
    </div>
  );
};

export default ConfirmRide;
