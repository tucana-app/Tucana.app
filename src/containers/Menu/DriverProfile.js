import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
// import { ChevronRightIcon } from "@primer/octicons-react";

import GoBack from "../../components/GoBack";

function DriverProfile(props) {
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn || currentUser.Driver === null) {
    return <Redirect to="/" />;
  }
  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container>
        <Row className="mb-5">
          <Col>
            <h1 className="title text-center">Your driver's profile</h1>
          </Col>
        </Row>

        {currentUser.Driver && currentUser.Driver.id ? (
          <>
            {/* RATINGS */}
            {/* <Row className="justify-content-center align-items-center text-center text-sm-start mb-1">
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
            </Row> */}
          </>
        ) : (
          <Row>
            <Col className="text-center">
              <p className="mb-0">Your submission is still under review</p>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default DriverProfile;
