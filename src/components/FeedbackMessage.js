import React from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const FeedbackMessage = () => {
  const { feedback } = useSelector((state) => state.global);

  return (
    <>
      {feedback.message && (
        <Alert variant={feedback.variant} className="my-3">
          {feedback.message}
        </Alert>
      )}
    </>
  );
};

export default FeedbackMessage;
