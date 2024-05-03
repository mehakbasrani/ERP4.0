import { Form, redirect, useActionData } from "react-router-dom";
import axios from "axios";
import { getPageData, updateRecord } from "../../Double/fun";
import {
  Select,
  Input,
  Table,
  Button,
  Grid,
  GridRow,
  GridColumn,
  TableRow,
  TableBody,
  TableCell,
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  MasterUrl,
  records_per_page,
} from "../../Consts/Master/MasterUrl.const";

const dropData = [
  { key: "supplier", value: "supplier", text: "supplier" },
  { key: "vender", value: "vender", text: "venders" },
  { key: "Buyer", value: "Buyer", text: "Buyer" },
];

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
    const res = await updateRecord(axios, params.partyId, updates, "party");
    if (res == "success") {
      toast.success("Successfully Edited");
      return redirect(`/master/party/${params.partyId}`);
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

export default function Partyformm({ data }) {
  const errors = useActionData();

  const [search, setSearch] = useState("");
  const [post, setPost] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPageData(
          axios,
          MasterUrl.getPageData,
          records_per_page,
          1,
          "party"
        );
        console.log(data);
        setPost(data);
      } catch (err) {
        console.log("Error occured when fetching party");
      }
    })();
  }, []);

  const [isInputFocused, setInputFocused] = useState(false);
  return (
    <Form method="post">
      <Grid verticalAlign="middle">
        <GridRow centered color="blue" className="formheader">
          <GridColumn textAlign="center" width={12}>
            {data.company_name}
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
              // collapsing
              style={{ maxWidth: "1200px" }}
            >
              <TableBody>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Company Name
                  </TableCell>
                  <TableCell>
                    <Input
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Company Name*"
                      name="company_name"
                      className="form__input"
                      defaultValue={data.company_name}
                      error={errors?.company_name}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Email
                  </TableCell>
                  <TableCell>
                    <Input
                      name="email"
                      placeholder="Email*"
                      defaultValue={data.email}
                      error={errors?.email}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Bank
                  </TableCell>
                  <TableCell>
                    <Input
                      name="bank"
                      placeholder="Bank*"
                      defaultValue={data.bank}
                      error={errors?.bank}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Contact Person
                  </TableCell>
                  <TableCell>
                    <Input
                      name="contact_person"
                      placeholder="Contact Person*"
                      defaultValue={data.contact_person}
                      error={errors?.contact_person}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Landline
                  </TableCell>
                  <TableCell>
                    <Input
                      name="landline"
                      placeholder="Landline*"
                      defaultValue={data.landline}
                      error={errors?.landline}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Account
                  </TableCell>
                  <TableCell>
                    <Input
                      name="account"
                      placeholder="Account*"
                      defaultValue={data.account}
                      error={errors?.account}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Role
                  </TableCell>
                  <TableCell>
                    {/* <Select
                      name="role"
                      placeholder="Role"
                      options={dropData}
                      defaultValue={data.role}
                      error={errors?.role}
                    /> */}
                    <select
                      placeholder="Role"
                      className="select"
                      name="role"
                      id="role"
                      defaultValue={data.role}
                    >
                      <option value="buyer">Buyer</option>
                      <option value="supplier">Supplier</option>
                      <option value="vender">Vender</option>
                    </select>
                  </TableCell>

                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Mobile
                  </TableCell>
                  <TableCell>
                    <Input
                      name="mobile"
                      placeholder="Mobile*"
                      defaultValue={data.mobile}
                      error={errors?.mobile}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    IFSC
                  </TableCell>
                  <TableCell>
                    <Input
                      name="ifsc"
                      placeholder="IFSC*"
                      defaultValue={data.ifsc}
                      error={errors?.ifsc}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Address
                  </TableCell>
                  <TableCell>
                    <Input
                      name="address"
                      placeholder="Address*"
                      defaultValue={data.address}
                      error={errors?.address}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    City
                  </TableCell>
                  <TableCell>
                    <Input
                      name="city"
                      placeholder="city*"
                      defaultValue={data.city}
                      error={errors?.city}
                    />
                  </TableCell>

                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Opening Balance
                  </TableCell>
                  <TableCell>
                    <Input
                      name="opening_balance"
                      placeholder="Opening Balance*"
                      defaultValue={data.open_bal}
                      error={errors?.opening_balance}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    State
                  </TableCell>
                  <TableCell>
                    <Input
                      name="state"
                      placeholder="State*"
                      defaultValue={data.state}
                      error={errors?.state}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    PAN
                  </TableCell>
                  <TableCell>
                    <Input
                      name="pan"
                      placeholder="PAN*"
                      defaultValue={data.pan}
                      error={errors?.pan}
                    />
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    GST
                  </TableCell>
                  <TableCell>
                    <Input
                      name="gst"
                      placeholder="GST*"
                      defaultValue={data.gst}
                      error={errors?.gst}
                    />
                  </TableCell>{" "}
                </TableRow>
                <TableRow>
                  <TableCell
                    textAlign="center"
                    verticalAlign="middle"
                    className="formheader"
                  >
                    Pin
                  </TableCell>
                  <TableCell>
                    <Input
                      name="pin"
                      placeholder="Pin*"
                      defaultValue={data.pin}
                      error={errors?.pin}
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
                        : item.company_name.includes(search);
                    })
                    .map((item) => (
                      <CardDescription style={{ fontWeight: "bold" }}>
                        {item.company_name}
                      </CardDescription>
                    ))}
                </CardContent>
              </Card>
            )}
          </GridColumn>
        </GridRow>
      </Grid>
    </Form>
  );
}
