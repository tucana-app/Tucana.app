import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import GoBack from "../components/GoBack";

function ComingSoon(props) {
  return (
    <div>
      <Container
        className="py-5 text-center"
        data-aos="fade-in"
        data-aos-duration="1000"
      >
        <Row>
          <Col>
            <h1 className="text-success">Coming soon</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ComingSoon;
