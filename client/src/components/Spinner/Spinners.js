import React from "react";
import Spinner from "react-bootstrap/Spinner";
const Spinners = () => {
  return (
    <>
      <div className="d-flex justify-content-center  align-items-center mt-2">
        <Spinner animation="border" role="status"></Spinner>
        <span className="ms-3 fw-bold">Loading...</span>
      </div>
    </>
  );
};

export default Spinners;
