import React from "react";
import { EyeClosedIcon, EyeIcon } from "@primer/octicons-react";
import { Button } from "react-bootstrap";

function EyePassword(props) {
  const { isShow, touched, setShowPassword } = props;

  return (
    <div onClick={() => setShowPassword(!isShow)}>
      <Button variant="white" className={`eye p-0  ${touched ? "me-3" : null}`}>
        {isShow ? <EyeClosedIcon size="18" /> : <EyeIcon size="18" />}
      </Button>
    </div>
  );
}

export default EyePassword;
