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

export const getProdData = async (axios, search) => {
  let data = await axios.post(
    `https://arya-erp.in/simranapi/workorder/getProdData.php`,

    {
      search: search,
    }
  );
  // console.log(`inside getProdData function`);
  // console.log(data.data);
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

  const [forms, setForms] = useState([]);
  const [formDataArray, setFormDataArray] = useState([]);
  const [idCounter, setIdCounter] = useState(0);
  const handleSave = (formData) => {
    setFormDataArray((prevState) => [...prevState, formData]);
  };
  const addnew = () => {
    const id = idCounter;
    setIdCounter((prevCounter) => prevCounter + 1);
    setForms([
      ...forms,
      <OldForm
        key={id}
        id={id}
        contacts={contacts}
        onSave={handleSave}
        onDelete={handleDelete}
      />,
    ]);
  };
  const handleDelete = (idToDelete) => {
    console.log(idToDelete);
    setForms((prevForms) => {
      const updatedForms = prevForms.filter((_, index) => index !== idToDelete);
      console.log("updatedForms");
      console.log(updatedForms);
      return updatedForms.map((form, index) => {
        const newId = index;
        console.log(newId);
        return React.cloneElement(form, { key: newId, id: newId });
      });
    });

    setFormDataArray((prevState) => {
      const newArray = [...prevState];
      newArray.splice(idToDelete, 1);
      return newArray;
    });
  };

  // const handleDelete = (id) => {
  //   setForms((prevForms) => prevForms.filter((form) => form.props.id !== id));
  //   setFormDataArray((prevData) => prevData.filter((data) => data.id !== id));
  // };

  console.log(formDataArray);

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
          {forms?.map((FormComponent, index) => (
            <ul key={index}>
              <li>{FormComponent}</li>
            </ul>
          ))}
        </GridRow>
      </Grid>
    </>
  );
};

export default WorkOrder;
