import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import {
  ChevronRightIcon,
  LinkExternalIcon,
  // CheckCircleFillIcon,
} from "@primer/octicons-react";
import dateFormat from "dateformat";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

import { logout } from "../../redux";

// Importing assets
import logo from "../../assets/images/OPTI_noir.png";
import SocialIcons from "../../components/SocialIcons";
import { PersonCircle } from "react-bootstrap-icons";

const Menu = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const history = useHistory();
  const {
    isLoadingDriverNewRidesRequests,
    driverNewRidesRequestsData,
    isLoadingPassengerBookingsResponses,
    passengerBookingsResponsesData,
  } = useSelector((state) => state.notification);

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

  const logOut = () => {
    history.push("/");
    dispatch(logout());
  };

  return (
    <Container fluid data-aos="fade-in" className="pb-4">
      {isLoggedIn ? (
        <Row className="my-4">
          <Col className="text-center">
            <p>
              <Link to="/account" className="text-decoration-none">
                <PersonCircle size={62} className="text-secondary me-2" />
              </Link>
            </p>
            <h3 className="mb-0">{currentUser.firstName}</h3>
            <p className="lead">{currentUser.email}</p>

            <p className="small text-secondary mb-0">
              {t("translation:menu.memberSince")}:{" "}
              {dateFormat(currentUser.createdAt, "mm/yyyy")}
            </p>
          </Col>
        </Row>
      ) : null}

      <Row>
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="p-0 mx-auto">
          <ListGroup variant="flush">
            {isLoggedIn ? (
              <>
                <hr className="my-2" />

                <Link to="/account" className="text-decoration-none">
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <p className="mb-0">{t("translation:menu.account")}</p>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>

                {currentUser.Driver ? (
                  <Link to="/profile/" className="text-decoration-none">
                    <ListGroup.Item className="border-0">
                      <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                        <p className="mb-0">
                          {t("translation:global.driverProfile")}
                        </p>
                        <ChevronRightIcon size={24} verticalAlign="middle" />
                      </div>
                    </ListGroup.Item>
                  </Link>
                ) : (
                  <Link to="/become-driver" className="text-decoration-none">
                    <ListGroup.Item className="border-0">
                      <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                        <p className="text-success mb-0">
                          {t("translation:global.becomeDriver")}
                        </p>
                        <ChevronRightIcon size={24} verticalAlign="middle" />
                      </div>
                    </ListGroup.Item>
                  </Link>
                )}

                <hr className="my-2" />

                {/* <Link to="/verification" className="text-decoration-none">
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <p className="mb-0">
                        {t("translation:global.getVerified")}{" "}
                        <CheckCircleFillIcon
                          size={24}
                          className="text-success"
                        />
                      </p>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link> */}

                <Link to="/ratings" className="text-decoration-none">
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <p className="mb-0">{t("translation:menu.ratings")}</p>

                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>

                <Link to="/help" className="text-decoration-none">
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <p className="mb-0">{t("translation:global.help")}</p>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>

                {/* <hr className="my-2" />

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

                {/* <hr className="my-2" />

                <Link to="/notifications" className="text-decoration-none">
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
              </>
            ) : (
              <>
                <Link to="/" className="text-decoration-none">
                  <ListGroup.Item className="text-center border-0 py-4">
                    <div className="d-inline mx-auto">
                      <img
                        src={logo}
                        alt="Tucána logo"
                        className="img-fluid"
                        style={{ maxWidth: "200px" }}
                      />
                    </div>
                  </ListGroup.Item>
                </Link>

                <hr className="my-2" />

                <Link to="/login" className="text-decoration-none">
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <p className="mb-0">{t("translation:global.logIn")}</p>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>

                <Link to="/signup" className="text-decoration-none">
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <p className="mb-0">{t("translation:global.signUp")}</p>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>

                <Link to="/help" className="text-decoration-none">
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <p className="mb-0">{t("translation:global.help")}</p>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>
              </>
            )}

            <hr className="my-2" />

            <Link to="/language" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <div className="mb-0">
                    {i18n.language === "es" ? (
                      <>
                        {t("translation:global.currentLanguage")}
                        <ReactCountryFlag
                          countryCode="CR"
                          className="ms-2 mb-1"
                          svg
                        />
                      </>
                    ) : i18n.language === "fr" ? (
                      <>
                        {t("translation:global.currentLanguage")}
                        <ReactCountryFlag
                          countryCode="FR"
                          className="ms-2 mb-1"
                          svg
                        />
                      </>
                    ) : (
                      <>
                        {t("translation:global.currentLanguage")}
                        <ReactCountryFlag
                          countryCode="US"
                          className="ms-2 mb-1"
                          svg
                        />
                      </>
                    )}
                  </div>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>

            <Link to="/map" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">{t("translation:global.maps")}</p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>

            <hr className="my-2" />

            <Link to="/donate" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="text-success fw-bold mb-0">
                    {t("translation:menu.donate")}
                  </p>
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

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe5ryLUu84X7IELlLQO3XWfYajW4wj47Y-CkhVBQJsWGoh_4Q/viewform?usp=sf_link"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none"
            >
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">{t("translation:menu.feedback")}</p>
                  <LinkExternalIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </a>

            <a
              href="https://fund.tucana.app"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none"
            >
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">{t("translation:menu.about")}</p>
                  <LinkExternalIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </a>

            <Link to="/hiring" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">{t("translation:hiring.title")}</p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>

            <hr className="my-2" />

            <Link to="/legal" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">{t("translation:menu.legal")}</p>
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

          <div className="text-center pt-3">
            <SocialIcons />
          </div>
        </Col>
      </Row>

      {isLoggedIn ? (
        <Row>
          <Col className="text-center">
            <Button
              onClick={logOut}
              variant="link"
              className="link-success text-decoration-none mt-4"
            >
              <p className="mb-0 py-1">{t("translation:menu.logOut")}</p>
            </Button>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
};

export default Menu;
