import React, { useState, useRef, useEffect } from "react";
import WorkOrderCom from "./WorkOrderCom"; // Import the new component
import axios from "axios";
import { Divider, GridRow, Header, Input } from "semantic-ui-react";

export const getProdDetail = async (style_name) => {
  let data = await axios.post(
    `https://arya-erp.in/simranapi/workorder/getProdDetail.php`,

    {
      style_name: style_name,
    }
  );
  // console.log(`inside getProdDetail function`);
  // console.log(data.data);
  return data.data;
};

const Test = ({ options }) => {
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
  const [data, setData] = useState({});
  const [latestVal, setLastestVal] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log("latest");
      console.log(latestVal);
      setData(await getProdDetail(latestVal));
    };
    fetchData();
  }, [latestVal]);

  const handleSelectOption = async (option) => {
    setSelectedValues([...selectedValues, option]);
    setInputValue("");
    inputRef.current.focus();
    setFilteredOptions([]);
    setLastestVal(option);
  };
  console.log(data?.gen?.length);
  console.log(data);

  //     const anyKeyHasNull = Object.values(data).some(value => value === null);

  // console.log(anyKeyHasNull); // true, because key2 is null

  return (
    <div>
      <>
        <Header as="h3">Product</Header>

        <div>
          {selectedValues.map((value, index) => (
            <span key={index}>{value} </span>
          ))}
        </div>
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
        {selectedValues.length > 0 &&
          Object.values(data).every((value) => value !== null) && (
            <WorkOrderCom data={data} />
          )}
      </>
    </div>
  );
};

export default Test;
