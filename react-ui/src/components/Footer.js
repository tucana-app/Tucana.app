import React from "react";

const Footer = () => {
  return (
    <footer className="container border border-right-0 border-bottom-0 border-left-0 border-white py-5">
      <div className="row mb-5">
        <div className="col-12">
          <h1 className="h1 mt-0 pt-0">Ride.CR</h1>
          <p className="lead">Share your rides in Costa Rica</p>
          <p>#1 app for carpooling around Costa Rica</p>
        </div>
      </div>
      <div className="row mx-auto">
        <div className="col-12 text-center mx-auto">
          <p className="text-uppercase font-small mb-0">
            &copy; 2021 Ride.CR - All Rights Reserved
          </p>
          <p className="font-small">
            Web Designer &amp; CEO: Benjamin Jaume -{" "}
            <a
              href="http://www.benjaminjau.me"
              alt=""
              className="text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.benjaminjau.me
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
