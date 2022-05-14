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
import { ChevronRightIcon, CircleIcon } from "@primer/octicons-react";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";

import {
  getRatingsToDoPassenger,
  getRatingsReceivedPassenger,
  getRatingsGivenPassenger,
} from "../../redux";

function RatingsPassenger() {
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
            <h1 className="title mb-0">Ratings</h1>
            <p className="lead">As a passenger</p>
          </Col>
        </Row>
      </Container>

      {isLoadingGetRatingsToDoPassenger ? (
        <Row>
          <Col className="text-center">
            <LoadingSpinner />
          </Col>
        </Row>
      ) : getRatingsToDoPassengerData.length ? (
        <ListGroup variant="flush" className="mb-2">
          <Link to="/ratings" className="text-decoration-none">
            <ListGroup.Item className="border border-start-0 border-end-0 ">
              <div className="d-inline-flex justify-content-between w-100 py-2">
                <span>
                  <CircleIcon
                    size={12}
                    verticalAlign="middle"
                    className="text-danger me-2"
                  />
                  Ratings to do
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

      <Tabs className="tabRating mb-3" defaultActiveKey="received">
        <Tab eventKey="received" title="Received" className="mx-auto">
          {isLoadingGetRatingsReceivedPassenger ? (
            <LoadingSpinner />
          ) : !getRatingsReceivedPassengerData.length ? (
            <Container>
              <Row>
                <Col>
                  <p className="text-center">
                    It seems that no one has left you a rating yet
                  </p>
                </Col>
              </Row>
            </Container>
          ) : null}
        </Tab>
        <Tab eventKey="given" title="Given">
          {isLoadingGetRatingsGivenPassenger ? (
            <LoadingSpinner />
          ) : !getRatingsGivenPassengerData.length ? (
            <Container>
              <Row>
                <Col>
                  <p className="text-center">
                    It seems that you haven't left a rating yet
                  </p>
                </Col>
              </Row>
            </Container>
          ) : null}
        </Tab>
      </Tabs>
    </div>
  );
}

export default RatingsPassenger;
