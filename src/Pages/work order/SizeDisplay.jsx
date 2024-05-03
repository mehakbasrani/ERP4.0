import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardDescription,
  CardGroup,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";

const SizeDisplay = ({ data }) => {
  //console.log(data);

  const [inputValues, setInputValues] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    const total = newInputValues.reduce(
      (acc, curr) => acc + (parseInt(curr) || 0),
      0
    );
    setTotalQuantity(total);
  };

  useEffect(() => {
    if (data && data[0]?.size_nos) {
      const count = parseInt(data[0].size_nos);
      const newQuantities = Array.from(
        { length: count },
        (_, index) => index + 1
      ).map(() => "");
      setInputValues(newQuantities);
    }
  }, [data]);
  const handleSave = () => {
    const quantities = {};
    inputValues.forEach((value, index) => {
      quantities[`QTY${index + 1}`] = value;
    });
    console.log(quantities);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Size: {data[0]?.size_name}</TableHeaderCell>
            <TableHeaderCell>Total Quantity: {totalQuantity}</TableHeaderCell>
            <TableHeaderCell>
              <Button floated="right" primary onClick={handleSave}>
                Save
              </Button>
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {data[0]?.sizes?.split("**").map((size, index) => (
              <Input key={index} defaultValue={size} readOnly />
            ))}
          </TableRow>
          <TableRow>
            {inputValues.map((value, index) => (
              <Input
                key={index}
                type="text"
                placeholder={`Enter quantity`}
                name={`QTY${index + 1}`}
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            ))}
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default SizeDisplay;
