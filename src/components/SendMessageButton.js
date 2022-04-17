import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { startConversation } from "../redux";
import LoadingSpinner from "./LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

function SendMessageButton({ booking }) {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const { isLoadingStartConversation } = useSelector((state) => state.message);
  const history = useHistory();

  const handleStartConversation = () => {
    // 1: DriverID, 2: UserId (passenger), 3: RideId, 4: BookingId
    dispatch(
      startConversation(
        booking.DriverId,
        booking.User.id,
        booking.Ride.id,
        booking.id,
        currentUser.id
      )
    );

    history.push("/messages");
  };

  return (
    <>
      <Button
        onClick={handleStartConversation}
        variant="success"
        disabled={isLoadingStartConversation}
      >
        {isLoadingStartConversation ? (
          <LoadingSpinner />
        ) : (
          <FontAwesomeIcon icon={faComment} />
        )}
        <span className="d-md-screen ms-2">Contact</span>
      </Button>
    </>
  );
}

export default SendMessageButton;
