import React from "react";
import { withTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import FindRide from "./FindRide";

// Importing components
// import { Button } from "react-bootstrap";

function Home({ t }) {
  // const dispatch = useDispatch();
  // const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <>
      <Container className="py-0">
        <Row className="my-5">
          <Col className="d-block d-sm-inline-flex justify-content-center align-items-center text-center">
            <img
              src="./assets/images/logo-512.png"
              alt="Ride.CR logo"
              className="img-thumbnail img-fluid"
              style={{ width: "100px" }}
            />

            <div className="brand ms-0 mt-3 ms-sm-3 mt-sm-0">
              <h1 className="">Ride.CR</h1>
              <p className="lead mb-0">Share your rides in Costa Rica</p>
            </div>
          </Col>
        </Row>
      </Container>

      <FindRide />
    </>
  );
}
export default withTranslation()(Home);
