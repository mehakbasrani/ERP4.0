import React, { useEffect, useState } from "react";
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import { getPageData, updateRecord } from "../../Double/fun";
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
  TextArea,
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
    const res = await updateRecord(
      axios,
      params.locationId,
      updates,
      "location"
    );

    console.log("inside upd2");
    console.log(res);
    if (res == "success") {
      toast.success("Successfully Edited");
      return redirect(`/master/location/${params.locationId}`);
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

export default function LocationForm({ data }) {
  const errors = useActionData();

  const [post, setPost] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPageData(
          axios,
          MasterUrl.getPageData,
          records_per_page,
          1,
          "location"
        );
        console.log(data);
        setPost(data);
      } catch (err) {
        console.log("Error occured when fetching books");
      }
    })();
  }, []);

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
              {data.location_name}
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
            <GridColumn width={8}>
              <Table className="borderless-table" basic="very">
                <TableBody>
                  <TableRow>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Location Name
                    </TableCell>
                    <TableCell>
                      <Input
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Location Name*"
                        name="location_name"
                        className="form__input"
                        defaultValue={data.location_name}
                        error={errors?.location_name}
                      />
                    </TableCell>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Description
                    </TableCell>
                    <TableCell>
                      <TextArea
                        className="autocomplete"
                        name="description"
                        placeholder="Description*"
                        defaultValue={data.description}
                        error={errors?.description}
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
                          : item.location_name.includes(search);
                      })
                      .map((item) => (
                        <CardDescription style={{ fontWeight: "bold" }}>
                          {item.location_name}
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
