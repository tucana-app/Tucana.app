import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { StarFillIcon } from "@primer/octicons-react";
import dateFormat from "dateformat";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";

import { getRatingsReceivedPassenger, getPublicProfile } from "../../redux";
import { isEmptyObject } from "../../helpers";

function PublicRatings() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { username } = useParams();

  const { isLoggedIn, isloadingPublicProfile, publicProfileData } = useSelector(
    (state) => state.user
  );
  const {
    isLoadingGetRatingsReceivedPassenger,
    getRatingsReceivedPassengerData,
  } = useSelector((state) => state.rating);
  const { srcAvatar } = useSelector((state) => state.global);

  useEffect(() => {
    if (isLoggedIn) {
      if (isEmptyObject(publicProfileData)) {
        dispatch(getPublicProfile(username));
      } else {
        dispatch(getRatingsReceivedPassenger(publicProfileData.user.id));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicProfileData]);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container data-aos="fade-in">
        {isloadingPublicProfile ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : publicProfileData.user ? (
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
            <Col xs={12} className="mt-3 text-center">
              <h4 className="mb-0">{t("translation:global.ratings")}</h4>
            </Col>
          </Row>
        ) : null}

        <Row className="mb-3 mx-1 mx-sm-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="px-0 mx-auto">
            {isLoadingGetRatingsReceivedPassenger ? (
              <div className="text-center">
                <LoadingSpinner />
              </div>
            ) : !getRatingsReceivedPassengerData.length ? (
              <Container>
                <Row>
                  <Col>
                    <p className="text-center">
                      {t("translation:ratings.noRatingsYou")}
                    </p>
                  </Col>
                </Row>
              </Container>
            ) : getRatingsReceivedPassengerData.length > 0 ? (
              getRatingsReceivedPassengerData.map((rating, index) => (
                <div key={index}>
                  {rating.admin_VerifPassengerRating ? (
                    <Container className="px-1">
                      <Row>
                        <Col xs={9}>
                          <h4 className="mb-3">{rating.User.firstName} </h4>
                        </Col>
                        <Col
                          xs={3}
                          className="d-inline-flex align-items-center"
                        >
                          <StarFillIcon
                            size={24}
                            className="text-warning me-2"
                          />
                          <h4 className="fw-bold mb-0">
                            <span>{rating.value}</span>
                          </h4>
                        </Col>
                        <Col xs={12}>
                          <p className="mb-0">{rating.comment}</p>
                        </Col>
                        <Col xs={12}>
                          <small className="smaller text-secondary">
                            {dateFormat(rating.createdAt, "dd/mm/yyyy")}
                          </small>
                        </Col>
                      </Row>
                      <hr className="text-secondary" />
                    </Container>
                  ) : null}
                </div>
              ))
            ) : (
              <p>{t("translation:ratings.noRatings")}</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PublicRatings;
