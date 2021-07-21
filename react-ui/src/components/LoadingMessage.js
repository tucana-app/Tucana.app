import React from "react";
import { Spinner } from "react-bootstrap";

function LoadingMessage() {
  return (
    <Spinner
      animation="border"
      role="status"
      as="span"
      aria-hidden="true"
      className="align-middle me-2"
      variant="success"
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}

export default LoadingMessage;
