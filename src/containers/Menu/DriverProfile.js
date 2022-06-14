import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
// import { ChevronRightIcon } from "@primer/octicons-react";

import GoBack from "../../components/GoBack";

function DriverProfile(props) {
  const { t } = useTranslation();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn) {
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
            <Container className="p-2">
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
            <Container className="p-2">
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
            <Container className="p-2">
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

        {/* RATINGS */}
        {/* <Row className="justify-content-center align-items-center text-center text-sm-start mb-1">
              <Col xs={12} sm={4} className="text-md-end">
                <h4 className="text-secondary">Rating</h4>
              </Col>
              <Col xs={12} sm={4}>
                <h4>
                  <span className="text-secondary">-</span> / 5
                </h4>
              </Col>
            </Row>

            <Row className="text-center mb-5">
              <Col>
                <LinkContainer to="/profile/driver/ratings">
                  <Button variant="warning" size={"lg"}>
                    Ratings{" "}
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </Button>
                </LinkContainer>
              </Col>
            </Row> */}
      </Container>
    </div>
  );
}

export default DriverProfile;
