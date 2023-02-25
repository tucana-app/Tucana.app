import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, Button, Badge } from "react-bootstrap";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  DotFillIcon,
  StarFillIcon,
} from "@primer/octicons-react";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";

import GoBack from "../../components/GoBack";

import {
  getRatingsToDoDriver,
  getRatingsToDoPassenger,
  updateUserRatings,
} from "../../redux";
import { LinkContainer } from "react-router-bootstrap";

function Ratings() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isLoadingGetRatingsToDoDriver,
    getRatingsToDoDriverData,
    isLoadingGetRatingsToDoPassenger,
    getRatingsToDoPassengerData,
  } = useSelector((state) => state.rating);

  var ratingsToDo =
    getRatingsToDoDriverData.length + getRatingsToDoPassengerData.length;

  useEffect(() => {
    if (isLoggedIn) {
      if (currentUser.Driver) {
        dispatch(getRatingsToDoDriver(currentUser.id, currentUser.Driver.id));
      }
      dispatch(getRatingsToDoPassenger(currentUser.id));
      dispatch(updateUserRatings(currentUser.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container>
        <Row className="mb-3">
          <Col>
            <h1 className="title text-center">
              {t("translation:ratings.title")}
            </h1>
          </Col>
        </Row>

        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mx-auto"
          >
            <Container className="p-0">
              <Row>
                <Col>
                  {currentUser.Rating.passengerRating > 0 ? (
                    <div className="d-inline-flex align-items-center">
                      <StarFillIcon size={26} className="text-warning me-2" />
                      <h1 className="fw-bold mb-0">
                        {currentUser.Rating.passengerRating}{" "}
                      </h1>
                    </div>
                  ) : (
                    <div className="d-inline-flex align-items-center">
                      <h1 className="fw-bold mb-0">-</h1>
                    </div>
                  )}

                  <p className="lead">{t("translation:global.passenger")}</p>

                  <LinkContainer to="/profile/passenger/ratings">
                    <Button variant="success" size={"lg"}>
                      {t("translation:global.view")}
                    </Button>
                  </LinkContainer>
                </Col>
                {currentUser.Driver ? (
                  <Col>
                    <div className="d-inline-flex align-items-center">
                      {currentUser.Rating.driverRating > 0 ? (
                        <div className="d-inline-flex align-items-center">
                          <StarFillIcon
                            size={26}
                            className="text-warning me-2"
                          />
                          <h1 className="fw-bold mb-0">
                            {currentUser.Rating.driverRating}{" "}
                          </h1>
                        </div>
                      ) : (
                        <div className="d-inline-flex align-items-center">
                          <h1 className="fw-bold mb-0">-</h1>
                        </div>
                      )}
                    </div>

                    <p className="lead">{t("translation:global.driver")}</p>

                    <LinkContainer to="/profile/driver/ratings">
                      <Button variant="success" size={"lg"}>
                        {t("translation:global.view")}
                      </Button>
                    </LinkContainer>
                  </Col>
                ) : null}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>

      {(!isLoadingGetRatingsToDoPassenger || !isLoadingGetRatingsToDoDriver) &&
      (getRatingsToDoPassengerData.length ||
        getRatingsToDoDriverData.length) ? (
        <Container className="mt-5">
          <Row>
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="px-0 mx-auto">
              <div className="d-inline-flex align-items-center">
                <h3 className="ms-3">{t("translation:ratings.toDo")}</h3>
                <span className="mb-2">
                  {ratingsToDo ? (
                    <Badge bg="danger" className="ms-2">
                      {ratingsToDo}
                    </Badge>
                  ) : null}
                </span>
              </div>

              <ListGroup variant="flush" className="mx-0">
                {getRatingsToDoPassengerData.map((booking, index) => (
                  <Link
                    key={index}
                    to={`/ratings/new-rating/${booking.id}`}
                    className="text-decoration-none"
                  >
                    <ListGroup.Item className="border border-start-0 border-end-0">
                      <Container className="mx-0 px-0">
                        <Row className="align-items-center">
                          <Col xs={1} className="mx-0 px-0">
                            <span>
                              <DotFillIcon
                                size={24}
                                className="text-success me-2"
                              />
                            </span>
                          </Col>
                          <Col className="ps-0">
                            <p className="mb-0">
                              {booking.Ride.origin.placeName}{" "}
                              <ArrowRightIcon verticalAlign="middle" />{" "}
                              {booking.Ride.destination.placeName}{" "}
                            </p>
                            <small className="text-secondary">
                              {dateFormat(
                                booking.Ride.dateTimeOrigin,
                                "dd/mm/yyyy"
                              )}
                            </small>
                          </Col>
                          <Col xs={1} className="mx-0 px-0">
                            <ChevronRightIcon
                              size={24}
                              verticalAlign="middle"
                            />
                          </Col>
                        </Row>
                      </Container>
                    </ListGroup.Item>
                  </Link>
                ))}

                {getRatingsToDoDriverData.map((booking, index) => (
                  <Link
                    key={index}
                    to={`/ratings/new-rating/${booking.id}`}
                    className="text-decoration-none"
                  >
                    <ListGroup.Item className="border border-start-0 border-end-0">
                      <Container className="mx-0 px-0">
                        <Row className="align-items-center">
                          <Col xs={1} className="mx-0 px-0">
                            <span>
                              <DotFillIcon
                                size={24}
                                className="text-success me-2"
                              />
                            </span>
                          </Col>
                          <Col className="ps-0">
                            <p className="mb-0">
                              {booking.Ride.origin.placeName}{" "}
                              <ArrowRightIcon verticalAlign="middle" />{" "}
                              {booking.Ride.destination.placeName}{" "}
                            </p>
                            <small className="text-secondary">
                              {dateFormat(
                                booking.Ride.dateTimeOrigin,
                                "dd/mm/yyyy"
                              )}
                            </small>
                          </Col>
                          <Col xs={1} className="mx-0 px-0">
                            <ChevronRightIcon
                              size={24}
                              verticalAlign="middle"
                            />
                          </Col>
                        </Row>
                      </Container>
                    </ListGroup.Item>
                  </Link>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      ) : null}
    </div>
  );
}

export default Ratings;
