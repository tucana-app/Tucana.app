import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@primer/octicons-react";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

import LoadingSpinner from "../../components/LoadingSpinner";

import { displayNavBar, setUserAvatar } from "../../redux";

import crocodile from "../../assets/images/avatars/crocodile.jpg";
import dolphin from "../../assets/images/avatars/dolphin.jpg";
import iguana from "../../assets/images/avatars/iguana.jpg";
import jaguar from "../../assets/images/avatars/jaguar.jpg";
import macaw from "../../assets/images/avatars/macaw.jpg";
import monkey from "../../assets/images/avatars/monkey.jpg";
import sloth from "../../assets/images/avatars/sloth.jpg";
import toucan from "../../assets/images/avatars/toucan.jpg";
import turtle from "../../assets/images/avatars/turtle.jpg";
import whale from "../../assets/images/avatars/whale.jpg";
import filter from "../../assets/images/filters/filter-select.png";
import DonateComponent from "../../components/DonateComponent";

const FirstSetup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { user: currentUser, isLoadingSetUserAvatar } = useSelector(
    (state) => state.user
  );

  const [step, setStep] = useState(1);
  const [isFirstSetupDone, setIsFirstSetupDone] = useState(false);
  const [avatar, setAvatar] = useState("");

  const handleChangeAvatar = (name) => {
    setAvatar(name);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleDone = () => {
    setIsFirstSetupDone(true);
  };

  useEffect(() => {
    dispatch(displayNavBar(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFirstSetupDone) {
      <Redirect to="/" />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstSetupDone]);

  if (isFirstSetupDone) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col>
          {step === 1 ? (
            <Container className="px-0">
              <Row className="mb-3">
                <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
                  <h1 className="title text-center">
                    {t("translation:global.welcome")} {currentUser.firstName}
                  </h1>
                </Col>
              </Row>

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
                  <div className="avatar-parent">
                    <img
                      src={crocodile}
                      alt="Placeholder"
                      className={"img-fluid cursor-pointer avatar-img"}
                      onClick={() => handleChangeAvatar("crocodile")}
                    />
                    {avatar === "crocodile" ? (
                      <div className="avatar-filter">
                        <img
                          src={filter}
                          alt="Placeholder"
                          className={"img-fluid cursor-pointer"}
                          onClick={() => handleChangeAvatar("crocodile")}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="avatar-parent">
                    <img
                      src={dolphin}
                      alt="Placeholder"
                      className={"img-fluid cursor-pointer avatar-img"}
                      onClick={() => handleChangeAvatar("dolphin")}
                    />
                    {avatar === "dolphin" ? (
                      <div className="avatar-filter">
                        <img
                          src={filter}
                          alt="Placeholder"
                          className={"img-fluid cursor-pointer"}
                          onClick={() => handleChangeAvatar("dolphin")}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="avatar-parent">
                    <img
                      src={iguana}
                      alt="Placeholder"
                      className={"img-fluid cursor-pointer avatar-img"}
                      onClick={() => handleChangeAvatar("iguana")}
                    />
                    {avatar === "iguana" ? (
                      <div className="avatar-filter">
                        <img
                          src={filter}
                          alt="Placeholder"
                          className={"img-fluid cursor-pointer"}
                          onClick={() => handleChangeAvatar("iguana")}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="avatar-parent">
                    <img
                      src={jaguar}
                      alt="Placeholder"
                      className={"img-fluid cursor-pointer avatar-img"}
                      onClick={() => handleChangeAvatar("jaguar")}
                    />
                    {avatar === "jaguar" ? (
                      <div className="avatar-filter">
                        <img
                          src={filter}
                          alt="Placeholder"
                          className={"img-fluid cursor-pointer"}
                          onClick={() => handleChangeAvatar("jaguar")}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="avatar-parent">
                    <img
                      src={macaw}
                      alt="Placeholder"
                      className={"img-fluid cursor-pointer avatar-img"}
                      onClick={() => handleChangeAvatar("macaw")}
                    />
                    {avatar === "macaw" ? (
                      <div className="avatar-filter">
                        <img
                          src={filter}
                          alt="Placeholder"
                          className={"img-fluid cursor-pointer"}
                          onClick={() => handleChangeAvatar("macaw")}
                        />
                      </div>
                    ) : null}
                  </div>
                </Col>
              </Row>

              <Row className="mb-5">
                <Col className="d-flex justify-content-around">
                  <div className="avatar-parent">
                    <img
                      src={monkey}
                      alt="Placeholder"
                      className={"img-fluid cursor-pointer avatar-img"}
                      onClick={() => handleChangeAvatar("monkey")}
                    />
                    {avatar === "monkey" ? (
                      <div className="avatar-filter">
                        <img
                          src={filter}
                          alt="Placeholder"
                          className={"img-fluid cursor-pointer"}
                          onClick={() => handleChangeAvatar("monkey")}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="avatar-parent">
                    <img
                      src={sloth}
                      alt="Placeholder"
                      className={"img-fluid cursor-pointer avatar-img"}
                      onClick={() => handleChangeAvatar("sloth")}
                    />
                    {avatar === "sloth" ? (
                      <div className="avatar-filter">
                        <img
                          src={filter}
                          alt="Placeholder"
                          className={"img-fluid cursor-pointer"}
                          onClick={() => handleChangeAvatar("sloth")}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="avatar-parent">
                    <img
                      src={toucan}
                      alt="Placeholder"
                      className={"img-fluid cursor-pointer avatar-img"}
                      onClick={() => handleChangeAvatar("toucan")}
                    />
                    {avatar === "toucan" ? (
                      <div className="avatar-filter">
                        <img
                          src={filter}
                          alt="Placeholder"
                          className={"img-fluid cursor-pointer"}
                          onClick={() => handleChangeAvatar("toucan")}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="avatar-parent">
                    <img
                      src={turtle}
                      alt="Placeholder"
                      className={"img-fluid cursor-pointer avatar-img"}
                      onClick={() => handleChangeAvatar("turtle")}
                    />
                    {avatar === "turtle" ? (
                      <div className="avatar-filter">
                        <img
                          src={filter}
                          alt="Placeholder"
                          className={"img-fluid cursor-pointer"}
                          onClick={() => handleChangeAvatar("turtle")}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="avatar-parent">
                    <img
                      src={whale}
                      alt="Placeholder"
                      className={"img-fluid cursor-pointer avatar-img"}
                      onClick={() => handleChangeAvatar("whale")}
                    />
                    {avatar === "whale" ? (
                      <div className="avatar-filter">
                        <img
                          src={filter}
                          alt="Placeholder"
                          className={"img-fluid cursor-pointer"}
                          onClick={() => handleChangeAvatar("whale")}
                        />
                      </div>
                    ) : null}
                  </div>
                </Col>
              </Row>

              <Row className="fixed-bottom">
                <Col className="text-end mx-4 mb-5">
                  <Button
                    onClick={() => {
                      dispatch(setUserAvatar(currentUser, avatar));
                      handleNextStep();
                    }}
                    variant="success"
                    className="hvr-icon-forward ms-2"
                    size="lg"
                    disabled={avatar === ""}
                  >
                    {isLoadingSetUserAvatar ? (
                      <span className="me-2">
                        <LoadingSpinner className="me-2" />
                      </span>
                    ) : null}
                    {t("translation:global.next")}
                    <ArrowRightIcon size={24} className="hvr-icon ms-2" />
                  </Button>
                </Col>
              </Row>
            </Container>
          ) : step === 2 ? (
            <Container className="px-0">
              <Row className="mb-3">
                <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
                  <h1 className="title text-center">Consider donating</h1>
                </Col>
              </Row>

              <DonateComponent />

              <Row className="fixed-bottom align-items-center mx-3 my-5">
                <Col xs={6}>
                  <Button
                    onClick={handlePreviousStep}
                    variant="outline-warning"
                    className="ms-2"
                    disabled={avatar === ""}
                  >
                    <ArrowLeft size={18} />
                  </Button>
                </Col>
                <Col xs={6} className="text-end">
                  <Button onClick={handleDone} variant="success" size="lg">
                    {t("translation:global.start")}
                    <ArrowRight size="24" className="ms-2" />
                  </Button>
                </Col>
              </Row>
            </Container>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default FirstSetup;
