import axios from "axios";
import React, { useState } from "react";
import { getPageInfo, getPageData, putNewId } from "../../Double/fun";
import AutoComplete from "../work order/AutoComplete";
import {
  MasterUrl,
  records_per_page,
} from "../../Consts/Master/MasterUrl.const";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  Checkbox,
  Grid,
  Input,
  Icon,
  Table,
  Button,
  GridRow,
  GridColumn,
  TableRow,
  TableBody,
  TableHeader,
  Header,
  TableHeaderCell,
  TableCell,
  Breadcrumb,
  BreadcrumbDivider,
  BreadcrumbSection,
  Pagination,
  Label,
  Select,
  Divider,
  TextArea,
} from "semantic-ui-react";
import Navbar from "./Navbar";

export async function loader() {
  const data = await getPageData(
    axios,
    MasterUrl.getPageData,
    records_per_page,
    1,
    "party"
  );
  // console.log(data);
  return data;
}

const Payment = () => {
  const data = useLoaderData();
  const [pageData, setPageData] = useState(data);

  const handleSelect = (value) => {
    console.log(value);
  };

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

  const [rows, setRows] = useState([{ id: 0 }]);
  const handleAddRow = (e) => {
    console.log("add clicked");
    setRow_id(row_id + 1);
    console.log(`row_id:${row_id}`);
    setRows([...rows, { id: rows.length }]);
    console.log(rows);
    e.preventDefault();
  };

  const handleDelRow = (e, ind) => {
    console.log("cross clicked");
    console.log(ind);

    const updated_rows = [...rows];
    console.log(rows);
    console.log(rows.length);
    console.log(updated_rows);

    updated_rows.splice(ind, 1);
    console.log(rows);
    console.log(updated_rows);
    setRows(updated_rows);
    e.preventDefault();
  };

  return (
    <>
      <Grid verticalAlign="middle">
        <GridRow style={{ marginLeft: "15px" }}>
          <Breadcrumb>
            <BreadcrumbSection as={Link} to="/">
              Home
            </BreadcrumbSection>
            <BreadcrumbDivider icon="right chevron" />
            <BreadcrumbSection as={Link} to="/money">
              Money
            </BreadcrumbSection>
            <BreadcrumbDivider icon="right chevron" />
            <BreadcrumbSection active>Payment</BreadcrumbSection>
          </Breadcrumb>
        </GridRow>
        <GridRow>
          <Navbar />
        </GridRow>
        <GridRow centered color="blue" style={{ fontWeight: "900" }}>
          <GridColumn
            floated="right"
            width={6}
            textAlign="right"
            verticalAlign="middle"
          >
            <Button>Submit</Button>
            <Button>Cancel</Button>
          </GridColumn>
        </GridRow>
        <GridRow>
          <Table className="borderless-table" basic="very">
            <TableBody>
              <TableRow>
                <TableCell
                  textAlign="center"
                  verticalAlign="middle"
                  className="formheader"
                >
                  Payment Voucher No.
                </TableCell>
                <TableCell>
                  <Input
                    name="voucher_no"
                    placeholder="Vourcher No.*"
                    // error={errors?.voucher_no}
                  />
                </TableCell>
                <TableCell
                  textAlign="center"
                  verticalAlign="middle"
                  className="formheader"
                >
                  Payment Voucher Date
                </TableCell>
                <TableCell>
                  <Input
                    type="date"
                    name="voucher_date"
                    placeholder="Vourcher Date*"
                    // error={errors?.voucher_date}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  textAlign="center"
                  verticalAlign="middle"
                  className="formheader"
                >
                  Payment Type
                </TableCell>
                <TableCell>
                  <Input
                    name="payment_type"
                    placeholder="Payment Type*"
                    // error={errors?.payment_type}
                  />
                </TableCell>
                <TableCell
                  textAlign="center"
                  verticalAlign="middle"
                  className="formheader"
                >
                  Reference
                </TableCell>
                <TableCell>
                  <Input
                    name="reference"
                    placeholder="Reference*"
                    // error={errors?.reference}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </GridRow>
        <GridRow>
          <Table celled striped style={tableStyle} className="table-responsive">
            <TableHeader>
              <TableRow style={tableStyle}>
                <TableHeaderCell style={icons_cell}>
                  <Button style={plus_button}>
                    <Icon
                      className="plus"
                      name="plus"
                      onClick={(e) => handleAddRow(e)}
                    />
                  </Button>
                </TableHeaderCell>
                <TableHeaderCell>Party</TableHeaderCell>
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
                        className="customAuto"
                        options={pageData.map((item) => item.company_name)}
                        onSelect={(value) => handleSelect(value)}
                      />
                      {/* <Input
                        placeholder="Party*"
                        name={`party${index + 1}`}
                        style={input_width}
                      /> */}
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Amount*"
                        name={`amount${index + 1}`}
                        style={input_width}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </GridRow>
        <Divider />
        <GridRow>
          <GridColumn width={6}>
            <textarea placeholder="Naration" rows="7" cols="60" />
          </GridColumn>
          <GridColumn width={4} floated="right">
            <Table className="borderless-table" basic="very">
              <TableBody>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Payment Method
                  </TableCell>
                  <TableCell>
                    <select
                      placeholder="Method"
                      className="select"
                      name="pay_method"
                      id="pay_method"
                    >
                      <option value="cash">Cash</option>
                      <option value="cheque">Cheque</option>
                      <option value="UPI">UPI</option>
                    </select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Payable Amount
                  </TableCell>
                  <TableCell>
                    <Input
                      name="payable_amount"
                      placeholder="Payable Amount*"
                      // error={errors?.payable_amount}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </GridColumn>
        </GridRow>
      </Grid>
    </>
  );
};

export default Payment;
