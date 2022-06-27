import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CommentDiscussionIcon } from "@primer/octicons-react";

import { startConversation, displayNavBar } from "../redux";

import LoadingSpinner from "./LoadingSpinner";

function SendMessageButton({ type, driverId, userId, receiverName, rideId }) {
  const { t } = useTranslation();
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
      onClick={() => {
        dispatch(displayNavBar(false));
        handleStartConversation();
      }}
      variant="white"
      disabled={isLoadingStartConversation}
      className="p-0 me-2"
    >
      <span className="text-success">
        {t("translation:global.contact")} {receiverName}
      </span>
    </Button>
  ) : (
    <Button
      onClick={() => {
        dispatch(displayNavBar(false));
        handleStartConversation();
      }}
      variant="success"
      disabled={isLoadingStartConversation}
    >
      {isLoadingStartConversation ? (
        <LoadingSpinner />
      ) : (
        <CommentDiscussionIcon size={24} verticalAlign="middle" />
      )}
      <span className="d-md-screen ms-2">
        {t("translation:global.contact")} {receiverName}
      </span>
    </Button>
  );
}

export default SendMessageButton;
