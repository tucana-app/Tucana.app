import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div data-aos="fade-right">
      <Container className="text-light text-center my-5">
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

      <Footer />
    </div>
  );
};

export default Dashboard;
