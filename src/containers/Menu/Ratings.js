import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { ChevronRightIcon, DotFillIcon } from "@primer/octicons-react";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";

import GoBack from "../../components/GoBack";

import { getRatingsToDoDriver, getRatingsToDoPassenger } from "../../redux";
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

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getRatingsToDoPassenger(currentUser.id));
      dispatch(getRatingsToDoDriver(currentUser.id));
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
                  <h1 className="fw-bold mb-0">
                    {currentUser.passengerRating > 0 ? (
                      <span>{currentUser.passengerRating}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </h1>
                  <p className="lead">{t("translation:global.passenger")}</p>

                  <LinkContainer to="/profile/passenger/ratings">
                    <Button variant="success" size={"lg"}>
                      {t("translation:global.view")}
                    </Button>
                  </LinkContainer>
                </Col>
                {currentUser.Driver ? (
                  <Col>
                    <h1 className="fw-bold mb-0">
                      {currentUser.driverRating > 0 ? (
                        <span>{currentUser.driverRating}</span>
                      ) : (
                        <span>-</span>
                      )}
                    </h1>
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
        <Container>
          <Row>
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="px-0 mx-auto">
              <ListGroup variant="flush" className="pt-4">
                <ListGroup.Item className="border-0">
                  <p className="lead mb-0">{t("translation:ratings.toDo")}</p>
                </ListGroup.Item>

                {getRatingsToDoPassengerData.map((ride, index) => (
                  <Link
                    key={index}
                    to={`/ratings/new-rating/${ride.id}`}
                    className="text-decoration-none"
                  >
                    <ListGroup.Item className="border border-start-0 border-end-0 ">
                      <div className="d-inline-flex justify-content-between w-100 py-2">
                        <span>
                          <DotFillIcon
                            size={24}
                            className="text-success me-2"
                          />
                          {ride.origin.city} - {ride.destination.city} (
                          {dateFormat(ride.dateTimeOrigin, "dd/mm/yyyy")})
                        </span>
                        <ChevronRightIcon size={24} verticalAlign="middle" />
                      </div>
                    </ListGroup.Item>
                  </Link>
                ))}

                {getRatingsToDoDriverData.map((ride, index) => (
                  <Link
                    key={index}
                    to={`/ratings/new-rating/${ride.id}`}
                    className="text-decoration-none"
                  >
                    <ListGroup.Item className="border border-start-0 border-end-0 ">
                      <div className="d-inline-flex justify-content-between w-100 py-2">
                        <span>
                          <DotFillIcon
                            size={24}
                            className="text-success me-2"
                          />
                          {ride.origin.city} - {ride.destination.city} (
                          {dateFormat(ride.dateTimeOrigin, "dd/mm/yyyy")})
                        </span>
                        <ChevronRightIcon size={24} verticalAlign="middle" />
                      </div>
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
