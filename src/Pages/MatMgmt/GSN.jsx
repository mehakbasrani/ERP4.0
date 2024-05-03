import React, { useEffect, useState } from "react";
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AutoComplete from "../work order/AutoComplete";
import "../../css/Master/master-common.css";
import {
  TableRow,
  TableCell,
  TableBody,
  Input,
  Table,
  Button,
  Grid,
  GridRow,
  GridColumn,
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  TableHeader,
  TableHeaderCell,
  Icon,
} from "semantic-ui-react";
import { getPageData } from "../../Double/fun";
import {
  MasterUrl,
  records_per_page,
} from "../../Consts/Master/MasterUrl.const";
import { parseInt } from "lodash-es";

// const data = await getPageData(
//   axios,
//   MasterUrl.getPageData,
//   records_per_page,
//   1,
//   "party"
// );
// const itemData = await getPageData(
//   axios,
//   MasterUrl.getPageData,
//   records_per_page,
//   1,
//   "items"
// );
// const locationData = await getPageData(
//   axios,
//   MasterUrl.getPageData,
//   records_per_page,
//   1,
//   "location"
// );

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log(`formdata:`);
  console.log(updates);
  //console.log(params);
  // const error = validation(updates);
  // if (Object.keys(error).length) {
  //   console.log(error);
  //   return error;
  // } else {
  //   const res = await updateRecord(axios, params.unitId, updates, "unit");

  //   //console.log("inside upd2");
  //   // console.log(res);
  //   if (res == "success") {
  //     toast.success("Successfully Edited");
  //     return redirect(`/master/unit/${params.unitId}`);
  //   } else {
  //     toast.error("Error");
  //     return null;
  //   }
  // }

  return null;
}
const validation = (formData) => {
  const errors = {};

  Object.keys(formData).forEach((key) => {
    if (!formData[key]) {
      errors[key] = `Please fill ${key}`;
    }
  });
  console.log(errors);
  return errors;
};

