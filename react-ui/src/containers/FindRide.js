import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Spinner,
  Alert,
  ListGroup,
  Accordion,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";

import { getAllRides } from "../redux";

const FindRide = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingAllRidesList, allRidesListData, allRidesListError } =
    useSelector((state) => state.ride);

  useEffect(() => {
    dispatch(getAllRides());
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="mt-4" data-aos="slide-right">
      {isLoadingAllRidesList ? (
        <Row>
          <Col className="text-center">
            <Spinner
              animation="border"
              role="status"
              as="span"
              aria-hidden="true"
              className="align-middle me-2"
              variant="success"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
            Fetching your rides...
          </Col>
        </Row>
      ) : (
        <>
          <Row className="justify-content-center">
            <Col>
              <div className="text-center mb-4">
                <h1 className="font-title text-success mb-0">Find your ride</h1>
                <p className="lead">
                  There are{" "}
                  <span className="fw-bold text-success">
                    {!(allRidesListData.length === 0)
                      ? allRidesListData.length
                      : "no"}{" "}
                  </span>
                  rides available
                </p>
              </div>
            </Col>
          </Row>

          {!(allRidesListData.length === 0) ? (
            <>
              <Row className="mx-1 mx-sm-2 mx-md-5">
                {allRidesListData.map((ride, index) => (
                  <Col
                    key={index}
                    md={12}
                    lg={6}
                    className=" border py-3"
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay={index * 150}
                    data-aos-once="true"
                  >
                    <Link to={`/ride/${ride.id}`}>
                      <h1 className="h5 text-center">
                        {ride.cityOrigin}{" "}
                        <FontAwesomeIcon icon={faArrowRight} size="sm" />{" "}
                        {ride.cityDestination} -{" "}
                        {dateFormat(ride.dateTime, "dd/mm/yyyy")}
                      </h1>
                    </Link>
                    <p className="mb-0">
                      <strong>Origin:</strong>{" "}
                      <span className="text-success">{ride.cityOrigin} </span>
                      <small className="text-success">
                        (province: {ride.provinceOrigin})
                      </small>
                    </p>
                    <p className="mb-0">
                      <strong>Destination:</strong>{" "}
                      <span className="text-danger">
                        {ride.cityDestination}
                      </span>{" "}
                      <small className="text-danger">
                        (province: {ride.provinceDestination})
                      </small>
                    </p>
                    <p className="mb-0">
                      <strong>Date/time:</strong>{" "}
                      {dateFormat(ride.dateTime, "dd/mm/yyyy @ HH:MM TT")}
                    </p>
                    <p className="mb-0">
                      <strong>Seats left:</strong> {ride.seatsLeft}/
                      {ride.seatsAvailable}
                    </p>
                    <p className="mb-0">
                      <strong>Driver:</strong> "{ride.Users[0].username}"
                    </p>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <Row>
              <Col className="text-center">
                <p>No rides for now</p>
                <p>-</p>
                <p>
                  Offer a ride by{" "}
                  <Link to="/offer-ride" className="text-success">
                    clicking here
                  </Link>
                </p>
              </Col>
            </Row>
          )}
        </>
      )}
      {allRidesListError ? (
        <Row>
          <Col>
            <Alert variant="danger">
              An error occured while fetching all the rides
            </Alert>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
};

export default FindRide;
