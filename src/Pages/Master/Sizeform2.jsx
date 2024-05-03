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
    const res = await updateRecord(axios, params.sizeId, updates, "size");

    //console.log("inside upd2");
    // console.log(res);
    if (res == "success") {
      toast.success("Successfully Edited");
      return redirect(`/master/unit/${params.processId}`);
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

export default function SizeForm({ data }) {
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
          "size"
        );
        console.log(data);
        setPost(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const [search, setSearch] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);

  const defaultsizes = data.sizes.split("**");

  const rows2 = defaultsizes.map((act, ind) => {
    //console.log(act, ind);
    return {
      id: ind,
      val: act,
    };
  });
  const [rows, setRows] = useState(rows2);

  const [numberOfSizes, setNumberOfSizes] = useState(data.size_nos);

  const [sizes, setSizes] = useState(
    Array.from({ length: data.size_nos }, () => "")
  );

  const handleNumberOfSizesChange = (e) => {
    const { value } = e.target;
    setNumberOfSizes(value);
    const newSizes = Array.from({ length: value });
    setSizes(newSizes);
  };
  console.log(sizes);
  const handleSizeInputChange = (index, e) => {
    const { value } = e.target;
    const newSizes = [...sizes];
    newSizes[index] = value;
    setSizes(newSizes);
  };

  return (
    <>
      <Form method="post">
        <Grid verticalAlign="middle">
          <GridRow centered color="blue" style={{ fontWeight: "900" }}>
            <GridColumn textAlign="center" width={12}>
              {data.size_name}
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
          {isInputFocused && (
            <Grid.Column floated="right" width={3}>
              <Card>
                <CardContent>
                  {post
                    .filter((item) => {
                      return search.toUpperCase() === ""
                        ? item
                        : item.size_name.includes(search);
                    })
                    .map((item) => (
                      <CardDescription style={{ fontWeight: "bold" }}>
                        {item.size_name}
                      </CardDescription>
                    ))}
                </CardContent>
              </Card>
            </Grid.Column>
          )}

          <GridRow centered>
            <Table
              className="borderless-table"
              basic="very"
              collapsing
              style={{ maxWidth: "1200px" }}
            >
              <TableBody>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ fontWeight: "900" }}
                  >
                    Size Name
                  </TableCell>
                  <TableCell>
                    <Input
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Size Name*"
                      name="size_name"
                      className="form__input"
                      defaultValue={data.size_name}
                      error={errors?.size_name}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ fontWeight: "900" }}
                  >
                    Number of Sizes
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      name="size_nos"
                      placeholder="Enter number of sizes*"
                      defaultValue={data.size_nos}
                      error={errors?.size_nos}
                      onChange={handleNumberOfSizesChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  {/* <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ fontWeight: "900" }}
                  >
                    Sizes
                  </TableCell>
                  <TableCell>
                    {rows.map((row) => {
                      // console.log(row);
                      return (
                        <TableCell>
                          <Input
                            name="sizes"
                            placeholder="Sizes"
                            defaultValue={row.val}
                          />
                        </TableCell>
                      );
                    })}
                  </TableCell> */}

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
                          placeholder={`Size ${index + 1}`}
                          name={`size_${index + 1}`}
                          value={size}
                          onChange={(e) => handleSizeInputChange(index, e)}
                          style={{ width: "100px" }}
                        />
                      </div>
                    ))}
                  </div>
                </TableRow>
              </TableBody>
            </Table>
          </GridRow>
        </Grid>
      </Form>
    </>
  );
}
