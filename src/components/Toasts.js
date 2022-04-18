import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { setShowToast } from "../redux";

const toastDelay = 3000;

function Toasts() {
  const dispatch = useDispatch();
  const { show, headerText, bodyText, variant } = useSelector(
    (state) => state.toast
  );

  return (
    <div aria-live="polite" aria-atomic="true">
      <ToastContainer
        position="top-center"
        className="position-fixed pt-2"
        style={{ zIndex: 9999 }}
      >
        <Toast
          show={show}
          onClose={() => dispatch(setShowToast({ show: false }))}
          delay={toastDelay}
          bg={variant}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">{headerText}</strong>
          </Toast.Header>
          <Toast.Body className="text-dark">{bodyText}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Toasts;
