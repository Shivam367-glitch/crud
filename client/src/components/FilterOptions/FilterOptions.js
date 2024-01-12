import React from "react";
import Button from "react-bootstrap/Button";
import DropdownComponent from "../../components/Dropdown/dropdown";
import { Form } from "react-bootstrap";
import { genderOptions, statusOptions } from "../../utility/utility";
const FilterOptions = ({ exportCSV, gender, onGenderChange, SortByValue, status, onStatusChange }) => {
  const filterByOptions = ["New", "Old"];

  return (
    <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
       <div className="export_csv">
        <Button className="export_btn" onClick={exportCSV}>Export To Csv</Button>
      </div>
      <div className="filter_gender">
        <div className="filter">
          <h3>Filter By Gender</h3>
          <div className="gender d-flex justify-content-between">
            {genderOptions.map((genderOption) => (
              <Form.Check
                key={genderOption.id} 
                type="radio"
                label={genderOption.id}
                htmlFor={genderOption.id.toLowerCase()}
                id={genderOption.id.toLowerCase()}
                name="gender"
                value={genderOption.id}
                onChange={(e) => onGenderChange(e.target.value)}
                checked={genderOption.value === gender}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="filter_newold">
       <h3>Sort By Value</h3>
        <DropdownComponent options={filterByOptions} onSelect={SortByValue} selectedValue={<i className="fa-solid fa-sort"></i>} />
      </div>

      <div className="filter_status">
        <div className="status">
          <h3>Filter By Status</h3>
          <div className="status_radio d-flex justify-content-between flex-wrap">
            {statusOptions.map((statusOption) => (
              <Form.Check
                key={statusOption.id} 
                type="radio"
                label={statusOption.label}
                id={statusOption.id}
                name="status"
                value={statusOption.value}
                onChange={(e) => onStatusChange(e.target.value)}
                checked={statusOption.value === status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
