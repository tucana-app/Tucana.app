import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { CommentDiscussionIcon } from "@primer/octicons-react";

import { startConversation } from "../redux";

import LoadingSpinner from "./LoadingSpinner";

function SendMessageButton({ type, driverId, userId, receiverName, rideId }) {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const { isLoadingStartConversation } = useSelector((state) => state.message);
  const history = useHistory();

  const handleStartConversation = () => {
    // driverId, userId, viewerId, rideId
    dispatch(startConversation(driverId, userId, currentUser.id, rideId));

    history.push("/messages");
  };

  return type === "link" ? (
    <Button
      onClick={handleStartConversation}
      variant="white"
      disabled={isLoadingStartConversation}
      className="p-0 me-2"
    >
      <span className="text-success">Contact {receiverName}</span>
    </Button>
  ) : (
    <Button
      onClick={handleStartConversation}
      variant="success"
      disabled={isLoadingStartConversation}
    >
      {isLoadingStartConversation ? (
        <LoadingSpinner />
      ) : (
        <CommentDiscussionIcon size={24} verticalAlign="middle" />
      )}
      <span className="d-md-screen ms-2">Contact {receiverName}</span>
    </Button>
  );
}

export default SendMessageButton;
