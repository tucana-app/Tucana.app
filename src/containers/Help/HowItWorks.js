import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Offcanvas,
  Button,
  ListGroup,
} from "react-bootstrap";
import { ArrowLeft, ArrowRight, Check2Square } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

import GoBack from "../../components/GoBack";

import authentication from "../../assets/images/undraw_authentication.png";
import select from "../../assets/images/undraw_My_answer.png";
import drivers from "../../assets/images/undraw_by_my_car.png";
import passengers from "../../assets/images/undraw_Select.png";
import prepare from "../../assets/images/undraw_adventure_map.png";
import finish from "../../assets/images/undraw_Best_place.png";
import { LinkContainer } from "react-router-bootstrap";
import { ChevronRightIcon } from "@primer/octicons-react";
import { Link } from "react-router-dom";

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
  const handleClickStepTwo = () => {
    setStepTwo(false);
    setStepThree(true);
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

  const handleBackToStepThree = () => {
    setStepThree(true);
    setStepFour(false);
  };

  // Step 5
  const handleClickStepFive = () => {
    setStepFive(false);
    setStepSix(true);
  };

  const handleBackToStepFour = () => {
    setStepFour(true);
    setStepFive(false);
  };

  // Step 6
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
          <Col className="text-center">
            <h1 className="title">{t("translation:global.howItWorks")}</h1>
            <p>{t("translation:howItWorks.stepsService")}</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="text-center">
            <Button
              size="lg"
              onClick={handleStartTutorial}
              variant="success"
              className="mt-5"
            >
              {t("translation:howItWorks.startTutorial")} 🚀
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Link to="/faq" className="link-success">
              {t("translation:howItWorks.checkFaq")}
            </Link>
          </Col>
        </Row>
      </Container>

      <Offcanvas
        show={showTutorial}
        onHide={() => setShowTutorial(false)}
        placement="bottom"
        className="vh-100"
      >
        <Container className="px-0">
          <Row>
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
              <Offcanvas.Header closeButton>‎</Offcanvas.Header>
              <Offcanvas.Body>
                {stepOne ? (
                  <>
                    <Container fluid>
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
                            width="200"
                            className="img-fluid"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Link
                          to="/signup"
                          className="text-decoration-none px-0"
                        >
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />

                                {t("translation:howItWorks.signUpFree")}
                              </p>
                              {!isLoggedIn ? (
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  className="m-0"
                                >
                                  <ChevronRightIcon
                                    size={24}
                                    verticalAlign="middle"
                                  />
                                </Button>
                              ) : null}
                            </div>
                          </ListGroup.Item>
                        </Link>

                        <ListGroup.Item className="border-0 px-0">
                          <div className="d-inline-flex justify-content-between align-items-center w-100">
                            <p className="fw-bold mb-0">
                              <Check2Square
                                size="24"
                                className="text-success align-text-top me-2"
                              />
                              {t("translation:howItWorks.verifyEmail")}
                            </p>
                          </div>
                          <small>
                            {t("translation:howItWorks.verifyEmail2")}
                          </small>
                        </ListGroup.Item>
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
                            width="200"
                            className="img-fluid"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Link
                          to="/publish"
                          className="text-decoration-none px-0"
                        >
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />
                                {t("translation:publish.title")}
                              </p>
                              {isLoggedIn ? (
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  className="m-0"
                                >
                                  <ChevronRightIcon
                                    size={24}
                                    verticalAlign="middle"
                                  />
                                </Button>
                              ) : null}
                            </div>
                            <small>
                              {t("translation:howItWorks.beDriver")}
                            </small>
                          </ListGroup.Item>
                        </Link>

                        <Link to="/find" className="text-decoration-none px-0">
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />
                                {t("translation:howItWorks.bookRide")}
                              </p>
                              {isLoggedIn ? (
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  className="m-0"
                                >
                                  <ChevronRightIcon
                                    size={24}
                                    verticalAlign="middle"
                                  />
                                </Button>
                              ) : null}
                            </div>
                            <small>
                              {t("translation:howItWorks.bePassenger")}
                            </small>
                          </ListGroup.Item>
                        </Link>
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
                        className="me-3"
                      >
                        <ArrowLeft size="24" /> {t("translation:global.goBack")}
                      </Button>
                      <Button
                        onClick={handleClickStepTwo}
                        variant="success"
                        className="hvr-icon-forward"
                      >
                        {t("translation:global.next")}{" "}
                        <ArrowRight size="24" className="hvr-icon" />
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
                            width="200"
                            className="img-fluid"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col xs={12}>
                          <p className="mb-0">
                            {t("translation:howItWorks.ifDriver")}:
                          </p>
                        </Col>

                        <Link
                          to="/become-driver"
                          className="text-decoration-none px-0"
                        >
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />
                                {t("translation:howItWorks.fillUp")}
                              </p>

                              {isLoggedIn ? (
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  className="m-0"
                                >
                                  <ChevronRightIcon
                                    size={24}
                                    verticalAlign="middle"
                                  />
                                </Button>
                              ) : null}
                            </div>
                            <small>{t("translation:howItWorks.fillUp2")}</small>
                          </ListGroup.Item>
                        </Link>

                        <ListGroup.Item className="border-0 px-0">
                          <div className="d-inline-flex justify-content-between align-items-center w-100">
                            <p className="fw-bold mb-0">
                              <Check2Square
                                size="24"
                                className="text-success align-text-top me-2"
                              />
                              {t("translation:howItWorks.getVerified")}
                            </p>
                          </div>
                          <small>
                            {t("translation:howItWorks.getVerified2")}
                          </small>
                        </ListGroup.Item>

                        <Link
                          to="/publish"
                          className="text-decoration-none px-0"
                        >
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />
                                {t("translation:howItWorks.publishRide")}
                              </p>

                              {isLoggedIn ? (
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  className="m-0"
                                >
                                  <ChevronRightIcon
                                    size={24}
                                    verticalAlign="middle"
                                  />
                                </Button>
                              ) : null}
                            </div>
                            <small>
                              {t("translation:howItWorks.publishRide2")}
                            </small>
                          </ListGroup.Item>
                        </Link>
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
                            width="200"
                            className="img-fluid"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col xs={12}>
                          <p className="mb-0">
                            {t("translation:howItWorks.ifPassenger")}:
                          </p>
                        </Col>

                        <Link to="/find" className="text-decoration-none px-0">
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />
                                {t("translation:howItWorks.bookRide")}
                              </p>

                              {isLoggedIn ? (
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  className="m-0"
                                >
                                  <ChevronRightIcon
                                    size={24}
                                    verticalAlign="middle"
                                  />
                                </Button>
                              ) : null}
                            </div>
                            <small>
                              {t("translation:howItWorks.bookRide2")}
                            </small>
                          </ListGroup.Item>
                        </Link>

                        <ListGroup.Item className="border-0 px-0">
                          <div className="d-inline-flex justify-content-between align-items-center w-100">
                            <p className="fw-bold mb-0">
                              <Check2Square
                                size="24"
                                className="text-success align-text-top me-2"
                              />
                              {t("translation:howItWorks.giveDetails")}
                            </p>
                          </div>
                          <small>
                            {t("translation:howItWorks.giveDetails2")}
                          </small>
                        </ListGroup.Item>

                        <Link
                          to="/messages"
                          className="text-decoration-none px-0"
                        >
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />
                                {t("translation:howItWorks.contactDriver")}
                              </p>

                              {isLoggedIn ? (
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  className="m-0"
                                >
                                  <ChevronRightIcon
                                    size={24}
                                    verticalAlign="middle"
                                  />
                                </Button>
                              ) : null}
                            </div>
                          </ListGroup.Item>
                        </Link>
                      </Row>
                    </Container>

                    <div className="fixed-bottom d-flex justify-content-center mb-5">
                      <Button
                        onClick={handleBackToStepThree}
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
                            width="200"
                            className="img-fluid"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <ListGroup.Item className="border-0 px-0">
                          <div className="d-inline-flex justify-content-between align-items-center w-100">
                            <p className="fw-bold mb-0">
                              <Check2Square
                                size="24"
                                className="text-success align-text-top me-2"
                              />
                              {t("translation:howItWorks.chat")}
                            </p>
                          </div>
                        </ListGroup.Item>

                        <ListGroup.Item className="border-0 px-0">
                          <div className="d-inline-flex justify-content-between align-items-center w-100">
                            <p className="fw-bold mb-0">
                              <Check2Square
                                size="24"
                                className="text-success align-text-top me-2"
                              />
                              {t("translation:howItWorks.points")}
                            </p>
                          </div>
                          <small>{t("translation:howItWorks.points2")}</small>
                        </ListGroup.Item>

                        <Link
                          to="/driver/bookings"
                          className="text-decoration-none px-0"
                        >
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />
                                {t(
                                  "translation:howItWorks.manageBookingsDriver"
                                )}
                              </p>
                              {isLoggedIn ? (
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  className="m-0"
                                >
                                  <ChevronRightIcon
                                    size={24}
                                    verticalAlign="middle"
                                  />
                                </Button>
                              ) : null}
                            </div>
                          </ListGroup.Item>
                        </Link>

                        <Link
                          to="/bookings"
                          className="text-decoration-none px-0"
                        >
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />
                                {t(
                                  "translation:howItWorks.manageBookingsPassenger"
                                )}
                              </p>
                              {isLoggedIn ? (
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  className="m-0"
                                >
                                  <ChevronRightIcon
                                    size={24}
                                    verticalAlign="middle"
                                  />
                                </Button>
                              ) : null}
                            </div>
                          </ListGroup.Item>
                        </Link>
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
                            width="200"
                            className="img-fluid"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Link
                          to="/rides/rides-to-complete"
                          className="text-decoration-none px-0"
                        >
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />
                                {t("translation:howItWorks.confirm")}
                              </p>

                              {isLoggedIn ? (
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  className="m-0"
                                >
                                  <ChevronRightIcon
                                    size={24}
                                    verticalAlign="middle"
                                  />
                                </Button>
                              ) : null}
                            </div>
                            <small>
                              {t("translation:howItWorks.confirm2")}
                            </small>
                          </ListGroup.Item>
                        </Link>

                        <Link
                          to="/ratings"
                          className="text-decoration-none px-0"
                        >
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />
                                {t("translation:howItWorks.review")}
                              </p>

                              {isLoggedIn ? (
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  className="m-0"
                                >
                                  <ChevronRightIcon
                                    size={24}
                                    verticalAlign="middle"
                                  />
                                </Button>
                              ) : null}
                            </div>
                            <small>{t("translation:howItWorks.review2")}</small>
                          </ListGroup.Item>
                        </Link>

                        <a
                          href="https://docs.google.com/forms/d/e/1FAIpQLSe5ryLUu84X7IELlLQO3XWfYajW4wj47Y-CkhVBQJsWGoh_4Q/viewform?usp=sf_link"
                          className="text-decoration-none px-0"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />
                                {t("translation:howItWorks.feedback")}
                              </p>

                              {isLoggedIn ? (
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  className="m-0"
                                >
                                  <ChevronRightIcon
                                    size={24}
                                    verticalAlign="middle"
                                  />
                                </Button>
                              ) : null}
                            </div>
                            <small>
                              {t("translation:howItWorks.feedback2")}
                            </small>
                          </ListGroup.Item>
                        </a>

                        <Link
                          to="/contact"
                          className="text-decoration-none px-0"
                        >
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />
                                {t("translation:global.contactUs")}
                              </p>

                              <Button
                                variant="outline-success"
                                size="sm"
                                className="m-0"
                              >
                                <ChevronRightIcon
                                  size={24}
                                  verticalAlign="middle"
                                />
                              </Button>
                            </div>
                          </ListGroup.Item>
                        </Link>
                      </Row>
                    </Container>

                    <div className="fixed-bottom d-flex justify-content-center mb-5">
                      <Button
                        onClick={handleBackToStepFive}
                        variant="warning"
                        className="me-3"
                      >
                        <ArrowLeft size="24" /> {t("translation:global.goBack")}
                      </Button>
                      {isLoggedIn ? (
                        <Button
                          onClick={() => setShowTutorial(false)}
                          variant="success"
                        >
                          {t("translation:global.finish")}
                        </Button>
                      ) : (
                        <>
                          <LinkContainer to="/login" className="me-2">
                            <Button
                              variant="outline-success"
                              size="lg"
                              className="me-2"
                            >
                              {t("translation:global.logIn")}
                            </Button>
                          </LinkContainer>

                          <LinkContainer to="/signup">
                            <Button
                              variant="success"
                              size="lg"
                              className="me-2"
                            >
                              {t("translation:global.signUp")}
                            </Button>
                          </LinkContainer>
                        </>
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
