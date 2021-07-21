import React from "react";
import { Link } from "react-router-dom";

function NoBookingMessage() {
  return (
    <div>
      <h1 className="display-2 text-info">No booking found</h1>
      <p>
        Book your next ride by{" "}
        <Link to="/find-ride" className="text-success">
          clicking here
        </Link>
      </p>
    </div>
  );
}

export default NoBookingMessage;
