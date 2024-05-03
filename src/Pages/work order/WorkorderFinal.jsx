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
  Input,
} from "semantic-ui-react";
import Formm2 from "./Formm2";
import OldForm from "./OldForm";
import Test from "./Test";
import WorkOrderComponent from "./WorkOrderComponent";

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

const WorkorderFinal = () => {
  const { contacts, urlsearch } = useLoaderData();
  // console.log(contacts);

  const [forms, setForms] = useState([]);

  const addnew = () => {
    setForms([
      ...forms,
      <Test
        key={forms.length}
        options={contacts.map((item) => item.style_name)}
      />,
      // <Formm2 key={forms.length} contacts={contacts} urlsearch={urlsearch} />,
      // <OldForm key={forms.length} contacts={contacts} urlsearch={urlsearch} />,
    ]);
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
              New2
            </Button>
          </GridColumn>
        </GridRow>
        <GridRow style={{ display: "flex", flexDirection: "column-reverse" }}>
          {forms.map((FormComponent, index) => (
            <div style={{ display: "flex" }} key={index}>
              {FormComponent}
            </div>
          ))}
        </GridRow>
      </Grid>
    </>
  );
};

export default WorkorderFinal;
