import React, { useEffect, useState } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { getPageData, updateRecord } from "../../Double/fun";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import "./partyForm.css";
import "../../css/Master/master-common.css";
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
} from "semantic-ui-react";
import {
  MasterUrl,
  records_per_page,
} from "../../Consts/Master/MasterUrl.const";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates2 = Object.fromEntries(formData);
  console.log(`formdata process:`);
  console.log(updates2);
  console.log(typeof updates2);
  const a = Object.keys(updates2).filter(
    (key) => key.substring(0, 4) == "acti"
  );
  let act = "";
  console.log(
    a.map((k) => {
      console.log(updates2[k]);
      act += `${updates2[k]}**`;
    })
  );
  console.log(act.slice(0, -2));
  const updates = {
    process_name: updates2["process_name"],
    activities: act,
  };
  console.log(`updates...`);
  console.log(updates);
  console.log(params);
  const error = validation(updates);
  if (Object.keys(error).length) {
    console.log(error);
    return error;
  } else {
    const res = await updateRecord(axios, params.processId, updates, "process");

    console.log("inside upd2");
    console.log(res);
    if (res == "success") {
      toast.success("Successfully Edited");
      return redirect(`/master/process/${params.processId}`);
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
  console.log(errors);
  return errors;
};

export default function Processformm({ data }) {
  const errors = useActionData();

  const [post, setPost] = useState([]);
  const [search, setSearch] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const data = await getPageData(
          axios,
          MasterUrl.getPageData,
          records_per_page,
          1,
          "process"
        );
        console.log(data);
        setPost(data);
      } catch (err) {
        console.log("Error occured when fetching books");
      }
    })();
  }, []);

  // console.log("inside post");
  // console.log(post);

  const [activity, setActivity] = useState([]);
  const [isActivityInputFocused, setActivityInputFocused] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPageData(
          axios,
          MasterUrl.getPageData,
          records_per_page,
          1,
          "activity"
        );
        console.log(data);
        setActivity(data);
      } catch (err) {
        console.log("Error occured when fetching books");
      }
    })();
  }, []);

  //console.log("inside activity");
  //console.log(activity);

  const activity_length = data.activities.split("**").length;
  const data_activity = data.activities.split("**");

  const rows2 = data_activity.map((act, ind) => {
    // console.log(act, ind);
    return {
      id: ind,
      val: act,
    };
  });

  const [row_id, setRow_id] = useState(activity_length); //1
  //console.log(row_id + "usestate");
  const [rows33, setRows] = useState(rows2);

  const handleAddRow = (e) => {
    console.log("add clicked");

    console.log([...rows33, { id: row_id }]);

    setRows([...rows33, { id: row_id }]);
    setRow_id(row_id + 1);

    e.preventDefault();
  };

  const removeItem = (ind) => {
    const updatedItems = rows33.filter((item) => item.id !== ind);
    console.log(updatedItems);
    setRows(updatedItems);
  };

  return (
    <>
      <Form method="post">
        <Grid verticalAlign="middle">
          <GridRow centered color="blue" className="formheader">
            <GridColumn textAlign="center" width={12}>
              {data.process_name}
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
            <GridColumn width={6}>
              <h5>
                Process:
                <Input
                  defaultValue={data.process_name}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form__input"
                  name="process_name"
                  placeholder="Process Name*"
                  error={errors?.process_name}
                />
              </h5>

              <Table className="borderless-table" basic="very" collapsing>
                <TableHeader>
                  <TableHeaderCell>
                    <Button className="plus_button">
                      <Icon
                        className="plus"
                        name="plus"
                        onClick={(e) => handleAddRow(e)}
                      />
                    </Button>
                  </TableHeaderCell>
                  <TableHeaderCell>Activity</TableHeaderCell>
                </TableHeader>

                <TableBody>
                  {rows33.map((row22) => (
                    <TableRow key={row22.id}>
                      <TableCell className="icons_cell">
                        <Button className="plus_button">
                          <Icon
                            name="close"
                            onClick={() => removeItem(row22.id)}
                          />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Input
                          defaultValue={row22.val}
                          onFocus={() => setActivityInputFocused(true)}
                          onBlur={() => setActivityInputFocused(false)}
                          onChange={(e) => setSearch(e.target.value)}
                          className="form__input"
                          name={`activities${row22.id}`}
                          placeholder="Activities*"
                          error={errors?.activities}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
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
                          : item.process_name.includes(search);
                      })
                      .map((item) => (
                        <CardDescription style={{ fontWeight: "bold" }}>
                          {item.process_name}
                        </CardDescription>
                      ))}
                  </CardContent>
                </Card>
              )}
              {isActivityInputFocused && (
                <Card>
                  <CardContent>
                    {activity
                      .filter((item) => {
                        return search.toUpperCase() === ""
                          ? item
                          : item.activity_name.includes(search);
                      })
                      .map((item) => (
                        <CardDescription style={{ fontWeight: "bold" }}>
                          {item.activity_name}
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
