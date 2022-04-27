import React from "react";
import { Link } from "react-router-dom";
import { Container, ListGroup } from "react-bootstrap";
import { ChevronRightIcon } from "@primer/octicons-react";

import GoBack from "../../components/GoBack";

const Report = () => {
  return (
    <div>
      <GoBack />

      <hr className="my-2" />

      <Container fluid className="p-0" data-aos="fade-in">
        <ListGroup variant="flush">
          <Link to="/coming-soon" className="text-decoration-none">
            <ListGroup.Item className="border-0">
              <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                <p className="mb-0">Swearing, hate, racism, sexism</p>
                <ChevronRightIcon size={24} verticalAlign="middle" />
              </div>
            </ListGroup.Item>
          </Link>

          <Link to="/coming-soon" className="text-decoration-none">
            <ListGroup.Item className="border-0">
              <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                <p className="mb-0">A problem with the app</p>
                <ChevronRightIcon size={24} verticalAlign="middle" />
              </div>
            </ListGroup.Item>
          </Link>

          <hr className="my-2" />
        </ListGroup>
      </Container>
    </div>
  );
};

export default Report;
