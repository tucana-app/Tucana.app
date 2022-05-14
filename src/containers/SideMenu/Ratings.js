import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { ChevronRightIcon, CircleIcon } from "@primer/octicons-react";
import dateFormat from "dateformat";
import { LinkContainer } from "react-router-bootstrap";

import GoBack from "../../components/GoBack";

import { getRatingsToDoDriver, getRatingsToDoPassenger } from "../../redux";

function Ratings() {
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
        <Row className="mb-5">
          <Col>
            <h1 className="title text-center">Ratings</h1>
          </Col>
        </Row>

        <Row>
          <Col xs={6} className="text-center mb-4 mb-md-0">
            <h2 className="text-info mb-0">- / 5</h2>
            <p className="lead">Passenger</p>

            <LinkContainer to="/profile/passenger/ratings">
              <Button variant="info" size={"lg"}>
                Ratings
              </Button>
            </LinkContainer>
          </Col>

          <Col xs={6} className="text-center">
            <h2 className="text-warning mb-0">- / 5</h2>
            <p className="lead">Driver</p>

            <LinkContainer to="/profile/driver/ratings">
              <Button variant="warning" size={"lg"}>
                Ratings
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Container>

      {(!isLoadingGetRatingsToDoPassenger || !isLoadingGetRatingsToDoDriver) &&
      (getRatingsToDoPassengerData.length ||
        getRatingsToDoDriverData.length) ? (
        <ListGroup variant="flush" className="pt-4">
          <ListGroup.Item className="border-0">
            <p className="lead mb-0">Ratings to do</p>
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
                    <CircleIcon
                      size={12}
                      verticalAlign="middle"
                      className="text-danger me-2"
                    />
                    {ride.origin.city} - {ride.destination.city} (
                    {dateFormat(ride.dateTime, "dd/mm/yyyy")})
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
                    <CircleIcon
                      size={12}
                      verticalAlign="middle"
                      className="text-danger me-2"
                    />{" "}
                    {ride.origin.city} - {ride.destination.city} (
                    {dateFormat(ride.dateTime, "dd/mm/yyyy")})
                  </span>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      ) : null}
    </div>
  );
}

export default Ratings;