export default function GSN() {
  const [partyData, setPartyData] = useState([]);
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    fetchItemData();
    fetchPartyData();
  }, []);

  const fetchItemData = async () => {
    try {
      const response = await axios.get(
        "https://arya-erp.in/simranapi/Matman/getItemName.php"
      );
      setItemData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPartyData = async () => {
    try {
      const response = await axios.get(
        "https://arya-erp.in/simranapi/Matman/getPartyName.php"
      );
      setPartyData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //   console.log(data);
  //   console.log(itemData);
  // console.log(locationData);
  const errors = useActionData();

  const plus_button = {
    background: "transparent",
    padding: "0",
  };

  const tableStyle = {
    border: "none !important",
    // padding:'20px',
  };
  const icons_cell = {
    width: "50px",
  };
  const input_width = {
    width: "100%",
  };
  const [row_id, setRow_id] = useState(1);

  const [rows, setRows] = useState([
    { id: 0, qty: 0, rate: 0, igst: 0, sgst: 0, cgst: 0, amt: 0 },
  ]);
  const handleAddRow = (e) => {
    setRow_id(row_id + 1);
    setRows([
      ...rows,
      { id: rows.length, qty: 0, rate: 0, igst: 0, sgst: 0, cgst: 0, amt: 0 },
    ]);
    e.preventDefault();
  };
  const removeItem = (ind) => {
    const updatedItems = rows.filter((item) => item.id !== ind);
    console.log(updatedItems);
    setRows(updatedItems);
  };
  const handleChange = (index, field, value) => {
    const newInputs = [...rows];
    newInputs[index][field] = value;
    setRows(newInputs);
  };
  const calculateSum = (field) => {
    return rows.reduce((sum, input) => sum + parseFloat(input[field]) || 0, 0);
  };
  const handleDelRow = (e, ind) => {
    const updated_rows = [...rows];
    console.log(rows);
    console.log(rows.length);
    console.log(updated_rows);

    updated_rows.splice(ind, 1);
    setRows(updated_rows);
    e.preventDefault();
  };

  const [selectedpartyValues, setSelectedpartyValues] = useState([]);
  const handlePartySelect = (value) => {
    // console.log(value);
    setSelectedpartyValues([...selectedValues, value]);
  };
  console.log(selectedpartyValues);

  const [selectedValues, setSelectedValues] = useState([]);
  const handleSelect = (value) => {
    // console.log(value);
    setSelectedValues([...selectedValues, value]);
  };
  console.log(selectedValues);
  const handleSave = () => {
    const totalTax =
      Number(calculateSum("igst")) +
      Number(calculateSum("cgst")) +
      Number(calculateSum("sgst"));
    const totalAmount = calculateSum("amt");
    const subTotal = Number(calculateSum("rate")) * Number(calculateSum("qty"));
    const totalQuantity = calculateSum("qty");
    const totals = { totalTax, totalQuantity, totalAmount, subTotal };
    console.log("Totals:", totals);
  };

  return (
    <>
      <Form method="post">
        <Grid verticalAlign="middle">
          <GridRow centered color="blue" className="formheader">
            <GridColumn
              floated="right"
              width={4}
              textAlign="right"
              verticalAlign="middle"
            >
              <Button onClick={handleSave}>Save</Button>
              <Button>Cancel</Button>
            </GridColumn>
          </GridRow>
          <GridRow>
            <Table
              className="borderless-table"
              basic="very"
              style={{ maxWidth: "1200px" }}
            >
              <TableBody>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    GSN No.
                  </TableCell>
                  <TableCell>
                    <Input placeholder="GSN No*" name="gsn_no" />
                  </TableCell>

                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    GSN Type
                  </TableCell>
                  <TableCell>
                    <select
                      placeholder="Type"
                      style={{
                        border: "1px solid rgba(34, 36, 38, 0.15)",
                        padding: "10px 50px",
                        marginleft: "12px",
                        outline: "none",
                        borderRadius: "0.28571429rem",
                      }}
                      className="select"
                      name="gsn_type"
                      id="gsn_type"
                    >
                      <option value="returnable">Returnable</option>
                      <option value="billable">Billable</option>
                      <option value="transfer">Transfer</option>
                    </select>
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Supplier
                  </TableCell>
                  <TableCell>
                    <AutoComplete
                      options={partyData.map((item) => item)}
                      onSelect={(value) => handlePartySelect(value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Address
                  </TableCell>
                  <TableCell>
                    <Input placeholder="Address*" name="address" />

                    {/* <AutoComplete
                      options={data.map((item) => item.address)}
                      onSelect={(value) => handleSelect(value)}
                    /> */}
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    GST
                  </TableCell>
                  <TableCell>
                    {/* <AutoComplete
                      options={data.map((item) => item.gst)}
                      onSelect={(value) => handleSelect(value)}
                    /> */}
                    <Input placeholder="GST*" name="gst" />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Date
                  </TableCell>
                  <TableCell>
                    <Input type="date" name="date" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    PO No.
                  </TableCell>
                  <TableCell>
                    <Input placeholder="PO No.*" name="date" />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Location
                  </TableCell>
                  <TableCell>
                    {/* <AutoComplete
                      options={locationData.map((item) => item.location_name)}
                      onSelect={(value) => handleSelect(value)}
                    /> */}
                    <Input placeholder="location*" name="location" />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Transport
                  </TableCell>
                  <TableCell>
                    <Input placeholder="Trasport*" name="transport" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </GridRow>
          <GridRow centered>
            <div>
              <Table className="table-responsive">
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell style={icons_cell}>
                      <Button style={plus_button}>
                        <Icon
                          className="plus"
                          name="plus"
                          onClick={(e) => handleAddRow(e)}
                        />
                      </Button>
                    </TableHeaderCell>
                    <TableHeaderCell>Item</TableHeaderCell>
                    <TableHeaderCell>Quantity</TableHeaderCell>
                    <TableHeaderCell>Rate</TableHeaderCell>
                    <TableHeaderCell>IGST</TableHeaderCell>
                    <TableHeaderCell>SGST</TableHeaderCell>
                    <TableHeaderCell>CGST</TableHeaderCell>
                    <TableHeaderCell>Amount</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row, index) => {
                    return (
                      <TableRow key={`R${row.id}`}>
                        <TableCell style={icons_cell}>
                          <Button style={plus_button}>
                            <Icon
                              className="close_btn"
                              name="close"
                              onClick={(e) => handleDelRow(e, index)}
                            />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <AutoComplete
                            name={`item${index + 1}`}
                            options={itemData.map((item) => item)}
                            onSelect={handleSelect}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="Quantity*"
                            name={`qty${index + 1}`}
                            style={input_width}
                            onChange={(e) =>
                              handleChange(index, "qty", e.target.value)
                            }

                            // onChange={(e) => handleQtyChange(e)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="Rate*"
                            name={`rate${index + 1}`}
                            style={input_width}
                            onChange={(e) =>
                              handleChange(index, "rate", e.target.value)
                            }
                          />
                        </TableCell>

                        <TableCell>
                          <Input
                            placeholder="IGST*"
                            style={input_width}
                            name={`igst${index + 1}`}
                            onChange={(e) =>
                              handleChange(index, "igst", e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="SGST*"
                            name={`sgst${index + 1}`}
                            style={input_width}
                            onChange={(e) =>
                              handleChange(index, "sgst", e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="CGST*"
                            name="cgst"
                            style={input_width}
                            name={`cgst${index + 1}`}
                            onChange={(e) =>
                              handleChange(index, "cgst", e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="Amount*"
                            name={`amt${index + 1}`}
                            style={input_width}
                            onChange={(e) =>
                              handleChange(index, "amt", e.target.value)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </GridRow>
          <GridRow>
            <GridColumn width={5} floated="right">
              <Table
                className="borderless-table"
                basic="very"
                style={{ maxWidth: "1200px" }}
              >
                <TableBody>
                  <TableRow>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Discount
                    </TableCell>
                    <TableCell>
                      <Input name="discount" placeholder="Discount*" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Freight
                    </TableCell>
                    <TableCell>
                      <Input placeholder="Freight" name="freight" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Tax Amount
                    </TableCell>
                    <TableCell>
                      <div style={{ marginTop: "8px" }}>
                        {Number(calculateSum("igst")) +
                          Number(calculateSum("cgst")) +
                          Number(calculateSum("sgst"))}
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      SubTotal
                    </TableCell>
                    <TableCell>
                      <div style={{ marginTop: "8px" }}>
                        {Number(calculateSum("rate")) *
                          Number(calculateSum("qty"))}
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Total Amount
                    </TableCell>
                    <TableCell>
                      <div style={{ marginTop: "8px" }}>
                        {calculateSum("amt")}
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Total Quantity
                    </TableCell>
                    <TableCell>
                      <div style={{ marginTop: "8px" }}>
                        {calculateSum("qty")}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </GridColumn>
          </GridRow>
        </Grid>
      </Form>
    </>
  );
}
