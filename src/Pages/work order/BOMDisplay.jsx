import React, { useState } from "react";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";

const BOMDisplay = ({ data }) => {
  // console.log(data);
  const numbers = data?.map((item) => item.cons);
  const [userNumbers, setUserNumbers] = useState(
    Array(numbers.length).fill("")
  );
  const [results, setResults] = useState(Array(numbers.length).fill("0"));

  const handleInputChange = (index, value) => {
    const newNumbers = [...userNumbers];
    newNumbers[index] = value;
    setUserNumbers(newNumbers);

    const newResults = newNumbers.map((num, i) =>
      i !== index
        ? (num * numbers[i]).toFixed(2)
        : (num * numbers[index]).toFixed(2)
    );

    setResults(newResults);
  };

  const handleSave = () => {
    const values = {};
    userNumbers.forEach((value, index) => {
      values[`qty${index + 1}`] = value;
    });
    results.forEach((value, index) => {
      values[`req${index + 1}`] = value;
    });
    console.log(values);
  };

  return (
    <>
      <div className="bomscrollable">
        <Table className="borderless-table">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>BOM</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
              <TableHeaderCell>
                <Button floated="right" primary onClick={handleSave}>
                  Save
                </Button>
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Item Name</TableHeaderCell>
              <TableHeaderCell>Consumption</TableHeaderCell>
              <TableHeaderCell>Quantity</TableHeaderCell>
              <TableHeaderCell>Requirement</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => {
              return (
                <>
                  <TableRow key={index}>
                    <TableCell>{item.itemname}</TableCell>
                    <TableCell>{item.cons}</TableCell>
                    <TableCell>
                      <Input
                        name={`qty${index + 1}`}
                        placeholder="Enter Quantity"
                        value={userNumbers[index]}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input value={results[index]} name={`req${index + 1}`} />
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default BOMDisplay;
