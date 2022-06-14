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

      <Container>
        <Row className="mb-5">
          <Col>
            <h1 className="title text-center">
              {t("translation:driverProfile.title")}
            </h1>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={4}>
            <p className="fw-bold">Your car</p>
            <p>Maker: {currentUser.Driver.Car.maker}</p>
            <p>Number Plate: {currentUser.Driver.Car.numberPlate}</p>
          </Col>
          <Col xs={12} md={4}>
            <p className="fw-bold">Your ID</p>
            <p>ID type: {currentUser.Driver.idType}</p>
            <p>ID number: {currentUser.Driver.idNumber}</p>
            <p>ID country: {currentUser.Driver.idCountry}</p>
          </Col>
          <Col xs={12} md={4}>
            <p className="fw-bold">Your licence</p>
            <p>License number: {currentUser.Driver.licenseNumber}</p>
            <p>License country: {currentUser.Driver.licenseCountry}</p>
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
