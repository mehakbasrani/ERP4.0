import React from "react";
import { Form } from "react-router-dom";
// import React, { useState } from "react";
// import './itemform.css'
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Icon,
  Input,
  Table,
  Button,
  Select,
} from "semantic-ui-react";

const dropData = [
  { key: "supplier", value: "supplier", text: "supplier" },
  { key: "vender", value: "vender", text: "venders" },
  { key: "Buyer", value: "Buyer", text: "Buyer" },
];

export default function Partyform() {
  return (
    <>
      <div className="item_form">
        <Form method="post">
          <h6 className="pl_10">Edit Item</h6>
          <Table celled striped>
            {/* <TableHeader>
                            <TableRow>
                                <TableHeaderCell >Git Repository</TableHeaderCell>
                            </TableRow>
                        </TableHeader> */}

            <TableBody>
              <TableRow>
                <TableCell>
                  <Input
                    placeholder="Company Name*"
                    name="comp_name"
                    className="form__input"
                  />
                </TableCell>
                <TableCell>
                  <Input name="email" placeholder="Email*" />
                </TableCell>
                <TableCell>
                  <Input name="bank" placeholder="Bank*" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Input name="contact_person" placeholder="Contact Person*" />
                </TableCell>
                <TableCell>
                  <Input name="landline" placeholder="Landline*" />
                </TableCell>
                <TableCell>
                  <Input name="account" placeholder="Account*" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Input name="address" placeholder="Address*" />
                </TableCell>
                <TableCell>
                  <Input name="mobile" placeholder="Mobile*" />
                </TableCell>
                <TableCell>
                  <Input name="ifsc" placeholder="IFSC*" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Input name="city" placeholder="city*" />
                </TableCell>
                <TableCell>
                  <Input name="gst" placeholder="GST*" />
                </TableCell>
                <TableCell>
                  <Input
                    name="opening_balance"
                    placeholder="Opening Balance*"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Input name="state" placeholder="State*" />
                </TableCell>
                <TableCell>
                  <Input name="pan" placeholder="PAN*" />
                </TableCell>
                <TableCell>
                  <Input name="pin" placeholder="Pin*" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Input name="pin" placeholder="Pin*" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="select_field">
                    <Select placeholder="Item Select" options={dropData} />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
