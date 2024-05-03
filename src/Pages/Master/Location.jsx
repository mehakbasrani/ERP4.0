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
  Label,
} from "semantic-ui-react";
import * as XLSX from "xlsx/xlsx.mjs";
import { useEffect } from "react";
//get * from units table
const header = [" ", "Location Name", "Description"];

//get total no of pages from items table
const totalRecords = await getPageInfo(
  axios,
  MasterUrl.getPageInfo,
  "location"
);
const totalPages = Math.ceil(totalRecords / records_per_page);

// loader function for Unit
export async function loader() {
  const data = await getPageData(
    axios,
    MasterUrl.getPageData,
    records_per_page,
    1,
    "location"
  );
  //console.log(data);
  return data;
}

// main function====================================
export default function Location() {
  const data = useLoaderData();
  const [pageData, setPageData] = useState(data);
  console.log(`partyPageData:`);
  console.log(pageData);

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
    const id2 = await putNewId(axios, MasterUrl.putNewId, "location");
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
      "location"
    );
    setPageData(newpageData);
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

  const handleExportData = () => {
    // console.log(pageData);
    let wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(pageData);
    XLSX.utils.book_append_sheet(wb, ws, "LocationDataSheet");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };
  const [perPage, setPerPage] = useState();
  const totalPages = Math.ceil(totalRecords / perPage);

  const handlePerPageChange = async (e) => {
    console.log(e.target.value);
    setPerPage(parseInt(e.target.value));
    //setCurrentPage(1);
    await pageDataChange(parseInt(e.target.value));
  };

  const pageDataChange = async (value) => {
    const perpageData = await getPageData(
      axios,
      MasterUrl.getPageData,
      value,
      1,
      "location"
    );
    //console.log("perpage");
    //console.log(perPage);
    setPageData(perpageData);
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
            <BreadcrumbSection as={Link} to="/master">
              Master
            </BreadcrumbSection>
            <BreadcrumbDivider icon="right chevron" />
            <BreadcrumbSection active>Location</BreadcrumbSection>
          </Breadcrumb>
        </GridRow>
        <GridRow centered color="blue" style={{ fontWeight: "900" }}>
          <GridColumn
            floated="right"
            width={6}
            // color="red"
            textAlign="right"
            verticalAlign="middle"
          >
            <Label style={{ padding: "8px" }}>
              Records per page:
              <select onChange={(e) => handlePerPageChange(e)}>
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              {/* <Select options={dropData} /> */}
            </Label>
            <Button onClick={handleExportData}>Export</Button>
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
            <Table.Body>
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
                  <Table.Cell>{contact.location_name}</Table.Cell>
                  <Table.Cell>{contact.description}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
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
