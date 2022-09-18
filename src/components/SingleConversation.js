import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  ListGroup,
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
} from "../redux";

import dateFormat from "dateformat";
import LoadingSpinner from "./LoadingSpinner";

import { findLinks } from "../helpers";

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
        currentUser.id,
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
      <ListGroup className="cursor-pointer sticky-top mb-3">
        <ListGroup.Item
          onClick={() => {
            dispatch(getAllUserMessages(currentUser.id));
            dispatch(resetConversationView(currentUser.id));
            dispatch(displayNavBar(true));
          }}
          className="bg-light rounded-0 border border-top-0 border-start-0
          border-end-0 py-3"
        >
          <div className="d-flex align-items-center">
            <ChevronLeftIcon size={28} className="text-success" />
            <img
              src={srcAvatar(receiver)}
              alt="Avatar"
              className="img-fluid rounded-round cursor-pointer img-avatar mx-2"
              width="50px"
            />
            <h2 className="mb-0">{receiverFirstName}</h2>
          </div>
        </ListGroup.Item>
      </ListGroup>

      <Container data-aos="fade-in">
        <div
          className={
            conversation.Messages.length > 0
              ? "imessage rounded px-3 pb-3"
              : "imessage px-3"
          }
        >
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
                          {dateFormat(message.createdAt, "dd/mm/yy hh:MM TT")}{" "}
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
                          {dateFormat(message.createdAt, "dd/mm/yy hh:MM TT")}
                        </p>
                      </>
                    )}
                  </span>
                );
              })
            : null}
        </div>
        <div ref={messagesEndRef} />
      </Container>

      <Form
        onSubmit={(event) => handleSubmit(event, false)}
        className="message-form bg-light px-2"
        ref={form}
      >
        <Container>
          <Row>
            <Col xs={12} sm={10} md={8} lg={8} className="mx-auto">
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
                  className="px-sm-2 px-md-3 px-lg-5"
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
