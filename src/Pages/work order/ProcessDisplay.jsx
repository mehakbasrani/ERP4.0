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
import ProcessAutoComplete from "./ProcessAutoComplete";

const ProcessDisplay = ({ data, bomData }) => {
  const [selectedIpValues, setSelectedIpValues] = useState({});

  const handleIpBOMSelect = (index, value) => {
    setSelectedIpValues((prevValues) => ({
      ...prevValues,
      [index]: [...(prevValues[index] || []), value],
    }));
  };

  const [selectedOpValues, setSelectedOpValues] = useState({});

  const handleOpBOMSelect = (index, value) => {
    setSelectedOpValues((prevValues) => ({
      ...prevValues,
      [index]: [...(prevValues[index] || []), value],
    }));
  };

  const [dateFieldValues, setDateFieldValues] = useState([]);

  const handleStartDateChange = (index, e) => {
    const { value } = e.target;
    setDateFieldValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = { ...newValues[index], startDate: value };
      return newValues;
    });
  };

  const handleEndDateChange = (index, e) => {
    const { value } = e.target;
    setDateFieldValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = { ...newValues[index], endDate: value };
      return newValues;
    });
  };

  const handleSaveClick = () => {
    console.log("IpValues");
    console.log(selectedIpValues);
    console.log("OpValues");
    console.log(selectedOpValues);
    console.log("dates");
    console.log(dateFieldValues);
  };

  return (
    <>
      <div className="scrollable">
        <Table className="borderless-table custom-table">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Process</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
              <TableHeaderCell>
                <Button floated="right" primary onClick={handleSaveClick}>
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
                  <TableRow key={item.id}>
                    <TableCell>
                      <ProcessAutoComplete
                        index={index}
                        options={bomData?.map((item) => item.itemname)}
                        onSelect={(value) => handleIpBOMSelect(index, value)}
                      />
                    </TableCell>
                    <TableCell>{item.process}</TableCell>
                    <TableCell>
                      <ProcessAutoComplete
                        onSelect={(value) => handleOpBOMSelect(index, value)}
                        // index={index + 1}
                        options={bomData?.map((item) => item.itemname)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        name={`sd${index + 1}`}
                        type="date"
                        onChange={(e) => handleStartDateChange(index, e)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        name={`ed${index + 1}`}
                        type="date"
                        onChange={(e) => handleEndDateChange(index, e)}
                      />
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

export default ProcessDisplay;
