import React from "react";
import { Container } from "react-bootstrap";

import GoBack from "../../components/GoBack";

const Credits = () => {
  return (
    <div>
      <GoBack />

      <hr className="my-2" />

      <Container fluid className="p-0" data-aos="fade-in">
        <ul>
          <li>
            <a href="https://www.freepik.com/vectors/rocky-mountains">
              Rocky mountains vector created by vectorpocket - www.freepik.com
            </a>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Credits;
