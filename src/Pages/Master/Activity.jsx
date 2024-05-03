import axios from "axios";
import React, { useState } from "react";
import { getPageInfo, getPageData, putNewId } from "../../Double/fun";

import { MasterUrl } from "../../Consts/Master/MasterUrl.const";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  Checkbox,
  Grid,
  Input,
  Icon,
  Table,
  Button,
  GridRow,
  GridColumn,
  TableRow,
  TableBody,
  TableHeader,
  Header,
  TableHeaderCell,
  TableCell,
  Breadcrumb,
  BreadcrumbDivider,
  BreadcrumbSection,
  Pagination,
  Label,
  Select,
} from "semantic-ui-react";
import * as XLSX from "xlsx/xlsx.mjs";

//get * from units table
const header = [" ", "Activity Name", "Description"];
const records_per_page = 10;

// loader function for Unit
export async function loader() {
  const data = await getPageData(
    axios,
    MasterUrl.getPageData,
    records_per_page,
    1,
    "activity"
  );
  // console.log(data);
  return data;
}
const totalRecords = await getPageInfo(
  axios,
  MasterUrl.getPageInfo,
  "activity"
);

const dropData = [
  { key: "3", value: "3", text: "3" },
  { key: "5", value: "5", text: "5" },
  { key: "10", value: "10", text: "10" },
  { key: "20", value: "20", text: "20" },
];

// main function====================================
export default function Activity() {
  const data = useLoaderData();
  const [pageData, setPageData] = useState(data);
  console.log(`activityData:`);
  console.log(pageData);
  const [showclass, setShowClass] = useState("noshow");
  const chkstat = {};
  pageData.forEach((val, ind) => {
    //console.log(`v:${val.id}::i:${ind}`);
    chkstat[val.id] = false;
  });

  //console.log("-----");
  //console.log(chkstat);
  const [chkstat2, setChkStat2] = useState(chkstat);

  const navigate = useNavigate();

  const addNew = async () => {
    const id2 = await putNewId(axios, MasterUrl.putNewId, "activity");
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
    console.log(chkstat2);
    chkstat2[contact.id] = data.checked;
    console.log(contact);
    console.log(chkstat2);
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
      "activity"
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
    console.log(pageData);
    let wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(pageData);
    XLSX.utils.book_append_sheet(wb, ws, "ActivityDataSheet");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  //get total no of pages from items table
  //const totalPages = Math.ceil(totalRecords / records_per_page);
  //  const [perPage, setPerPage] = useState(records_per_page);
  //const [currentPage, setCurrentPage] = useState(1);
  const [perPage2, setPerPage2] = useState();
  const totalPages = Math.ceil(totalRecords / perPage2);

  // const startIndex = (currentPage - 1) * perPage;
  // const endIndex = startIndex + perPage;
  // const currentData = pageData.slice(startIndex, endIndex);

  const handlePerPageChange = async (e) => {
    console.log(e.target.value);
    setPerPage2(parseInt(e.target.value));
    //setCurrentPage(1);
    await pageDataChange(parseInt(e.target.value));
  };

  const pageDataChange = async (value) => {
    const perpageData = await getPageData(
      axios,
      MasterUrl.getPageData,
      value,
      1,
      "activity"
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
            <BreadcrumbSection active>Activity</BreadcrumbSection>
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
                <Table.HeaderCell
                  className={showclass}
                  //style={{ overflowX: "hidden" }}
                >
                  <input type="checkbox" onChange={(event) => leadSet(event)} />
                </Table.HeaderCell>
                {header.map((h) => (
                  <Table.HeaderCell key={h}>{h}</Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {pageData.map((activity) => (
                <Table.Row
                  onClick={() => show_record(activity.id)}
                  key={activity.id}
                >
                  <Table.Cell>
                    <Checkbox
                      className={showclass}
                      checked={chkstat2[activity.id]}
                      onChange={(event, data) => setTick(activity, event, data)}
                      name={activity.id}
                    />
                  </Table.Cell>
                  <Table.Cell>{activity.activity_name}</Table.Cell>
                  <Table.Cell>{activity.description}</Table.Cell>
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
