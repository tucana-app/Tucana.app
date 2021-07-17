import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Form,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { history } from "../../helpers/history";

function MyAccount() {
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div fluid data-aos="slide-left">
      <ListGroup variant="flush">
        <Link
          to="/menu"
          onClick={() => history.goBack()}
          className="text-light text-decoration-none"
        >
          <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-3">
              <span>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-success me-3"
                />{" "}
                Go back
              </span>
            </div>
          </ListGroup.Item>
        </Link>
      </ListGroup>

      <Container className="my-5">
        <Row className="mb-5">
          <Col>
            <h1 className="text-success text-center">My information</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4} className="font-monospace">
                  Username
                </Form.Label>
                <Col sm={8}>
                  <FormControl
                    defaultValue={currentUser.username}
                    readOnly
                    plaintext
                    className="bg-light rounded-0"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4} className="font-monospace">
                  Email
                </Form.Label>
                <Col sm={8}>
                  <FormControl
                    defaultValue={currentUser.email}
                    readOnly
                    plaintext
                    className="bg-light rounded-0"
                  />
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyAccount;
