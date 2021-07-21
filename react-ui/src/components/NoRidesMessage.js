import React from "react";
import { Link } from "react-router-dom";

function NoRidesMessage() {
  return (
    <div>
      <h1 className="display-2 text-info">No rides for now</h1>
      <p>
        Offer a ride by{" "}
        <Link to="/offer-ride" className="text-success">
          clicking here
        </Link>
      </p>
    </div>
  );
}

export default NoRidesMessage;
