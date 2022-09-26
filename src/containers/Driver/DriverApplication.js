import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";

import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";
import MessageEmpty from "../../components/MessageEmpty";

import { getApplicationBecomeDriver } from "../../redux";
import { CheckCircleFillIcon, XCircleFillIcon } from "@primer/octicons-react";

const DriverApplication = () => {
  const { t } = useTranslation();
  const { applicationId } = useParams();

  const dispatch = useDispatch();
  const {
    user: currentUser,
    isLoggedIn,
    isLoadingApplicationBecomeDriver,
    applicationBecomeDriverData,
    applicationBecomeDriverError,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getApplicationBecomeDriver(currentUser.id, applicationId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="mb-5">
        <Row className="mb-3">
          <Col>
            <h1 className="title text-center">
              {t("translation:applicationDriver.title")}
            </h1>
          </Col>
        </Row>

        {isLoadingApplicationBecomeDriver ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : applicationBecomeDriverData.id ? (
          <>
            <Row className="mb-3 mx-1 mx-sm-0">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="container-box"
              >
                <Container className="py-3">
                  <Row>
                    <Col>
                      <p>
                        <span className="text-secondary">
                          {t("translation:global.idType")}
                        </span>
                        : {applicationBecomeDriverData.idType}
                      </p>
                      <p>
                        <span className="text-secondary">
                          {t("translation:global.number")}
                        </span>
                        : {applicationBecomeDriverData.idNumber}
                      </p>
                      <p className="mb-0">
                        <span className="text-secondary">
                          {t("translation:global.country")}
                        </span>
                        : {applicationBecomeDriverData.idCountry}
                      </p>
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
                className="container-box"
              >
                <Container className="py-3">
                  <Row>
                    <Col>
                      <p>
                        <span className="text-secondary">
                          {t("translation:becomeDriver.licenseNumber")}
                        </span>
                        : {applicationBecomeDriverData.licenseNumber}
                      </p>
                      <p className="mb-0">
                        <span className="text-secondary">
                          {t("translation:global.country")}
                        </span>
                        : {applicationBecomeDriverData.licenseCountry}
                      </p>
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
                className="container-box"
              >
                <Container className="py-3">
                  <Row>
                    <Col>
                      <p>
                        <span className="text-secondary">
                          {t("translation:global.car")}{" "}
                          <span className="text-lowercase">
                            {t("translation:global.maker")}
                          </span>
                        </span>
                        : {applicationBecomeDriverData.carMaker}
                      </p>
                      <p>
                        <span className="text-secondary">
                          {t("translation:global.car")}
                        </span>
                        : {applicationBecomeDriverData.carModel}
                      </p>
                      <p>
                        <span className="text-secondary">
                          {t("translation:global.numberPlate")}
                        </span>
                        : {applicationBecomeDriverData.numberPlate}
                      </p>
                      <p>
                        <span className="text-secondary">
                          {t("translation:global.color")}
                        </span>
                        : {applicationBecomeDriverData.carColor}
                      </p>
                      <p className="mb-0">
                        <span className="text-secondary">
                          {t("translation:global.year")}
                        </span>
                        : {applicationBecomeDriverData.carYear}
                      </p>
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
                className="container-box"
              >
                <Container className="py-3">
                  <Row>
                    <Col>
                      <p>
                        <span className="text-secondary">
                          {t("translation:global.marchamo")}
                        </span>
                        : {applicationBecomeDriverData.carMarchamo}
                      </p>
                      <p className="mb-0">
                        <span className="text-secondary">
                          {t("translation:global.riteve")}
                        </span>
                        :{" "}
                        <>
                          {applicationBecomeDriverData.carRiteve.month}/
                          {applicationBecomeDriverData.carRiteve.year}
                        </>
                      </p>
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
                className="container-box"
              >
                <Container className="py-3">
                  <Row>
                    <Col>
                      <p>
                        <span className="text-secondary">
                          {t("translation:global.date")}
                        </span>
                        :{" "}
                        {dateFormat(
                          applicationBecomeDriverData.createdAt,
                          "dd/mm/yyyy"
                        )}
                      </p>
                      <p className="mb-0">
                        <span className="text-secondary">
                          {t("translation:global.time")}
                        </span>
                        :{" "}
                        {dateFormat(
                          applicationBecomeDriverData.createdAt,
                          "HH:MM TT"
                        )}
                      </p>
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
                className="container-box"
              >
                <Container className="py-3">
                  <Row>
                    <Col>
                      <p>
                        <span className="text-secondary">
                          {t("translation:global.status")}
                        </span>
                        :{" "}
                        {applicationBecomeDriverData
                          .admin_VerifDriverApplications[0].isAccepted ? (
                          <span className="text-success">
                            <CheckCircleFillIcon size={24} className="me-2" />
                            {t("translation:global.accepted")}
                          </span>
                        ) : (
                          <span className="text-danger">
                            <XCircleFillIcon size={24} className="me-2" />
                            {t("translation:global.refused")}
                          </span>
                        )}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="mb-0">
                        <span className="text-secondary">
                          {t("translation:global.comment")}
                        </span>
                        :{" "}
                        {
                          applicationBecomeDriverData
                            .admin_VerifDriverApplications[0].comment
                        }
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </>
        ) : applicationBecomeDriverError ? (
          <Row>
            <Col className="text-center">
              <MessageEmpty title={t("translation:global.application")} />
            </Col>
          </Row>
        ) : null}
      </Container>
    </div>
  );
};

export default DriverApplication;
