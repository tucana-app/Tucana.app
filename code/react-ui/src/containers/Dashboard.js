import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  return (
    <>
      <Container className="text-center mx-auto">
        <Row>
          <Col>
            <h1>Dashboard</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Welcome to the dashboard page</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
