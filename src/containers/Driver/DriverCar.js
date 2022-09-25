import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";

import GoBack from "../../components/GoBack";

function DriverCar(props) {
  const { t } = useTranslation();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn || !currentUser.Driver) {
    return <Redirect to="/" />;
  }
  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="mb-5">
        <Row>
          <Col>
            <h1 className="title text-center">
              {t("translation:global.yourVehicle")}
            </h1>
          </Col>
        </Row>

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="container-box">
            <Container className="p-3">
              <Row>
                <Col>
                  <p>
                    {t("translation:global.maker")}:{" "}
                    {currentUser.Driver.Car.maker}
                  </p>
                  <p>
                    {t("translation:global.model")}:{" "}
                    {currentUser.Driver.Car.model}
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
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="container-box">
            <Container className="p-3">
              <Row>
                <Col>
                  <p>
                    {t("translation:global.color")}:{" "}
                    {currentUser.Driver.Car.color}
                  </p>
                  <p>
                    {t("translation:global.year")}:{" "}
                    {currentUser.Driver.Car.year}
                  </p>
                  <p>
                    {t("translation:global.seat")}
                    {currentUser.Driver.Car.seats > 1 ? "s" : null}:{" "}
                    {currentUser.Driver.Car.seats}
                  </p>
                  <p className="mb-0">
                    {t("translation:global.fuelType")}:{" "}
                    {currentUser.Driver.Car.fuelType}
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="container-box">
            <Container className="p-3">
              <Row>
                <Col>
                  <p>
                    {t("translation:global.marchamo")}:{" "}
                    <span className="fw-bold">
                      {currentUser.Driver.Car.marchamo}
                    </span>
                  </p>
                  <p className="mb-0">
                    {t("translation:global.riteve")}:{" "}
                    <span className="fw-bold">
                      {currentUser.Driver.Car.riteve.month}/
                      {currentUser.Driver.Car.riteve.year}
                    </span>
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <p className="text-secondary">
              {t("translation:global.created")}:{" "}
              {dateFormat(currentUser.Driver.Car.createdAt, "dd/mm/yyyy")}
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DriverCar;
