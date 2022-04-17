import React from "react";
import { withRouter } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { ChevronLeftIcon } from "@primer/octicons-react";

function GoBack(props) {
  const { history, pageName } = props;

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <ListGroup
      variant="flush"
      className="cursor-pointer border border-top-0 border-start-0 border-end-0 py-2"
    >
      <ListGroup.Item onClick={handleGoBack}>
        <div className="d-inline-flex justify-content-between w-100">
          <span>
            <ChevronLeftIcon
              size={28}
              verticalAlign="middle"
              className="text-success"
            />
            {pageName}
          </span>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default withRouter(GoBack);
