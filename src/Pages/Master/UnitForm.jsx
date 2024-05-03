import React, { useEffect, useState } from "react";
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import { updateRecord } from "../../Double/fun";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import "./partyForm.css";

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
    const res = await updateRecord(axios, params.unitId, updates, "unit");

    //console.log("inside upd2");
    // console.log(res);
    if (res == "success") {
      toast.success("Successfully Edited");
      return redirect(`/master/unit/${params.unitId}`);
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

export default function UnitForm({ data }) {
  const errors = useActionData();

  useEffect(() => {
    axios
      .get("https://arya-erp.in/simranapi/master/get_units.php")
      .then((response) => {
        setPost(response.data);
      });
  }, []);
  const [post, setPost] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const data = await getPageData(
  //         axios,
  //         MasterUrl.getPageData,
  //         records_per_page,
  //         1,
  //         "unit"
  //       );
  //       console.log(data);
  //       setPost(data);
  //     } catch (err) {
  //       console.log("Error occured when fetching books");
  //     }
  //   })();
  // }, []);
  console.log("inside post");
  console.log(post);

  const [search, setSearch] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);
  return (
    <>
      <Form method="post">
        <Grid verticalAlign="middle">
          <GridRow centered color="blue" className="formheader">
            <GridColumn textAlign="center" width={12}>
              {data.unit_name}
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
          <GridRow centered>
            <GridColumn width={12}>
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
                      Unit Name
                    </TableCell>
                    <TableCell>
                      <Input
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Unit Name*"
                        name="unit_name"
                        className="form__input"
                        defaultValue={data.unit_name}
                        error={errors?.unit_name}
                      />
                    </TableCell>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Short Name
                    </TableCell>
                    <TableCell>
                      <Input
                        name="short_name"
                        placeholder="Short Name*"
                        defaultValue={data.short_name}
                        error={errors?.short_name}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </GridColumn>
            <GridColumn width={3}>
              {isInputFocused && (
                <Card>
                  <CardContent>
                    {post
                      .filter((item) => {
                        return search.toUpperCase() === ""
                          ? item
                          : item.unit_name.includes(search);
                      })
                      .map((item) => (
                        <CardDescription style={{ fontWeight: "bold" }}>
                          {item.unit_name}
                        </CardDescription>
                      ))}
                  </CardContent>
                </Card>
              )}
            </GridColumn>
          </GridRow>
        </Grid>
      </Form>
    </>
  );
}
