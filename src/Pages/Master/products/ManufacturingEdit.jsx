import React, { useEffect, useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getIdEntry, getPageData, updateRecord } from "../../../Double/fun";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import "../partyForm.css";

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
  Icon,
  TableHeader,
  TableHeaderCell,
  Header,
} from "semantic-ui-react";
import {
  MasterUrl,
  records_per_page,
} from "../../../Consts/Master/MasterUrl.const";
import { values } from "lodash-es";

export async function loader({ params }) {
  const data = await getIdEntry(
    axios,
    MasterUrl.getIdEntry,
    params.id,
    "prodmfg"
  );
  return data;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  console.log(formData);
  const updates = Object.fromEntries(formData);
  console.log(`formdata:`);
  console.log(updates);
  console.log(params);

  const objects = {};
  Object.keys(updates).forEach((key) => {
    const match = key.match(/(\d+)$/);
    if (match) {
      const number = match[1];
      const baseKey = key.replace(number, "");
      if (!objects[number]) {
        objects[number] = {};
      }
      objects[number][baseKey] = updates[key];
    }
  });

  console.log(objects);

  const error = validation(objects);
  if (Object.keys(error).length) {
    console.log(error);
    return error;
  } else {
    const res = await updateRecord(axios, params.id, objects, "prodmfg");
    console.log(res);
    //const res="success";
    if (res == "success") {
      toast.success("Successfully Edited");
      return redirect(`/master/product/manufacturing/${params.id}`);

      return null;
    } else {
      toast.error("Error");
      return null;
    }
  }

  return null;
}
const validation = (formData) => {
  const errors = {};

  Object.keys(formData).forEach((key) => {
    if (!formData[key]) {
      errors[key] = `Please fill ${key}`;
    }
  });
  // console.log(errors);
  return errors;
};

const pData = await getPageData(
  axios,
  MasterUrl.getPageData,
  records_per_page,
  1,
  "process"
);
export default function ManufacturingEdit() {
  const data = useLoaderData();
  const errors = useActionData();
  const [processData, setProcessData] = useState(pData);
  // console.log(processData);
  const [rows, setRows] = useState(data);

  const [row_id, setRow_id] = useState(parseInt(data.id)); //1

  const handleAddRow = (e) => {
    console.log("add clicked");
    setRow_id(row_id + 1);
    console.log(`row_id:${row_id}`);
    setRows([...rows, { id: row_id + 1 }]);
    console.log(rows);
    e.preventDefault();
  };

  const removeItem = (ind) => {
    const updatedItems = rows.filter((item) => item.id !== ind);
    console.log(updatedItems);
    setRows(updatedItems);
  };

  return (
    <>
      <Form method="post">
        <Grid verticalAlign="middle">
          <GridRow centered color="blue" className="formheader">
            <GridColumn textAlign="center" width={3}>
              Style ID:{data[0].style_id}
            </GridColumn>
            <GridColumn textAlign="center" width={3}>
              Style Name: {data[0].style_name}
            </GridColumn>

            <GridColumn
              floated="right"
              width={4}
              textAlign="right"
              verticalAlign="middle"
            >
              <Button>Submit</Button>
              <Button>Cancel</Button>
            </GridColumn>
          </GridRow>

          <Table
            celled
            striped
            className="tableStyle"
            className="table-responsive"
          >
            <TableHeader>
              <TableRow className="tableStyle">
                <TableHeaderCell className="icons_cell">
                  <Button className="plus_button">
                    <Icon
                      className="plus"
                      name="plus"
                      onClick={(e) => handleAddRow(e)}
                    />
                  </Button>
                </TableHeaderCell>
                <TableHeaderCell>Process</TableHeaderCell>
                <TableHeaderCell>Cost</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell className="icons_cell">
                      <Button className="plus_button">
                        <Icon
                          className="close_btn"
                          name="close"
                          onClick={(e) => removeItem(row.id)}
                        />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Input
                        defaultValue={row.process}
                        placeholder="Process*"
                        name={`process${row.id}`}
                        className="input_width"
                        error={errors?.process}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        defaultValue={row.cost}
                        placeholder="Cost*"
                        name={`cost${row.id}`}
                        className="input_width"
                        error={errors?.cost}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Grid>
      </Form>
    </>
  );
}
