import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import GoBack from "../../components/GoBack";

function MyPassengerProfile(props) {
  return (
    <div>
      <GoBack />

      <Container
        className="py-5 text-center"
        data-aos="fade-in"
        data-aos-duration="1000"
      >
        <Row>
          <Col>
            <h1 className="text-success">
              {props.pageName || "This page is under construction"}
            </h1>
            <p className="lead">
              Our website is still under construction.
              <br />
              Thank you for your understanding 🙂
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyPassengerProfile;