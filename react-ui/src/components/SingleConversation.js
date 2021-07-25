import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarAlt,
  faCheck,
  faCheckDouble,
  faChevronLeft,
  faExclamationTriangle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import {
  Form,
  Row,
  Col,
  Spinner,
  Button,
  Container,
  ListGroup,
  ButtonGroup,
  ToastContainer,
  Toast,
} from "react-bootstrap";

import { resetConversationView } from "../redux";

import { submitFormBookRide } from "../redux";
import LoadingMessage from "./LoadingMessage";
import dateFormat from "dateformat";
import { LinkContainer } from "react-router-bootstrap";

const SingleConversation = ({ conversation }) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const { messageStatusColor, messageStatusIcon } = useSelector(
    (state) => state.message
  );

  const receiver = !(conversation.UserId === currentUser.id)
    ? conversation.User.username
    : conversation.Driver.User.username;

  return (
    <div>
      <ListGroup className="mb-5" style={{ cursor: "pointer" }}>
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
              style={{ color: conversation.color }}
              className="me-3"
            />
            {receiver}
          </span>
        </ListGroup.Item>
      </ListGroup>

      <Container data-aos="slide-left">
        {console.log(conversation.Messages)}
        <div className="imessage">
          {conversation.Messages.map((message, index) => {
            return (
              <>
                {message.SenderId === currentUser.id ? (
                  // The receiver's messages
                  <>
                    <p className="from-them">{message.body}</p>
                    <span className="text-secondary text-start mt-0">
                      {dateFormat(message.createdAt, "dd/mm/yyyy HH:MM")}{" "}
                      {messageStatusIcon(message.MessageStatusId)}
                    </span>
                  </>
                ) : (
                  // The sender's messages
                  <>
                    <p className="from-me">{message.body} </p>
                    <span className="text-secondary text-end mt-0">
                      {dateFormat(message.createdAt, "dd/mm/yyyy HH:MM")}{" "}
                      {messageStatusIcon(message.MessageStatusId)}
                    </span>
                  </>
                )}
              </>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default SingleConversation;
