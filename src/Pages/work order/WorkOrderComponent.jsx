import axios from "axios";
import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbDivider,
  BreadcrumbSection,
  Button,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Input,
} from "semantic-ui-react";
import AutoComplete from "./AutoComplete";
import Formm2 from "./Formm2";

export const getProdData = async (axios, search) => {
  let data = await axios.post(
    `https://arya-erp.in/simranapi/workorder/getProdData.php`,

    {
      search: search,
    }
  );
  console.log(`inside getProdData function`);
  console.log(data.data);
  return data.data;
};

export async function loader({ request, params }) {
  const url = new URL(request.url);
  const urlsearch = url.searchParams.get("search");
  const contacts = await getProdData(axios, urlsearch);
  return { contacts, urlsearch };
}

const WorkOrder = () => {
  const { contacts, urlsearch } = useLoaderData();
  // console.log(contacts);

  const [open, setOpen] = useState(false);
  const addnew = () => {
    setOpen(true);
  };

  return (
    <>
      <Grid verticalAlign="middle">
        <GridRow style={{ marginLeft: "15px" }}>
          <Breadcrumb>
            <BreadcrumbSection as={Link} to="/">
              Home
            </BreadcrumbSection>
            <BreadcrumbDivider icon="right chevron" />
            <BreadcrumbSection active>Work Order</BreadcrumbSection>
          </Breadcrumb>
        </GridRow>
        <GridRow centered color="blue">
          <GridColumn width={6}>
            Work Order Number:
            <Input />
          </GridColumn>
          <GridColumn
            floated="right"
            width={4}
            textAlign="right"
            verticalAlign="middle"
          >
            <Button color="green" onClick={addnew}>
              New
            </Button>
          </GridColumn>
        </GridRow>
        <GridRow style={{ display: "flex", flexDirection: "column-reverse" }}>
          {open && (
            <>
              <AutoComplete options={contacts.map((item) => item.style_name)} />
            </>
          )}
        </GridRow>
      </Grid>
    </>
  );
};

export default WorkOrder;
