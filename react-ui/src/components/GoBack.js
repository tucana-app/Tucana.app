import React from "react";
import { withRouter } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function GoBack({ history }) {
  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <ListGroup variant="flush" style={{ cursor: "pointer" }}>
      <ListGroup.Item
        onClick={handleGoBack}
        className="bg-dark text-white border border-top-0 border-start-0 border-end-0"
      >
        <div className="d-inline-flex justify-content-between w-100 py-3">
          <span>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-success me-3"
            />{" "}
            Go back
          </span>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default withRouter(GoBack);
