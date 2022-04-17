import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ChevronRightIcon } from "@primer/octicons-react";

import GoBack from "../../components/GoBack";

function MyDriverProfile(props) {
  const { isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div data-aos="slide-left">
      <GoBack />

      <Container className="py-5 text-center">
        <Row className="mb-4">
          <Col>
            <h1 className="text-success">Your driver's profile</h1>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center text-center text-sm-start mb-1">
          <Col xs={12} sm={4} className="text-md-end">
            <h4 className="text-secondary">Rating</h4>
          </Col>
          <Col xs={12} sm={4}>
            <h4>
              <span className="text-secondary">-</span> / 5
            </h4>
          </Col>
        </Row>

        <Row className="text-center mb-5">
          <Col>
            <LinkContainer to="/my-profile/driver/ratings">
              <Button variant="warning" size={"lg"} className="rounded-0">
                Ratings <ChevronRightIcon size={24} verticalAlign="middle" />
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyDriverProfile;
