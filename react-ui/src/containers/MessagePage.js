import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import LoadingMessage from "../components/LoadingMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
// import GoBack from "../components/GoBack";

import {
  getAllUserMessages,
  changeConversationView,
  resetConversationView,
} from "../redux";
import NoBookingMessage from "../components/NoBookingMessage";
import SingleConversation from "../components/SingleConversation";

function ComingSoon(props) {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  const {
    isLoadingAllUserMessages,
    allUserMessagesData,
    allUserMessagesFail,
    isLoadingStartConversation,
    startConversationFail,
    currentView,
  } = useSelector((state) => state.message);

  const findConversation = () => {
    return allUserMessagesData.find(
      (conversation) => conversation.UUID === currentView
    );
  };

  useEffect(() => {
    if (isLoggedIn) dispatch(getAllUserMessages(currentUser.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      {isLoadingAllUserMessages ? (
        <Container>
          <Row className="py-5">
            <Col className="text-center">
              <LoadingMessage />
            </Col>
          </Row>
        </Container>
      ) : allUserMessagesData.length > 0 ? (
        <>
          {currentView ? (
            <SingleConversation conversation={findConversation()} />
          ) : (
            <>
              <ListGroup.Item className="bg-dark text-white py-4 border border-top-0 border-end-0 border-start-0">
                <p className="text-center w-100 mb-0">Messages</p>
              </ListGroup.Item>

              <ListGroup variant="flush" data-aos="slide-right">
                {allUserMessagesData.map((conversation, index) => (
                  <span key={index}>
                    <ListGroup.Item
                      className="bg-dark text-white border border-top-0 border-start-0 border-end-0"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        dispatch(changeConversationView(conversation.UUID))
                      }
                    >
                      <div className="d-inline-flex align-items-center justify-content-between w-100 py-2">
                        <span>
                          <FontAwesomeIcon
                            icon={faUser}
                            size="2x"
                            style={{ color: conversation.color }}
                            className="me-3"
                          />
                          {!(conversation.UserId === currentUser.id)
                            ? conversation.User.username
                            : conversation.Driver.User.username}
                        </span>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </div>
                    </ListGroup.Item>
                  </span>
                ))}
              </ListGroup>
            </>
          )}
        </>
      ) : (
        <NoBookingMessage />
      )}
    </div>
  );
}

export default ComingSoon;
