import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { setShowLogoutToast, setShowLoginSuccessToast } from "../redux";

const toastDelay = 3000;

function Toasts() {
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { showLogoutToast, showLoginSuccessToast } = useSelector(
    (state) => state.toast
  );

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed-bottom"
      style={{ marginBottom: "20px" }}
    >
      <ToastContainer position="bottom-center" className="p-3">
        <Toast
          show={showLogoutToast}
          onClose={() => dispatch(setShowLogoutToast(false))}
          className=""
          delay={toastDelay}
          data-aos="fade-up"
          bg="danger"
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Logged out</strong>
          </Toast.Header>
          <Toast.Body>You are now logged out</Toast.Body>
        </Toast>

        {isLoggedIn ? (
          <Toast
            show={showLoginSuccessToast}
            onClose={() => dispatch(setShowLoginSuccessToast(false))}
            className=""
            delay={toastDelay}
            data-aos="fade-up"
            bg="success"
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Logged in</strong>
            </Toast.Header>
            <Toast.Body>Welcome back {currentUser.firstName}</Toast.Body>
          </Toast>
        ) : null}
      </ToastContainer>
    </div>
  );
}

export default Toasts;
