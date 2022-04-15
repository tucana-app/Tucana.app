import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  faArrowLeft,
  faCheck,
  faStar,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LoadingSpinner from "./LoadingSpinner";

import { submitFormConfirmRide } from "../redux";

const FormConfirmRide = ({ ride }) => {
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
      {isloadingSubmitFormConfirmRide ? (
        <div className="text-center">
          <LoadingSpinner />
        </div>
      ) : submittedNo &&
        (submitFormConfirmRideError !== "" ||
          submitFormConfirmRideData.flag !== "SUCCESS") ? (
        <Row>
          <Col className="text-center mx-auto">
            <p className="lead text-center mb-1">
              You said that the ride didn't happend. Do you confirm that?
            </p>

            <Button
              variant="warning"
              className="rounded-0"
              type="submit"
              onClick={() => {
                setSubmitted(false);
                setSubmittedNo(false);
              }}
            >
              <span>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Go back
              </span>
            </Button>

            <Button
              variant="danger"
              className="rounded-0"
              type="submit"
              onClick={handleSubmitNo}
            >
              <span>
                <FontAwesomeIcon icon={faTimes} className="me-2" />
                The ride didn't take place
              </span>
            </Button>
          </Col>
        </Row>
      ) : submitFormConfirmRideError === "" &&
        submitFormConfirmRideData.flag !== "SUCCESS" ? (
        <div className="border border-2 border-warning py-2">
          <Row>
            <Col xs={8} sm={6} md={5} lg={4} className="mx-auto">
              <p className="lead text-center mb-1">Do you confirm the ride?</p>
            </Col>
          </Row>
          <Row>
            <Col xs={8} sm={6} md={5} lg={4} className="text-center mx-auto">
              <Button
                variant="danger"
                size="lg"
                className="rounded-0"
                type="submit"
                disabled={submitted || isloadingSubmitFormConfirmRide}
                onClick={() => setSubmittedNo(true)}
              >
                <span>
                  <FontAwesomeIcon icon={faTimes} className="me-2" />
                  No
                </span>
              </Button>

              <Button
                variant="success"
                size="lg"
                className="rounded-0"
                type="submit"
                disabled={submitted || isloadingSubmitFormConfirmRide}
                onClick={handleSubmitYes}
              >
                <span>
                  <FontAwesomeIcon icon={faCheck} className="me-2" />
                  Yes
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
        <>
          <Alert variant="success" className="text-center">
            <p className="mb-0">{submitFormConfirmRideData.message}</p>
            <p className="mb-0">
              You can now rate the other person:{" "}
              <Link to="/ratings" className="link-primary">
                <FontAwesomeIcon icon={faStar} className="text-warning me-2" />
                Ratings
              </Link>{" "}
            </p>
          </Alert>
        </>
      )}
    </>
  );
};

export default FormConfirmRide;
