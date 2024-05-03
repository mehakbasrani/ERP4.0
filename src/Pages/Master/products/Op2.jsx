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

export default function OperationEdit() {
  const { opId } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    style_id: "",
    style_name: "",
    opname: "",
    opshname: "",
    machine: "",
    time: "",
    rate: "",
  });
  //to fetch params.id data
  useEffect(() => {
    (async () => {
      try {
        const data = await getIdEntry(
          axios,
          MasterUrl.getIdEntry,
          opId,
          "prodop"
        );
        setValues({
          ...values,
          style_id: data.style_id,
          style_name: data.style_name,
          opname: data.opname,
          opshname: data.opshname,
          machine: data.machine,
          time: data.time,
          rate: data.rate,
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

  //to get all styles name
  useEffect(() => {
    (async () => {
      try {
        const data = await getPageData(
          axios,
          MasterUrl.getPageData,
          records_per_page,
          1,
          "prodop"
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
    const res = await updateRecord(axios, opId, values, "prodop");
    console.log(res);
    if (res == "success") {
      toast.success("Successfully Edited");
      navigate(`/master/product/operations/${opId}`);
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
                      //   disabled
                      value={values.style_name}
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      onChange={(e) =>
                        setValues({ ...values, style_name: e.target.value })
                      }
                      //   onChange={(e) => setSearch(e.target.value)}
                      placeholder="Style Name*"
                      name="style_name"
                      className="form__input"
                      // error={errors?.style_name}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ fontWeight: "900" }}
                  >
                    Operation Name
                  </TableCell>
                  <TableCell>
                    <Input
                      value={values.opname}
                      onChange={(e) =>
                        setValues({ ...values, opname: e.target.value })
                      }
                      name="opname"
                      placeholder="Operation Name*"
                      defaultValue={values.opname}
                      // error={errors?.opname}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ fontWeight: "900" }}
                  >
                    Style Id
                  </TableCell>
                  <TableCell>
                    <Input
                      value={values.style_id}
                      onChange={(e) =>
                        setValues({ ...values, style_id: e.target.value })
                      }
                      name="style_id"
                      placeholder="Operation Name*"
                      //   defaultValue={values.style_id}
                      // error={errors?.style_id}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ fontWeight: "900" }}
                  >
                    Operation Short Name
                  </TableCell>
                  <TableCell>
                    <Input
                      value={values.opshname}
                      onChange={(e) =>
                        setValues({ ...values, opshname: e.target.value })
                      }
                      name="opshname"
                      placeholder="Operation Shot Name*"
                      defaultValue={values.opshname}
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
                    Machine
                  </TableCell>
                  <TableCell>
                    <Input
                      value={values.machine}
                      onChange={(e) =>
                        setValues({ ...values, machine: e.target.value })
                      }
                      name="machine"
                      placeholder="Machine*"
                      defaultValue={values.machine}
                      // error={errors?.category}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ fontWeight: "900" }}
                  >
                    Time
                  </TableCell>
                  <TableCell>
                    <Input
                      value={values.time}
                      onChange={(e) =>
                        setValues({ ...values, time: e.target.value })
                      }
                      name="time"
                      placeholder="Time*"
                      // error={errors?.contact_person}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ fontWeight: "900" }}
                  >
                    Rate
                  </TableCell>
                  <TableCell>
                    <Input
                      value={values.rate}
                      onChange={(e) =>
                        setValues({ ...values, rate: e.target.value })
                      }
                      name="rate"
                      placeholder="Rate*"
                      defaultValue={values.rate}
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
