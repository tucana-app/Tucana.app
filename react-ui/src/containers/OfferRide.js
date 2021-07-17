import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  // Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faClock,
  faComment,
  faCarAlt,
  faExclamationTriangle,
  faMapMarker,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const OfferRide = () => {
  // const dispatch = useDispatch();
  const [submited, setSubmited] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.user);
  const { provinces } = useSelector((state) => state.global);

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
            <Row className="mb-4">
              <Col xs={12} sm={6} className="mb-3 mb-md-0">
                <p className="font-title text-center text-sm-start mb-1">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-success me-2"
                  />
                  Your origin
                </p>
                <div className="p-2 p-md-3 border rounded">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      City<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="cityOrigin"
                      placeholder="City"
                      className="rounded-0"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {/* {errors.cityOrigin} */}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      Province
                      <small className="text-secondary ms-2">
                        Only if you know it
                      </small>
                    </Form.Label>

                    <Form.Select name="provinceOrigin" className="rounded-0">
                      <option disabled selected hidden>
                        Select a province
                      </option>
                      <option value="unknown">I don't know</option>
                      {provinces.map((province, index) => (
                        <option key={index} value={province}>
                          {province}
                        </option>
                      ))}
                    </Form.Select>

                    <Form.Control.Feedback type="invalid">
                      {/* {errors.provinceOrigin} */}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>

              <Col xs={12} sm={6}>
                <p className="font-title text-center text-sm-start mb-1">
                  <FontAwesomeIcon
                    icon={faMapMarker}
                    className="text-danger me-2"
                  />
                  Your destination
                </p>
                <div className="p-2 p-md-3 border rounded">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      City<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="cityDestination"
                      placeholder="City"
                      className="rounded-0"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {/* {errors.cityDestination} */}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Province
                      <small className="text-secondary ms-2">
                        Only if you know it
                      </small>
                    </Form.Label>
                    <Form.Select
                      name="provinceDestination"
                      className="rounded-0"
                    >
                      <option disabled selected hidden>
                        Select a province
                      </option>
                      <option value="unknown">I don't know</option>
                      {provinces.map((province, index) => (
                        <option key={index} value={province}>
                          {province}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {/* {errors.provinceDestination} */}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
            </Row>

            <Row>
              <Form.Group
                as={Col}
                xs={12}
                sm={6}
                md={4}
                className="text-center text-sm-start mb-3 mb-md-0"
              >
                <Form.Label>
                  <FontAwesomeIcon
                    icon={faCalendarCheck}
                    className="text-success me-2"
                  />
                  Day of the ride<span className="text-danger">*</span>
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
              <Form.Group
                as={Col}
                xs={12}
                sm={6}
                md={4}
                className="text-center text-sm-start mb-3 mb-md-0"
              >
                <Form.Label>
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-success me-2"
                  />
                  Time of the ride<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  placeholder="Time"
                  className="rounded-0"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {/* {errors.time} */}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                as={Col}
                xs={12}
                sm={6}
                md={4}
                className="text-center text-sm-start mb-3 mb-md-0"
              >
                <Form.Label>
                  <FontAwesomeIcon
                    icon={faCarAlt}
                    className="text-success me-2"
                  />
                  Seats available<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="provinceDestination"
                  className="rounded-0"
                  defaultValue="1"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </Form.Select>
                <small className="text-secondary">1 - 6 seats</small>
                <Form.Control.Feedback type="invalid">
                  {/* {errors.date} */}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                xs={12}
                className="text-center text-sm-start"
              >
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
                  name="comment"
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
