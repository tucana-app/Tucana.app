import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ChevronRightIcon, CircleIcon } from "@primer/octicons-react";
import dateFormat from "dateformat";

import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";

import { getRidesToConfirm } from "../../redux";

function RidesToConfirm() {
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
    <div data-aos="slide-left">
      <GoBack />

      <Container className="pt-5">
        <Row>
          <Col>
            <h1 className="text-success text-center">Rides to confirm</h1>
          </Col>
        </Row>
      </Container>
      {isLoadingRidesToConfirm ? (
        <LoadingSpinner />
      ) : ridesToConfirmData.length ? (
        <ListGroup variant="flush" className="pt-4">
          {ridesToConfirmData.map((ride, index) => (
            <Link
              key={index}
              to={`/ride/${ride.id}`}
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
                    {ride.cityOrigin} - {ride.cityDestination} (
                    {dateFormat(ride.dateTime, "dd/mm/yyyy")})
                  </span>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      ) : (
        <Container>
          <Row>
            <Col className="text-center">
              <p className="lead">No rides to confirm.</p>
              <LinkContainer to="/rides">
                <Button variant="success">Go back to your rides</Button>
              </LinkContainer>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default RidesToConfirm;
