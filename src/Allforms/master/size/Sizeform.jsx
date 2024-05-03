import React from "react";
import { Form } from "react-router-dom";
// import '../../master/master-common.css';
import "../../master/master-common.css";

import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  Input,
  Select,
  Button,
  TableBody,
  Table,
  Label,
} from "semantic-ui-react";

export default function Sizeform() {
  return (
    <>
      <div className="item_form">
        <Form method="post">
          <h6 className="pl_10">Edit Item</h6>
          <Table celled striped>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="d-flex">
                    <Label>Size</Label>
                    <Input placeholder="Item Name2" name="item_name" className="form__input"/>
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
