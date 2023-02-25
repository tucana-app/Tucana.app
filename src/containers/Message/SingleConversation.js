import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Offcanvas,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PaperAirplaneIcon, ChevronLeftIcon } from "@primer/octicons-react";
import { PinMap } from "react-bootstrap-icons";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

import {
  resetConversationView,
  sendMessage,
  getAllUserMessages,
  displayNavBar,
} from "../../redux";

import dateFormat from "dateformat";
import LoadingSpinner from "../../components/LoadingSpinner";

import { findLinks } from "../../helpers";
import { Link } from "react-router-dom";

const SingleConversation = ({ conversation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.user);
  const { srcAvatar } = useSelector((state) => state.global);
  const { messageStatusIcon, isLoadingSendMessage } = useSelector(
    (state) => state.message
  );
  const messagesEndRef = useRef(null);

  const [message, setMessage] = useState("");
  const [showOffcanvaMap, setShowOffcanvaMap] = useState(false);

  // Get receiver's information
  const receiver = !(conversation.UserId === currentUser.id)
    ? conversation.User
    : conversation.Driver.User;
  const receiverFirstName = !(conversation.UserId === currentUser.id)
    ? conversation.User.firstName
    : conversation.Driver.User.firstName;
  const receiverId = !(conversation.UserId === currentUser.id)
    ? conversation.User.id
    : conversation.Driver.User.id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const form = useRef("");

  // Google Map

  const containerStyle = {
    // width: "500px",
    height: "100vh",
  };

  const center = {
    lat: 9.9356284,
    lng: -84.1483647,
  };

  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState({ lat: 9.9356284, lng: -84.1483647 });

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeMarker = (e) => {
    setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setMessage(
      `http://maps.google.com/maps?q=${e.latLng.lat()},${e.latLng.lng()}`
    );
  };

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleSendPin = (event) => {
    handleSubmit(event, true);
    setShowOffcanvaMap(false);
    scrollToBottom();
  };

  // End Google Map

  const handleSubmit = (event, googleMapsLink) => {
    event.preventDefault();

    dispatch(
      sendMessage(
        currentUser,
        receiverId,
        message,
        conversation.id,
        googleMapsLink
      )
    );
    scrollToBottom();
    form.current.reset();
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div>
      <Container fluid className="sticky-top mb-3">
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <Container className="px-0">
              <Row className="bg-light align-items-center py-3">
                <Col
                  xs={6}
                  className="d-inline-flex align-items-center cursor-pointer"
                  onClick={() => {
                    dispatch(getAllUserMessages(currentUser.id));
                    dispatch(resetConversationView(currentUser.id));
                    dispatch(displayNavBar(true));
                  }}
                >
                  <ChevronLeftIcon size={28} className="text-success" />
                  <img
                    src={srcAvatar(receiver)}
                    alt="Avatar"
                    className="img-fluid cursor-pointer avatar-img-sm mx-2"
                  />
                  <h2 className="mb-0">{receiverFirstName}</h2>
                </Col>
                <Col xs={6} className="text-end">
                  <Link to={`/profile/${receiver.username}`}>
                    <Button variant="success">
                      {t("translation:messages.viewProfile")}
                    </Button>
                  </Link>
                </Col>
              </Row>
              <Row className="bg-dark text-white py-2">
                <Col className="d-inline-flex justify-content-between align-items-center">
                  <small>
                    {t("translation:global.ride")}:{" "}
                    {conversation.Ride.origin.placeName}{" "}
                    <span className="text-lowercase">
                      {t("translation:global.to")}
                    </span>{" "}
                    {conversation.Ride.destination.placeName} (
                    {dateFormat(conversation.Ride.dateTimeOrigin, "dd/mm/yyyy")}
                    )
                  </small>

                  <Link
                    to={`/ride/${conversation.Ride.id}`}
                    onClick={() => {
                      dispatch(displayNavBar(true));
                    }}
                  >
                    <Button variant="light" size="sm">
                      {t("translation:global.view")}
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>

      <Container fluid data-aos="container-fluid fade-in">
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <div className="imessage">
              {conversation.Messages.length > 0
                ? conversation.Messages.map((message, index) => {
                    return (
                      <span key={index}>
                        {message.SenderId === currentUser.id ? (
                          // The sender's messages
                          <>
                            {findLinks(message.body) ? (
                              <p className="from-me mb-0">
                                <a
                                  href={message.body}
                                  alt=""
                                  rel="noreferrer"
                                  target="_blank"
                                  className="link link-light"
                                >
                                  {message.body}
                                </a>
                              </p>
                            ) : (
                              <p className="from-me mb-0">{message.body} </p>
                            )}
                            <p className="small text-secondary text-end w-100 mt-1 pe-0 py-0">
                              {dateFormat(
                                message.createdAt,
                                "dd/mm/yy hh:MM TT"
                              )}{" "}
                              {messageStatusIcon(message.MessageStatusId)}
                            </p>
                          </>
                        ) : (
                          // The receiver's messages
                          <>
                            {findLinks(message.body) ? (
                              <p className="from-them mb-0">
                                <a
                                  href={message.body}
                                  alt=""
                                  rel="noreferrer"
                                  target="_blank"
                                  className="link link-dark"
                                >
                                  {message.body}
                                </a>
                              </p>
                            ) : (
                              <p className="from-them mb-0">{message.body} </p>
                            )}
                            <p className="small text-secondary w-100 mt-1 ps-0 py-0">
                              {dateFormat(
                                message.createdAt,
                                "dd/mm/yy hh:MM TT"
                              )}
                            </p>
                          </>
                        )}
                      </span>
                    );
                  })
                : null}
            </div>
            <div ref={messagesEndRef} />
          </Col>
        </Row>
      </Container>

      <Form
        onSubmit={(event) => handleSubmit(event, false)}
        className="message-form bg-light px-2"
        ref={form}
      >
        <Container>
          <Row>
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
              <InputGroup className="mx-auto">
                <Button
                  type="button"
                  variant="light"
                  size="lg"
                  className="border pt-0"
                  onClick={() => setShowOffcanvaMap(true)}
                >
                  <PinMap size={24} />
                </Button>
                <Form.Control
                  name="message"
                  placeholder={t("translation:singleConversation.sendMessage")}
                  onChange={(e) => setMessage(e.target.value)}
                  size="lg"
                />
                <Button
                  type="submit"
                  variant="success"
                  className="px-sm-2 px-md-3"
                  disabled={isLoadingSendMessage}
                  size="lg"
                >
                  {isLoadingSendMessage ? (
                    <LoadingSpinner size={"sm"} />
                  ) : (
                    <PaperAirplaneIcon size={24} className="mb-1" />
                  )}
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </Form>

      <Offcanvas
        show={showOffcanvaMap}
        onHide={() => setShowOffcanvaMap(false)}
        placement="bottom"
        className="vh-100"
      >
        <Container fluid className="px-0">
          <Row>
            <Col>
              <Offcanvas.Header
                closeButton
                className="position-absolute text-center bg-white w-100"
                style={{ zIndex: 99999 }}
              >
                <Offcanvas.Title>
                  <h1>{t("translation:singleConversation.titleOffCanva")}</h1>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="text-center p-0">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={marker}
                  zoom={7}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  onClick={changeMarker}
                  options={{ scrollwheel: true }}
                >
                  <Marker position={{ lat: marker.lat, lng: marker.lng }}>
                    <InfoWindow center={{ lat: marker.lat, lng: marker.lng }}>
                      <Button
                        onClick={handleSendPin}
                        variant="success"
                        className="m-3"
                      >
                        {t("translation:singleConversation.sendPin")}
                      </Button>
                    </InfoWindow>
                  </Marker>
                </GoogleMap>
              </Offcanvas.Body>
            </Col>
          </Row>
        </Container>
      </Offcanvas>
    </div>
  );
};

export default React.memo(SingleConversation);
