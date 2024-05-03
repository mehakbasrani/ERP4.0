import React, { useState, useRef } from "react";
import {
  Input,
  Button,
  TableBody,
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
} from "semantic-ui-react";

const BOMAutoComplete = ({ data, bomData }) => {
  const options = bomData?.map((item) => item.itemname);
  const [inputValue, setInputValue] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const inputRef = useRef(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [outputValue, setOutputValue] = useState("");
  const [selectedOpValues, setSelectedOpValues] = useState([]);
  const [filteredOpOptions, setFilteredOpOptions] = useState([]);
  const outputRef = useRef(null);
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
    setInputValue("");
    inputRef.current.focus();
    setFilteredOptions([]);
  };

  const handleOutputChange = (e) => {
    const value = e.target.value;
    setOutputValue(value);
    filterOpOptions(value);
  };

  const filterOpOptions = (value) => {
    setFilteredOpOptions(
      options.filter(
        (option) =>
          option.toLowerCase().includes(value.toLowerCase()) &&
          !selectedOpValues.includes(option)
      )
    );
  };

  const handleSelectOpOption = (option) => {
    setSelectedOpValues([...selectedOpValues, option]);
    setOutputValue("");
    outputRef.current.focus();
    setFilteredOpOptions([]);
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
  };

  const handleSave = () => {
    const values = {
      startDate,
      endDate,
      ...selectedValues.reduce((acc, value, index) => {
        acc[`selectedValue${index + 1}`] = value;
        return acc;
      }, {}),
    };
    console.log(values);
  };

  return (
    <div className="scrollable">
      <Table className="borderless-table custom-table">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Process</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell>
              <Button floated="right" primary>
                Save
              </Button>
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Input</TableHeaderCell>
            <TableHeaderCell>Process</TableHeaderCell>
            <TableHeaderCell>Output</TableHeaderCell>
            <TableHeaderCell>Start Date</TableHeaderCell>
            <TableHeaderCell>End Date</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => {
            return (
              <>
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      key={index}
                      name={`ip${index + 1}`}
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      ref={inputRef}
                    />
                    <ul>
                      {filteredOptions.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => handleSelectOption(option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                    <ul>
                      {selectedValues.map((value, index) => (
                        <li key={index}>{value} </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>{item.process}</TableCell>
                  <TableCell>
                    <Input
                      key={index}
                      name={`op${index + 1}`}
                      type="text"
                      value={outputValue}
                      onChange={handleOutputChange}
                      ref={outputRef}
                    />
                    <ul>
                      {filteredOpOptions.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => handleSelectOpOption(option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                    <ul>
                      {selectedOpValues.map((value, index) => (
                        <li key={index}>{value} </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <Input
                      name={`sd${index + 1}`}
                      type="date"
                      value={startDate}
                      onChange={handleStartDateChange}
                      placeholder="Start Date"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      name={`ed${index + 1}`}
                      type="date"
                      value={endDate}
                      onChange={handleEndDateChange}
                      placeholder="End Date"
                    />
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default BOMAutoComplete;
