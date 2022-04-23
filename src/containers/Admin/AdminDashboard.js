import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import { Link } from "react-router-dom";
import GoBack from "../../components/GoBack";
import { LinkContainer } from "react-router-bootstrap";

function AdminDashboard() {
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  // Handle redirection in case the user is already logged in
  if (!isLoggedIn || !currentUser.adminId) {
    return <Redirect to="/page-404" />;
  }

  return (
    <div>
      <GoBack />

      <Container className="my-5">
        <Row>
          <Col>
            <h1 className="display-4 text-success text-center">
              Admin dashboard
            </h1>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <LinkContainer to={`/admin/users`}>
              <Button variant="success">Users</Button>
            </LinkContainer>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <LinkContainer to={`/admin/rides`}>
              <Button variant="warning">Rides</Button>
            </LinkContainer>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <LinkContainer to={`/admin/ratings`}>
              <Button variant="secondary">Ratings</Button>
            </LinkContainer>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <LinkContainer to={`/admin/maps`}>
              <Button variant="light">Google Maps</Button>
            </LinkContainer>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
