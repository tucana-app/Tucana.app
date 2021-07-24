import React from "react";
// import { useDispatch } from "react-redux";
import { withTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import FindRide from "./FindRide";

// Importing components
// import { Button } from "react-bootstrap";

// import { setShowLoginToast } from "../redux";

// Importing assets
import logo from "../assets/images/OPTI_blanc.png";

function Home({ t }) {
  // const dispatch = useDispatch();
  // const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col xs={10} sm={8} md={6} lg={4} className="mx-auto">
            <img src={logo} alt="Ride.CR logo" className="img-fluid" />
          </Col>
        </Row>
        <Row>
          <Col xs={10} sm={8} md={6} lg={4} className="text-center mx-auto">
            <p className="lead mb-0">Share your rides in Costa Rica</p>
          </Col>
        </Row>
      </Container>

      <FindRide />
    </>
  );
}
export default withTranslation()(Home);
