import React, { useState, useEffect } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { getPageData, updateRecord } from "../../Double/fun";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./partyForm.css";
import {
  Grid,
  GridRow,
  GridColumn,
  TableRow,
  TableCell,
  TableBody,
  Input,
  Table,
  Button,
  Select,
  Item,
  Card,
  CardContent,
  CardDescription,
} from "semantic-ui-react";

import {
  MasterUrl,
  records_per_page,
} from "../../Consts/Master/MasterUrl.const";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log(`formdata:`);
  console.log(updates);
  //console.log(params);
  const error = validation(updates);
  if (Object.keys(error).length) {
    console.log(error);
    return error;
  } else {
    const res = await updateRecord(axios, params.itemId, updates, "item");
    if (res == "success") {
      toast.success("Successfully Edited");
      return redirect(`/master/item/${params.itemId}`);
    } else {
      toast.error("Error");
      return null;
    }
  }

  //return null;
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

const itemData = await getPageData(
  axios,
  MasterUrl.getPageData,
  records_per_page,
  1,
  "items"
);

export default function ItemForm({ data }) {
  const errors = useActionData();

  const [post, setPost] = useState(itemData);
  console.log(post);

  const [search, setSearch] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);
  return (
    <>
      <Form method="post">
        <Grid verticalAlign="middle">
          <GridRow centered color="blue" className="formheader">
            <GridColumn textAlign="center" width={12}>
              {data.name}
            </GridColumn>
            <GridColumn
              floated="right"
              width={4}
              textAlign="right"
              verticalAlign="middle"
            >
              <Button>Submit</Button>
              <Button>Cancel</Button>
              <ToastContainer />
            </GridColumn>
          </GridRow>
          {isInputFocused && (
            <Grid.Column floated="right" width={3}>
              <Card>
                <CardContent>
                  {post
                    .filter((item) => {
                      return search.toUpperCase() === ""
                        ? item
                        : item.name.includes(search);
                    })
                    .map((item) => (
                      <CardDescription style={{ fontWeight: "bold" }}>
                        {item.name}
                      </CardDescription>
                    ))}
                </CardContent>
              </Card>
            </Grid.Column>
          )}

          <GridRow>
            <Table
              className="borderless-table"
              basic="very"
              collapsing
              style={{ maxWidth: "1200px" }}
            >
              <TableBody>
                <TableRow style={{ borderCollapse: "collapse" }}>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Item Name
                  </TableCell>
                  <TableCell>
                    <Input
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Item Name*"
                      name="name"
                      className="form__input"
                      defaultValue={data.name}
                      error={errors?.name}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Item Type
                  </TableCell>
                  <TableCell>
                    <Input
                      name="item_type"
                      placeholder="Item Type*"
                      defaultValue={data.item_type}
                      error={errors?.item_type}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Item Color
                  </TableCell>
                  <TableCell>
                    <Input
                      name="item_color"
                      placeholder="Item Color*"
                      defaultValue={data.item_color}
                      error={errors?.item_color}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Item Select
                  </TableCell>
                  <TableCell>
                    {/* <Input
                      name="item_select"
                      placeholder="Item Select*"
                      defaultValue={data.item_select}
                      error={errors?.item_select}
                    /> */}
                    <select
                      placeholder="Item Select"
                      className="select"
                      name="item_select"
                      id="item_select"
                      defaultValue={data.item_select}
                    >
                      <option value="wip">WIP</option>
                      <option value="purchase">Purchase</option>
                    </select>
                  </TableCell>

                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    GST
                  </TableCell>
                  <TableCell>
                    <Input
                      name="gst"
                      placeholder="GST*"
                      defaultValue={data.gst}
                      error={errors?.gst}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    HSN Code
                  </TableCell>
                  <TableCell>
                    <Input
                      name="hsn_code"
                      placeholder="HSN_Code*"
                      defaultValue={data.hsn_code}
                      error={errors?.hsn_code}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Rate
                  </TableCell>
                  <TableCell>
                    <Input
                      name="rate"
                      placeholder="Rate*"
                      defaultValue={data.rate}
                      error={errors?.rate}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Issue Unit
                  </TableCell>
                  <TableCell>
                    <Input
                      name="issue_unit"
                      placeholder="Issue Unit*"
                      defaultValue={data.issue_unit}
                      error={errors?.issue_unit}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Buffer Unit
                  </TableCell>
                  <TableCell>
                    <Input
                      name="buffer_unit"
                      placeholder="Buffer Unit*"
                      defaultValue={data.buffer_unit}
                      error={errors?.buffer_unit}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Opening Stock
                  </TableCell>
                  <TableCell>
                    <Input
                      name="opening_stock"
                      placeholder="Opening Stock*"
                      defaultValue={data.opening_stock}
                      error={errors?.opening_stock}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Purchase Unit
                  </TableCell>
                  <TableCell>
                    <Input
                      name="purchase_unit"
                      placeholder="Purchase Unit*"
                      defaultValue={data.purchase_unit}
                      error={errors?.purchase_unit}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Purchase Issue Ratio
                  </TableCell>
                  <TableCell>
                    <Input
                      name="purchase_issue_atio"
                      placeholder="Purchase Issue Ratio*"
                      defaultValue={data.purchase_issue_atio}
                      error={errors?.purchase_issue_atio}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    MOQ
                  </TableCell>
                  <TableCell>
                    <Input
                      name="moq"
                      placeholder="MOQ*"
                      defaultValue={data.moq}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    MSC1
                  </TableCell>
                  <TableCell>
                    <Input
                      name="msc1"
                      placeholder="Msc1*"
                      defaultValue={data.msc1}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    MSC2
                  </TableCell>
                  <TableCell>
                    <Input
                      name="msc2"
                      placeholder="Msc2*"
                      defaultValue={data.msc2}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Specification
                  </TableCell>
                  <TableCell>
                    <Input
                      name="specification"
                      placeholder="Specification*"
                      defaultValue={data.specification}
                      error={errors?.specification}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    User
                  </TableCell>
                  <TableCell>
                    <Input
                      name="user"
                      placeholder="User*"
                      defaultValue={data.user}
                      error={errors?.user}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </GridRow>
        </Grid>
      </Form>
    </>
  );
}
