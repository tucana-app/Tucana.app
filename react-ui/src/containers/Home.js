import React from "react";
import { useSelector } from "react-redux";
import { IndexLinkContainer } from "react-router-bootstrap";
import { withTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";

// Importing components
// import FormSearch from "../components/FormSearch";
import { Button } from "react-bootstrap";

function Home({ t }) {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <>
      <Container className="py-0">
        <Row className="my-5">
          <Col className="d-block d-sm-inline-flex justify-content-center align-items-center text-center">
            <img
              src="./assets/images/logo-512.png"
              alt="Company logo"
              className="img-thumbnail img-fluid"
              style={{ width: "100px" }}
            />

            <div className="brand ms-0 mt-3 ms-sm-3 mt-sm-0">
              <h1 className="">Ride.CR</h1>
              <p className="lead mb-0">Share your rides in Costa Rica</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h1 className="font-title text-success">Welcome 👋</h1>
            <p className="lead text-white">
              Here you can offer or book rides to travel accross Costa Rica{" "}
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default withTranslation()(Home);
