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
  const a = Object.keys(updates).filter((key) => key.substring(0, 3) == "act");
  let act = "";
  console.log(
    a.map((k) => {
      console.log(updates[k]);
      act += `${updates[k]}**`;
    })
  );
  console.log(`act after slice:`);
  console.log(act.slice(0, -2));
  const updates2 = {
    size_name: updates["size_name"],
    size_nos: updates["size_nos"],
    sizes: act.slice(0, -2),
  };
  console.log(`updates...`);
  console.log(updates2);
  console.log(params);
  //console.log(params);
  const error = validation(updates);
  if (Object.keys(error).length) {
    console.log(error);
    return error;
  } else {
    const res = await updateRecord(axios, params.sizeId, updates2, "size");

    console.log("inside upd2");
    console.log(res);
    if (res == "success") {
      toast.success("Successfully Edited");
      return redirect(`/master/size/${params.sizeId}`);
    } else {
      toast.error("Error");
      return null;
    }
  }

  // return null;
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

  const defaultsizes = data.sizes?.split("**");

  const rows2 = defaultsizes?.map((size, ind) => {
    //console.log(size, ind);
    return {
      id: ind,
      val: size,
    };
  });

  const [numberOfSizes, setNumberOfSizes] = useState(data.size_nos);

  const [sizes, setSizes] = useState(
    Array.from({ length: data.size_nos }, (_, index) => rows2[index]?.val)
  );

  const handleNumberOfSizesChange = (e) => {
    const { value } = e.target;
    setNumberOfSizes(value);
    const newSizes = Array.from({ length: value });
    setSizes(newSizes);
  };

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
          <GridRow centered color="blue" className="formheader">
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
          <GridRow centered>
            <GridColumn width={10}>
              <Table className="borderless-table" basic="very">
                <TableBody>
                  <TableRow>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
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
                      className="formheader"
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
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Sizes
                    </TableCell>
                    <TableCell>
                      {sizes.map((size, index) => (
                        <Input
                          placeholder={`Size ${index + 1}`}
                          name={`actual_size_${index + 1}`}
                          value={size}
                          onChange={(e) => handleSizeInputChange(index, e)}
                          style={{ width: "100px" }}
                        />
                      ))}
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
                          : item.size_name.includes(search);
                      })
                      .map((item) => (
                        <CardDescription style={{ fontWeight: "bold" }}>
                          {item.size_name}
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
