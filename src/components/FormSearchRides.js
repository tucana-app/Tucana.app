import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, Container, Offcanvas } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";
import { XIcon, PersonIcon } from "@primer/octicons-react";
import { DashCircle, PlusCircle } from "react-bootstrap-icons";
import DatePicker, { registerLocale } from "react-datepicker";
import en from "date-fns/locale/en-US";
import es from "date-fns/locale/es";
import fr from "date-fns/locale/fr";
import i18n from "i18next";

import InputSearchLocation from "./InputSearchLocation";

import {
  setSearchDate,
  setSearchSeats,
  getFilteredRides,
  setToast,
  resetSearchOrigin,
  resetSearchDestination,
} from "../redux";

// Enable translation for the date picker
registerLocale("en", en);
registerLocale("es", es);
registerLocale("fr", fr);

const FormSearchRides = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { seatsMax } = useSelector((state) => state.global);
  const { formSearchRide } = useSelector((state) => state.ride);

  const [showOffcanvaDate, setShowOffcanvaDate] = useState(false);
  const [showOffcanvaSeats, setShowOffcanvaSeats] = useState(false);

  var now = new Date();
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
    dispatch(setSearchDate(now));
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
      formSearchRide.origin.city !== "" &&
      formSearchRide.destination.city !== "" &&
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

  return (
    <>
      <Row className="mb-3">
        <Col>
          <p className="mb-0 text-success">{t("translation:global.from")}:</p>
          <>
            {formSearchRide.origin.city !== "" ? (
              <Container className="px-0">
                <Row>
                  <Col xs={8} className="text-start pe-0">
                    <p className="mb-0">
                      <strong>{formSearchRide.origin.city}</strong>,{" "}
                      <small>{formSearchRide.origin.province}</small>
                    </p>
                  </Col>
                  <Col xs={4} className="text-end ps-0">
                    <Button
                      size={"sm"}
                      onClick={handleEditOne}
                      variant="outline-warning"
                      className="p-0"
                    >
                      <XIcon size={24} />
                    </Button>
                  </Col>
                </Row>
              </Container>
            ) : (
              <InputSearchLocation inputLocation="searchOrigin" />
            )}
          </>
        </Col>
      </Row>

      <Row className="my-2">
        <Col>
          <p className="mb-0 text-success">{t("translation:global.to")}:</p>
          <>
            {formSearchRide.destination.city !== "" ? (
              <Container className="px-0">
                <Row>
                  <Col xs={8} className="text-start pe-0">
                    <p className="mb-0">
                      <strong>{formSearchRide.destination.city}</strong>,{" "}
                      <small>{formSearchRide.destination.province}</small>
                    </p>
                  </Col>
                  <Col xs={4} className="text-end ps-0">
                    <Button
                      size={"sm"}
                      onClick={handleEditTwo}
                      variant="outline-warning"
                      className="p-0"
                    >
                      <XIcon size={24} />
                    </Button>
                  </Col>
                </Row>
              </Container>
            ) : (
              <InputSearchLocation inputLocation="searchDestination" />
            )}
          </>
        </Col>
      </Row>
      <Row className="align-items-center py-3">
        <Col xs={2}>
          <p className="mb-0">{t("translation:global.date")}:</p>
        </Col>
        <Col xs={6} className="mx-auto">
          <Form.Group>
            <Form.Control
              type="text"
              name="date"
              value={dateFormat(date, "dd/mm/yyyy")}
              className="cursor-pointer no-caret"
              onClick={() => setShowOffcanvaDate(true)}
              required
              readOnly
            />
          </Form.Group>
        </Col>
        <Col xs={4} className="mx-auto d-inline-flex align-items-center">
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
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="py-2">
        <Col className="text-end">
          <Button
            onClick={handleSubmit}
            variant="success"
            size="lg"
            type="submit"
          >
            {t("translation:global.search")}
          </Button>
        </Col>
      </Row>

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
