import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";

import GoBack from "../../components/GoBack";
import { StarFillIcon } from "@primer/octicons-react";

function DriverProfile(props) {
  const { t } = useTranslation();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn || !currentUser.Driver) {
    return <Redirect to="/" />;
  }
  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="mb-5">
        <Row className="mb-5">
          <Col>
            <h1 className="title text-center">
              {t("translation:driverProfile.title")}
            </h1>
          </Col>
        </Row>

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="border shadow rounded-5 mx-auto"
          >
            <Container className="p-3">
              <Row>
                <Col>
                  <p className="fw-bold">
                    {t("translation:global.yourRating")}
                  </p>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={6}>
                  {currentUser.driverRating > 0 ? (
                    <div className="d-inline-flex align-items-center">
                      <StarFillIcon size={26} className="text-warning me-2" />
                      <h1 className="fw-bold mb-0">
                        {currentUser.driverRating}{" "}
                      </h1>
                    </div>
                  ) : (
                    <span>{t("translation:global.noRatings")}</span>
                  )}
                </Col>
                <Col xs={6} className="text-end">
                  <LinkContainer to="/profile/driver/ratings">
                    <Button variant="success" size={"lg"}>
                      {t("translation:global.view")}
                    </Button>
                  </LinkContainer>
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
            className="border shadow rounded-5 mx-auto"
          >
            <Container className="p-3">
              <Row>
                <Col>
                  <p className="fw-bold">
                    {t("translation:global.yourVehicle")}
                  </p>
                  <p>
                    {t("translation:global.maker")}:{" "}
                    {currentUser.Driver.Car.maker}
                  </p>
                  <p className="mb-0">
                    {t("translation:global.numberPlate")}:{" "}
                    {currentUser.Driver.Car.numberPlate}
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
            className="border shadow rounded-5 mx-auto"
          >
            <Container className="p-3">
              <Row>
                <Col>
                  <p className="fw-bold">
                    {t("translation:global.yourIdentity")}
                  </p>
                  <p>
                    {t("translation:global.idType")}:{" "}
                    {currentUser.Driver.idType}
                  </p>
                  <p>
                    {t("translation:global.number")}:{" "}
                    {currentUser.Driver.idNumber}
                  </p>
                  <p className="mb-0">
                    {t("translation:global.country")}:{" "}
                    {currentUser.Driver.idCountry}
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
            className="border shadow rounded-5 mx-auto"
          >
            <Container className="p-3">
              <Row>
                <Col>
                  <p className="fw-bold">
                    {t("translation:global.yourLicense")}
                  </p>
                  <p>
                    {t("translation:global.number")}:{" "}
                    {currentUser.Driver.licenseNumber}
                  </p>
                  <p className="mb-0">
                    {t("translation:global.country")}:{" "}
                    {currentUser.Driver.licenseCountry}
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DriverProfile;
