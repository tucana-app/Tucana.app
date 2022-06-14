import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  XIcon,
} from "@primer/octicons-react";
import { useTranslation } from "react-i18next";
import { updateDriverState, getApplicationsBecomeDriver } from "../redux";

import LoadingSpinner from "../components/LoadingSpinner";

const BecomeDriver = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    user: currentUser,
    isLoggedIn,
    isLoadingGetApplicationsBecomeDriver,
    getApplicationsBecomeDriverData,
  } = useSelector((state) => state.user);

  const isFoundAccepted = () => {
    let found = 0;
    if (getApplicationsBecomeDriverData !== undefined) {
      found = getApplicationsBecomeDriverData.find((application) => {
        return application.admin_VerifDriverApplications.length > 0
          ? application.admin_VerifDriverApplications[0].isAccepted === true
          : null;
      });
    }

    return found === undefined ? false : true;
  };

  const isFoundPending = () => {
    let found = 0;
    if (getApplicationsBecomeDriverData !== undefined) {
      found = getApplicationsBecomeDriverData.find(
        (application) => application.admin_VerifDriverApplications.length === 0
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
      <Row className="mb-2 mx-1 mx-sm-0">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
          <Container className="mt-3 py-3 px-2">
            <Row>
              <Col xs={1}>
                <Link to="/menu" className="cursor-pointer">
                  <ArrowLeftIcon size={28} className="text-success" />
                </Link>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      <Container className="mb-5" data-aos="fade-in">
        <Row className="mb-3">
          <Col className="text-center">
            <h1 className="title"> {t("translation:global.becomeDriver")}</h1>
          </Col>
        </Row>

        {!isLoadingGetApplicationsBecomeDriver ? (
          !isFoundAccepted() && !isFoundPending() ? (
            <Row className="mt-3">
              <Col className="text-center">
                <p>{t("translation:becomeDriver.notDriver")}</p>
                <Link to="/apply-driver" className="hvr-icon-forward">
                  <Button type="submit" variant="success" size="lg">
                    {t("translation:becomeDriver.apply")}
                    <ArrowRightIcon size={24} className="hvr-icon" />
                  </Button>
                </Link>
              </Col>
            </Row>
          ) : null
        ) : null}

        <Row className="mt-3">
          <Col className="text-center">
            {isLoadingGetApplicationsBecomeDriver ? (
              <div className="text-center">
                <LoadingSpinner />
              </div>
            ) : getApplicationsBecomeDriverData !== undefined &&
              getApplicationsBecomeDriverData.length > 0 ? (
              <>
                <hr className="w-75 mt-2 mb-4 mx-auto" />
                <p>{t("translation:becomeDriver.pastApplications")}:</p>
                {getApplicationsBecomeDriverData.map((application, index) => (
                  <div key={index} className="mb-3">
                    {t("translation:becomeDriver.request")} #{index + 1}:{" "}
                    {application.admin_VerifDriverApplications.length === 0 ? (
                      <span className="text-warning">
                        {t("translation:becomeDriver.underReview")}
                      </span>
                    ) : application.admin_VerifDriverApplications[0] &&
                      application.admin_VerifDriverApplications[0]
                        .isAccepted ? (
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
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BecomeDriver;
