import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
} from "react-bootstrap";

import { resetConversationView } from "../redux";

import dateFormat from "dateformat";

const SingleConversation = ({ conversation }) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const { messageStatusIcon } = useSelector((state) => state.message);

  const [message, setMessage] = useState("");

  const receiver = !(conversation.UserId === currentUser.id)
    ? conversation.User.username
    : conversation.Driver.User.username;

  const handleSubmit = () => {
    // dispatch(sendMessage(currentUser, ))
    console.log(message);
  };

  return (
    <div>
      <ListGroup className="sticky-top mb-5" style={{ cursor: "pointer" }}>
        <ListGroup.Item
          onClick={() => dispatch(resetConversationView())}
          className="bg-dark text-white border border-top-0 border-start-0
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
            {receiver}
          </span>
        </ListGroup.Item>
      </ListGroup>

      <Container data-aos="slide-left">
        <div className="imessage">
          {conversation.Messages.map((message, index) => {
            return (
              <span key={index}>
                {message.SenderId === currentUser.id ? (
                  // The receiver's messages
                  <>
                    <p className="from-them mb-0">{message.body}</p>
                    <p className="text-secondary text-start my-0">
                      {dateFormat(message.createdAt, "dd/mm/yyyy HH:MM")}{" "}
                      {messageStatusIcon(message.MessageStatusId)}
                    </p>
                  </>
                ) : (
                  // The sender's messages
                  <>
                    <p className="from-me mb-0">{message.body} </p>
                    <p className="text-secondary text-end w-100 my-0">
                      {dateFormat(message.createdAt, "dd/mm/yyyy HH:MM")}{" "}
                      {messageStatusIcon(message.MessageStatusId)}
                    </p>
                  </>
                )}
              </span>
            );
          })}
          <span>
            <p className="from-me mb-0">Hello </p>
            <p className="from-them mb-0">Hello </p>
            <p className="from-me mb-0">Hello </p>
            <p className="from-them mb-0">Hello </p>
            <p className="from-me mb-0">Hello </p>
            <p className="from-them mb-0">Hello </p>
            <p className="from-me mb-0">Hello </p>
            <p className="from-them mb-0">Hello </p>
            <p className="from-me mb-0">Hello </p>
            <p className="from-them mb-0">Hello </p>
            <p className="from-me mb-0">Hello </p>
            <p className="from-them mb-0">Hello </p>
            <p className="from-me mb-0">Hello </p>
            <p className="from-them mb-0">Hello </p>
            <p className="from-me mb-0">Hello </p>
            <p className="from-them mb-0">Hello </p>
            <p className="from-me mb-0">Hello </p>
            <p className="from-them mb-0">Hello </p>
            <p className="from-me mb-0">Hello </p>
            <p className="from-them mb-0">Hello </p>
            <p className="from-me mb-0">Hello </p>
          </span>
        </div>
      </Container>

      <Form className="message-form px-2">
        <InputGroup className="w-75 mx-auto">
          <Form.Control
            name="message"
            placeholder="Send a message"
            className=""
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="success"
            className="px-sm-2 px-md-3 px-lg-5"
            onClick={handleSubmit}
            as={Col}
            xs={3}
            sm={2}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default SingleConversation;
