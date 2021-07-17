import React from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Settings() {
  return (
    <div data-aos="slide-left">
      <ListGroup variant="flush">
        <Link to="/menu" className="text-light text-decoration-none">
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

      <Container className="py-5 text-center">
        <Row>
          <Col>
            <h1 className="display-4 text-success">Settings</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-light">Coming soon</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Settings;
