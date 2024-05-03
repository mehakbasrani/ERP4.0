import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import {
  Input,
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
import { MasterUrl } from "../../../Consts/Master/MasterUrl.const";
import { getIdEntry } from "../../../Double/fun";
import { useParams } from "react-router-dom";
import AllProductView from "./AllProductView";
//import "./partyForm.css";
export async function loader({ params }) {
  const data = await getIdEntry(
    axios,
    MasterUrl.getIdEntry,
    params.id,
    "prodgen"
  );
  //console.log(data);
  return data;
}
const GeneralView = () => {
  const pageData = useLoaderData();
  console.log(pageData);
  const navigate = useNavigate();

  const editGeneral = (id) => {
    //console.log(id);
    navigate(`Edit`);
  };
  const [del, setDel] = useState(false);
  const [visible, setVisible] = useState(true);

  const deleteGeneral = (id) => {
    setDel(true);
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <>
      <Grid verticalAlign="middle">
        <GridRow centered color="blue" className="formheader">
          <GridColumn textAlign="center" width={12}>
            {pageData.style_name}
          </GridColumn>
          <GridColumn
            floated="right"
            width={4}
            // color="red"
            textAlign="right"
            verticalAlign="middle"
          >
            <Button onClick={() => editGeneral(pageData.id)}>Edit</Button>
            <Button onClick={() => deleteGeneral(pageData.id)}>Delete</Button>
          </GridColumn>
        </GridRow>
        <GridRow>
          <AllProductView />
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
                <TableCell className="formheader">Style Name</TableCell>
                <TableCell>{pageData.style_name}</TableCell>
                <TableCell className="formheader">Reference</TableCell>
                <TableCell>{pageData.reference}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="formheader">Season</TableCell>
                <TableCell>{pageData.season}</TableCell>
                <TableCell className="formheader">Category</TableCell>
                <TableCell>{pageData.catagory}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="formheader">HSN Code</TableCell>
                <TableCell>{pageData.msc1}</TableCell>
                <TableCell className="formheader">Rate</TableCell>
                <TableCell>{pageData.msc2}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="formheader">MSC3</TableCell>
                <TableCell>{pageData.msc3}</TableCell>
                <TableCell className="formheader">MSC4</TableCell>
                <TableCell>{pageData.msc4}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </GridRow>
      </Grid>
      {del && visible && (
        <Message warning style={{ textAlign: "center" }}>
          <MessageHeader>
            Are you sure you want to delete this entry?
          </MessageHeader>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button>Yes</Button>
            <Button onClick={handleDismiss}>No</Button>
          </div>
        </Message>
      )}
    </>
  );
};

export default GeneralView;
