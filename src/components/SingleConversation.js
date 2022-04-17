import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Container,
  Form,
  InputGroup,
  ListGroup,
} from "react-bootstrap";

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

    form.current.reset();
  };

  return (
    <div>
      <ListGroup className="cursor-pointer sticky-top mb-5">
        <ListGroup.Item
          onClick={() => {
            dispatch(clearFeedback());
            dispatch(getAllUserMessages(currentUser.id));
            dispatch(resetConversationView(currentUser.id));
          }}
          className="rounded-0 border border-top-0 border-start-0
          border-end-0"
        >
          <span>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-success me-3"
            />
            <FontAwesomeIcon
              icon={faUser}
              size="2x"
              className="text-secondary me-3"
            />
            <span className="h2">{receiver}</span>
          </span>
        </ListGroup.Item>
      </ListGroup>

      <Container data-aos="fade-in">
        <div
          className={
            conversation.Messages.length > 0
              ? "imessage border rounded px-3 py-5"
              : "imessage px-3 py-5"
          }
        >
          {conversation.Messages.length === 0 ? (
            <h2 className="text-success text-center">
              Write your first message to {receiver}
            </h2>
          ) : (
            conversation.Messages.map((message, index) => {
              return (
                <span key={index}>
                  {message.SenderId === currentUser.id ? (
                    // The sender's messages
                    <>
                      <p className="from-me mb-0">{message.body} </p>
                      <p className="text-secondary text-end w-100 my-0">
                        {dateFormat(message.createdAt, "dd/mm/yyyy HH:MM")}{" "}
                        {messageStatusIcon(message.MessageStatusId)}
                      </p>
                    </>
                  ) : (
                    // The receiver's messages
                    <>
                      <p className="from-them mb-0">{message.body}</p>
                      <p className="text-secondary w-100 ps-0 my-0">
                        {dateFormat(message.createdAt, "dd/mm/yyyy HH:MM")}
                      </p>
                    </>
                  )}
                </span>
              );
            })
          )}
        </div>
        <div ref={messagesEndRef} />
      </Container>

      <Form onSubmit={handleSubmit} className="message-form px-2" ref={form}>
        <InputGroup className="w-75 mx-auto">
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
              <FontAwesomeIcon icon={faPaperPlane} size="lg" />
            )}
          </Button>
        </InputGroup>
      </Form>

      <div className="w-50 mx-auto">
        <FeedbackMessage />
      </div>
    </div>
  );
};

export default SingleConversation;
