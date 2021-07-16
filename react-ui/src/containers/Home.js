import React from "react";
import { IndexLinkContainer } from "react-router-bootstrap";
import { withTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";

// Importing components
// import FormSearch from "../components/FormSearch";
import { Button } from "react-bootstrap";

function Home({ t }) {
  return (
    <>
      <Container fluid>
        <Row className="h-100 my-5">
          <Col
            lg={6}
            className="h-100 displayLargeScreens text-center my-auto mx-auto"
          >
            <img
              src="./assets/images/logo.jpg"
              alt="Company logo"
              className="mb-5"
            />
            <div>
              <IndexLinkContainer to="/login" href="/login" className="me-3">
                <Button
                  className="font-title text-white rounded-0"
                  size="lg"
                  variant="outline-success"
                >
                  {t("translation:homePage.logIn")}
                </Button>
              </IndexLinkContainer>
              <IndexLinkContainer to="/signup" href="/signup">
                <Button
                  className="font-title text-white rounded-0"
                  size="lg"
                  variant="success"
                >
                  {t("translation:homePage.signUp")}
                </Button>
              </IndexLinkContainer>
            </div>
          </Col>
          <Col
            lg={6}
            xs={{ order: 1 }}
            className="col-12 displayMobileScreens displayMediumScreens text-center pb-5 my-auto"
          >
            <h1 className="h1 mt-0 pt-0">Ride.CR</h1>
            <p className="lead">Share your rides in Costa Rica</p>
            <IndexLinkContainer to="/login" href="/login" className="me-3">
              <Button
                className="font-title text-white rounded-0"
                size="lg"
                variant="outline-success"
              >
                {t("translation:homePage.logIn")}
              </Button>
            </IndexLinkContainer>
            <IndexLinkContainer to="/signup" href="/signup">
              <Button
                className="font-title text-white rounded-0"
                size="lg"
                variant="success"
              >
                {t("translation:homePage.signUp")}
              </Button>
            </IndexLinkContainer>
          </Col>
          <Col lg={6} xs={{ order: 2 }} className="col-12 text-center">
            <div className="h-100 d-flex justify-content-center align-items-start align-items-md-center">
              {/* <FormSearch /> */}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default withTranslation()(Home);
