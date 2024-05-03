import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Grid,
  GridRow,
  GridColumn,
  TableRow,
  TableBody,
  TableCell,
  Message,
  MessageHeader,
} from "semantic-ui-react";
import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { MasterUrl } from "../../Consts/Master/MasterUrl.const";
import { getIdEntry } from "../../Double/fun";

export async function loader({ params }) {
  console.log(`inside loader partyview:`);
  //console.log(params);

  const data = await getIdEntry(
    axios,
    MasterUrl.getIdEntry,
    params.partyId,
    "party"
  );
  console.log(data);
  return data;
}

export default function PartyView() {
  const contact = useLoaderData();

  console.log(`contactView::`);
  console.log(contact);

  const navigate = useNavigate();

  const editParty = (id) => {
    //console.log(id);
    navigate(`Edit`);
  };

  const [del, setDel] = useState(false);

  const deleteParty = (id) => {
    console.warn("inside delete");
    console.log(id);
    setDel(true);
  };
  return (
    <>
      <Grid verticalAlign="middle">
        <GridRow centered color="blue" className="formheader">
          <GridColumn textAlign="center" width={12}>
            {contact.company_name}
          </GridColumn>
          <GridColumn
            floated="right"
            width={4}
            // color="red"
            textAlign="right"
            verticalAlign="middle"
          >
            <Button onClick={() => editParty(contact.id)}>Edit</Button>
            <Button onClick={() => deleteParty(contact.id)}>Delete</Button>
          </GridColumn>
        </GridRow>
        <GridRow centered>
          <Table
            className="borderless-table"
            basic="very"
            //collapsing
            style={{ maxWidth: "1200px" }}
          >
            <TableBody>
              <TableRow>
                <TableCell className="formheader">Contact Person</TableCell>
                <TableCell>{contact.contact_person}</TableCell>
                <TableCell className="formheader">GST</TableCell>
                <TableCell>{contact.gst.toUpperCase()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="formheader">Address</TableCell>
                <TableCell>
                  {contact.address}
                  <br />
                  {contact.city}
                  <br />
                  {contact.state}
                  <br />
                  {contact.pin}
                </TableCell>
                <TableCell className="formheader">PAN</TableCell>
                <TableCell>{contact.pan}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="formheader">Contact Details</TableCell>
                <TableCell>
                  {contact.email}
                  <br />
                  {contact.landline}
                  <br />
                  {contact.mobile}
                </TableCell>
                <TableCell className="formheader">Bank Details</TableCell>
                <TableCell>
                  A/c No:{contact.account}
                  <br />
                  {contact.bank}
                  <br />
                  {contact.ifsc}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="formheader">Date of Creation</TableCell>
                <TableCell>{contact.dtd}</TableCell>
                <TableCell className="formheader">Created By</TableCell>
                <TableCell>{contact.user}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="formheader">Role</TableCell>
                <TableCell>{contact.role}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </GridRow>
      </Grid>
      {del && (
        <Message warning style={{ textAlign: "center" }}>
          <MessageHeader>
            Are you sure you want to delete this entry?
          </MessageHeader>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button>Yes</Button>
            <Button>No</Button>
          </div>
        </Message>
      )}
    </>
  );
}
