import React from "react";
import { useSelector } from "react-redux";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom";

import { history } from "../../helpers/history";

function SignUpSuccess(props) {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { signupUserSuccess } = useSelector((state) => state.signup);

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  if (!signupUserSuccess.isSuccessful) {
    return <Redirect to="/signup" />;
  }

  return (
    <>
      <Container className="py-5 text-center">
        <Row className="mb-5">
          <Col>
            <h1 className="text-success">Sign up successful!</h1>
            <p className="lead text-white">Welcome to our platform 🎉</p>
          </Col>
        </Row>
        <Row>
          <Col>
            You can now sign in by{" "}
            <Link to="/login" className="text-success">
              clicking here
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SignUpSuccess;
