import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@primer/octicons-react";

// Importing assets
import logo from "../assets/images/logo-full.png";

import { getRidesOnline } from "../redux";
import LoadingSpinner from "../components/LoadingSpinner";
import FormSearchRides from "../components/FormSearchRides";

function Home() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isloadingRidesOnline, ridesOnlineData, isFormSearchRideSubmitted } =
    useSelector((state) => state.ride);

  useEffect(() => {
    dispatch(getRidesOnline());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoggedIn || isFormSearchRideSubmitted) {
    return <Redirect to="/search-results" />;
  }

  return (
    <div className="container-homepage">
      <Container className="overlay pb-5">
        <Row className="justify-content-center align-content-center pt-5 mb-5">
          <Col xs={12} md={4} className="text-center">
            <img
              src={logo}
              width={300}
              alt="Tucána logo"
              className="img-fluid"
            />
            <p className="text-light mb-0">
              {t("translation:homepage.catchPhrase")}
            </p>
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="text-center mx-auto mb-3">
            <h1 className="text-success mb-0">
              {t("translation:find.catchPhrase")}
            </h1>
          </Col>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <FormSearchRides />
          </Col>
        </Row>

        {isloadingRidesOnline ? (
          <Row className="mt-3">
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : ridesOnlineData.count > 0 ? (
          <Row className="mt-3">
            <Col>
              <p className="text-center text-white fw-bold mb-0">
                {ridesOnlineData.count} {t("translation:global.ridesOnline")}
              </p>
            </Col>
          </Row>
        ) : null}

        <Row className="mt-3">
          <Col xs={12} className="text-center mx-auto">
            <p>
              <LinkContainer
                to="/signup"
                href="/signup"
                className="hvr-icon-forward my-2"
              >
                <Button
                  variant="success"
                  size="lg"
                  className="border border-2 border-light px-4 py-2"
                >
                  {t("translation:homepage.start")}
                  <ArrowRightIcon
                    size={24}
                    verticalAlign="middle"
                    className="hvr-icon mb-1 ms-2"
                  />
                </Button>
              </LinkContainer>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Home;
