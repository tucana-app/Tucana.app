import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ProgressBar,
  Accordion,
  Table,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";

import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";
import { getLevels } from "../../redux";
import { getPercent } from "../../helpers";
import { DotFillIcon } from "@primer/octicons-react";

function Experience() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { constants, isLoadingGetLevels, getLevelsData } = useSelector(
    (state) => state.global
  );

  const pointsGrid = JSON.parse(constants.EXPERIENCE_POINTS_GRID);

  useEffect(() => {
    dispatch(getLevels());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="mb-5">
        <Row className="mb-3">
          <Col>
            <h1 className="title text-center">
              {t("translation:global.experience")}
            </h1>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="px-0 mx-auto">
            <Container>
              <Row className="small text-secondary">
                <Col xs={4} className="text-start px-0">
                  <p className="mb-0">
                    {t("translation:global.level")}{" "}
                    <strong>
                      {currentUser.ExperienceUser.ExperienceUserLevel.id}
                    </strong>
                  </p>
                </Col>
                <Col xs={4} className="text-center">
                  <strong>
                    {t(
                      `translation:global.statuses.level.${currentUser.ExperienceUser.ExperienceUserLevel.id}`
                    )}
                  </strong>
                </Col>
                <Col xs={4} className="text-end px-0">
                  <p className="mb-0">
                    {t("translation:global.level")}{" "}
                    <strong>
                      {currentUser.ExperienceUser.ExperienceUserLevel.id + 1}
                    </strong>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="px-0">
                  <ProgressBar
                    animated
                    variant="success"
                    now={getPercent(currentUser)}
                    label={`${getPercent(currentUser)}%`}
                    className="rounded-pill"
                    style={{ height: "1rem" }}
                  />
                </Col>
              </Row>
              <Row className="small text-secondary">
                <Col xs={4} className="text-start px-0">
                  {currentUser.ExperienceUser.ExperienceUserLevel.min}{" "}
                </Col>
                <Col xs={4} className="text-center px-0">
                  <strong>{currentUser.ExperienceUser.points}</strong>{" "}
                  <span className="text-lowercase">
                    {t("translation:global.points")}
                  </span>
                </Col>
                <Col xs={4} className="text-end px-0">
                  {currentUser.ExperienceUser.ExperienceUserLevel.max}{" "}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <Container className="px-0">
              <Row>
                <Col className="text-center">
                  <p>{t("translation:experience.content")}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <h5 className="mb-0">
                          {t("translation:experience.grid")}
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body className="p-0">
                        <Table striped bordered hover className="mb-0">
                          <thead>
                            <tr>
                              <th>{t("translation:experience.action")}</th>
                              <th>{t("translation:experience.reward")}</th>
                            </tr>
                          </thead>

                          <tbody>
                            {Object.keys(pointsGrid).map((key, i) => (
                              <tr key={i}>
                                <td>
                                  {t(
                                    `translation:experience.gridLabels.${key}`
                                  )}
                                </td>
                                <td className="text-lowercase">
                                  {pointsGrid[key].value}{" "}
                                  {t("translation:global.points")}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        {isLoadingGetLevels ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : getLevelsData.length ? (
          <Row>
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
              <Accordion
                defaultActiveKey={
                  currentUser.ExperienceUser.ExperienceUserLevelId - 1
                }
              >
                {getLevelsData.map((level, index) => (
                  <Accordion.Item key={index} eventKey={index}>
                    <Accordion.Header>
                      <p className="mb-0">
                        {t("translation:global.level")} {level.id} -{" "}
                        <span
                          className={
                            currentUser.ExperienceUser.ExperienceUserLevel
                              .id === level.id
                              ? "fw-bold"
                              : null
                          }
                        >
                          {t(`translation:global.statuses.level.${level.id}`)}
                          {currentUser.ExperienceUser.ExperienceUserLevel.id ===
                          level.id ? (
                            <DotFillIcon
                              size="20"
                              className="text-success mb-1 animate__animated animate__infinite animate__slow animate__heartBeat"
                            />
                          ) : null}
                        </span>
                      </p>
                    </Accordion.Header>
                    <Accordion.Body className="mt-3">
                      <Container>
                        <Row>
                          <Col xs={4} className="text-start px-0">
                            <p className="mb-0">
                              {t("translation:global.level")}{" "}
                              <strong>{level.id}</strong>
                            </p>
                          </Col>
                          <Col xs={4} className="text-center px-0">
                            <p className="mb-0">
                              <strong>
                                {" "}
                                {t(
                                  `translation:global.statuses.level.${level.id}`
                                )}
                              </strong>
                            </p>
                          </Col>
                          <Col xs={4} className="text-end px-0">
                            <p className="mb-0">
                              {t("translation:global.level")}{" "}
                              <strong>{level.id + 1}</strong>
                            </p>
                          </Col>
                        </Row>

                        <Row>
                          <Col className="px-0">
                            {currentUser.ExperienceUser.ExperienceUserLevel.id >
                            level.id ? (
                              <ProgressBar
                                variant="success"
                                now={100}
                                className="rounded-pill "
                              />
                            ) : null}
                            {currentUser.ExperienceUser.ExperienceUserLevel
                              .id === level.id ? (
                              <ProgressBar
                                animated
                                variant="success"
                                now={getPercent(currentUser)}
                                className="rounded-pill "
                              />
                            ) : null}
                            {currentUser.ExperienceUser.ExperienceUserLevel.id <
                            level.id ? (
                              <ProgressBar
                                animated
                                variant="success"
                                now={0}
                                className="rounded-pill "
                              />
                            ) : null}{" "}
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col xs={4} className="text-start px-0">
                            <p className="text-lowercase mb-0">
                              <strong>{level.min}</strong>{" "}
                              {t("translation:global.points")}
                            </p>
                          </Col>
                          <Col xs={4} className="text-center px-0"></Col>
                          <Col xs={4} className="text-end px-0">
                            <p className="text-lowercase mb-0">
                              <strong>{level.max}</strong>{" "}
                              {t("translation:global.points")}
                            </p>
                          </Col>
                        </Row>

                        <Row className="mt-4">
                          <Col className="text-center">
                            {t("translation:experience.multiplier")}:{" "}
                            <strong>x{level.multiplier}</strong>
                          </Col>
                        </Row>

                        {/* <Row>
                          <Col xs={12} className="text-center">
                            <p className="mb-2">
                              {t("translation:experience.filtersAvailable")}
                            </p>
                          </Col>
                          <Col className="text-center">
                            <img
                              src={srcAvatar(currentUser)}
                              alt="Placeholder"
                              className="img-fluid avatar-img-sm me-3"
                              style={{ filter: "grayscale(1)" }}
                            />
                            <img
                              src={srcAvatar(currentUser)}
                              alt="Placeholder"
                              className="img-fluid avatar-img-sm me-3"
                              style={{ filter: "grayscale(1)" }}
                            />
                            <img
                              src={srcAvatar(currentUser)}
                              alt="Placeholder"
                              className="img-fluid avatar-img-sm me-3"
                              style={{ filter: "grayscale(1)" }}
                            />
                            <img
                              src={srcAvatar(currentUser)}
                              alt="Placeholder"
                              className="img-fluid avatar-img-sm"
                              style={{ filter: "grayscale(1)" }}
                            />
                          </Col>
                        </Row> */}
                      </Container>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        ) : null}
      </Container>
    </div>
  );
}

export default Experience;
