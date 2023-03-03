import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Badge, Col, Container, ListGroup, Row } from "react-bootstrap";
import { ChevronRightIcon } from "@primer/octicons-react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

import { getNotifications } from "../redux";

import SocialIcons from "../components/SocialIcons";

// Importing assets
import logo from "../assets/images/logo-full-black.png";

const Menu = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { srcAvatar, srcFilter } = useSelector((state) => state.global);
  const {
    isLoadingDriverNewRidesRequests,
    driverNewRidesRequestsData,
    isLoadingPassengerBookingsResponses,
    passengerBookingsResponsesData,
  } = useSelector((state) => state.notification);
  const { getRatingsToDoDriverData, getRatingsToDoPassengerData } = useSelector(
    (state) => state.rating
  );

  let notifications = 0;
  let numberDriverNewRidesRequests = 0;
  let numberPassengerBookingsResponses = 0;

  if (
    !isLoadingDriverNewRidesRequests &&
    !isLoadingPassengerBookingsResponses
  ) {
    numberDriverNewRidesRequests = driverNewRidesRequestsData.count;
    numberPassengerBookingsResponses = passengerBookingsResponsesData.count;

    if (
      numberPassengerBookingsResponses &&
      numberDriverNewRidesRequests !== undefined
    ) {
      // eslint-disable-next-line no-unused-vars
      notifications =
        numberDriverNewRidesRequests + numberPassengerBookingsResponses;
    }
  }

  var ratingsToDo =
    getRatingsToDoDriverData.length + getRatingsToDoPassengerData.length;

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getNotifications(currentUser));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container fluid data-aos="fade-in" className="pb-4">
      <Row className="my-2">
        <Col className="text-center">
          <img
            src={logo}
            alt="Tucána logo"
            className="img-fluid"
            style={{ maxWidth: "200px" }}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="p-0 mx-auto">
          <ListGroup variant="flush">
            <Link to="/account" className="text-decoration-none">
              <ListGroup.Item className="d-inline-flex justify-content-between align-items-center w-100 py-1 border-0">
                <div>
                  <h3 className="mb-0">{currentUser.firstName}</h3>
                  <p className="small text-secondary mb-0">
                    {t("translation:global.level")}:{" "}
                    <strong>
                      {t(
                        `translation:global.statuses.level.${currentUser.ExperienceUser.ExperienceUserLevel.id}`
                      )}
                    </strong>
                  </p>
                </div>

                <div className="d-inline-flex align-items-center">
                  <div className="avatar-parent me-3">
                    <img
                      src={srcAvatar(currentUser)}
                      alt="Placeholder"
                      className={"img-fluid cursor-pointer avatar-img-sm"}
                    />
                    <div className="avatar-filter">
                      <img
                        src={srcFilter(
                          currentUser.ExperienceUser.currentFilter
                        )}
                        alt="Placeholder"
                        className={"img-fluid cursor-pointer"}
                      />
                    </div>
                  </div>

                  {/* <img
                        src={srcAvatar(currentUser)}
                        alt="Avatar"
                        className="img-fluid cursor-pointer avatar-img-sm me-3"
                      /> */}
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>
          </ListGroup>
        </Col>
      </Row>

      {/* Showing the experience of the user */}
      {/* <LinkContainer to="/experience" className="cursor-pointer py-2">
        <Row className="mb-2">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="p-0 mx-auto">
            <hr className="my-3" />
            <Container fluid>
              <Row className="small text-secondary">
                <Col xs={4} className="text-start px-0">
                  <p className="mb-0">
                    {t("translation:global.level")}{" "}
                    <strong>
                      {currentUser.ExperienceUser.ExperienceUserLevel.id}
                    </strong>
                  </p>
                </Col>
                <Col xs={4}></Col>
                <Col xs={4} className="text-end px-0">
                  <p className="mb-0">
                    {t("translation:global.level")}{" "}
                    <strong>
                      {currentUser.ExperienceUser.ExperienceUserLevel.id + 1}
                    </strong>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="px-0">
                  <ProgressBar
                    animated
                    variant="success"
                    now={getPercent(currentUser)}
                    className="rounded-pill "
                  />
                </Col>
              </Row>
              <Row className="small text-secondary">
                <Col xs={4} className="text-start px-0">
                  {currentUser.ExperienceUser.ExperienceUserLevel.min}
                </Col>
                <Col xs={4} className="text-center px-0">
                  {currentUser.ExperienceUser.points}{" "}
                  <span className="text-lowercase">
                    {t("translation:global.points")}
                  </span>
                </Col>
                <Col xs={4} className="text-end px-0">
                  {currentUser.ExperienceUser.ExperienceUserLevel.max}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </LinkContainer> */}

      <Row>
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="p-0 mx-auto">
          <ListGroup variant="flush">
            <hr className="my-2" />

            {currentUser.Driver ? (
              <Link to="/profile" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="fw-bold mb-0">
                      {t("translation:menu.yourInfo")}
                    </p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>
            ) : (
              <Link to="/apply-driver" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="fw-bold text-success mb-0">
                      {t("translation:global.becomeDriver")}
                    </p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>
            )}

            <Link to="/ratings" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">
                    {t("translation:menu.ratings")}
                    {ratingsToDo ? (
                      <Badge bg="danger" className="ms-2">
                        {ratingsToDo}
                      </Badge>
                    ) : null}
                  </p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>

            <Link to="/experience" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">{t("translation:global.experience")}</p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>

            <hr className="my-2" />
          </ListGroup>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="p-0 mx-auto">
          <ListGroup>
            {/*

                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="text-secondary mb-0">
                      {t("translation:menu.payments")}
                    </p>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="text-secondary mb-0">
                      {t("translation:menu.refunds")}
                    </p>
                  </div>
                </ListGroup.Item> */}

            {/* <Link to="/notifications" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="position-relative mb-0">
                    Notifications
                    <Badge bg="danger" className="ms-2">
                      {notifications}
                    </Badge>
                  </p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link> */}

            <Link to="/help" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">{t("translation:global.help")}</p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>

            <Link to="/language" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <div className="mb-0">
                    {i18n.language === "es" || i18n.language === "es-CR" ? (
                      <>
                        {t("translation:global.currentLanguage")}
                        <ReactCountryFlag
                          countryCode="CR"
                          className="ms-2 mb-1"
                          svg
                        />
                      </>
                    ) : i18n.language === "fr" || i18n.language === "fr-FR" ? (
                      <>
                        {t("translation:global.currentLanguage")}
                        <ReactCountryFlag
                          countryCode="FR"
                          className="ms-2 mb-1"
                          svg
                        />
                      </>
                    ) : i18n.language === "en" || i18n.language === "en-US" ? (
                      <>
                        {t("translation:global.currentLanguage")}
                        <ReactCountryFlag
                          countryCode="US"
                          className="ms-2 mb-1"
                          svg
                        />
                      </>
                    ) : (
                      <>
                        <p className="mb-0">
                          {t("translation:global.language")}
                        </p>
                      </>
                    )}
                  </div>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>

            <hr className="my-2" />

            <Link to="/donate" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">{t("translation:menu.donate")}</p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>

            <Link to="/contact" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">{t("translation:global.contactUs")}</p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>
          </ListGroup>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="p-0 mx-auto">
          <hr className="my-2" />

          <div className="text-center my-4">
            <SocialIcons />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Menu;
