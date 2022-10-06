import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ArrowLeftIcon,
  XIcon,
  CheckIcon,
  StarFillIcon,
} from "@primer/octicons-react";

import { submitFormConfirmRide } from "../redux";
import { LinkContainer } from "react-router-bootstrap";

const FormConfirmRide = ({ ride }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const {
    isloadingSubmitFormConfirmRide,
    submitFormConfirmRideData,
    submitFormConfirmRideError,
  } = useSelector((state) => state.ride);

  const [submitted, setSubmitted] = useState(false);
  const [submittedNo, setSubmittedNo] = useState(false);

  const handleSubmitNo = () => {
    dispatch(submitFormConfirmRide(currentUser, ride, false));
  };

  const handleSubmitYes = () => {
    setSubmitted(true);
    dispatch(submitFormConfirmRide(currentUser, ride, true));
  };

  return (
    <>
      {!isloadingSubmitFormConfirmRide &&
      submittedNo &&
      (submitFormConfirmRideError !== "" ||
        submitFormConfirmRideData.flag !== "SUCCESS") ? (
        <Row data-aos="fade-in">
          <Col className="text-center mx-auto">
            <p className="lead text-center mb-1">
              {t("translation:FormConfirmRide.confirmNoRide")}
            </p>

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

            <Button variant="danger" type="submit" onClick={handleSubmitNo}>
              <span>
                <XIcon size={24} className="me-2" />
                {t("translation:FormConfirmRide.confirm")}
              </span>
            </Button>
          </Col>
        </Row>
      ) : submitFormConfirmRideError === "" &&
        submitFormConfirmRideData.flag !== "SUCCESS" ? (
        <div data-aos="fade-in">
          <Row>
            <Col className="mx-auto">
              <p className="lead text-center mb-1">
                {t("translation:FormConfirmRide.confirmRide")}
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mx-auto">
              <Button
                variant="danger"
                type="submit"
                className="me-2"
                disabled={submitted || isloadingSubmitFormConfirmRide}
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
                disabled={submitted || isloadingSubmitFormConfirmRide}
                onClick={handleSubmitYes}
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
        <Alert variant="danger" className="text-center">
          {submitFormConfirmRideError}
        </Alert>
      ) : (
        <Row data-aos="fade-in">
          <Col xs={12} className="text-center">
            <p>{t("translation:ride.answer")}</p>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-end mb-3 mb-md-0">
            <LinkContainer to="/ratings">
              <Button variant="success" className="hvr-icon-grow me-2">
                {t("translation:ride.rateRide")}
                <StarFillIcon
                  size={24}
                  className="hvr-icon text-warning ms-2"
                />
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      )}
    </>
  );
};

export default FormConfirmRide;
