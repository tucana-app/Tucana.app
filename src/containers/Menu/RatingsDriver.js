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
  getRatingsToDoDriver,
  getRatingsReceivedDriver,
  getRatingsGivenDriver,
} from "../../redux";

function RatingsDriver() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isLoadingGetRatingsToDoDriver,
    getRatingsToDoDriverData,
    isLoadingGetRatingsReceivedDriver,
    getRatingsReceivedDriverData,
    isLoadingGetRatingsGivenDriver,
    getRatingsGivenDriverData,
  } = useSelector((state) => state.rating);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getRatingsToDoDriver(currentUser.id));
      dispatch(getRatingsReceivedDriver(currentUser.id));
      dispatch(getRatingsGivenDriver(currentUser.id));
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
            <p className="lead">{t("translation:ratings.asDriver")}</p>
          </Col>
        </Row>
      </Container>

      {!isLoadingGetRatingsToDoDriver && getRatingsToDoDriverData.length ? (
        <ListGroup variant="flush" className="mb-2">
          <Link to="/ratings" className="text-decoration-none">
            <ListGroup.Item className="border border-start-0 border-end-0 ">
              <div className="d-inline-flex justify-content-between w-100 py-2">
                <span>
                  <DotFillIcon size={24} className="text-success me-2" />
                  {t("translation:ratings.toDo")}
                  <Badge bg="danger" className="align-text-top ms-2">
                    {getRatingsToDoDriverData.length}
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
                {isLoadingGetRatingsReceivedDriver ? (
                  <div className="text-center">
                    <LoadingSpinner />
                  </div>
                ) : !getRatingsReceivedDriverData.length ? (
                  <Container>
                    <Row>
                      <Col>
                        <p className="text-center">
                          {t("translation:ratings.noRatingsYou")}
                        </p>
                      </Col>
                    </Row>
                  </Container>
                ) : getRatingsReceivedDriverData.length > 0 ? (
                  getRatingsReceivedDriverData.map((rating, index) => (
                    <div key={index}>
                      {rating.admin_VerifDriverRating ? (
                        <Container className="px-1">
                          <Row>
                            <Col xs={9}>
                              <h4 className="mb-3">{rating.User.firstName} </h4>
                            </Col>
                            <Col
                              xs={3}
                              className="d-inline-flex align-items-center"
                            >
                              <StarFillIcon
                                size={24}
                                className="text-warning me-2"
                              />
                              <h4 className="fw-bold mb-0">
                                <span>{rating.value}</span>
                              </h4>
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
                {isLoadingGetRatingsGivenDriver ? (
                  <div className="text-center">
                    <LoadingSpinner />
                  </div>
                ) : !getRatingsGivenDriverData.length ? (
                  <Container>
                    <Row>
                      <Col>
                        <p className="text-center">
                          {t("translation:ratings.noYouRatings")}
                        </p>
                      </Col>
                    </Row>
                  </Container>
                ) : getRatingsGivenDriverData.length > 0 ? (
                  getRatingsGivenDriverData.map((rating, index) => (
                    <div key={index}>
                      {rating.admin_VerifPassengerRating ? (
                        <Container className="px-1">
                          <Row>
                            <Col xs={9}>
                              <h4 className="mb-3">{rating.User.firstName} </h4>
                            </Col>
                            <Col
                              xs={3}
                              className="d-inline-flex align-items-center"
                            >
                              <StarFillIcon
                                size={24}
                                className="text-warning me-2"
                              />
                              <h4 className="fw-bold mb-0">
                                <span>{rating.value}</span>
                              </h4>
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

export default RatingsDriver;
