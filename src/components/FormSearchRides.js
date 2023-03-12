import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Offcanvas,
  Badge,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";
import {
  XCircleIcon,
  PersonIcon,
  ArrowRightIcon,
} from "@primer/octicons-react";
import { DashCircle, PlusCircle } from "react-bootstrap-icons";
import DatePicker, { registerLocale } from "react-datepicker";
import en from "date-fns/locale/en-US";
import es from "date-fns/locale/es";
import fr from "date-fns/locale/fr";
import i18n from "i18next";
import { Link } from "react-router-dom";

import InputSearchLocation from "./InputSearchLocation";

import {
  setSearchDate,
  setSearchSeats,
  getFilteredRides,
  setToast,
  resetSearchOrigin,
  resetSearchDestination,
  ridesToConfirm,
} from "../redux";

// Enable translation for the date picker
registerLocale("en", en);
registerLocale("es", es);
registerLocale("fr", fr);

const FormSearchRides = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { seatsMax } = useSelector((state) => state.global);
  const { ridesToConfirmData, formSearchRide } = useSelector(
    (state) => state.ride
  );

  const [showOffcanvaDate, setShowOffcanvaDate] = useState(false);
  const [showOffcanvaSeats, setShowOffcanvaSeats] = useState(false);

  var now = new Date();
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  var dateMax;
  if (now.getMonth() === 11) {
    dateMax = new Date(now.getFullYear() + 1, 2, 0);
  } else {
    dateMax = new Date(now.getFullYear(), now.getMonth() + 4, 0);
  }

  // Date picker
  const [date, setDate] = useState(
    formSearchRide.date === "" ? now : formSearchRide.date
  );
  const [seats, setSeats] = useState(formSearchRide.seats);

  if (formSearchRide.date === "") {
    setTimeout(() => {
      dispatch(setSearchDate(now));
    }, 1000);
  }

  // Handlers
  const handleEditOne = () => {
    dispatch(resetSearchOrigin());
  };

  const handleEditTwo = () => {
    dispatch(resetSearchDestination());
  };

  // Handlers
  const handleChangeDate = (date) => {
    setDate(date);
    dispatch(setSearchDate(date));
    setShowOffcanvaDate(false);
  };

  const handleDecreaseSeats = () => {
    setSeats(seats <= 1 ? 1 : seats - 1);
    dispatch(setSearchSeats(seats <= 1 ? 1 : seats - 1));
  };

  const handleIncreaseSeats = () => {
    setSeats(seats >= seatsMax ? seatsMax : seats + 1);
    dispatch(setSearchSeats(seats >= seatsMax ? seatsMax : seats + 1));
  };

  const handleSubmit = () => {
    if (
      formSearchRide.date !== "" &&
      formSearchRide.origin.placeName !== "" &&
      formSearchRide.destination.placeName !== "" &&
      formSearchRide.seats > 0
    ) {
      if (date < new Date().setHours(0, 0, 0, 0)) {
        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: t("translation:global.errors.dateFuture"),
            variant: "warning",
          })
        );
      } else {
        dispatch(
          getFilteredRides(
            formSearchRide.origin,
            formSearchRide.destination,
            formSearchRide.date,
            formSearchRide.seats
          )
        );
      }
    } else {
      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: t("translation:global.errors.missingInfo"),
          variant: "warning",
        })
      );
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(ridesToConfirm(currentUser.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container
        className="bg-white border border-2 border-bottom-0 pt-3 pb-2 px-3"
        style={{ borderRadius: "15px 15px 0px 0px" }}
      >
        <Row>
          <Col className="text-center">
            <h2 className="text-success mb-0">
              {t("translation:find.catchPhrase")}
            </h2>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            {formSearchRide.origin.placeName !== "" ? (
              <Container className="px-0">
                <Row>
                  <Col xs={10} className="text-start pe-0">
                    <p className="mb-0">
                      <span className="text-secondary">
                        {t("translation:global.from")}
                      </span>{" "}
                      <strong>{formSearchRide.origin.placeName}</strong>,{" "}
                      <small>{formSearchRide.origin.placeDetails}</small>
                    </p>
                  </Col>
                  <Col xs={2} className="text-end ps-0">
                    <Button
                      size={"sm"}
                      onClick={handleEditOne}
                      variant="white"
                      className="pe-0"
                    >
                      <XCircleIcon size={24} />
                    </Button>
                  </Col>
                </Row>
              </Container>
            ) : (
              <InputSearchLocation
                inputLocation="searchOrigin"
                disabled={!!ridesToConfirmData.length}
                placeholder={t("translation:global.from")}
              />
            )}
          </Col>
        </Row>

        <Row className="mb-2">
          <Col>
            <>
              {formSearchRide.destination.placeName !== "" ? (
                <Container className="px-0">
                  <Row>
                    <Col xs={10} className="text-start pe-0">
                      <p className="mb-0">
                        <span className="text-secondary">
                          {t("translation:global.to")}
                        </span>{" "}
                        <strong>{formSearchRide.destination.placeName}</strong>,{" "}
                        <small>{formSearchRide.destination.placeDetails}</small>
                      </p>
                    </Col>
                    <Col xs={2} className="text-end ps-0">
                      <Button
                        size={"sm"}
                        onClick={handleEditTwo}
                        variant="white"
                        className="pe-0"
                      >
                        <XCircleIcon size={24} />
                      </Button>
                    </Col>
                  </Row>
                </Container>
              ) : (
                <InputSearchLocation
                  inputLocation="searchDestination"
                  disabled={!!ridesToConfirmData.length}
                  placeholder={t("translation:global.to")}
                />
              )}
            </>
          </Col>
        </Row>
        <Row className="justify-content-between align-items-center py-3">
          <Col xs={8}>
            <Form.Group>
              <Form.Control
                type="text"
                name="date"
                value={
                  date.getFullYear() === now.getFullYear() &&
                  date.getMonth() === now.getMonth() &&
                  date.getDate() === now.getDate()
                    ? t("translation:global.today")
                    : date.getFullYear() === tomorrow.getFullYear() &&
                      date.getMonth() === tomorrow.getMonth() &&
                      date.getDate() === tomorrow.getDate()
                    ? t("translation:global.tomorrow")
                    : dateFormat(date, "dd/mm/yyyy")
                }
                // value={}
                className="cursor-pointer no-caret"
                onClick={() => setShowOffcanvaDate(true)}
                required
                readOnly
                disabled={!!ridesToConfirmData.length}
              />
            </Form.Group>
          </Col>
          <Col xs={4} className="d-inline-flex align-items-center">
            <PersonIcon size={24} className="me-2" />
            <Form.Group>
              <Form.Control
                type="number"
                name="seats"
                value={seats}
                className="cursor-pointer no-caret text-center"
                onClick={() => setShowOffcanvaSeats(true)}
                required
                readOnly
                disabled={!!ridesToConfirmData.length}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>

      <Container
        className={
          ridesToConfirmData.length
            ? "bg-secondary border-0 py-3"
            : "bg-success border-0 cursor-pointer py-3"
        }
        style={{ borderRadius: "0px 0px 15px 15px" }}
        onClick={ridesToConfirmData.length ? null : handleSubmit}
      >
        <Row>
          <Col className="text-center text-white fw-bold">
            {t("translation:global.search")}
          </Col>
        </Row>
      </Container>

      {ridesToConfirmData.length ? (
        <Container className="mt-3">
          <Row>
            <Col className="text-center animate__animated animate__heartBeat animate__slower animate__infinite">
              <Link to="/rides/rides-to-complete">
                <Button variant="success">
                  <span className="me-1">
                    {t("translation:global.errors.completeFirst")}
                  </span>{" "}
                  <Badge bg="danger" className="me-1">
                    {ridesToConfirmData.length}
                  </Badge>{" "}
                  <ArrowRightIcon size="24" />
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      ) : null}

      <Offcanvas
        show={showOffcanvaDate}
        onHide={() => setShowOffcanvaDate(false)}
        placement="bottom"
        className="vh-100"
      >
        <Container>
          <Row>
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  <h1>{t("translation:global.date")}</h1>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="text-center">
                <DatePicker
                  selected={date}
                  onChange={handleChangeDate}
                  monthsShown={2}
                  minDate={now}
                  maxDate={dateMax}
                  locale={i18n.language}
                  inline
                />
              </Offcanvas.Body>
            </Col>
          </Row>
        </Container>
      </Offcanvas>

      <Offcanvas
        show={showOffcanvaSeats}
        onHide={() => setShowOffcanvaSeats(false)}
        placement="bottom"
        className="vh-100"
      >
        <Container className="px-0">
          <Row>
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  <h1>{t("translation:global.passengers")}</h1>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="text-center">
                <Container>
                  <Row className="align-items-center">
                    <Col xs={3}>
                      {seats === 1 ? (
                        <span
                          variant="outline-success"
                          className="text-secondary"
                        >
                          <DashCircle size={36} />
                        </span>
                      ) : (
                        <span
                          onClick={handleDecreaseSeats}
                          variant="outline-success"
                          className="cursor-pointer text-success"
                        >
                          <DashCircle size={36} />
                        </span>
                      )}
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        plaintext
                        readOnly
                        value={seats}
                        className="h1 fw-bold text-center"
                      />
                    </Col>
                    <Col xs={3}>
                      {seats === seatsMax ? (
                        <span
                          variant="outline-success"
                          className="text-secondary"
                        >
                          <PlusCircle size={36} />
                        </span>
                      ) : (
                        <span
                          onClick={handleIncreaseSeats}
                          variant="outline-success"
                          disabled={seats === seatsMax}
                          className="cursor-pointer text-success"
                        >
                          <PlusCircle size={36} />
                        </span>
                      )}
                    </Col>
                  </Row>
                </Container>
              </Offcanvas.Body>
            </Col>
          </Row>
        </Container>
      </Offcanvas>
    </>
  );
};

export default FormSearchRides;
