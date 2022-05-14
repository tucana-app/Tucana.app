import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import GoBack from "../components/GoBack";

const HowItWorks = () => {
  return (
    <div>
      <GoBack />

      <Container>
        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mx-auto"
          >
            <h1 className="title">How it works</h1>
            <p>Coming soon</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HowItWorks;
