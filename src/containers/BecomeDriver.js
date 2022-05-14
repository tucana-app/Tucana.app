import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { CheckIcon, XIcon } from "@primer/octicons-react";

import {
  updateDriverState,
  getSubmissionsBecomeDriver,
  submitFormBecomeDriver,
} from "../redux";
import LoadingSpinner from "../components/LoadingSpinner";
import GoBack from "../components/GoBack";

const BecomeDriver = () => {
  const dispatch = useDispatch();
  const {
    user: currentUser,
    isLoggedIn,
    isLoadingGetSubmissionsBecomeDriver,
    getSubmissionsBecomeDriverData,
    isLoadingSubmitFormBecomeDriver,
    submitFormBecomeDriverSuccess,
  } = useSelector((state) => state.user);

  const handleSubmit = () => {
    dispatch(submitFormBecomeDriver(currentUser.id));
  };

  const isFoundAccepted = () => {
    let found = 0;
    if (getSubmissionsBecomeDriverData !== undefined) {
      found = getSubmissionsBecomeDriverData.find((submission) => {
        return submission.admin_VerifDriverInfos.length > 0
          ? submission.admin_VerifDriverInfos[0].accepted === true
          : null;
      });
    }

    return found === undefined ? false : true;
  };

  const isFoundPending = () => {
    let found = 0;
    if (getSubmissionsBecomeDriverData !== undefined) {
      found = getSubmissionsBecomeDriverData.find(
        (submission) => submission.admin_VerifDriverInfos.length === 0
      );
    }

    return found === undefined ? false : true;
  };

  useEffect(() => {
    if (isLoggedIn) dispatch(getSubmissionsBecomeDriver(currentUser.id));
    // if (currentUser.Driver === null)
    dispatch(updateDriverState(currentUser.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="py-0 my-5" data-aos="fade-in">
        <Row className="mb-3">
          <Col className="text-center">
            <h1 className="title">Become a driver</h1>
            <p className="lead mb-0">You are growing the community</p>
            <p className="text-center">
              Visit{" "}
              <Link to="/how-it-works" className="text-success">
                this link
              </Link>{" "}
              for more info.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            {isLoadingGetSubmissionsBecomeDriver ? (
              <LoadingSpinner />
            ) : getSubmissionsBecomeDriverData !== undefined &&
              getSubmissionsBecomeDriverData.length > 0 ? (
              <>
                <p>Past submissions:</p>
                {getSubmissionsBecomeDriverData.map((submission, index) => (
                  <div key={index} className="mb-3">
                    Request #{index + 1}:{" "}
                    {submission.admin_VerifDriverInfos.length === 0 ? (
                      <span className="text-warning">under review</span>
                    ) : submission.admin_VerifDriverInfos[0] &&
                      submission.admin_VerifDriverInfos[0].accepted ? (
                      <span className="text-success">
                        <CheckIcon size={24} className="me-2" />
                        Accepted
                      </span>
                    ) : (
                      <span className="text-danger">
                        <XIcon size={24} className="me-2" />
                        Refused
                      </span>
                    )}
                  </div>
                ))}
              </>
            ) : null}

            {submitFormBecomeDriverSuccess ? (
              <Alert variant="success">
                Thank you for applying. A moderator will review your submission
              </Alert>
            ) : !isLoadingGetSubmissionsBecomeDriver ? (
              !isFoundAccepted() && !isFoundPending() ? (
                <Button
                  onClick={handleSubmit}
                  variant="success"
                  size="lg"
                  disabled={isLoadingSubmitFormBecomeDriver}
                >
                  {isLoadingSubmitFormBecomeDriver ? <LoadingSpinner /> : null}I
                  want to become a driver
                </Button>
              ) : null
            ) : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BecomeDriver;
