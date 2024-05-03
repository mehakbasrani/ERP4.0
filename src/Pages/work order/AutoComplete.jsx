import React, { useState, useRef } from "react";
import { Input } from "semantic-ui-react";

const BOMAutoComplete = ({ options, onSelect, index }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    filterOptions(value);
  };

  const filterOptions = (value) => {
    setFilteredOptions(
      options.filter(
        (option) =>
          option.toLowerCase().includes(value.toLowerCase()) &&
          !selectedValues.includes(option)
      )
    );
  };

  const handleSelectOption = (option) => {
    setSelectedValues([...selectedValues, option]);
    setInputValue(option);
    inputRef.current.focus();
    setFilteredOptions([]);
    onSelect(option);
  };

  return (
    <div>
      <>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <ul>
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleSelectOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      </>
    </div>
  );
};

export default BOMAutoComplete;
