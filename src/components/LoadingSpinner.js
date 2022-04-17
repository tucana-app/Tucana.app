import React from "react";
import { Spinner } from "react-bootstrap";

function LoadingSpinner(props) {
  const { size } = props;

  return (
    <Spinner
      animation="grow"
      role="status"
      as="span"
      aria-hidden="true"
      className="align-middle"
      size={size}
    />
  );
}

export default LoadingSpinner;
