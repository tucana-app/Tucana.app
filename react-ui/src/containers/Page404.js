import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <>
      <div className="container text-center py-5">
        <div className="row h-100 align-items-center">
          <div className="col-12">
            <div>
              <h1 className="display-4 text-warning">404: Page not found</h1>
            </div>
            <div>
              <p className="lead">
                We couldn't find the page you are looking for.
              </p>
              <p>
                Please come back to the{" "}
                <Link to="/" className="text-success">
                  <u>main page</u>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page404;
