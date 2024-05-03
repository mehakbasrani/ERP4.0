import React from "react";
import { Form } from "react-router-dom";
import { updateRecord } from "../../Double/fun";
import axios from "axios";

import {
  TableRow,
  TableCell,
  TableBody,
  Input,
  Table,
  Button,
  Select,
} from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify";

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
  console.log(params);
  await updateRecord(axios, params.partyId, updates, "party", toast);

  // return null;
  return redirect(`/master/party/${params.partyId}`);
}

export default function PartyForm({ data }) {
  return (
    <>
      <div className="item_form">
        <Form method="post">
          <div cl></div>
          <h2 className="pl_10">{data.company_name}</h2>
          <TableBody>
            <TableRow>
              <TableCell>
                <Input
                  placeholder="Company Name*"
                  name="comp_name"
                  className="form__input"
                  required
                  defaultValue={data.company_name}
                  //error={true}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="email"
                  placeholder="Email*"
                  required
                  defaultValue={data.email}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="bank"
                  placeholder="Bank*"
                  required
                  defaultValue={data.bank}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Input
                  name="contact_person"
                  placeholder="Contact Person*"
                  required
                  defaultValue={data.contact_person}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="landline"
                  placeholder="Landline*"
                  required
                  defaultValue={data.landline}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="account"
                  placeholder="Account*"
                  required
                  defaultValue={data.account}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Input
                  name="address"
                  placeholder="Address*"
                  required
                  defaultValue={data.address}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="mobile"
                  placeholder="Mobile*"
                  required
                  defaultValue={data.mobile}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="ifsc"
                  placeholder="IFSC*"
                  required
                  defaultValue={data.ifsc}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Input
                  name="city"
                  placeholder="city*"
                  required
                  defaultValue={data.city}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="gst"
                  placeholder="GST*"
                  required
                  defaultValue={data.gst}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="opening_balance"
                  placeholder="Opening Balance*"
                  required
                  defaultValue={data.open_bal}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Input
                  name="state"
                  placeholder="State*"
                  required
                  defaultValue={data.state}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="pan"
                  placeholder="PAN*"
                  required
                  defaultValue={data.pan}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="pin"
                  placeholder="Pin*"
                  required
                  defaultValue={data.pin}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <div className="select_field">
                  <Select
                    placeholder="Role"
                    options={dropData}
                    required
                    defaultValue={data.role}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>

          <div className="text-center">
            <Button primary className="mr_10">
              Submit
            </Button>
            <Button primary>cancel</Button>
          </div>
        </Form>
      </div>
    </>
  );
}
