import React from "react";
import {
  Envelope,
  Facebook,
  Instagram,
  Messenger,
  Paypal,
  Twitter,
  Whatsapp,
} from "react-bootstrap-icons";

const SocialIcons = () => {
  return (
    <>
      <a
        href="https://business.facebook.com/tucanaapp"
        target="_blank"
        rel="noopener noreferrer"
        className="hvr-grow text-dark me-3"
      >
        <Facebook className="mb-1" size="30" />
      </a>
      <a
        href="https://www.instagram.com/ride.cr.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="hvr-grow text-dark me-3"
      >
        <Instagram className="mb-1" size="30" />
      </a>
      <a
        href="https://wa.me/50660164300/"
        target="_blank"
        rel="noopener noreferrer"
        className="hvr-grow text-dark me-3"
      >
        <Whatsapp className="mb-1" size="30" />
      </a>
      <a
        href="https://m.me/tucanaapp/"
        target="_blank"
        rel="noopener noreferrer"
        className="hvr-grow text-dark me-3"
      >
        <Messenger className="mb-1" size="30" />
      </a>
      <a
        href="https://www.paypal.com/donate/?hosted_button_id=M4QRJF5GDHCKA"
        target="_blank"
        rel="noopener noreferrer"
        className="hvr-grow text-dark me-3"
      >
        <Paypal size="30" />
      </a>
      <a
        href="https://twitter.com/ride_cr_app"
        target="_blank"
        rel="noopener noreferrer"
        className="hvr-grow text-dark me-3"
      >
        <Twitter className="mb-1" size="30" />
      </a>
      <a
        href="mailto:info@tucana.app"
        target="_blank"
        rel="noopener noreferrer"
        className="hvr-grow text-dark me-3"
      >
        <Envelope className="mb-1" size="30" />
      </a>
    </>
  );
};

export default SocialIcons;
