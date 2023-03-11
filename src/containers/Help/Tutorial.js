import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { Trans, useTranslation } from "react-i18next";
import { DotFillIcon, DotIcon, QuestionIcon } from "@primer/octicons-react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactCountryFlag from "react-country-flag";

import { displayNavBar } from "../../redux";

// Importing images
import logo from "../../assets/images/logo-full-black.png";
import authentication from "../../assets/images/undraw_authentication.svg";
import drivers from "../../assets/images/undraw_by_my_car.svg";
import passengers from "../../assets/images/undraw_selection.svg";
import trip from "../../assets/images/undraw_adventure_map.svg";

const Tutorial = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const localData = JSON.parse(localStorage.getItem("localData"));
  const [tutorialDone, setTutorialDone] = useState(false);

  const [step, setStep] = useState(0);

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

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleDone = () => {
    setTutorialDone(true);
    localStorage.setItem(
      "localData",
      JSON.stringify({ ...localData, isShowTutorial: false })
    );
  };

  useEffect(() => {
    dispatch(displayNavBar(false));

    if (tutorialDone) {
      <Redirect to="/" />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorialDone]);

  if (localData && !localData.isShowTutorial) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={6}
          xl={4}
          className="fixed-top justify-content-center mt-3 mx-auto"
        >
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
                    <ReactCountryFlag
                      countryCode="CR"
                      className="cursor-pointer h1"
                      svg
                    />
                  </div>
                ) : i18n.language === "fr" || i18n.language === "fr-FR" ? (
                  <div
                    onClick={
                      isShowLanguageMenuFR
                        ? () => setIsShowLanguageMenuFR(false)
                        : handleClickLanguageFR
                    }
                  >
                    <ReactCountryFlag
                      countryCode="FR"
                      className="cursor-pointer h1"
                      svg
                    />
                  </div>
                ) : i18n.language === "en" || i18n.language === "en-US" ? (
                  <div
                    onClick={
                      isShowLanguageMenuEN
                        ? () => setIsShowLanguageMenuEN(false)
                        : handleClickLanguageEN
                    }
                  >
                    <ReactCountryFlag
                      countryCode="US"
                      className="cursor-pointer h1"
                      svg
                    />
                  </div>
                ) : (
                  <div
                    onClick={
                      isShowLanguageMenuEN
                        ? () => setIsShowLanguageMenuEN(false)
                        : handleClickLanguageEN
                    }
                  >
                    {t("translation:global.language")}
                  </div>
                )}
                {isShowLanguageMenuCR ? (
                  <div data-aos="slide-right" className="d-inline-flex">
                    <ReactCountryFlag
                      countryCode="US"
                      className="h1 cursor-pointer ms-3 me-2"
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
                      className="h1 cursor-pointer ms-3 me-2"
                      onClick={handleSelectEN}
                      svg
                    />
                    <ReactCountryFlag
                      countryCode="CR"
                      className="h1 cursor-pointer mx-2"
                      onClick={handleSelectCR}
                      svg
                    />
                  </div>
                ) : isShowLanguageMenuEN ? (
                  <div data-aos="slide-right" className="d-inline-flex">
                    <ReactCountryFlag
                      countryCode="CR"
                      className="h1 cursor-pointer ms-3 me-2"
                      onClick={handleSelectCR}
                      svg
                    />
                    <ReactCountryFlag
                      countryCode="FR"
                      className="h1 cursor-pointer mx-2"
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

      <Row>
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={6}
          xl={4}
          className="fixed-bottom justify-content-center mb-5 mx-auto"
        >
          <Container className="p-0 m-0">
            <Row className="align-items-center p-0 m-0">
              <Col xs={3} className="text-start ps-0">
                {step > 0 && step < 4 ? (
                  <div className="d-flex justify-content-between">
                    <Button
                      onClick={handlePreviousStep}
                      variant="outline-warning"
                      className="text-start"
                    >
                      <ArrowLeft size="24" />
                    </Button>
                  </div>
                ) : step === 4 ? (
                  <div className="d-flex justify-content-between">
                    <Button
                      onClick={handlePreviousStep}
                      variant="outline-warning"
                      className="text-start"
                    >
                      <ArrowLeft size="24" />
                    </Button>
                  </div>
                ) : null}
              </Col>

              <Col xs={6}>
                {step > 0 ? (
                  <p className="text-center mb-0">
                    {step === 1 ? (
                      <span
                        onClick={() => setStep(1)}
                        className="cursor-pointer"
                      >
                        <DotFillIcon size={30} className="text-success" />
                      </span>
                    ) : (
                      <span
                        onClick={() => setStep(1)}
                        className="cursor-pointer"
                      >
                        <DotIcon size={30} className="text-success" />
                      </span>
                    )}
                    {step === 2 ? (
                      <span
                        onClick={() => setStep(2)}
                        className="cursor-pointer"
                      >
                        <DotFillIcon size={30} className="text-success" />
                      </span>
                    ) : (
                      <span
                        onClick={() => setStep(2)}
                        className="cursor-pointer"
                      >
                        <DotIcon size={30} className="text-success" />
                      </span>
                    )}
                    {step === 3 ? (
                      <span
                        onClick={() => setStep(3)}
                        className="cursor-pointer"
                      >
                        <DotFillIcon size={30} className="text-success" />
                      </span>
                    ) : (
                      <span
                        onClick={() => setStep(3)}
                        className="cursor-pointer"
                      >
                        <DotIcon size={30} className="text-success" />
                      </span>
                    )}
                    {step === 4 ? (
                      <span
                        onClick={() => setStep(4)}
                        className="cursor-pointer"
                      >
                        <DotFillIcon size={30} className="text-success" />
                      </span>
                    ) : (
                      <span
                        onClick={() => setStep(4)}
                        className="cursor-pointer"
                      >
                        <DotIcon size={30} className="text-success" />
                      </span>
                    )}
                  </p>
                ) : null}
              </Col>

              <Col xs={3} className="text-end pe-0">
                {step > 0 && step < 4 ? (
                  <Button
                    onClick={handleNextStep}
                    variant="success"
                    className="text-end"
                  >
                    <ArrowRight size="24" />
                  </Button>
                ) : step === 4 ? (
                  <Button
                    onClick={handleDone}
                    variant="success"
                    className="text-end"
                  >
                    <ArrowRight size="24" />
                  </Button>
                ) : null}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="px-0 mx-auto">
          {step === 0 ? (
            <div data-aos="slide-right">
              <Container className="m-0 p-0">
                <Row className="mb-2">
                  <Col className="text-center">
                    <img
                      src={logo}
                      alt="Tucána"
                      width="300"
                      className="img-fluid"
                    />
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col className="text-center">
                    <p className="small mb-0">
                      {t("translation:global.catchPhrase")}
                    </p>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col className="text-center">
                    <h1 className="display-4">
                      {t("translation:tutorial.welcome")}
                    </h1>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    {t("translation:tutorial.welcome2")}
                  </Col>
                </Row>

                <Row className="my-5">
                  <Col>
                    <p className="mb-0 text-center">
                      <Button
                        onClick={handleNextStep}
                        variant="success"
                        size="lg"
                        className="py-3 px-4"
                      >
                        <h1 className="mb-0">
                          {t("translation:global.start")}
                          <ArrowRight size="24" className="ms-2 mb-1" />
                        </h1>
                      </Button>
                    </p>
                  </Col>
                </Row>
              </Container>
            </div>
          ) : step === 1 ? (
            <div data-aos="slide-right">
              <Container>
                <Row className="mb-4">
                  <Col className="text-center">
                    <img
                      src={authentication}
                      alt="Sign Up"
                      width="100"
                      className="img-fluid"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <h1 className="title mb-0 pb-0">
                      {t("translation:tutorial.1-createAccount.title")}
                    </h1>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <ListGroup.Item className="border-0 px-0">
                    <p className="fw-bold mb-0">
                      <ArrowRight
                        size="24"
                        className="text-success align-text-top me-2"
                      />
                      {t("translation:tutorial.1-createAccount.title1")}
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0 px-0">
                    <p className="fw-bold mb-0">
                      <ArrowRight
                        size="24"
                        className="text-success align-text-top me-2"
                      />
                      {t("translation:tutorial.1-createAccount.title2")}
                    </p>
                    <small>
                      <Trans
                        i18nKey={
                          "translation:tutorial.1-createAccount.paragraph2"
                        }
                      >
                        With your email address: check your emails (inbox{" "}
                        <strong>and spam</strong>)
                      </Trans>
                    </small>
                  </ListGroup.Item>
                </Row>
              </Container>
            </div>
          ) : step === 2 ? (
            <div data-aos="slide-left">
              <Container>
                <Row className="mb-4">
                  <Col className="text-center">
                    <img
                      src={passengers}
                      alt="Passengers"
                      width="170"
                      className="img-fluid"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <h1 className="title mb-0 pb-0">
                      {t("translation:tutorial.2-forPassengers.title")}
                    </h1>
                  </Col>
                </Row>
                <Row className="mt-3 px-0">
                  <ListGroup>
                    <ListGroup.Item className="border-0 px-0">
                      <p className="fw-bold mb-0">
                        <ArrowRight
                          size="24"
                          className="text-success align-text-top me-2"
                        />
                        {t("translation:tutorial.2-forPassengers.title1")}
                      </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <p className="fw-bold mb-0">
                        <ArrowRight
                          size="24"
                          className="text-success align-text-top me-2"
                        />
                        {t("translation:tutorial.2-forPassengers.title2")}
                      </p>
                      <small>
                        {t("translation:tutorial.2-forPassengers.paragraph2")}
                      </small>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <p className="fw-bold mb-0">
                        <ArrowRight
                          size="24"
                          className="text-success align-text-top me-2"
                        />
                        {t("translation:tutorial.2-forPassengers.title3")}
                      </p>
                      <small>
                        {t("translation:tutorial.2-forPassengers.paragraph3")}
                      </small>
                    </ListGroup.Item>
                  </ListGroup>
                </Row>
              </Container>
            </div>
          ) : step === 3 ? (
            <div data-aos="slide-left">
              <Container>
                <Row className="mb-4">
                  <Col className="text-center">
                    <img
                      src={drivers}
                      alt="Drivers"
                      width="180"
                      className="img-fluid"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <h1 className="title mb-0 pb-0">
                      {t("translation:tutorial.3-forDrivers.title")}
                    </h1>
                  </Col>
                </Row>
                <Row className="mt-3 px-0">
                  <ListGroup>
                    <ListGroup.Item className="border-0 px-0">
                      <p className="fw-bold mb-0">
                        <ArrowRight
                          size="24"
                          className="text-success align-text-top me-2"
                        />
                        {t("translation:tutorial.3-forDrivers.title1")}
                      </p>
                      <small>
                        {t("translation:tutorial.3-forDrivers.paragraph1")}
                      </small>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <p className="fw-bold mb-0">
                        <ArrowRight
                          size="24"
                          className="text-success align-text-top me-2"
                        />
                        {t("translation:tutorial.3-forDrivers.title2")}
                      </p>
                      <small>
                        {t("translation:tutorial.3-forDrivers.paragraph2")}
                      </small>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <p className="fw-bold mb-0">
                        <ArrowRight
                          size="24"
                          className="text-success align-text-top me-2"
                        />
                        {t("translation:tutorial.3-forDrivers.title3")}
                      </p>
                      <small>
                        {t("translation:tutorial.3-forDrivers.paragraph3")}
                      </small>
                    </ListGroup.Item>
                  </ListGroup>
                </Row>
              </Container>
            </div>
          ) : step === 4 ? (
            <div data-aos="slide-left">
              <Container>
                <Row className="mb-4">
                  <Col className="text-center">
                    <img
                      src={trip}
                      alt="Your trip"
                      width="150"
                      className="img-fluid"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <h1 className="title mb-0 pb-0">
                      {t("translation:tutorial.4-trip.title")}
                    </h1>
                  </Col>
                </Row>
                <Row className="mt-3 px-0">
                  <Col className="m-0 p-0">
                    <p className="text-primary fw-bold ps-0 mb-0">
                      <DotFillIcon size={24} />
                      {t("translation:global.before")}
                    </p>
                    <ListGroup className="mb-4">
                      <ListGroup.Item className="border-0 px-0">
                        <p className="fw-bold mb-0">
                          <ArrowRight
                            size="24"
                            className="text-success align-text-top me-2"
                          />
                          {t("translation:tutorial.4-trip.title1")}
                        </p>
                        <small>
                          {t("translation:tutorial.4-trip.paragraph1")}
                        </small>
                      </ListGroup.Item>
                    </ListGroup>

                    <p className="text-success fw-bold ps-0 mb-0">
                      <DotFillIcon size={24} />
                      {t("translation:global.after")}
                    </p>
                    <ListGroup>
                      <ListGroup.Item className="border-0 px-0">
                        <p className="fw-bold mb-0">
                          <ArrowRight
                            size="24"
                            className="text-success align-text-top me-2"
                          />
                          {t("translation:tutorial.4-trip.title2")}
                        </p>
                        <small>
                          {t("translation:tutorial.4-trip.paragraph2")}
                        </small>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 px-0">
                        <p className="fw-bold mb-0">
                          <ArrowRight
                            size="24"
                            className="text-success align-text-top me-2"
                          />
                          {t("translation:tutorial.4-trip.title3")}
                        </p>
                        <small>
                          {t("translation:tutorial.4-trip.paragraph3")}
                        </small>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Container>
            </div>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Tutorial;
