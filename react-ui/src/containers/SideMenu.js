import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faChevronRight,
  faUser,
  faPowerOff,
  faCog,
  faLifeRing,
  faQuestionCircle,
  faScroll,
  faSignInAlt,
  faUserPlus,
  faDonate,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { logout } from "../redux";

const SideMenu = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Container fluid className="p-0" data-aos="slide-right">
      {isLoggedIn ? (
        <>
          <ListGroup variant="flush">
            <Link to="/" className="text-light text-decoration-none">
              <ListGroup.Item className="bg-dark text-center border border-top-0 border-start-0 border-end-0 py-4">
                <div className="d-inline mx-auto">
                  <FontAwesomeIcon
                    icon={faCar}
                    size="2x"
                    className="text-success align-bottom me-2"
                  />
                  <span className="h3 text-white font-title">Ride.CR</span>
                </div>
              </ListGroup.Item>
            </Link>

            <Link to="/my-account" className="text-light text-decoration-none">
              <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-success me-3"
                    />{" "}
                    Information
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </Link>

            <Link to="/settings" className="text-light text-decoration-none">
              <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faCog}
                      className="text-success me-3"
                    />{" "}
                    Settings
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </Link>

            <div
              onClick={logOut}
              className="text-light text-decoration-none"
              style={{ cursor: "pointer" }}
            >
              <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faPowerOff}
                      className="text-danger me-3"
                    />{" "}
                    Log Out
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </div>
          </ListGroup>
        </>
      ) : (
        <>
          <ListGroup variant="flush">
            <Link to="/" className="text-light text-decoration-none">
              <ListGroup.Item className="bg-dark text-center border border-top-0 border-start-0 border-end-0 py-4">
                <div className="d-inline mx-auto">
                  <FontAwesomeIcon
                    icon={faCar}
                    size="2x"
                    className="text-success align-bottom me-2"
                  />
                  <span className="h3 text-white font-title">Ride.CR</span>
                </div>
              </ListGroup.Item>
            </Link>

            <Link to="/settings" className="text-light text-decoration-none">
              <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faCog}
                      className="text-success me-3"
                    />{" "}
                    Settings
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </Link>

            <Link to="/login" className="text-light text-decoration-none">
              <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faSignInAlt}
                      className="text-success me-3"
                    />{" "}
                    Login
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </Link>

            <Link to="/signup" className="text-light text-decoration-none">
              <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className="text-success me-3"
                    />{" "}
                    Signup
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </Link>
          </ListGroup>
        </>
      )}

      <hr className="w-75 bg-dark mx-auto my-4" />

      <Link to="/coming-soon" className="text-light text-decoration-none">
        <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0 ">
          <div className="d-inline-flex justify-content-between w-100 py-2">
            <span>
              <FontAwesomeIcon
                icon={faDownload}
                className="text-success me-3"
              />{" "}
              Download the App
            </span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </ListGroup.Item>
      </Link>

      <Link to="/help" className="text-light text-decoration-none">
        <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0 ">
          <div className="d-inline-flex justify-content-between w-100 py-2">
            <span>
              <FontAwesomeIcon
                icon={faLifeRing}
                className="text-success me-3"
              />{" "}
              Help
            </span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </ListGroup.Item>
      </Link>

      <Link to="/coming-soon" className="text-light text-decoration-none">
        <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
          <div className="d-inline-flex justify-content-between w-100 py-2">
            <span>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="text-success me-3"
              />{" "}
              About Us
            </span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </ListGroup.Item>
      </Link>

      <Link to="/donate" className="text-light text-decoration-none">
        <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
          <div className="d-inline-flex justify-content-between w-100 py-2">
            <span>
              <FontAwesomeIcon icon={faDonate} className="text-success me-2" />{" "}
              Donate
            </span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </ListGroup.Item>
      </Link>

      <Link to="/coming-soon" className="text-light text-decoration-none">
        <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
          <div className="d-inline-flex justify-content-between w-100 py-2">
            <span>
              <FontAwesomeIcon icon={faScroll} className="text-success me-2" />{" "}
              Terms &amp; Conditions
            </span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </ListGroup.Item>
      </Link>
    </Container>
  );
};

export default SideMenu;
