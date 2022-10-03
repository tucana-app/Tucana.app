import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import dateFormat from "dateformat";
import { AlertIcon } from "@primer/octicons-react";
import { useTranslation } from "react-i18next";

import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";

import { getDriverProfile } from "../../redux";
import DisplayRating from "../../components/DisplayRating";

const DriverPublicProfile = () => {
  const { t } = useTranslation();
  const { username } = useParams();

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { srcAvatar } = useSelector((state) => state.global);
  const { isloadingDriverProfile, driverProfileData, driverProfileError } =
    useSelector((state) => state.ride);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getDriverProfile(username));
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
        {isloadingDriverProfile ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : driverProfileData.user ? (
          <div data-aos="fade-in">
            <Row className="align-items-center">
              <Col className="text-end">
                <p>
                  <img
                    src={srcAvatar(driverProfileData.user)}
                    alt="Avatar"
                    className="img-fluid cursor-pointer avatar-img-sm"
                  />
                </p>
              </Col>
              <Col className="text-start">
                <h2 className="text-success">
                  {driverProfileData.user.firstName}
                </h2>
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
                  <Row className="align-items-center mb-3">
                    <Col xs={12}>
                      <p className="fw-bold mb-1">
                        {t("translation:global.ratings")}
                      </p>
                    </Col>
                    <Col xs={12}>
                      <DisplayRating
                        rating={driverProfileData.user.Rating}
                        type="driver"
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col xs={12}>
                      <p className="fw-bold mb-1">
                        {t("translation:global.bio")}
                      </p>
                    </Col>
                    <Col xs={12}>
                      <p className="mb-0">
                        {driverProfileData.user.biography &&
                        driverProfileData.user.biography !== "" ? (
                          <p>{driverProfileData.user.biography}</p>
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
                      <p className="text-lowercase">
                        <strong>{driverProfileData.ridesCount}</strong>{" "}
                        {t("translation:rides.ridesPublished")}
                      </p>
                      <p>
                        {t("translation:global.level")}{" "}
                        <strong>
                          {
                            driverProfileData.user.ExperienceUser
                              .ExperienceUserLevel.id
                          }
                        </strong>
                        :{" "}
                        <strong>
                          {t(
                            `translation:global.statuses.level.${driverProfileData.user.ExperienceUser.ExperienceUserLevel.id}`
                          )}
                        </strong>{" "}
                        <small className="text-secondary">
                          ({driverProfileData.user.ExperienceUser.points}{" "}
                          {t("translation:global.points")})
                        </small>
                      </p>
                      <p className="mb-0">
                        {t("translation:global.memberSince")}:{" "}
                        {dateFormat(
                          driverProfileData.user.createdAt,
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
        ) : driverProfileError ? (
          <Redirect to="/" />
        ) : null}
      </Container>
    </div>
  );
};

export default DriverPublicProfile;
