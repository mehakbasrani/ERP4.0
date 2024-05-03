import React, { useEffect, useState } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
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
  Icon,
  Select,
  TableHeader,
  TableHeaderCell,
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
  //   const a = Object.keys(updates).filter(
  //     (key) => key.substring(0, 8) == "group_it"
  //   );
  //   let act = "";
  //   console.log(
  //     a.map((k) => {
  //       console.log(updates[k]);
  //       act += `${updates[k]}**`;
  //     })
  //   );
  //   console.log(act.slice(0, -2));
  //   const updates2 = {
  //     group_name: updates["group_name"],
  //     group_type: updates["group_type"],
  //     group_tems: act,
  //   };
  //   console.log(`updates...`);
  //   console.log(updates2);
  //   console.log(params);
  //   //console.log(params);
  //   const error = validation(updates);
  //   if (Object.keys(error).length) {
  //     console.log(error);
  //     return error;
  //   } else {
  //     const res = await updateRecord(axios, params.groupId, updates2, "group");

  //     console.log("inside upd2");
  //     console.log(res);
  //     if (res == "success") {
  //       toast.success("Successfully Edited");
  //       return redirect(`/master/group/${params.groupId}`);
  //     } else {
  //       toast.error("Error");
  //       return null;
  //     }
  //   }

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

export default function GroupForm({ data }) {
  const errors = useActionData();

  const [post, setPost] = useState([]);

  //to get existing group name list
  useEffect(() => {
    (async () => {
      try {
        const data = await getPageData(
          axios,
          MasterUrl.getPageData,
          records_per_page,
          1,
          "group"
        );
        console.log(data);
        setPost(data);
      } catch (err) {
        console.log("Error occured when fetching books");
      }
    })();
  }, []);

  //to get group type

  const [groupData, setGroupData] = useState([]);

  // useEffect(() => {
  //   if (type == "Item") {
  //     (async () => {
  //       try {
  //         const data = await getPageData(
  //           axios,
  //           MasterUrl.getPageData,
  //           records_per_page,
  //           1,
  //           "items"
  //         );
  //         console.log(data);
  //         setGroupData(data);
  //       } catch (err) {
  //         console.log("Error occured when fetching items");
  //       }
  //     })();
  //   } else if (type === "Process") {
  //     (async () => {
  //       try {
  //         const data = await getPageData(
  //           axios,
  //           MasterUrl.getPageData,
  //           records_per_page,
  //           1,
  //           "process"
  //         );
  //         console.log(data);
  //         setGroupData(data);
  //       } catch (err) {
  //         console.log("Error occured when fetching processes");
  //       }
  //     })();
  //   } else {
  //     (async () => {
  //       try {
  //         const data = await getPageData(
  //           axios,
  //           MasterUrl.getPageData,
  //           records_per_page,
  //           1,
  //           "activity"
  //         );
  //         console.log(data);
  //         setGroupData(data);
  //       } catch (err) {
  //         console.log("Error occured when fetching activity");
  //       }
  //     })();
  //   }
  // }, []);

  //  let dropData = groupData.map((data) => data.activity_name);
  //  dropData = dropData.map((str, index) => ({
  //    key: index + 1,
  //    value: str,
  //    text: str,
  //  }));
  //  console.log(dropData);

  const plus = {
    // background:'blue',
    color: "black !important",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const plus_button = {
    background: "transparent",
    padding: "0",
  };

  const tableStyle = {
    border: "none !important",
    // padding:'20px',
  };
  const icons_cell = {
    width: "50px",
  };
  const input_width = {
    width: "100%",
  };

  const group_items_length = data.group_tems.split("**").length;
  const group_items = data.group_tems.split("**");

  // console.log(`group_items_length: ${group_items_length}`);

  const rows2 = group_items.map((act, ind) => {
    //console.log(act, ind);
    return {
      id: ind,
      val: act,
    };
  });

  const [row_id, setRow_id] = useState(group_items_length); //1
  //console.log(row_id + "usestate");
  const [rows, setRows] = useState(rows2);

  const handleAddRow = (e) => {
    console.log("add clicked");
    console.log(`row_id:${row_id}`);
    // console.log("rows.length");
    // console.log(rows.length);
    setRows([...rows, { id: row_id }]);
    setRow_id(row_id + 1);
    console.log(rows);
    e.preventDefault();
  };

  const removeItem = (ind) => {
    const updatedItems = rows.filter((item) => item.id !== ind);
    console.log(updatedItems);
    setRows(updatedItems);
  };

  const [search, setSearch] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);
  return (
    <>
      <Form method="post">
        <Grid verticalAlign="middle">
          <GridRow centered color="blue" style={{ fontWeight: "900" }}>
            <GridColumn textAlign="center" width={12}>
              {data.group_name}
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
                        : item.group_name.includes(search);
                    })
                    .map((item) => (
                      <CardDescription style={{ fontWeight: "bold" }}>
                        {item.group_name}
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
                    Group Name
                  </TableCell>
                  <TableCell>
                    <Input
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Group Name*"
                      name="group_name"
                      className="form__input"
                      defaultValue={data.group_name}
                      error={errors?.group_name}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    style={{ fontWeight: "900" }}
                  >
                    Group Type
                  </TableCell>
                  <TableCell>
                    <Input
                      disabled
                      name="group_type"
                      defaultValue={data.group_type}
                      error={errors?.group_type}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHeader>
                    <TableHeaderCell>
                      <Button style={plus_button}>
                        <Icon
                          className="plus"
                          name="plus"
                          onClick={(e) => handleAddRow(e)}
                        />
                      </Button>
                    </TableHeaderCell>
                    <TableHeaderCell>Group Items</TableHeaderCell>
                  </TableHeader>
                  <TableCell>
                    {rows.map((row) => {
                      // console.log(row);
                      return (
                        <TableRow key={`R${row.id}`}>
                          <TableCell style={icons_cell}>
                            <Button style={plus_button}>
                              <Icon
                                style={{
                                  paddingLeft: "40px",
                                  paddingTop: "20px",
                                }}
                                className="close_btn"
                                name="close"
                                onClick={() => removeItem(row.id)}
                              />
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Input
                              defaultValue={row.val}
                              // onFocus={() => setActivityInputFocused(true)}
                              // onBlur={() => setActivityInputFocused(false)}
                              // onChange={(e) => setSearch(e.target.value)}
                              className="form__input"
                              name={`group_items${row.id}`}
                              placeholder="Group Item*"
                              error={errors?.group_tems}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
