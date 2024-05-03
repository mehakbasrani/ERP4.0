import { Form, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getIdEntry, getPageData, updateRecord } from "../../../Double/fun";
import {
  MasterUrl,
  records_per_page,
} from "../../../Consts/Master/MasterUrl.const";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  Grid,
  GridColumn,
  GridRow,
  Input,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "semantic-ui-react";
import { toast } from "react-toastify";

export default function GeneralEdit() {
  const { generalId } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    style_name: "",
    reference: "",
    season: "",
    catagory: "",
    msc1: "",
    msc2: "",
    msc3: "",
    msc4: "",
  });
  //to fetch params.id data
  useEffect(() => {
    (async () => {
      try {
        const data = await getIdEntry(
          axios,
          MasterUrl.getIdEntry,
          generalId,
          "prodgen"
        );
        setValues({
          ...values,
          style_name: data.style_name,
          reference: data.reference,
          season: data.season,
          catagory: data.catagory,
          msc1: data.msc1,
          msc2: data.msc2,
          msc3: data.msc3,
          msc4: data.msc4,
        });
        //console.log(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const [search, setSearch] = useState("");
  const [post, setPost] = useState([]);
  const [isInputFocused, setInputFocused] = useState(false);

  //to get style name
  useEffect(() => {
    (async () => {
      try {
        const data = await getPageData(
          axios,
          MasterUrl.getPageData,
          records_per_page,
          1,
          "prodgen"
        );
        console.log(data);
        setPost(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateRecord(axios, generalId, values, "prodgen");
    console.log(res);
    if (res == "success") {
      toast.success("Successfully Edited");
      navigate(`/master/product/general/${generalId}`);
    } else {
      toast.error("Error");
    }
  };
  return (
    <>
      <Form method="post" onSubmit={handleSubmit}>
        <Grid verticalAlign="middle">
          <GridRow centered color="blue" style={{ fontWeight: "900" }}>
            <GridColumn textAlign="center" width={12}>
              {values.style_name}
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
                        : item.style_name.includes(search);
                    })
                    .map((item) => (
                      <CardDescription style={{ fontWeight: "bold" }}>
                        {item.style_name}
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
                    Style Name
                  </TableCell>
                  <TableCell>
                    <Input
                      // value={values.style_name}
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Style Name*"
                      name="style_name"
                      className="form__input"
                      defaultValue={values.style_name}
                      // error={errors?.style_name}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ fontWeight: "900" }}
                  >
                    Reference
                  </TableCell>
                  <TableCell>
                    <Input
                      value={values.reference}
                      onChange={(e) =>
                        setValues({ ...values, reference: e.target.value })
                      }
                      name="reference"
                      placeholder="reference*"
                      defaultValue={values.reference}
                      // error={errors?.reference}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ fontWeight: "900" }}
                  >
                    Season
                  </TableCell>
                  <TableCell>
                    <Input
                      value={values.season}
                      onChange={(e) =>
                        setValues({ ...values, season: e.target.value })
                      }
                      name="season"
                      placeholder="Season*"
                      defaultValue={values.season}
                      // error={errors?.contact_person}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ fontWeight: "900" }}
                  >
                    Category
                  </TableCell>
                  <TableCell>
                    <Input
                      value={values.catagory}
                      onChange={(e) =>
                        setValues({ ...values, catagory: e.target.value })
                      }
                      name="catagory"
                      placeholder="Category*"
                      defaultValue={values.catagory}
                      // error={errors?.category}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ fontWeight: "900" }}
                  >
                    MSC1
                  </TableCell>
                  <TableCell>
                    <Input
                      value={values.msc1}
                      onChange={(e) =>
                        setValues({ ...values, msc1: e.target.value })
                      }
                      name="msc1"
                      placeholder="MSC1*"
                      // error={errors?.contact_person}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ fontWeight: "900" }}
                  >
                    MSC2
                  </TableCell>
                  <TableCell>
                    <Input
                      value={values.msc2}
                      onChange={(e) =>
                        setValues({ ...values, msc2: e.target.value })
                      }
                      name="msc2"
                      placeholder="MSC2*"
                      defaultValue={values.msc2}
                      // error={errors?.category}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ fontWeight: "900" }}
                  >
                    MSC3
                  </TableCell>
                  <TableCell>
                    <Input
                      value={values.msc3}
                      onChange={(e) =>
                        setValues({ ...values, msc3: e.target.value })
                      }
                      name="msc3"
                      placeholder="MSC3*"
                      defaultValue={values.msc3}
                      // error={errors?.contact_person}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ fontWeight: "900" }}
                  >
                    MSC4
                  </TableCell>
                  <TableCell>
                    <Input
                      value={values.msc4}
                      onChange={(e) =>
                        setValues({ ...values, msc4: e.target.value })
                      }
                      name="msc4"
                      placeholder="MSC4*"
                      defaultValue={values.msc4}
                      // error={errors?.category}
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
