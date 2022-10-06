import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ArrowLeftIcon,
  XIcon,
  CheckIcon,
  StarFillIcon,
} from "@primer/octicons-react";
import { LinkContainer } from "react-router-bootstrap";

import LoadingSpinner from "../components/LoadingSpinner";
import GoBack from "../components/GoBack";

import { getRide, getRidesToConfirm, submitFormConfirmRide } from "../redux";

import RideDetails from "../components/RideDetails";

const ConfirmRide = () => {
  const { t } = useTranslation();
  const { rideId } = useParams();

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isLoadingRide,
    rideData,
    isLoadingRidesToConfirm,
    ridesToConfirmData,
    ridesToConfirmError,
    isloadingSubmitFormConfirmRide,
    submitFormConfirmRideData,
    submitFormConfirmRideError,
  } = useSelector((state) => state.ride);

  const [submitted, setSubmitted] = useState(false);
  const [submittedNo, setSubmittedNo] = useState(false);

  const handleSubmitNo = (ride) => {
    dispatch(submitFormConfirmRide(currentUser, ride, false));
  };

  const handleSubmitYes = (ride) => {
    setSubmitted(true);
    dispatch(submitFormConfirmRide(currentUser, ride, true));
  };

  const rideToConfirm = () => {
    return ridesToConfirmData.find((ride) => ride.id === parseInt(rideId));
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getRide(rideId));
      dispatch(getRidesToConfirm(currentUser.id));
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
        {isLoadingRide || isLoadingRidesToConfirm ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : rideToConfirm() ? (
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
                className="border border-2 border-warning shadow rounded-5 mx-auto"
              >
                <Container className="py-5 px-2">
                  {!isloadingSubmitFormConfirmRide &&
                  submittedNo &&
                  (submitFormConfirmRideError !== "" ||
                    submitFormConfirmRideData.flag !== "SUCCESS") ? (
                    <Row data-aos="fade-in">
                      <Col className="text-center px-0 mx-auto">
                        <h3 className="text-center mb-3">
                          {t("translation:confirmRide.confirmNoRide")}
                        </h3>

                        <Button
                          variant="warning"
                          type="submit"
                          className="me-2"
                          onClick={() => {
                            setSubmitted(false);
                            setSubmittedNo(false);
                          }}
                        >
                          <span>
                            <ArrowLeftIcon size={24} className="me-2" />
                            {t("translation:global.goBack")}
                          </span>
                        </Button>

                        <Button
                          variant="danger"
                          type="submit"
                          onClick={() => handleSubmitNo(rideToConfirm())}
                        >
                          <span>
                            <XIcon size={24} className="me-2" />
                            {t("translation:confirmRide.confirm")}
                          </span>
                        </Button>
                      </Col>
                    </Row>
                  ) : submitFormConfirmRideError === "" &&
                    submitFormConfirmRideData.flag !== "SUCCESS" ? (
                    <div data-aos="fade-in">
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
                            onClick={() => handleSubmitYes(rideToConfirm())}
                          >
                            <span>
                              <CheckIcon size={24} className="me-2" />
                              {t("translation:global.yes")}
                            </span>
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : submitFormConfirmRideError !== "" ? (
                    <Alert variant="danger" className="text-center mb-0">
                      {submitFormConfirmRideError}
                    </Alert>
                  ) : (
                    <Row data-aos="fade-in">
                      <Col xs={12} className="text-center">
                        <h3 className="text-center mb-3">
                          {t("translation:confirmRide.answer")} 🎉
                        </h3>
                      </Col>

                      {submittedNo ? (
                        <>
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
                        </>
                      ) : (
                        <>
                          <Col xs={12} className="text-center mb-3">
                            <LinkContainer
                              to={`/ratings/new-rating/${rideData.ride.id}`}
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
                        </>
                      )}
                    </Row>
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

            {rideData.ride ? <RideDetails ride={rideData.ride} /> : null}
          </div>
        ) : ridesToConfirmError ? (
          <Redirect to="/" />
        ) : (
          <Redirect to="/rides/rides-to-confirm" />
        )}
      </Container>
    </div>
  );
};

export default ConfirmRide;
