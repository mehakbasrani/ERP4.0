import axios from "axios";
import React, { useState } from "react";
import { getPageInfo, getPageData, putNewId } from "../../Double/fun";
import {
  MasterUrl,
  records_per_page,
} from "../../Consts/Master/MasterUrl.const";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  Checkbox,
  Table,
  Button,
  Breadcrumb,
  BreadcrumbDivider,
  BreadcrumbSection,
  Pagination,
  GridRow,
  GridColumn,
  Grid,
} from "semantic-ui-react";
import { useEffect } from "react";
//get * from units table
const header = [
  " ",
  "Company Name",
  "Contact Person",
  "Address",
  "City",
  "State",
  "email",
  "Role",
  "Mobile",
];

//get total no of pages from items table
const totalRecords = await getPageInfo(
  axios,
  MasterUrl.getPageInfo,
  "stylegeneral"
);
const totalPages = Math.ceil(totalRecords / records_per_page);

// loader function for Unit
export async function loader() {
  const data = await getPageData(
    axios,
    MasterUrl.getPageData,
    records_per_page,
    1,
    "stylegeneral"
  );
  console.log(data);
  return data;
}

// main function====================================
export default function Unit() {
  const data = useLoaderData();
  const [pageData, setPageData] = useState(data);
  // console.log(`stylePageData:`);
  //console.log(pageData);

  const [showclass, setShowClass] = useState("noshow");

  const chkstat = {};

  pageData.forEach((val, ind) => {
    // console.log(`v:${val.id}::i:${ind}`);
    chkstat[val.id] = false;
  });

  //console.log("-----");
  //console.log(chkstat);
  const [chkstat2, setChkStat2] = useState(chkstat);

  const navigate = useNavigate();

  const addNew = async () => {
    const id2 = await putNewId(axios, MasterUrl.putNewId, "party");
    console.log(`id2:${id2}`);

    return navigate(`${id2}/Edit`);
    //return null;
  };
  const showCl = () => {
    const sh = showclass === "noshow" ? "nowshow" : "noshow";
    setShowClass(sh);
  };

  const leadSet = (event) => {
    let c = {};
    Object.keys(chkstat2).forEach((key) => {
      console.log(key);
      c[key] = event.target.checked;
    });
    console.log(`c:`);
    console.log(c);
    setChkStat2(c);
  };
  const setTick = (contact, event, data) => {
    console.log(event);
    console.log(data);
    console.log(`contact:`);
    console.log(contact.id);
    console.log(chkstat2);
    chkstat2[contact.id] = data.checked;
    console.log(contact);
    console.log(chkstat2);
    console.log("cccccccccc");
    const c = {
      ...chkstat2,
    };
    console.log(c);
    setChkStat2(c);
  };
  const delObj = () => {
    console.log(chkstat2);
    let t = [];
    Object.keys(chkstat2).forEach((key) => {
      if (chkstat2[key]) t.push(key);
    });
    console.log(`t::::`);
    console.log(t);
  };
  const pageChange = async (event, data) => {
    const newpageData = await getPageData(
      axios,
      MasterUrl.getPageData,
      records_per_page,
      data.activePage,
      "party"
    );
    setpageData(newpageData);
  };

  const show_record = (id) => {
    console.log(`id:${id}`);

    navigate(`${id}`);
  };

  const editRecord = (e, data, id) => {
    console.log(e);
    console.log(data);
    console.log(id);
    //e.stopPropagation();

    navigate(`${id}/Edit`);
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <>
      <Breadcrumb>
        <BreadcrumbSection as={Link} to="/">
          Home
        </BreadcrumbSection>
        <BreadcrumbDivider icon="right chevron" />
        <BreadcrumbSection as={Link} to="/master">
          Master
        </BreadcrumbSection>
        <BreadcrumbDivider icon="right chevron" />
        <BreadcrumbSection active>Style</BreadcrumbSection>
      </Breadcrumb>
      <Grid verticalAlign="middle">
        <GridRow centered color="blue" style={{ fontWeight: "900" }}>
          <GridColumn
            floated="right"
            width={4}
            // color="red"
            textAlign="right"
            verticalAlign="middle"
          >
            <Button color="teal" onClick={showCl}>
              Modify
            </Button>
            <Button color="red" className={showclass} onClick={delObj}>
              Delete
            </Button>
            <Button color="green" onClick={addNew} className={showclass}>
              Add New
            </Button>
          </GridColumn>
        </GridRow>
        <GridRow centered>
          <Table style={{ maxWidth: "1490px" }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className={showclass}>
                  <input type="checkbox" onChange={(event) => leadSet(event)} />
                </Table.HeaderCell>
                {header.map((h) => (
                  <Table.HeaderCell key={h}>{h}</Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            {/* <Table.Body>
              {pageData.map((contact) => (
                <Table.Row
                  onClick={() => show_record(contact.id)}
                  key={contact.id}
                >
                  <Table.Cell>
                    <Checkbox
                      className={showclass}
                      checked={chkstat2[contact.id]}
                      onChange={(event, data) => setTick(contact, event, data)}
                      name={contact.id}
                    />
                  </Table.Cell>
                  <Table.Cell>{contact.company_name}</Table.Cell>
                  <Table.Cell>{contact.contact_person}</Table.Cell>
                  <Table.Cell>{contact.address}</Table.Cell>
                  <Table.Cell>{contact.city}</Table.Cell>
                  <Table.Cell>{contact.state}</Table.Cell>
                  <Table.Cell>{contact.email}</Table.Cell>
                  <Table.Cell>{contact.role.toUpperCase()}</Table.Cell>

                  <Table.Cell>{contact.mobile}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body> */}
          </Table>
        </GridRow>
      </Grid>

      <Pagination
        floated="right"
        defaultActivePage={1}
        totalPages={totalPages}
        onPageChange={pageChange}
      />
    </>
  );
}
