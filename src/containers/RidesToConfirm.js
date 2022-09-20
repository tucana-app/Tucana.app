import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  DotFillIcon,
} from "@primer/octicons-react";
import dateFormat from "dateformat";

import LoadingSpinner from "../components/LoadingSpinner";
import GoBack from "../components/GoBack";

import { getRidesToConfirm } from "../redux";

function RidesToConfirm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingRidesToConfirm, ridesToConfirmData } = useSelector(
    (state) => state.ride
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getRidesToConfirm(currentUser.id));
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
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <h1 className="text-success text-center">
              {t("translation:ridesToConfirm.title")}
            </h1>
          </Col>
        </Row>
        {isLoadingRidesToConfirm ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : ridesToConfirmData.length ? (
          <Row>
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="px-0 mx-auto">
              <ListGroup variant="flush" className="mx-0 pt-4">
                {ridesToConfirmData.map((ride, index) => (
                  <Link
                    key={index}
                    to={`/ride/confirm/${ride.id}`}
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
                              {ride.origin.city}{" "}
                              <ArrowRightIcon verticalAlign="middle" />{" "}
                              {ride.destination.city}{" "}
                            </p>
                            <small>
                              {t("translation:global.date")}:{" "}
                              {dateFormat(ride.dateTimeOrigin, "dd/mm/yyyy")}
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
        ) : (
          <Row>
            <Col className="text-center">
              <p className="lead">{t("translation:ridesToConfirm.noRides")}</p>
              <LinkContainer to="/rides">
                <Button variant="success">
                  {t("translation:ridesToConfirm.goBack")}
                </Button>
              </LinkContainer>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default RidesToConfirm;
