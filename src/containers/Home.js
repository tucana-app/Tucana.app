import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@primer/octicons-react";

// Importing assets
import logo from "../assets/images/logo.png";

function Home() {
  const { t } = useTranslation();
  const { isLoggedIn } = useSelector((state) => state.user);

  if (isLoggedIn) {
    return <Redirect to="/find" />;
  }

  return (
    <div className="container-homepage">
      <Container className="overlay">
        <Row>
          <Nav className="justify-content-end align-items-center py-3 px-0 px-md-5">
            <Nav.Item>
              <IndexLinkContainer
                to="/login"
                href="/login"
                className="link-light"
              >
                <Nav.Link className="text-center">
                  <h3 className="fw-light mb-0">
                    {t("translation:global.logIn")}
                  </h3>
                </Nav.Link>
              </IndexLinkContainer>
            </Nav.Item>
            <Nav.Item>
              <IndexLinkContainer
                to="/signup"
                href="/signup"
                className="link-light"
              >
                <Nav.Link className="text-center">
                  <h3 className="fw-light mb-0">
                    {t("translation:global.signUp")}
                  </h3>
                </Nav.Link>
              </IndexLinkContainer>
            </Nav.Item>
            <Nav.Item>
              <a
                href="https://fund.tucana.app"
                target="_blank"
                rel="noreferrer"
                className="link-light nav-link text-decoration-none"
              >
                <h3 className="fw-light mb-0">
                  {t("translation:global.about")}
                </h3>
              </a>
            </Nav.Item>
          </Nav>
        </Row>
        <Row className="justify-content-center align-content-center pt-5 pt-md-0 mt-5">
          <Col xs={12} sm={10} md={8} className="mx-auto">
            <Container>
              <Row className="mb-3">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  xl={6}
                  className="text-center mx-auto"
                >
                  <img
                    src={logo}
                    width={150}
                    alt="Tucána logo"
                    className="img-fluid"
                  />
                  <p className="lead text-light mb-0">
                    {t("translation:global.slogan")}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  xl={6}
                  className="text-center mx-auto"
                >
                  <h1 className="title">
                    {t("translation:homepage.catchPhrase")}
                  </h1>
                  <LinkContainer
                    to="/login"
                    href="/login"
                    className="hvr-icon-forward my-2"
                  >
                    <Button variant="success" size="lg">
                      {t("translation:homepage.start")}
                      <ArrowRightIcon
                        size={24}
                        verticalAlign="middle"
                        className="hvr-icon mb-1 ms-2"
                      />
                    </Button>
                  </LinkContainer>
                  {/* <p className="text-light mb-0">
                    {t("translation:homepage.paragraph")}
                  </p>
                  */}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Home;
