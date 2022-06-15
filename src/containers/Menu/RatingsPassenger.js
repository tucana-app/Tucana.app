import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ChevronRightIcon,
  DotFillIcon,
  StarFillIcon,
} from "@primer/octicons-react";
import dateFormat from "dateformat";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";

import {
  getRatingsToDoPassenger,
  getRatingsReceivedPassenger,
  getRatingsGivenPassenger,
} from "../../redux";

function RatingsPassenger() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isLoadingGetRatingsToDoPassenger,
    getRatingsToDoPassengerData,
    isLoadingGetRatingsReceivedPassenger,
    getRatingsReceivedPassengerData,
    isLoadingGetRatingsGivenPassenger,
    getRatingsGivenPassengerData,
  } = useSelector((state) => state.rating);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getRatingsToDoPassenger(currentUser.id));
      dispatch(getRatingsReceivedPassenger(currentUser.id));
      dispatch(getRatingsGivenPassenger(currentUser.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container fluid>
        <Row>
          <Col className="text-center">
            <h1 className="title mb-0">{t("translation:ratings.title")}</h1>
            <p className="lead">{t("translation:ratings.asPassenger")}</p>
          </Col>
        </Row>
      </Container>

      {!isLoadingGetRatingsToDoPassenger &&
      getRatingsToDoPassengerData.length ? (
        <ListGroup variant="flush" className="mb-2">
          <Link to="/ratings" className="text-decoration-none">
            <ListGroup.Item className="border border-start-0 border-end-0 ">
              <div className="d-inline-flex justify-content-between w-100 py-2">
                <span>
                  <DotFillIcon size={24} className="text-success me-2" />
                  {t("translation:ratings.toDo")}
                  <Badge bg="danger" className="align-text-top ms-2">
                    {getRatingsToDoPassengerData.length}
                  </Badge>
                </span>
                <ChevronRightIcon size={24} verticalAlign="middle" />
              </div>
            </ListGroup.Item>
          </Link>
        </ListGroup>
      ) : null}

      <Container>
        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="px-0 mx-auto">
            <Tabs className="tab-rating mb-3" defaultActiveKey="received">
              <Tab
                eventKey="received"
                title={t("translation:global.received")}
                className="pt-3"
              >
                {isLoadingGetRatingsReceivedPassenger ? (
                  <div className="text-center">
                    <LoadingSpinner />
                  </div>
                ) : !getRatingsReceivedPassengerData.length ? (
                  <Container>
                    <Row>
                      <Col>
                        <p className="text-center">
                          {t("translation:ratings.noRatingsYou")}
                        </p>
                      </Col>
                    </Row>
                  </Container>
                ) : getRatingsReceivedPassengerData.length > 0 ? (
                  getRatingsReceivedPassengerData.map((rating, index) => (
                    <div key={index}>
                      {rating.admin_VerifPassengerRating ? (
                        <Container className="px-1">
                          <Row>
                            <Col xs={9}>
                              <h4 className="mb-3">
                                {rating.Driver.User.firstName}{" "}
                              </h4>
                            </Col>
                            <Col
                              xs={3}
                              className="d-inline-flex align-items-center"
                            >
                              <h4 className="fw-bold mb-0">
                                <span className="text-success">
                                  {rating.value}
                                </span>
                              </h4>
                              <StarFillIcon
                                size={24}
                                className="text-warning ms-2"
                              />
                            </Col>
                            <Col xs={12}>
                              <p className="mb-0">{rating.comment}</p>
                            </Col>
                            <Col xs={12}>
                              <small className="smaller text-secondary">
                                {dateFormat(rating.createdAt, "dd/mm/yyyy")}
                              </small>
                            </Col>
                          </Row>
                          <hr className="text-secondary" />
                        </Container>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <p>{t("translation:ratings.noRatings")}</p>
                )}
              </Tab>
              <Tab
                eventKey="given"
                title={t("translation:global.given")}
                className="pt-3"
              >
                {isLoadingGetRatingsGivenPassenger ? (
                  <div className="text-center">
                    <LoadingSpinner />
                  </div>
                ) : !getRatingsGivenPassengerData.length ? (
                  <Container>
                    <Row>
                      <Col>
                        <p className="text-center">
                          {t("translation:ratings.noYouRatings")}
                        </p>
                      </Col>
                    </Row>
                  </Container>
                ) : getRatingsGivenPassengerData.length > 0 ? (
                  getRatingsGivenPassengerData.map((rating, index) => (
                    <div key={index}>
                      {rating.admin_VerifDriverRating ? (
                        <Container className="px-1">
                          <Row>
                            <Col xs={9}>
                              <h4 className="mb-3">
                                {rating.Driver.User.firstName}{" "}
                              </h4>
                            </Col>
                            <Col
                              xs={3}
                              className="d-inline-flex align-items-center"
                            >
                              <h4 className="fw-bold mb-0">
                                <span className="text-success">
                                  {rating.value}
                                </span>
                                <span>/5</span>
                              </h4>
                              <StarFillIcon
                                size={24}
                                className="text-warning ms-2"
                              />
                            </Col>
                            <Col xs={12}>
                              <p className="mb-0">{rating.comment}</p>
                            </Col>
                            <Col xs={12}>
                              <small className="smaller text-secondary">
                                {dateFormat(rating.createdAt, "dd/mm/yyyy")}
                              </small>
                            </Col>
                          </Row>
                          <hr className="text-secondary" />
                        </Container>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <p>{t("translation:ratings.noRatings")}</p>
                )}
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RatingsPassenger;
