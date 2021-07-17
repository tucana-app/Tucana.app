import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function ComingSoon(props) {
  return (
    <Container className="py-5 text-center" data-aos="slide-left">
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
  );
}

export default ComingSoon;
