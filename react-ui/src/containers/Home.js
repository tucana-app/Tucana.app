import React from "react";
import { useSelector } from "react-redux";
import { IndexLinkContainer } from "react-router-bootstrap";
import { withTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";

// Importing components
// import FormSearch from "../components/FormSearch";
import { Button } from "react-bootstrap";

function Home({ t }) {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <>
      <Container fluid>
        <Row className="my-5">
          <Col
            lg={6}
            className="displayLargeScreens text-center my-auto mx-auto"
          >
            <img
              src="./assets/images/logo.jpg"
              alt="Company logo"
              className="mb-5"
            />
            {!isLoggedIn ? (
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
            ) : null}
          </Col>
          <Col
            lg={6}
            xs={{ order: 1 }}
            className="col-12 displayMobileScreens displayMediumScreens text-center pb-5 my-auto"
          >
            <h1 className="h1 mt-0 pt-0">Ride.CR</h1>
            <p className="lead">Share your rides in Costa Rica</p>
            {!isLoggedIn ? (
              <>
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
              </>
            ) : null}
          </Col>
          <Col lg={6} xs={{ order: 2 }} className="text-center">
            <h1 className="font-title text-success">Welcome to Ride.CR</h1>
            <p className="lead text-white">
              Here you can offer or book rides to travel accross Costa Rica{" "}
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default withTranslation()(Home);
