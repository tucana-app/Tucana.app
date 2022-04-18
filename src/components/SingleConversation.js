import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import {
  PaperAirplaneIcon,
  PersonIcon,
  ChevronLeftIcon,
} from "@primer/octicons-react";

import {
  resetConversationView,
  sendMessage,
  clearFeedback,
  getAllUserMessages,
} from "../redux";

import dateFormat from "dateformat";
import LoadingSpinner from "./LoadingSpinner";
import FeedbackMessage from "./FeedbackMessage";

const SingleConversation = ({ conversation }) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const { messageStatusIcon, isLoadingSendMessage } = useSelector(
    (state) => state.message
  );
  const messagesEndRef = useRef(null);

  const [message, setMessage] = useState("");

  // Get receiver's information
  const receiver = !(conversation.UserId === currentUser.id)
    ? conversation.User.firstName
    : conversation.Driver.User.firstName;
  const receiverId = !(conversation.UserId === currentUser.id)
    ? conversation.User.id
    : conversation.Driver.User.id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const form = useRef("");

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(sendMessage(currentUser.id, receiverId, message, conversation.id));
    scrollToBottom();
    form.current.reset();
  };

  return (
    <div>
      <ListGroup className="cursor-pointer sticky-top mb-3">
        <ListGroup.Item
          onClick={() => {
            dispatch(clearFeedback());
            dispatch(getAllUserMessages(currentUser.id));
            dispatch(resetConversationView(currentUser.id));
          }}
          className="rounded-0 border border-top-0 border-start-0
          border-end-0 py-3"
        >
          <span>
            <ChevronLeftIcon size={28} className="text-success" />
            <PersonIcon size={24} className="mb-1 me-2" />
            <span className="h2">{receiver}</span>
          </span>
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
                        <p className="from-me mb-0">{message.body} </p>
                        <p className="small text-secondary text-end w-100 mt-1 pe-0 py-0">
                          {dateFormat(message.createdAt, "dd/mm/yy hh:mm TT")}{" "}
                          {messageStatusIcon(message.MessageStatusId)}
                        </p>
                      </>
                    ) : (
                      // The receiver's messages
                      <>
                        <p className="from-them mb-0">{message.body}</p>
                        {/* <p className="small text-secondary w-100 ps-0 my-0"> */}
                        <p className="small text-secondary w-100 mt-1 ps-0 py-0">
                          {dateFormat(message.createdAt, "dd/mm/yy hh:mm TT")}
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

      <Form onSubmit={handleSubmit} className="message-form px-2" ref={form}>
        <Container>
          <Row>
            <Col xs={12} sm={10} md={8} lg={8} className="mx-auto">
              <InputGroup className="mx-auto">
                <Form.Control
                  name="message"
                  placeholder="Send a message"
                  className=""
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
                    <PaperAirplaneIcon verticalAlign="middle" />
                  )}
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </Form>

      <div className="w-50 mx-auto">
        <FeedbackMessage />
      </div>
    </div>
  );
};

export default SingleConversation;
