import React from "react";
import { Form } from "react-router-dom";
import { useState } from "react";
import "../../master/master-common.css";

import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Icon,
  Input,
  Table,
  Button,
  Select,
} from "semantic-ui-react";
import { addClass } from "@syncfusion/ej2-base";

// const [error, setError] = useState({});

// const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};

//     if (newPatient.name === "") {
//         newErrors.name = "Name is required";
//         isValid = false;
//     }

//     if (newPatient.age === "") {
//         newErrors.age = "Age is required";
//         isValid = false;
//     }
//     if (newPatient.gender === "") {
//         newErrors.gender = "gender is required";
//         isValid = false;
//     }

//     setError(newErrors);
//     return isValid;
// };

const dropData = [
  { key: "one", value: "one", text: "One" },
  { key: "two", value: "two", text: "Two" },
  { key: "three", value: "three", text: "Three" },
];

export default function Itemform() {
  // const [inputValue, setInputValue] = useState('');
  // const [suggestions, setSuggestions] = useState([]);

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setInputValue(value);

  //   const staticSuggestions = ['Apple', 'Banana', 'Cherry', 'Date', 'Grapes','Mango','papaya'];
  //   const filteredSuggestions = staticSuggestions.filter(suggestion =>
  //     suggestion.toLowerCase().includes(value.toLowerCase())
  //   );

  //   setSuggestions(filteredSuggestions);

  //   if(Input.value == 0){
  //     setSuggestions("false")
  //   }
  // };

  const [inputValuetype, setInputValuetype] = useState("");

  // Sample list of items
  const itemList = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Grapes",
    "Mango",
    "papaya",
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValuetype(value);
  };

  return (
    <>
      <div className="item_form">
        <Form method="post" className="position-relative">
          <h6 className="pl_10">Edit Item</h6>
          <Table celled striped>
            <TableBody>
              <TableRow>
                {/* <TableCell ><Input placeholder='Item Name2' value={inputValue}  onChange={handleInputChange} name='item_name' className='form__input suggestion_box' />
                                <div className='right_box'>
                                    {suggestions.map((suggestion, index) => (
                                    <div key={index}>{suggestion}</div>
                                    ))}
                                </div>
                                </TableCell> */}
                <TableCell>
                  <Input
                    placeholder="Item Name2"
                    value={inputValuetype}
                    onChange={handleChange}
                    name="item_name"
                    className="form__input suggestion_box"
                  />
                  {inputValuetype.length > 0 && (
                    <div className="right_box">
                      <ul>
                        {itemList
                          .filter((item) =>
                            item
                              .toLowerCase()
                              .includes(inputValuetype.toLowerCase())
                          )
                          .map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="select_field">
                    <Select placeholder="Item Select" options={dropData} />
                  </div>
                </TableCell>
                <TableCell>
                  <Input name="item_type" placeholder="Item Type*" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Input name="item_color" placeholder="Item Color*" />
                </TableCell>
                <TableCell>
                  <Input
                    name="item_specification"
                    placeholder="Specification"
                  />
                </TableCell>
                <TableCell>
                  <Input name="item_moq" placeholder="MOQ*" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Input name="buffer_unit" placeholder="Buffer Unit*" />
                </TableCell>
                <TableCell>
                  <Input name="purchase_unit" placeholder="Purchase Unit*" />
                </TableCell>
                <TableCell>
                  <Input name="issue_unit" placeholder="Issue Unit*" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Input
                    name="unit_calc"
                    placeholder="1 Purchase unit =? Issue Unit*"
                  />
                </TableCell>
                <TableCell>
                  <Input name="item_rate" placeholder="Rate*" />
                </TableCell>
                <TableCell>
                  <Input name="item_gst" placeholder="GST*" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Input name="hsn_code" placeholder="HSN Code*" />
                </TableCell>
                <TableCell>
                  <Input name="opening_stock" placeholder="Opening Stock*" />
                </TableCell>
                <TableCell>
                  <Input name="item_msc1" placeholder="Msc1*" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Input name="item_msc2" placeholder="Msc2*" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="text-center">
            <Button primary className="mr_10">
              Submit
            </Button>
            <Button primary>cancel</Button>
          </div>
        </Form>
      </div>
    </>
  );
}
