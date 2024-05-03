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

export default function PurchaseOrder() {
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
  //   console.log(locationData);
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
    // console.log(rows);
    // console.log(rows.length);
    // console.log(updated_rows);

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

  const [row_id2, setRow_id2] = useState(1);

  const [rows2, setRows2] = useState([{ id: 0 }]);
  const handleAddRow2 = (e) => {
    // console.log("add clicked");
    setRow_id2(row_id2 + 1);
    // console.log(`row_id2:${row_id2}`);
    setRows2([...rows2, { id: rows2.length }]);
    // console.log(rows2);
    e.preventDefault();
  };

  const handleDelRow2 = (e, ind) => {
    // console.log("cross clicked");
    // console.log(ind);

    const updated_rows2 = [...rows2];
    // console.log(rows2);
    // console.log(rows2.length);
    // console.log(updated_rows2);

    updated_rows2.splice(ind, 1);
    // console.log(rows2);
    // console.log(updated_rows2);
    setRows2(updated_rows2);
    e.preventDefault();
  };

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
                    PO No.
                  </TableCell>
                  <TableCell>
                    <Input placeholder="PO No*" name="po_no" />
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
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Address
                  </TableCell>
                  <TableCell>
                    {/* <AutoComplete
                      options={data.map((item) => item.address)}
                      onSelect={(value) => handleSelect(value)}
                    /> */}
                    <Input placeholder="Address*" name="address" />
                  </TableCell>
                </TableRow>
                <TableRow>
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
                    Date of Delivery
                  </TableCell>
                  <TableCell>
                    <Input type="date" name="doa" />
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
                            onSelect={handleSelect}
                            options={itemData.map((item) => item)}
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
            <GridColumn width={7}>
              <Table
                celled
                striped
                style={tableStyle}
                className="table-responsive"
              >
                <TableHeader>
                  <TableRow style={tableStyle}>
                    <TableHeaderCell style={icons_cell}>
                      <Button style={plus_button}>
                        <Icon
                          className="plus"
                          name="plus"
                          onClick={(e) => handleAddRow2(e)}
                        />
                      </Button>
                    </TableHeaderCell>
                    <TableHeaderCell>Terms And Conditions</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows2.map((row, index) => {
                    return (
                      <TableRow key={`R${row.id}`}>
                        <TableCell style={icons_cell}>
                          <Button style={plus_button}>
                            <Icon
                              className="close_btn"
                              name="close"
                              onClick={(e) => handleDelRow2(e, index)}
                            />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="Terms and Conditions*"
                            name="tNc"
                            style={input_width}
                            defaultValue={row.id}
                          />
                        </TableCell>
                        {/* <TableCell>
                          <Input
                            placeholder="Short Name*"
                            name="unit_shortname"
                            style={input_width}
                          />
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </GridColumn>
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
