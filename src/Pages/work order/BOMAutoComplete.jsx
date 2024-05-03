import React, { useState, useRef, useEffect } from "react";
import WorkOrderCom from "./WorkOrderCom"; // Import the new component
import axios from "axios";
import { Divider, Input } from "semantic-ui-react";

const BOMAutoComplete = ({ options, onSelect, index }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showNewComponent, setShowNewComponent] = useState(false); // State to control rendering of new component
  const [newComponentData, setNewComponentData] = useState(null); // State to store data for NewComponent
  const inputRef = useRef(null);

  //   useEffect(() => {
  //     // Function to fetch data for NewComponent
  //     const fetchData = async () => {
  //       // Simulating async data fetching

  //       let newData = await axios.post(
  //         `https://arya-erp.in/simranapi/workorder/getProdDetail.php`,

  //         {
  //           style_name: "Genz",
  //         }
  //       );
  //       console.log(`inside getProdDetail function`);
  //       console.log(newData.data);

  //       setNewComponentData(newData.data);
  //     };

  // Call fetchData function whenever selectedValues change
  //     if (showNewComponent && selectedValues.length > 0) {
  //       fetchData();
  //     }
  //   }, [selectedValues, showNewComponent]);

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
    setShowNewComponent(true); // Show new component after selection
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
          name={`bom${index + 1}`}
        />
        <ul>
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleSelectOption(option)}>
              {option}
            </li>
          ))}
        </ul>
        <ul>
          {selectedValues.map((value, index) => (
            <li key={index}>{value} </li>
          ))}
        </ul>
      </>
    </div>
  );
};

export default BOMAutoComplete;
