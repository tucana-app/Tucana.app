import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useTranslation } from "react-i18next";

// Importing assets
import logo from "../assets/images/logo-full-black.png";

import { displayNavBar, getRidesOnline } from "../redux";
import LoadingSpinner from "../components/LoadingSpinner";
import FormSearchRides from "../components/FormSearchRides";
import SocialIcons from "../components/SocialIcons";
import ReactCountryFlag from "react-country-flag";
import { QuestionIcon } from "@primer/octicons-react";

function Home() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isloadingRidesOnline, ridesOnlineData, isFormSearchRideSubmitted } =
    useSelector((state) => state.ride);

  const [isShowLanguageMenuEN, setIsShowLanguageMenuEN] = useState(false);
  const [isShowLanguageMenuCR, setIsShowLanguageMenuCR] = useState(false);
  const [isShowLanguageMenuFR, setIsShowLanguageMenuFR] = useState(false);

  const handleClickLanguageEN = () => {
    setIsShowLanguageMenuEN(true);
  };

  const handleClickLanguageCR = () => {
    setIsShowLanguageMenuCR(true);
  };

  const handleClickLanguageFR = () => {
    setIsShowLanguageMenuFR(true);
  };

  const handleSelectEN = () => {
    i18n.changeLanguage("en");
    setIsShowLanguageMenuEN(false);
    setIsShowLanguageMenuCR(false);
    setIsShowLanguageMenuFR(false);
  };

  const handleSelectCR = () => {
    i18n.changeLanguage("es");
    setIsShowLanguageMenuEN(false);
    setIsShowLanguageMenuCR(false);
    setIsShowLanguageMenuFR(false);
  };

  const handleSelectFR = () => {
    i18n.changeLanguage("fr");
    setIsShowLanguageMenuEN(false);
    setIsShowLanguageMenuCR(false);
    setIsShowLanguageMenuFR(false);
  };

  useEffect(() => {
    dispatch(displayNavBar(false));
    dispatch(getRidesOnline());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoggedIn || isFormSearchRideSubmitted) {
    return <Redirect to="/search-results" />;
  }

  return (
    <>
      <Container>
        <Row className="mt-3 mb-0 pb-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <Container className="p-0 m-0">
              <Row className="justify-content-between align-items-center p-0 m-0">
                <Col xs={4} className="d-inline-flex ps-0">
                  {i18n.language === "es" || i18n.language === "es-CR" ? (
                    <div
                      onClick={
                        isShowLanguageMenuCR
                          ? () => setIsShowLanguageMenuCR(false)
                          : handleClickLanguageCR
                      }
                    >
                      <ReactCountryFlag countryCode="CR" className="h1" svg />
                    </div>
                  ) : i18n.language === "fr" || i18n.language === "fr-FR" ? (
                    <div
                      onClick={
                        isShowLanguageMenuFR
                          ? () => setIsShowLanguageMenuFR(false)
                          : handleClickLanguageFR
                      }
                    >
                      <ReactCountryFlag countryCode="FR" className="h1" svg />
                    </div>
                  ) : i18n.language === "en" || i18n.language === "en-US" ? (
                    <div
                      onClick={
                        isShowLanguageMenuEN
                          ? () => setIsShowLanguageMenuEN(false)
                          : handleClickLanguageEN
                      }
                    >
                      <ReactCountryFlag countryCode="US" className="h1" svg />
                    </div>
                  ) : (
                    <div>
                      <p className="mb-0">{t("translation:global.language")}</p>
                    </div>
                  )}
                  {isShowLanguageMenuCR ? (
                    <div data-aos="slide-right" className="d-inline-flex">
                      <ReactCountryFlag
                        countryCode="US"
                        className="h1 ms-3 me-2"
                        onClick={handleSelectEN}
                        svg
                      />
                      <ReactCountryFlag
                        countryCode="FR"
                        className="h1 mx-2"
                        onClick={handleSelectFR}
                        svg
                      />
                    </div>
                  ) : isShowLanguageMenuFR ? (
                    <div data-aos="slide-right" className="d-inline-flex">
                      <ReactCountryFlag
                        countryCode="US"
                        className="h1 ms-3 me-2"
                        onClick={handleSelectEN}
                        svg
                      />
                      <ReactCountryFlag
                        countryCode="CR"
                        className="h1 mx-2"
                        onClick={handleSelectCR}
                        svg
                      />
                    </div>
                  ) : isShowLanguageMenuEN ? (
                    <div data-aos="slide-right" className="d-inline-flex">
                      <ReactCountryFlag
                        countryCode="CR"
                        className="h1 ms-3 me-2"
                        onClick={handleSelectCR}
                        svg
                      />
                      <ReactCountryFlag
                        countryCode="FR"
                        className="h1 mx-2"
                        onClick={handleSelectFR}
                        svg
                      />
                    </div>
                  ) : null}
                </Col>
                <Col xs={4} className="text-end pe-0">
                  <Link to="/help" className="cursor-pointer text-success">
                    <QuestionIcon size={28} />
                  </Link>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className="justify-content-center align-content-center mb-5">
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mx-auto"
          >
            <img
              src={logo}
              width={300}
              alt="Tucána logo"
              className="img-fluid"
            />
            <p className="mb-0">{t("translation:homepage.catchPhrase")}</p>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <FormSearchRides />
          </Col>
        </Row>

        {isloadingRidesOnline ? (
          <Row className="mt-3 mb-4">
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : ridesOnlineData.count > 0 ? (
          <Row className="mt-3 mb-4">
            <Col>
              <p className="text-center fw-bold mb-0">
                {ridesOnlineData.count} {t("translation:global.ridesOnline")}
              </p>
            </Col>
          </Row>
        ) : null}

        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mx-auto"
          >
            <p className="lead mb-2">
              {t("translation:homepage.alreadyAccount")}{" "}
            </p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <LinkContainer to="/login">
              <Button
                variant="success"
                size="lg"
                className="text-white py-2 w-100"
              >
                <span> {t("translation:global.logIn")}</span>
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <LinkContainer to="/signup">
              <Button
                variant="outline-success"
                size="lg"
                className="py-2 w-100"
              >
                {t("translation:global.signUp")}
              </Button>
            </LinkContainer>
          </Col>
        </Row>

        <Row>
          <div className="text-center">
            <SocialIcons />
          </div>
        </Row>
      </Container>
    </>
  );
}
export default Home;
