import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

// Importing assets
import logo from "../assets/images/OPTI_noir.png";
import carpooling from "../assets/images/carpooling.png";

function Home() {
  const { isLoggedIn } = useSelector((state) => state.user);

  if (isLoggedIn) {
    return <Redirect to="/find" />;
  }

  return (
    <>
      <Container className="my-5">
        <Row className="mb-5">
          <Col xs={10} sm={8} md={6} lg={4} className="text-center mx-auto">
            <img src={logo} alt="Ride.CR logo" className="img-fluid" />
            <p className="lead mb-0">Share your rides in Costa Rica</p>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col xs={10} sm={8} md={6} lg={4} className="text-center">
            <img
              src={carpooling}
              alt="Ride.CR logo"
              width={400}
              className="img-fluid"
            />
          </Col>
          <Col xs={10} sm={8} md={6} lg={4} className="text-center">
            <h2 className="text-success">
              Your companion for all your travels in Costa Rica
            </h2>
            <p>
              Welcome to Ride.CR, the first carpooling application in Costa
              Rica: a practical and ecological way to travel and meet people.
            </p>
            <a
              href="http://ridecr.atwebpages.com/"
              target={"_blank"}
              rel="noreferrer"
            >
              <Button variant="outline-success">Learn more</Button>
            </a>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Home;
