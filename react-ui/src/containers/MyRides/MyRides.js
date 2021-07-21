import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faChevronRight,
  faLifeRing,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const MyRides = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container
      fluid
      className="p-0"
      data-aos="fade-in"
      data-aos-duration="1000"
    >
      <ListGroup variant="flush">
        <Link to="/my-rides/driver" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-3">
              <span>
                <FontAwesomeIcon icon={faCar} className="text-success me-3" />{" "}
                Ride offered
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </ListGroup.Item>
        </Link>

        <Link to="/bookings" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-3">
              <span>
                <FontAwesomeIcon
                  icon={faTicketAlt}
                  className="text-warning me-3"
                />{" "}
                My bookings
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </ListGroup.Item>
        </Link>

        <Link to="/help" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-3">
              <span>
                <FontAwesomeIcon
                  icon={faLifeRing}
                  className="text-danger me-3"
                />{" "}
                Help
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </ListGroup.Item>
        </Link>
      </ListGroup>
    </Container>
  );
};

export default MyRides;
