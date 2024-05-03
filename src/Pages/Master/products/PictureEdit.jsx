import React, { useEffect, useState } from "react";
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import { getIdEntry, getPageData, updateRecord } from "../../../Double/fun";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
// import "./partyForm.css";

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
  Image,
} from "semantic-ui-react";
import {
  MasterUrl,
  records_per_page,
} from "../../../Consts/Master/MasterUrl.const";

export async function loader({ params }) {
  //console.log(params);

  const data = await getIdEntry(
    axios,
    MasterUrl.getIdEntry,
    params.id,
    "prodpic"
  );
  //console.log(`inside loader General edit:`);
  //console.log(data);
  return data;
}
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
    const res = await updateRecord(axios, params.id, updates, "prodpic");

    if (res == "success") {
      toast.success("Successfully Edited");
      return redirect(`/master/product/picture/${params.id}`);
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
  //console.log(errors);
  return errors;
};

export default function GeneralEdit() {
  const data = useLoaderData();
  const errors = useActionData();

  const [images, setImages] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });
  const handleImageChange = (e, imageKey) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImages({
        ...images,
        [imageKey]: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Form method="post">
        <Grid verticalAlign="middle">
          <GridRow centered color="blue" className="formheader">
            <GridColumn textAlign="center" width={12}>
              {data.style_name}
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
                    className="formheader"
                  >
                    Style Card
                  </TableCell>
                  <TableCell>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "image1")}
                    />
                  </TableCell>
                  <TableCell>
                    <Image src={images.image1} size="small" circular />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Front Picture
                  </TableCell>
                  <TableCell>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "image2")}
                    />
                  </TableCell>
                  <TableCell>
                    <Image src={images.image2} size="small" circular />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Back Picture
                  </TableCell>
                  <TableCell>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "image3")}
                    />
                  </TableCell>
                  <TableCell>
                    <Image src={images.image3} size="small" circular />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Sketch
                  </TableCell>
                  <TableCell className="imgcell">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "image4")}
                    />
                  </TableCell>

                  <TableCell>
                    <Image src={images.image4} size="small" circular />
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
