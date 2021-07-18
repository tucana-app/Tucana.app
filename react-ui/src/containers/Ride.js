import React from "react";
import ComingSoon from "./ComingSoon";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function Ride() {
  const { rideId } = useParams();
  return (
    <div>
      <ListGroup variant="flush">
        <Link to="/find-ride" className="text-light text-decoration-none">
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

      <Container>
        <ComingSoon pageName={`Ride #${rideId} page`} data-aos="slide-left" />
      </Container>
    </div>
  );
}

export default Ride;
