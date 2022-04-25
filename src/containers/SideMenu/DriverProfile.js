import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ChevronRightIcon } from "@primer/octicons-react";

import GoBack from "../../components/GoBack";

function DriverProfile(props) {
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn || currentUser.Driver === null) {
    return <Redirect to="/" />;
  }
  return (
    <div data-aos="slide-left">
      <GoBack />

      <Container className="py-5 text-center">
        {currentUser.Driver && currentUser.Driver.id ? (
          <>
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
                <LinkContainer to="/profile/driver/ratings">
                  <Button variant="warning" size={"lg"}>
                    Ratings{" "}
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </Button>
                </LinkContainer>
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col className="text-center">
              <h3 className="fw-light">Driver's profile still under review</h3>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default DriverProfile;
