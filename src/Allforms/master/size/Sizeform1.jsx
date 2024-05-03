import React, { useState } from "react";
import { Form, useActionData } from "react-router-dom";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  MenuItem,
  Icon,
  Label,
  Menu,
  Input,
  Table,
  Button,
  TextArea,
  IconGroup,
} from "semantic-ui-react";
import Validation from "../Validation";

export async function action({ request, param }) {
  // console.log(request)

  const formdata = await request.formData();
  const updates = Object.fromEntries(formdata);
  console.log("Form Data:", updates);
  const sizesData = Array.from({ length: updates["no_sizes"] }, (_, index) => {
    return { [`size_${index + 1}`]: updates[`size_${index + 1}`] };
  });
  console.log("Sizes Data:", sizesData);

  const validationErrors = Validation(updates);
  return validationErrors;
}

const Sizeform1 = () => {
  const [numberOfSizes, setNumberOfSizes] = useState(0);

  const [sizes, setSizes] = useState([]);

  const handleNumberOfSizesChange = (e) => {
    const { value } = e.target;
    setNumberOfSizes(value);
    const newSizes = Array.from({ length: value }, (_, index) => "");
    setSizes(newSizes);
  };

  const handleSizeInputChange = (index, e) => {
    const { value } = e.target;
    const newSizes = [...sizes];
    newSizes[index] = value;
    setSizes(newSizes);
  };

  const plus = {
    color: "black !important",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const plus_button = {
    background: "transparent",
    padding: "0",
  };
  const tableStyle = {
    border: "none !important",
  };
  const icons_cell = {
    width: "50px",
  };
  const input_width = {
    width: "100%",
  };
  const validationData = useActionData();
  const handleClick = async () => {
    const formData = new FormData(document.querySelector("form")); // Get form data
    const validationErrors = await action({ request: formData });
    // Handle validation errors if any
  };

  return (
    <div className="item_form">
      <Form method="post" className="">
        <div className="table-responsive">
          <h6 className="main_head">Edit Item</h6>
          <Table celled striped style={tableStyle} className="table-responsive">
            <TableBody>
              <div className="row_space">
                <TableRow>
                  <div>
                    <Label className="label_color">Size name</Label>
                  </div>
                  <TableCell className="input_space">
                    <Input
                      placeholder="Unit Name*"
                      name="size_name"
                      style={input_width}
                      error={validationData?.size_name}
                    />
                  </TableCell>
                </TableRow>
              </div>
              <div className="row_space">
                <TableRow>
                  <Label className="label_color">Number Of Sizes</Label>
                  <TableCell className="input_space">
                    <Input
                      type="number"
                      placeholder="Enter number of sizes"
                      value={numberOfSizes}
                      name="no_sizes"
                      style={input_width}
                      error={validationData?.no_sizes}
                      onChange={handleNumberOfSizesChange}
                    />
                  </TableCell>
                </TableRow>
              </div>
              <TableRow>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    width: "100%",
                  }}
                >
                  {sizes.map((size, index) => (
                    <div key={index} style={{ marginRight: "5px" }}>
                      <Input
                        type="text" // Assuming these are numeric inputs
                        placeholder={`Size ${index + 1}`}
                        name={`size_${index + 1}`}
                        value={size}
                        onChange={(e) => handleSizeInputChange(index, e)}
                        style={{ width: "100px" }} // Set a larger width for each input box
                      />
                    </div>
                  ))}
                </div>
              </TableRow>
            </TableBody>
          </Table>

          <div className="text-center">
            <Button primary className="mt_10" onClick={handleClick}>
              save
            </Button>
            <Button primary>cancel</Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Sizeform1;
