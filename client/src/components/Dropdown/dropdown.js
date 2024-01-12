import React from "react";
import { Dropdown } from "react-bootstrap";
import "./dropdown.css";
const DropdownComponent = ({ options, onSelect, selectedValue }) => {
  return (
    < >
      <Dropdown onSelect={onSelect} className="text-center">
        <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">{selectedValue}</Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map((option) => {
            if (option === "View" || option === "Edit" || option === "Delete") {
              return (
                <Dropdown.Item key={option} eventKey={option}>
                  {option==='View'?<span><i className="fa-solid fa-eye" style={{ color: 'green' }}></i> View</span>:option==='Edit'?<span > <i className="fa-solid fa-pen-to-square" style={{color:'blue'}}></i> Edit</span>:<span > <i className="fa-solid fa-trash" style={{color:'red'}}></i> Delete</span>}
                </Dropdown.Item>
              );
            } else {
              return (<Dropdown.Item key={option} eventKey={option}>{option}</Dropdown.Item>);
            } 
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default DropdownComponent;
