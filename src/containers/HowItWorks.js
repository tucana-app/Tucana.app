import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Offcanvas, Button } from "react-bootstrap";
import { ArrowLeft, ArrowRight, Check2Square } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

import GoBack from "../components/GoBack";

import steps from "../assets/images/undraw_fill_form.svg";
import authentication from "../assets/images/undraw_authentication.png";
import select from "../assets/images/undraw_My_answer.png";
import drivers from "../assets/images/undraw_by_my_car.png";
import passengers from "../assets/images/undraw_Select.png";
import prepare from "../assets/images/undraw_adventure_map.png";
import finish from "../assets/images/undraw_Best_place.png";
import { LinkContainer } from "react-router-bootstrap";

const HowItWorks = () => {
  const { t } = useTranslation();
  const { isLoggedIn } = useSelector((state) => state.user);

  const [showTutorial, setShowTutorial] = useState(false);

  // Steps
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [stepFive, setStepFive] = useState(false);
  const [stepSix, setStepSix] = useState(false);

  // Step 1
  const handleClickStepOne = () => {
    setStepOne(false);
    setStepTwo(true);
  };

  // Step 2
  const handleClickStepTwoDriver = () => {
    setStepTwo(false);
    setStepThree(true);
  };

  const handleClickStepTwoPassenger = () => {
    setStepTwo(false);
    setStepFour(true);
  };

  const handleBackToStepOne = () => {
    setStepOne(true);
    setStepTwo(false);
  };

  // Step 3
  const handleClickStepThree = () => {
    setStepThree(false);
    setStepFour(true);
  };

  const handleBackToStepTwo = () => {
    setStepTwo(true);
    setStepThree(false);
  };

  // Step 4
  const handleClickStepFour = () => {
    setStepFour(false);
    setStepFive(true);
  };

  const handleBackToStepFour = () => {
    setStepFour(true);
    setStepFive(false);
  };

  // Step 5
  const handleClickStepFive = () => {
    setStepFive(false);
    setStepSix(true);
  };

  const handleBackToStepFive = () => {
    setStepFive(true);
    setStepSix(false);
  };

  // Handlers
  const handleStartTutorial = () => {
    setShowTutorial(true);
    setStepOne(true);
  };

  return (
    <div>
      <GoBack />

      <Container>
        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mx-auto"
          >
            <h1 className="title">{t("translation:global.howItWorks")}</h1>
            <Button
              size={"lg"}
              onClick={handleStartTutorial}
              variant="success"
              className="mt-5"
            >
              {t("translation:howItWorks.startTutorial")} 🚀
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-5">
            <img src={steps} alt="Car" width={200} className="img-fluid" />
          </Col>
        </Row>
      </Container>

      <Offcanvas
        show={showTutorial}
        onHide={() => setShowTutorial(false)}
        placement="bottom"
        className="vh-100"
      >
        <Container>
          <Row>
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
              <Offcanvas.Header closeButton>‎</Offcanvas.Header>
              <Offcanvas.Body>
                {stepOne ? (
                  <>
                    <Container>
                      <Row>
                        <Col className="text-center">
                          <h1 className="title mb-0 pb-0">
                            {t("translation:howItWorks.registration")}
                          </h1>
                          <span className="text-secondary">
                            {t("translation:global.step")} 1
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="text-center">
                          <img
                            src={authentication}
                            alt="Sign Up"
                            className="img-fluid"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <p className="fw-bold">
                            <Check2Square
                              size="24"
                              className="text-success me-2"
                            />
                            {t("translation:howItWorks.signUpFree")}
                          </p>
                          <p className="fw-bold mb-0">
                            <Check2Square
                              size="24"
                              className="text-success me-2"
                            />
                            {t("translation:howItWorks.verifyEmail")}
                          </p>
                          <small>
                            {t("translation:howItWorks.verifyEmail2")}
                          </small>
                        </Col>
                      </Row>
                    </Container>

                    <div className="fixed-bottom d-flex justify-content-center mb-5">
                      <Button
                        onClick={handleClickStepOne}
                        variant="success"
                        className="hvr-icon-forward"
                      >
                        {t("translation:global.next")}{" "}
                        <ArrowRight size="24" className="hvr-icon" />
                      </Button>
                    </div>
                  </>
                ) : stepTwo ? (
                  <>
                    <Container>
                      <Row>
                        <Col className="text-center">
                          <h1 className="title mb-0 pb-0">
                            {t("translation:howItWorks.choose")}
                          </h1>
                          <span className="text-secondary">
                            {t("translation:global.step")} 2
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="text-center">
                          <img
                            src={select}
                            alt="Sign Up"
                            className="img-fluid"
                          />
                        </Col>
                      </Row>
                      <Row className="text-center mt-3">
                        <Col xs={6}>
                          <Button
                            size={"lg"}
                            onClick={handleClickStepTwoDriver}
                            variant="success"
                          >
                            {t("translation:howItWorks.offerRides")}
                          </Button>
                          <p className="mb-0">
                            {t("translation:howItWorks.beDriver")}
                          </p>
                        </Col>
                        <Col xs={6}>
                          <Button
                            size={"lg"}
                            onClick={handleClickStepTwoPassenger}
                            variant="success"
                          >
                            {t("translation:howItWorks.takeRides")}
                          </Button>
                          <p className="mb-0">
                            {t("translation:howItWorks.bePassenger")}
                          </p>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col className="text-secondary text-center">
                          <p>{t("translation:howItWorks.both")}</p>
                        </Col>
                      </Row>
                    </Container>

                    <div className="fixed-bottom d-flex justify-content-center mb-5">
                      <Button
                        onClick={handleBackToStepOne}
                        variant="warning"
                        className="hvr-icon-backward me-3"
                      >
                        <ArrowLeft size="24" className="hvr-icon" />{" "}
                        {t("translation:global.goBack")}
                      </Button>
                    </div>
                  </>
                ) : stepThree ? (
                  <>
                    <Container>
                      <Row>
                        <Col className="text-center">
                          <h1 className="title mb-0 pb-0">
                            {t("translation:howItWorks.forDrivers")}
                          </h1>
                          <span className="text-secondary">
                            {t("translation:global.step")} 3
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="text-center">
                          <img
                            src={drivers}
                            alt="Drivers"
                            className="img-fluid"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <p className="fw-bold">
                            <Check2Square
                              size="24"
                              className="text-success me-2"
                            />
                            {t("translation:howItWorks.fillUp")}
                          </p>
                          <p className="fw-bold mb-0">
                            <Check2Square
                              size="24"
                              className="text-success me-2"
                            />
                            {t("translation:howItWorks.getVerified")}
                          </p>
                          <small>
                            {t("translation:howItWorks.getVerified2")}
                          </small>

                          <p className="fw-bold mt-2">
                            <Check2Square
                              size="24"
                              className="text-success me-2"
                            />
                            {t("translation:howItWorks.publishRides")}
                          </p>
                        </Col>
                      </Row>
                    </Container>

                    <div className="fixed-bottom d-flex justify-content-center mb-5">
                      <Button
                        onClick={handleBackToStepTwo}
                        variant="warning"
                        className="me-2"
                      >
                        <ArrowLeft size="24" className="me-2" />
                        {t("translation:global.goBack")}
                      </Button>
                      <Button
                        onClick={handleClickStepThree}
                        variant="success"
                        className="hvr-icon-forward"
                      >
                        {t("translation:global.next")}{" "}
                        <ArrowRight size="24" className="hvr-icon" />
                      </Button>
                    </div>
                  </>
                ) : stepFour ? (
                  <>
                    <Container>
                      <Row>
                        <Col className="text-center">
                          <h1 className="title mb-0 pb-0">
                            {t("translation:howItWorks.forPassengers")}
                          </h1>
                          <span className="text-secondary">
                            {t("translation:global.step")} 4
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="text-center">
                          <img
                            src={passengers}
                            alt="Passenger"
                            className="img-fluid"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <p className="fw-bold mb-0">
                            <Check2Square
                              size="24"
                              className="text-success me-2"
                            />
                            {t("translation:howItWorks.bookRide")}
                          </p>
                          <small>{t("translation:howItWorks.bookRide2")}</small>

                          <p className="fw-bold mt-2 mb-0">
                            <Check2Square
                              size="24"
                              className="text-success me-2"
                            />
                            {t("translation:howItWorks.giveDetails")}
                          </p>
                          <small>
                            {t("translation:howItWorks.giveDetails2")}
                          </small>

                          <p className="fw-bold mt-2">
                            <Check2Square
                              size="24"
                              className="text-success me-2"
                            />
                            {t("translation:howItWorks.contactDriver")}
                          </p>
                        </Col>
                      </Row>
                    </Container>

                    <div className="fixed-bottom d-flex justify-content-center mb-5">
                      <Button
                        onClick={handleBackToStepTwo}
                        variant="warning"
                        className="me-2"
                      >
                        <ArrowLeft size="24" className="me-2" />
                        {t("translation:global.goBack")}
                      </Button>
                      <Button
                        onClick={handleClickStepFour}
                        variant="success"
                        className="hvr-icon-forward"
                      >
                        {t("translation:global.next")}{" "}
                        <ArrowRight size="24" className="hvr-icon" />
                      </Button>
                    </div>
                  </>
                ) : stepFive ? (
                  <>
                    <Container>
                      <Row>
                        <Col className="text-center">
                          <h1 className="title mb-0 pb-0">
                            {t("translation:howItWorks.prepare")}
                          </h1>
                          <span className="text-secondary">
                            {t("translation:global.step")} 5
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="text-center">
                          <img
                            src={prepare}
                            alt="Passenger"
                            className="img-fluid"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <p className="fw-bold">
                            <Check2Square
                              size="24"
                              className="text-success me-2"
                            />
                            {t("translation:howItWorks.chat")}
                          </p>
                          <p className="fw-bold mb-0">
                            <Check2Square
                              size="24"
                              className="text-success me-2"
                            />
                            {t("translation:howItWorks.points")}
                          </p>
                          <small>{t("translation:howItWorks.points2")}</small>
                        </Col>
                      </Row>
                    </Container>

                    <div className="fixed-bottom d-flex justify-content-center mb-5">
                      <Button
                        onClick={handleBackToStepFour}
                        variant="warning"
                        className="me-2"
                      >
                        <ArrowLeft size="24" className="me-2" />
                        {t("translation:global.goBack")}
                      </Button>
                      <Button
                        onClick={handleClickStepFive}
                        variant="success"
                        className="hvr-icon-forward"
                      >
                        {t("translation:global.next")}{" "}
                        <ArrowRight size="24" className="hvr-icon" />
                      </Button>
                    </div>
                  </>
                ) : stepSix ? (
                  <>
                    <Container>
                      <Row>
                        <Col className="text-center">
                          <h1 className="title mb-0 pb-0">
                            {t("translation:howItWorks.after")}
                          </h1>
                          <span className="text-secondary">
                            {t("translation:global.step")} 6
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="text-center">
                          <img
                            src={finish}
                            alt="Passenger"
                            className="img-fluid"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <p className="fw-bold">
                            <Check2Square
                              size="24"
                              className="text-success me-2"
                            />
                            {t("translation:howItWorks.confirm")}
                          </p>

                          <p className="fw-bold">
                            <Check2Square
                              size="24"
                              className="text-success me-2"
                            />
                            {t("translation:howItWorks.review")}
                          </p>

                          <p className="fw-bold">
                            <Check2Square
                              size="24"
                              className="text-success me-2"
                            />
                            {t("translation:howItWorks.feedback")}
                          </p>

                          <p className="fw-bold">
                            <Check2Square
                              size="24"
                              className="text-success me-2"
                            />
                            {t("translation:global.contactUs")}
                          </p>
                        </Col>
                      </Row>
                    </Container>

                    <div className="fixed-bottom d-flex justify-content-center mb-5">
                      {isLoggedIn ? (
                        <Button
                          onClick={() => setShowTutorial(false)}
                          variant="success"
                          size="lg"
                        >
                          {t("translation:global.finish")}
                        </Button>
                      ) : (
                        <LinkContainer to="/signup">
                          <Button variant="success" size="lg" className="me-2">
                            {t("translation:global.signUp")}
                          </Button>
                        </LinkContainer>
                      )}
                    </div>
                  </>
                ) : null}
              </Offcanvas.Body>
            </Col>
          </Row>
        </Container>
      </Offcanvas>
    </div>
  );
};

export default HowItWorks;
