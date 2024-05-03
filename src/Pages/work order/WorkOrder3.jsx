import axios from "axios";
import React, { useState } from "react";
import Autocomplete from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";
import {
  MasterUrl,
  records_per_page,
} from "../../Consts/Master/MasterUrl.const";
import { getPageData } from "../../Double/fun";

// const size = await getPageData(
//   axios,
//   MasterUrl.getPageData,
//   records_per_page,
//   1,
//   "size"
// );

const WorkOrder3 = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([
    "apple",
    "banana",
    "cherry",
    "date",
    "apricot",
  ]);
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSelect = (newValue) => {
    setValue(newValue);
  };

  return (
    <Autocomplete
      onChange={handleChange}
      onSelect={handleSelect}
      value={value}
      trigger=""
      placeholder="Type to autocomplete"
      options={items}
    />
  );
};

export default WorkOrder3;
