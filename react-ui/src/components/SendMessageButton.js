import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { startConversation } from "../redux";
import LoadingSpinner from "./LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

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
    <div>
      {/* {console.log(booking)} */}
      <Button
        onClick={handleStartConversation}
        variant="success"
        className="rounded-0 text-uppercase"
        disabled={isLoadingStartConversation}
      >
        {isLoadingStartConversation ? (
          <LoadingSpinner />
        ) : (
          <FontAwesomeIcon icon={faComments} className="me-2" />
        )}
        Send a message to{" "}
        {booking.UserId === currentUser.id
          ? booking.Ride.Driver.User.username
          : booking.User.username}
      </Button>
    </div>
  );
}

export default SendMessageButton;
