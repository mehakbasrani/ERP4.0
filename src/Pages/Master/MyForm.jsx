import React, { useState } from "react";
import { Form } from "react-router-dom";
import {
  Header,
  Input,
  Label,
  Modal,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Button,
} from "semantic-ui-react";
import "./myform.css";

const MyForm = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell className="myform">Header</TableHeaderCell>
            <TableHeaderCell className="myform">Header</TableHeaderCell>
            <TableHeaderCell className="myform">Header</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>
              <Label ribbon>First</Label>
            </TableCell>
            <TableCell width="4">Cell</TableCell>
            <TableCell className="myform">Cell</TableCell>
          </TableRow>
          <TableRow style={{ padding: "5px" }}>
            <TableCell style={{ padding: "15px" }}>Cell2</TableCell>
            <TableCell style={{ padding: "15px" }}>Cell3</TableCell>
            <TableCell style={{ padding: "15px" }}>Cell3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="myform">Cell</TableCell>
            <TableCell className="myform">Cell</TableCell>
            <TableCell className="myform">Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Modal
        centered="true"
        closeIcon
        dimmer="blurring"
        size="small"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Show Modal</Button>}
      >
        <ModalHeader>Select a Photo</ModalHeader>
        <ModalDescription>
          <Header>Default Profile Image</Header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p>
        </ModalDescription>
        <ModalActions>
          <Button color="black" onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button
            content="Yep, that's me"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpen(false)}
            positive
          />
        </ModalActions>
      </Modal>
    </>
  );
};

export default MyForm;
