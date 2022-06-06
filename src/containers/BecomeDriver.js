import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { CheckIcon, XIcon } from "@primer/octicons-react";
import { useTranslation } from "react-i18next";

import {
  updateDriverState,
  getApplicationsBecomeDriver,
  submitFormBecomeDriver,
} from "../redux";
import LoadingSpinner from "../components/LoadingSpinner";
import GoBack from "../components/GoBack";

const BecomeDriver = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    user: currentUser,
    isLoggedIn,
    isLoadingGetApplicationsBecomeDriver,
    getApplicationsBecomeDriverData,
    isLoadingSubmitFormBecomeDriver,
    submitFormBecomeDriverSuccess,
  } = useSelector((state) => state.user);

  const handleSubmit = () => {
    dispatch(submitFormBecomeDriver(currentUser.id));
  };

  const isFoundAccepted = () => {
    let found = 0;
    if (getApplicationsBecomeDriverData !== undefined) {
      found = getApplicationsBecomeDriverData.find((submission) => {
        return submission.admin_VerifDriverInfos.length > 0
          ? submission.admin_VerifDriverInfos[0].accepted === true
          : null;
      });
    }

    return found === undefined ? false : true;
  };

  const isFoundPending = () => {
    let found = 0;
    if (getApplicationsBecomeDriverData !== undefined) {
      found = getApplicationsBecomeDriverData.find(
        (submission) => submission.admin_VerifDriverInfos.length === 0
      );
    }

    return found === undefined ? false : true;
  };

  useEffect(() => {
    if (isLoggedIn) dispatch(getApplicationsBecomeDriver(currentUser.id));
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

      <Container data-aos="fade-in">
        <Row className="mb-3">
          <Col className="text-center">
            <h1 className="title"> {t("translation:global.becomeDriver")}</h1>
            <p className="lead">{t("translation:becomeDriver.subTitle")}</p>
            <p className="text-center">
              {t("translation:becomeDriver.message1")}{" "}
              <Link to="/how-it-works" className="text-success">
                {t("translation:becomeDriver.message2")}
              </Link>{" "}
              {t("translation:becomeDriver.message3")}
            </p>
          </Col>
        </Row>

        <hr className="w-75 my-2 mx-auto" />

        <Row className="mt-5">
          <Col className="text-center">
            {isLoadingGetApplicationsBecomeDriver ? (
              <LoadingSpinner />
            ) : getApplicationsBecomeDriverData !== undefined &&
              getApplicationsBecomeDriverData.length > 0 ? (
              <>
                <p>{t("translation:becomeDriver.pastSubmissions")}:</p>
                {getApplicationsBecomeDriverData.map((submission, index) => (
                  <div key={index} className="mb-3">
                    {t("translation:becomeDriver.request")} #{index + 1}:{" "}
                    {submission.admin_VerifDriverInfos.length === 0 ? (
                      <span className="text-warning">
                        {t("translation:becomeDriver.underReview")}
                      </span>
                    ) : submission.admin_VerifDriverInfos[0] &&
                      submission.admin_VerifDriverInfos[0].accepted ? (
                      <span className="text-success">
                        <CheckIcon size={24} className="me-2" />
                        {t("translation:global.accepted")}
                      </span>
                    ) : (
                      <span className="text-danger">
                        <XIcon size={24} className="me-2" />
                        {t("translation:global.refused")}
                      </span>
                    )}
                  </div>
                ))}
              </>
            ) : null}

            {submitFormBecomeDriverSuccess ? (
              <Alert variant="success">
                {t("translation:becomeDriver.thankYou")}
              </Alert>
            ) : !isLoadingGetApplicationsBecomeDriver ? (
              !isFoundAccepted() && !isFoundPending() ? (
                <Button
                  onClick={handleSubmit}
                  variant="success"
                  size="lg"
                  disabled={isLoadingSubmitFormBecomeDriver}
                >
                  {isLoadingSubmitFormBecomeDriver ? <LoadingSpinner /> : null}{" "}
                  {t("translation:becomeDriver.button")}
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
