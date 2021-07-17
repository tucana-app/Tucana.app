import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Form,
  Row,
  Col,
  FloatingLabel,
  Button,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarCheck,
  faClock,
  faComment,
  faCouch,
  faExclamationTriangle,
  faMapMarker,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const OfferRide = () => {
  const dispatch = useDispatch();
  const [submited, setSubmited] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container fluid className="py-0 my-5" data-aos="fade-left">
      <Row className="mb-3">
        <Col className="text-center">
          <h1 className="text-success font-title">Offer a ride</h1>
          <p className="lead text-light">
            Thank you for helping the community!
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={10} lg={8} xl={6} className="mx-auto">
          <p className="text-light">
            Please fill up the submit form. Visit{" "}
            <Link to="/coming-soon" className="text-success">
              this link
            </Link>{" "}
            for more info.
          </p>
          <Form validated={submited}>
            <Row className="mb-3">
              <Col xs={12} md={6} className="mb-3 mb-md-0">
                <p className="font-title mb-1">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-success me-2"
                  />
                  Your origin<span className="text-danger">*</span>
                </p>
                <div className="p-2 border rounded">
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      placeholder="City"
                      className="rounded-0"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {/* {errors.firstName} */}Error occured
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      placeholder="Province"
                      className="rounded-0"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {/* {errors.lastName} */}Error occured
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>

              <Col xs={12} md={6}>
                <p className="font-title mb-1">
                  <FontAwesomeIcon
                    icon={faMapMarker}
                    className="text-danger me-2"
                  />
                  Your destination<span className="text-danger">*</span>
                </p>
                <div className="p-2 border rounded">
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      placeholder="Last name"
                      className="rounded-0"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {/* {errors.lastName} */}Error occured
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      placeholder="Last name"
                      className="rounded-0"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {/* {errors.lastName} */}Error occured
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
            </Row>

            <Row>
              <Form.Group as={Col} xs={12} md={4} className="mb-3 mb-md-0">
                <Form.Label>
                  <FontAwesomeIcon
                    icon={faCalendarCheck}
                    className="text-success me-2"
                  />
                  Day you're leaving<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  placeholder="Date"
                  className="rounded-0"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {/* {errors.date} */}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} xs={12} md={4} className="mb-3 mb-md-0">
                <Form.Label>
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-success me-2"
                  />
                  Time you're leaving<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="time"
                  name="lastname"
                  placeholder="Time"
                  className="rounded-0"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {/* {errors.lastName} */}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} xs={12} md={4} className="mb-3 mb-md-0">
                <Form.Label>
                  <FontAwesomeIcon
                    icon={faCouch}
                    className="text-success me-2"
                  />
                  Seats available<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="seatsAvailable"
                  placeholder="1"
                  defaultValue="1"
                  className="rounded-0"
                  min="1"
                  max="6"
                  required
                />
                <small className="text-secondary">1 - 6 seats</small>
                <Form.Control.Feedback type="invalid">
                  {/* {errors.date} */}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} xs={12}>
                <Form.Label>
                  <p className="small text-secondary">
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="text-secondary me-2"
                    />
                    Do not share any contact info (phone, email, etc), they will
                    be shared within the platform when a booking is made.
                  </p>
                  <FontAwesomeIcon
                    icon={faComment}
                    className="text-success me-2"
                  />
                  Comment
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  type="textarea"
                  name="lastname"
                  placeholder="Add any relevant info, like the name of the city next to where you go or the route you'll take"
                  className="rounded-0 mb-1"
                />
                <Form.Control.Feedback type="invalid">
                  {/* {errors.comment} */}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="text-end">
              <Button
                variant="success"
                size="lg"
                className="rounded-0"
                type="submit"
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default OfferRide;
