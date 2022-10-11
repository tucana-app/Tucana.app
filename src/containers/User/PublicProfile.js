import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import dateFormat from "dateformat";
import { AlertIcon, ChevronRightIcon } from "@primer/octicons-react";
import { useTranslation } from "react-i18next";

import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";

import { getPublicProfile } from "../../redux";
import DisplayRating from "../../components/DisplayRating";

const PublicProfile = () => {
  const { t } = useTranslation();
  const { username } = useParams();

  const dispatch = useDispatch();
  const {
    isLoggedIn,
    isloadingPublicProfile,
    publicProfileData,
    publicProfileError,
  } = useSelector((state) => state.user);
  const { srcAvatar } = useSelector((state) => state.global);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getPublicProfile(username));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <GoBack />

      <Container className="mb-5">
        {isloadingPublicProfile ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : publicProfileData.user ? (
          <div data-aos="fade-in">
            <Row className="align-items-center">
              <Col className="text-end">
                <p>
                  <img
                    src={srcAvatar(publicProfileData.user)}
                    alt="Avatar"
                    className="img-fluid cursor-pointer avatar-img-sm"
                  />
                </p>
              </Col>
              <Col className="text-start">
                <h2>{publicProfileData.user.firstName}</h2>
              </Col>
            </Row>

            <Row className="mb-3 mx-1 mx-sm-0">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="container-box"
              >
                <Container className="py-3 px-2">
                  <Row>
                    <Col>
                      <ListGroup variant="flush">
                        <Link
                          to={`/profile/${username}/ratings`}
                          className="text-decoration-none"
                        >
                          <ListGroup.Item className="border-0 px-0">
                            <div className="d-inline-flex justify-content-between align-items-center w-100">
                              <div>
                                <p className="mb-1">
                                  <strong>
                                    {t("translation:global.ratings")}
                                  </strong>
                                </p>

                                <div className="mb-0">
                                  <DisplayRating
                                    rating={publicProfileData.user.Rating}
                                    type="passenger"
                                  />
                                </div>
                              </div>
                              <div>
                                {t("translation:global.view")}{" "}
                                <ChevronRightIcon
                                  size={24}
                                  verticalAlign="middle"
                                />
                              </div>
                            </div>
                          </ListGroup.Item>
                        </Link>
                      </ListGroup>
                    </Col>
                  </Row>

                  <Row className="align-items-center">
                    <Col>
                      <p className="fw-bold mb-1">
                        {t("translation:global.bio")}
                      </p>
                      <p className="mb-0">
                        {publicProfileData.user.biography &&
                        publicProfileData.user.biography !== "" ? (
                          <p>{publicProfileData.user.biography}</p>
                        ) : (
                          "-"
                        )}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>

            <Row className="mb-3 mx-1 mx-sm-0">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="container-box"
              >
                <Container className="py-3 px-2">
                  <Row className="align-items-center">
                    <Col>
                      <p>
                        {t("translation:global.level")}{" "}
                        <strong>
                          {
                            publicProfileData.user.ExperienceUser
                              .ExperienceUserLevel.id
                          }
                        </strong>
                        :{" "}
                        <strong>
                          {t(
                            `translation:global.statuses.level.${publicProfileData.user.ExperienceUser.ExperienceUserLevel.id}`
                          )}
                        </strong>{" "}
                        <small className="text-secondary">
                          ({publicProfileData.user.ExperienceUser.points}{" "}
                          {t("translation:global.points")})
                        </small>
                      </p>
                      <p className="mb-0">
                        {t("translation:global.memberSince")}:{" "}
                        {dateFormat(
                          publicProfileData.user.createdAt,
                          "mm/yyyy"
                        )}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>

            <Row>
              <Col className="text-center">
                <p>
                  <Link
                    to="/contact"
                    className="text-secondary text-decoration-none"
                  >
                    <AlertIcon size={24} className="me-2" />{" "}
                    {t("translation:global.reportMember")}
                  </Link>
                </p>
              </Col>
            </Row>
          </div>
        ) : publicProfileError ? (
          <Redirect to="/" />
        ) : null}
      </Container>
    </div>
  );
};

export default PublicProfile;
