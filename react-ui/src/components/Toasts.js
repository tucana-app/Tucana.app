import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { setShowLogoutToast, setShowLoginToast } from "../redux";

const toastDelay = 3000;
const aosToastAnimation = "fade-down";

function Toasts() {
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { showLogoutToast, showLoginToast } = useSelector(
    (state) => state.toast
  );

  return (
    <div aria-live="polite" aria-atomic="true" className="fixed-top">
      <ToastContainer position="top-center" className="p-3">
        <Toast
          show={showLogoutToast}
          onClose={() => dispatch(setShowLogoutToast(false))}
          className=""
          delay={toastDelay}
          data-aos={aosToastAnimation}
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
            show={showLoginToast}
            onClose={() => dispatch(setShowLoginToast(false))}
            className=""
            delay={toastDelay}
            data-aos={aosToastAnimation}
            bg="success"
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Logged in</strong>
            </Toast.Header>
            <Toast.Body className="text-dark">
              Welcome back {currentUser.firstName}
            </Toast.Body>
          </Toast>
        ) : null}
      </ToastContainer>
    </div>
  );
}

export default Toasts;
