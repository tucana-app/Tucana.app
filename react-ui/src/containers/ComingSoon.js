import React from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { history } from "../helpers/history";

function ComingSoon(props) {
  return (
    <>
      <ListGroup variant="flush">
        <Link
          to="#"
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
    </>
  );
}

export default ComingSoon;
