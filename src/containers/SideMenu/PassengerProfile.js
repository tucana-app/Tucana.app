import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  ChevronRightIcon,
  StarFillIcon,
  CircleIcon,
} from "@primer/octicons-react";
import dateFormat from "dateformat";

import GoBack from "../../components/GoBack";

function PassengerProfile() {
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="slide-left">
      <GoBack />

      <Container className="pt-5 text-center">
        <Row>
          <Col className="text-center">
            <CircleIcon size={78} className="text-secondary" />
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col xs={12} sm={4} className="text-center">
            <h3 className="mb-0">
              {currentUser.firstName} {currentUser.lastName}{" "}
            </h3>
            <p>
              <Link to="/coming-soon">Edit</Link>
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-1">
          <Col xs={12} sm={4} className="text-center">
            <h4>
              <span className="text-secondary">
                <StarFillIcon size={24} className="text-warning me-2 mb-1" />-
              </span>
              /5
            </h4>
          </Col>
        </Row>

        <Row className="text-center mb-5">
          <Col>
            <LinkContainer to="/profile/passenger/ratings">
              <Button variant="warning" size={"lg"}>
                Ratings <ChevronRightIcon size={24} />
              </Button>
            </LinkContainer>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col className="text-end">
            <span className="text-secondary">Username</span>
          </Col>
          <Col className="text-start">
            <span>{currentUser.username}</span>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col className="text-end">
            <span className="text-secondary">Email</span>
          </Col>
          <Col className="text-start">
            <span>{currentUser.email}</span>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col className="text-end">
            <span className="text-secondary">Phone number</span>
          </Col>
          <Col className="text-start">
            <span>{currentUser.phoneNumber}</span>
          </Col>
        </Row>

        {/* <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col className="text-end">
            <span className="text-secondary">Biography</span>
          </Col>
          <Col className="text-start">
            <span>{currentUser.biography}</span>
          </Col>
        </Row> */}

        {/* <Row className="justify-content-center align-items-center text-center text-sm-start mb-3">
          <Col className="text-end">
            <span className="text-secondary">Phone verified</span>
          </Col>
          <Col className="text-start">
            {currentUser.phoneConfirmed ? (
              <span className="text-success">
                        <CheckIcon size={24} className="me-2" />
                Yes
              </span>
            ) : (
              <span className="text-danger">
                        <XIcon size={24} className="me-2" />
                No
              </span>
            )}
          </Col>
        </Row> */}

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-5">
          <Col className="text-end">
            <span className="text-secondary">Member since</span>
          </Col>
          <Col className="text-start">
            {dateFormat(currentUser.createdAt, "dd/mm/yyyy")}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PassengerProfile;
