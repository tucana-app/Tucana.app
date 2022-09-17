import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Alert,
  Offcanvas,
  ListGroup,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import LoadingSpinner from "../../components/LoadingSpinner";

import { login, resendConfirmationLink, setUserAvatar } from "../../redux";
import { ArrowRightIcon, ChevronRightIcon } from "@primer/octicons-react";
import { ArrowLeft, Check2Square } from "react-bootstrap-icons";

import crocodile from "../../assets/images/avatars/crocodile.png";
import dolphin from "../../assets/images/avatars/dolphin.png";
import iguana from "../../assets/images/avatars/iguana.png";
import jaguar from "../../assets/images/avatars/jaguar.png";
import macaw from "../../assets/images/avatars/macaw.png";
import monkey from "../../assets/images/avatars/monkey.png";
import sloth from "../../assets/images/avatars/sloth.png";
import toucan from "../../assets/images/avatars/toucan.png";
import turtle from "../../assets/images/avatars/turtle.png";
import whale from "../../assets/images/avatars/whale.png";
import filter from "../../assets/images/filter-select.png";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    user: currentUser,
    isloadingLogin,
    isLoggedIn,
    loginErrorData,
    formUser,
  } = useSelector((state) => state.user);
  const { labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );

  const [showAlertConfirmEmail, setShowAlertConfirmEmail] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);

  const [avatar, setAvatar] = useState(formUser.avatar);
  // const avatars1 = ["toucan", "iguana", "sloth", "macaw", "monkey"];
  // const avatars2 = ["crocodile", "turtle", "jaguar", "dolphin", "whale"];

  const schema = Yup.object().shape({
    credential: Yup.string(labelStringField).required(labelRequiredField),

    password: Yup.string().required(labelRequiredField),
  });

  // Step 1
  const handleClickStepOne = () => {
    setStepOne(false);
    setStepTwo(true);
  };

  // Step 2
  const handleChangeAvatar = (name) => {
    console.log(name);
    setAvatar(name);
    dispatch(setUserAvatar(name));
  };

  const handleBackToStepOne = () => {
    setStepOne(true);
    setStepTwo(false);
  };

  // Handlers
  const handleSubmit = (values, formikBag) => {
    dispatch(login(values));
    formikBag.setSubmitting(false);
  };

  useEffect(() => {
    if (loginErrorData) {
      loginErrorData.flag === "NOT_CONFIRMED"
        ? setShowAlertConfirmEmail(true)
        : setShowAlertConfirmEmail(false);
    }
  }, [loginErrorData]);

  if (isLoggedIn && currentUser.firstSetUp) {
    return (
      <>
        <Container className="py-5">
          <Row>
            <Col className="text-center">{t("translation:logIn.finish")}</Col>
          </Row>
          <Row className="mb-5">
            <Link to="/how-it-works" className="text-decoration-none px-0">
              <ListGroup.Item className="border-0 px-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100">
                  <p className="fw-bold mb-0">
                    <Check2Square
                      size="24"
                      className="text-success align-text-top me-2"
                    />
                    {t("translation:global.howItWorks")}
                  </p>
                  {isLoggedIn ? (
                    <Button variant="outline-success" size="sm" className="m-0">
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </Button>
                  ) : null}
                </div>
              </ListGroup.Item>
            </Link>

            <Link to="/apply-driver" className="text-decoration-none px-0">
              <ListGroup.Item className="border-0 px-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100">
                  <p className="fw-bold mb-0">
                    <Check2Square
                      size="24"
                      className="text-success align-text-top me-2"
                    />
                    {t("translation:global.becomeDriver")}
                  </p>
                  {isLoggedIn ? (
                    <Button variant="outline-success" size="sm" className="m-0">
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </Button>
                  ) : null}
                </div>
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
                    {t("translation:offer.findRide")}
                  </p>
                  {isLoggedIn ? (
                    <Button variant="outline-success" size="sm" className="m-0">
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </Button>
                  ) : null}
                </div>
              </ListGroup.Item>
            </Link>

            <Link to="/account" className="text-decoration-none px-0">
              <ListGroup.Item className="border-0 px-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100">
                  <p className="fw-bold mb-0">
                    <Check2Square
                      size="24"
                      className="text-success align-text-top me-2"
                    />
                    {t("translation:logIn.yourAccount")}
                  </p>
                  {isLoggedIn ? (
                    <Button variant="outline-success" size="sm" className="m-0">
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </Button>
                  ) : null}
                </div>
              </ListGroup.Item>
            </Link>
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
                <Offcanvas.Header
                  className="justify-content-center"
                  // closeButton
                >
                  <Offcanvas.Title>
                    <h1 className="text-center w-100">
                      {t("translation:global.welcome")} {currentUser.firstName}
                    </h1>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  {stepOne ? (
                    <Container className="px-0">
                      <Row>
                        <Col>
                          <p className="mb-5">
                            {t("translation:logIn.welcomeMessage")} 🎉
                          </p>
                          <p className="text-center">
                            {t("translation:logIn.chooseAvatar")}
                          </p>
                        </Col>
                      </Row>

                      <Row className="mb-4">
                        <Col className="d-flex justify-content-around">
                          <div class="avatar-parent">
                            <img
                              src={crocodile}
                              alt="Placeholder"
                              className={
                                "img-fluid rounded-round cursor-pointer img-avatar"
                              }
                              onClick={() => handleChangeAvatar("crocodile")}
                            />
                            {avatar === "crocodile" ? (
                              <div class="avatar-child">
                                <img
                                  src={filter}
                                  alt="Placeholder"
                                  className={"img-fluid cursor-pointer "}
                                  onClick={() =>
                                    handleChangeAvatar("crocodile")
                                  }
                                />
                              </div>
                            ) : null}
                          </div>

                          <div class="avatar-parent">
                            <img
                              src={dolphin}
                              alt="Placeholder"
                              className={
                                "img-fluid rounded-round cursor-pointer img-avatar"
                              }
                              onClick={() => handleChangeAvatar("dolphin")}
                            />
                            {avatar === "dolphin" ? (
                              <div class="avatar-child">
                                <img
                                  src={filter}
                                  alt="Placeholder"
                                  className={"img-fluid cursor-pointer "}
                                  onClick={() => handleChangeAvatar("dolphin")}
                                />
                              </div>
                            ) : null}
                          </div>

                          <div class="avatar-parent">
                            <img
                              src={iguana}
                              alt="Placeholder"
                              className={
                                "img-fluid rounded-round cursor-pointer img-avatar"
                              }
                              onClick={() => handleChangeAvatar("iguana")}
                            />
                            {avatar === "iguana" ? (
                              <div class="avatar-child">
                                <img
                                  src={filter}
                                  alt="Placeholder"
                                  className={"img-fluid cursor-pointer "}
                                  onClick={() => handleChangeAvatar("iguana")}
                                />
                              </div>
                            ) : null}
                          </div>

                          <div class="avatar-parent">
                            <img
                              src={jaguar}
                              alt="Placeholder"
                              className={
                                "img-fluid rounded-round cursor-pointer img-avatar"
                              }
                              onClick={() => handleChangeAvatar("jaguar")}
                            />
                            {avatar === "jaguar" ? (
                              <div class="avatar-child">
                                <img
                                  src={filter}
                                  alt="Placeholder"
                                  className={"img-fluid cursor-pointer "}
                                  onClick={() => handleChangeAvatar("jaguar")}
                                />
                              </div>
                            ) : null}
                          </div>

                          <div class="avatar-parent">
                            <img
                              src={macaw}
                              alt="Placeholder"
                              className={
                                "img-fluid rounded-round cursor-pointer img-avatar"
                              }
                              onClick={() => handleChangeAvatar("macaw")}
                            />
                            {avatar === "macaw" ? (
                              <div class="avatar-child">
                                <img
                                  src={filter}
                                  alt="Placeholder"
                                  className={"img-fluid cursor-pointer "}
                                  onClick={() => handleChangeAvatar("macaw")}
                                />
                              </div>
                            ) : null}
                          </div>
                        </Col>
                      </Row>

                      <Row className="mb-5">
                        <Col className="d-flex justify-content-around">
                          <div class="avatar-parent">
                            <img
                              src={monkey}
                              alt="Placeholder"
                              className={
                                "img-fluid rounded-round cursor-pointer img-avatar"
                              }
                              onClick={() => handleChangeAvatar("monkey")}
                            />
                            {avatar === "monkey" ? (
                              <div class="avatar-child">
                                <img
                                  src={filter}
                                  alt="Placeholder"
                                  className={"img-fluid cursor-pointer "}
                                  onClick={() => handleChangeAvatar("monkey")}
                                />
                              </div>
                            ) : null}
                          </div>

                          <div class="avatar-parent">
                            <img
                              src={sloth}
                              alt="Placeholder"
                              className={
                                "img-fluid rounded-round cursor-pointer img-avatar"
                              }
                              onClick={() => handleChangeAvatar("sloth")}
                            />
                            {avatar === "sloth" ? (
                              <div class="avatar-child">
                                <img
                                  src={filter}
                                  alt="Placeholder"
                                  className={"img-fluid cursor-pointer "}
                                  onClick={() => handleChangeAvatar("sloth")}
                                />
                              </div>
                            ) : null}
                          </div>

                          <div class="avatar-parent">
                            <img
                              src={toucan}
                              alt="Placeholder"
                              className={
                                "img-fluid rounded-round cursor-pointer img-avatar"
                              }
                              onClick={() => handleChangeAvatar("toucan")}
                            />
                            {avatar === "toucan" ? (
                              <div class="avatar-child">
                                <img
                                  src={filter}
                                  alt="Placeholder"
                                  className={"img-fluid cursor-pointer "}
                                  onClick={() => handleChangeAvatar("toucan")}
                                />
                              </div>
                            ) : null}
                          </div>

                          <div class="avatar-parent">
                            <img
                              src={turtle}
                              alt="Placeholder"
                              className={
                                "img-fluid rounded-round cursor-pointer img-avatar"
                              }
                              onClick={() => handleChangeAvatar("turtle")}
                            />
                            {avatar === "turtle" ? (
                              <div class="avatar-child">
                                <img
                                  src={filter}
                                  alt="Placeholder"
                                  className={"img-fluid cursor-pointer "}
                                  onClick={() => handleChangeAvatar("turtle")}
                                />
                              </div>
                            ) : null}
                          </div>

                          <div class="avatar-parent">
                            <img
                              src={whale}
                              alt="Placeholder"
                              className={
                                "img-fluid rounded-round cursor-pointer img-avatar"
                              }
                              onClick={() => handleChangeAvatar("whale")}
                            />
                            {avatar === "whale" ? (
                              <div class="avatar-child">
                                <img
                                  src={filter}
                                  alt="Placeholder"
                                  className={"img-fluid cursor-pointer "}
                                  onClick={() => handleChangeAvatar("whale")}
                                />
                              </div>
                            ) : null}
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="text-end">
                          <Button
                            onClick={handleClickStepOne}
                            variant="success"
                            className="hvr-icon-forward ms-2"
                          >
                            {t("translation:global.next")}
                            <ArrowRightIcon
                              size={24}
                              className="hvr-icon ms-2"
                            />
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  ) : stepTwo ? (
                    <Container>
                      <Row>
                        <Col className="text-center">
                          {t("translation:logIn.finish")}
                        </Col>
                      </Row>
                      <Row className="mb-5">
                        <Link
                          to="/how-it-works"
                          className="text-decoration-none px-0"
                        >
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />
                                {t("translation:global.howItWorks")}
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
                          to="/apply-driver"
                          className="text-decoration-none px-0"
                        >
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />
                                {t("translation:global.becomeDriver")}
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

                        <Link to="/find" className="text-decoration-none px-0">
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />
                                {t("translation:offer.findRide")}
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
                          to="/account"
                          className="text-decoration-none px-0"
                        >
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <p className="fw-bold mb-0">
                                <Check2Square
                                  size="24"
                                  className="text-success align-text-top me-2"
                                />
                                {t("translation:logIn.yourAccount")}
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

                      <Row>
                        <Col className="text-start">
                          <Button
                            onClick={handleBackToStepOne}
                            variant="warning"
                            className="hvr-icon-shrink ms-2"
                          >
                            <ArrowLeft size={18} className="hvr-icon me-2" />
                            {t("translation:global.goBack")}
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  ) : null}
                </Offcanvas.Body>
              </Col>
            </Row>
          </Container>
        </Offcanvas>
      </>
    );
  } else if (isLoggedIn) {
    return <Redirect to="/find" />;
  }

  return (
    <Container data-aos="fade-in">
      <Row className="min-vh-100 align-items-center">
        <Col>
          <Container className="p-0">
            <Row className="mb-4">
              <Col className="text-center p-0">
                <h1 className="text-success">
                  {" "}
                  {t("translation:global.logIn")}
                </h1>
              </Col>
            </Row>
            <Row>
              <Col xs={10} md={8} lg={6} xl={4} className="mx-auto p-0">
                <Formik
                  validationSchema={schema}
                  validateOnChange={false}
                  validateOnBlur={false}
                  onSubmit={handleSubmit}
                  initialValues={{
                    credential: "",
                    password: "",
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    // handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                    isSubmitting,
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Row>
                        <Col xs={12} className="mb-3 mb-md-4">
                          <Form.Group>
                            <Form.Control
                              type="text"
                              name="credential"
                              placeholder={t("translation:logIn.credential")}
                              onChange={handleChange}
                              isInvalid={!!errors.credential}
                              isValid={touched.credential && !errors.credential}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.credential}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col xs={12} className="mb-2">
                          <Form.Group>
                            <Form.Control
                              type="password"
                              name="password"
                              placeholder={t("translation:global.password")}
                              onChange={handleChange}
                              isInvalid={!!errors.password}
                              isValid={touched.password && !errors.password}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col className="text-end mb-3 mb-md-4">
                          <Link to="/forgot-password" className="text-end">
                            {t("translation:logIn.forgotPassword")}
                          </Link>
                        </Col>
                      </Row>

                      {loginErrorData ? (
                        loginErrorData.flag === "NOT_CONFIRMED" ? (
                          <>
                            <Alert
                              variant="warning"
                              show={showAlertConfirmEmail}
                            >
                              {loginErrorData.message}.{" "}
                              <u
                                className="cursor-pointer text-primary"
                                onClick={() => {
                                  dispatch(
                                    resendConfirmationLink(
                                      loginErrorData.userId
                                    )
                                  );
                                  setShowAlertConfirmEmail(false);
                                }}
                              >
                                {t("translation:global.resendLink")}
                              </u>
                            </Alert>
                          </>
                        ) : null
                      ) : null}

                      <Row>
                        <Col className="d-inline-flex justify-content-end">
                          <LinkContainer to="/signup">
                            <Button
                              variant="outline-success"
                              className="me-5"
                              size="lg"
                            >
                              {t("translation:global.signUp")}
                            </Button>
                          </LinkContainer>
                          <Form.Group>
                            <Button
                              variant="success"
                              size="lg"
                              type="submit"
                              disabled={isSubmitting || isloadingLogin}
                            >
                              {isSubmitting || isloadingLogin ? (
                                <span className="mx-2">
                                  <LoadingSpinner />
                                </span>
                              ) : (
                                <span> {t("translation:global.logIn")}</span>
                              )}
                            </Button>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
