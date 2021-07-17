import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function ComingSoon(props) {
  return (
    <div data-aos="slide-left">
      <Container className="py-5 text-center">
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

export default ComingSoon;
