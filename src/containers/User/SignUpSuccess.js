import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

function SignUpSuccess(props) {
  const { isLoggedIn, signupUserSuccessful } = useSelector(
    (state) => state.user
  );

  if (isLoggedIn) {
    return <Redirect to="/rides" />;
  }

  if (!signupUserSuccessful) {
    return <Redirect to="/signup" />;
  }

  return (
    <>
      <Container className="py-5 text-center">
        <Row className="mb-5">
          <Col>
            <h1 className="text-success">Sign up successful!</h1>
            <p className="lead">Welcome to our platform 🎉</p>
          </Col>
        </Row>
        <Row>
          <Col>Check your email inbox to confirm your email address</Col>
        </Row>
      </Container>
    </>
  );
}

export default SignUpSuccess;
