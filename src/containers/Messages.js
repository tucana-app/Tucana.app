import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ChevronRightIcon } from "@primer/octicons-react";
import { PersonCircle } from "react-bootstrap-icons";

import LoadingSpinner from "../components/LoadingSpinner";
import SingleConversation from "../components/SingleConversation";

import { getAllUserMessages, changeConversationView } from "../redux";

function Messages() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  const { isLoadingAllUserMessages, allUserMessagesData, currentView } =
    useSelector((state) => state.message);

  const findConversation = () => {
    return allUserMessagesData.find(
      (conversation) => conversation.UUID === currentView
    );
  };

  const getSenderUsername = (conversation) => {
    if (!(conversation.UserId === currentUser.id)) {
      return conversation.User.firstName;
    } else {
      return conversation.Driver.User.firstName;
    }
  };

  const countUnreadMessages = (conversation) => {
    let count = 0;

    conversation.Messages.map((message) => {
      if (
        message.ReceiverId === currentUser.id &&
        message.MessageStatusId === 1
      )
        return count++;
      return count;
    });

    return count;
  };

  useEffect(() => {
    if (isLoggedIn) dispatch(getAllUserMessages(currentUser.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {currentView && findConversation() !== undefined ? (
        <SingleConversation conversation={findConversation()} />
      ) : (
        <>
          <ListGroup.Item className="py-4 border border-top-0 border-end-0 border-start-0">
            <h1 className="title text-center mb-0">
              {t("translation:messages.title")}
            </h1>
          </ListGroup.Item>

          {isLoadingAllUserMessages ? (
            <Container>
              <Row className="py-5">
                <Col className="text-center">
                  <LoadingSpinner />
                </Col>
              </Row>
            </Container>
          ) : allUserMessagesData.length > 0 ? (
            <Container>
              <Row>
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  xl={4}
                  className="p-0 mx-auto"
                >
                  <ListGroup variant="flush">
                    {allUserMessagesData.map((conversation, index) =>
                      conversation.Messages.length !== 0 ? (
                        <ListGroup.Item
                          key={index}
                          className="cursor-pointer border border-top-0 border-start-0 border-end-0"
                          onClick={() =>
                            dispatch(
                              changeConversationView(
                                conversation.UUID,
                                currentUser.id,
                                conversation.id
                              )
                            )
                          }
                        >
                          <div className="d-inline-flex align-items-center justify-content-between w-100 py-2">
                            <div className="position-relative">
                              <PersonCircle
                                size={28}
                                className="text-secondary mb-2 me-2"
                              />
                              <span className="h2">
                                {getSenderUsername(conversation)}
                              </span>
                              {countUnreadMessages(conversation) > 0 ? (
                                <Badge
                                  bg="danger"
                                  className="align-text-top ms-2"
                                >
                                  {countUnreadMessages(conversation)}
                                </Badge>
                              ) : null}
                            </div>
                            <ChevronRightIcon
                              size={24}
                              verticalAlign="middle"
                            />
                          </div>
                        </ListGroup.Item>
                      ) : null
                    )}
                  </ListGroup>
                </Col>
              </Row>
            </Container>
          ) : null}
        </>
      )}
    </>
  );
}

export default Messages;
