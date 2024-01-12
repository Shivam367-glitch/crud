import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SearchBar = ({ onSearchChange }) => {

  const debouncedSearchChange = debounce(onSearchChange);

  function debounce(callback) {
    let timer;
    return function () {
      let context = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback.apply(context, args);
      }, 1000);
    };
  }
  return (
    <div className="search">
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e) => debouncedSearchChange(e.target.value)}
        />
        <Button variant="success" className="search_btn">Search</Button>
      </Form>
    </div>
  );
};

export default SearchBar;
