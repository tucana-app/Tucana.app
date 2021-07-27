import React from "react";
import { Link } from "react-router-dom";

function MessageEmpty(props) {
  const { title } = props;
  return (
    <div>
      <h1 className="display-2 font-title text-info mb-4">No {title} found</h1>
      <p className="lead mb-0">
        Book your next ride by{" "}
        <Link to="/find-ride" className="text-success">
          clicking here
        </Link>
      </p>
      <p className="lead">
        Or offer a ride by{" "}
        <Link to="/offer-ride" className="text-warning">
          clicking here
        </Link>
      </p>
    </div>
  );
}

export default MessageEmpty;
