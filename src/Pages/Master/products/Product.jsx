import React, { useState } from "react";
import "./product.css";
import { Link, Outlet } from "react-router-dom";
import {
  TabPane,
  Tab,
  Grid,
  GridRow,
  Breadcrumb,
  BreadcrumbSection,
  BreadcrumbDivider,
} from "semantic-ui-react";
import BOM from "./BOM";
import General from "./General";
import Manufacturing from "./Manufacturing";
import Operations from "./Operations";
import Pictures from "./Pictures";
import Specifications from "./Specifications";

const Product = () => {
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const panes = [
    {
      menuItem: "GENERAL",
      render: () => (
        <TabPane attached={false}>
          <General formData={formData} setFormData={setFormData} />
        </TabPane>
      ),
    },
    {
      menuItem: "BOM",
      render: () => (
        <TabPane attached={false}>
          <BOM formData={formData} setFormData={setFormData} />
        </TabPane>
      ),
    },
    {
      menuItem: "MANUFACTURING",
      render: () => (
        <TabPane attached={false}>
          <Manufacturing />
        </TabPane>
      ),
    },
    {
      menuItem: "OPERATIONS",
      render: () => (
        <TabPane attached={false}>
          <Operations />
        </TabPane>
      ),
    },
    {
      menuItem: "PICTURES",
      render: () => (
        <TabPane attached={false}>
          <Pictures />
        </TabPane>
      ),
    },
    {
      menuItem: "SPECIFICATIONS",
      render: () => (
        <TabPane attached={false} as={Link} to="/spec">
          <Specifications />
        </TabPane>
      ),
    },
  ];
  return (
    <>
      <Grid verticalAlign="middle">
        <GridRow style={{ marginLeft: "15px" }}>
          <Breadcrumb>
            <BreadcrumbSection as={Link} to="/">
              Home
            </BreadcrumbSection>
            <BreadcrumbDivider icon="right chevron" />
            <BreadcrumbSection as={Link} to="/master">
              Master
            </BreadcrumbSection>
            <BreadcrumbDivider icon="right chevron" />
            <BreadcrumbSection active>Product</BreadcrumbSection>
          </Breadcrumb>
        </GridRow>
      </Grid>
      <Tab as={null} menu={{ secondary: true }} panes={panes}></Tab>
      <Tab.Pane>
        <Outlet />
      </Tab.Pane>
    </>
  );
};
export default Product;
