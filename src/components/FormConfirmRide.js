import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  XIcon,
  CheckIcon,
  StarFillIcon,
} from "@primer/octicons-react";

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
      {!isloadingSubmitFormConfirmRide &&
      submittedNo &&
      (submitFormConfirmRideError !== "" ||
        submitFormConfirmRideData.flag !== "SUCCESS") ? (
        <Row data-aos="fade-in">
          <Col className="text-center mx-auto">
            <p className="lead text-center mb-1">
              Please confirm that the ride didn't take place
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
                Go back
              </span>
            </Button>

            <Button variant="danger" type="submit" onClick={handleSubmitNo}>
              <span>
                <XIcon size={24} className="me-2" />I confirm
              </span>
            </Button>
          </Col>
        </Row>
      ) : submitFormConfirmRideError === "" &&
        submitFormConfirmRideData.flag !== "SUCCESS" ? (
        <div data-aos="fade-in">
          <Row>
            <Col className="mx-auto">
              <p className="lead text-center mb-1">Do you confirm the ride?</p>
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
                  No
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
                <StarFillIcon size={24} className="text-warning me-2" />
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
