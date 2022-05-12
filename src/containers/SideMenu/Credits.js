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
            <a
              href="https://www.freepik.com/vectors/rocky-mountains"
              target="_blank"
              rel="noreferrer"
            >
              Rocky mountains vector created by vectorpocket - www.freepik.com
            </a>
          </li>
          <li>
            <a
              href="https://www.svgbackgrounds.com/"
              target="_blank"
              rel="noreferrer"
            >
              Background provided by SVGBackgrounds.com
            </a>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Credits;
