import axios from "axios";
import React, { useState } from "react";
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
} from "semantic-ui-react";
import { getPageInfo, getPageData, putNewId } from "../../Double/fun";
import {
  MasterUrl,
  records_per_page,
} from "../../Consts/Master/MasterUrl.const";
import "../../css/Master/master.css";

const header = [
  " ",
  "Item Name",
  "Item Type",
  "Item Color",
  "Buffer Unit",
  "Specification",
  "Rate",
];

//get total no of pages from items table
const totalRecords = await getPageInfo(axios, MasterUrl.getPageInfo, "items");
const totalPages = Math.ceil(totalRecords / records_per_page);

// loader function for Unit
export async function loader() {
  const data = await getPageData(
    axios,
    MasterUrl.getPageData,
    records_per_page,
    1,
    "items"
  );
  console.log(data);
  return data;
}

// main function====================================
export default function Item() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [pageData, setpageData] = useState(data);
  console.log(`itemsData:`);
  console.log(pageData);
  const [showclass, setShowClass] = useState("noshow");
  const showCl = () => {
    const sh = showclass === "noshow" ? "nowshow" : "noshow";
    setShowClass(sh);
  };

  const chkstat = {};
  pageData.forEach((val, ind) => {
    //console.log(`v:${val.id}::i:${ind}`);
    chkstat[val.id] = false;
  });

  //console.log("-----");
  //console.log(chkstat);
  const [chkstat2, setChkStat2] = useState(chkstat);

  const addNew = async () => {
    const id2 = await putNewId(axios, MasterUrl.putNewId, "items");
    console.log(`id2:${id2}`);

    return navigate(`${id2}/Edit`);
    //return null;
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
      "items"
    );
    setpageData(newpageData);
  };

  const show_record = (id) => {
    console.log(`id:${id}`);

    navigate(`${id}`);
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
            <BreadcrumbSection active>Item</BreadcrumbSection>
          </Breadcrumb>
        </GridRow>
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
            <Table.Body>
              {pageData.map((item) => (
                <Table.Row onClick={() => show_record(item.id)} key={item.id}>
                  <Table.Cell>
                    <Checkbox
                      className={showclass}
                      checked={chkstat2[item.id]}
                      onChange={(event, data) => setTick(item, event, data)}
                      name={item.id}
                    />
                  </Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.item_type}</Table.Cell>
                  <Table.Cell>{item.item_color}</Table.Cell>
                  <Table.Cell>{item.buffer_unit}</Table.Cell>
                  <Table.Cell>{item.specification}</Table.Cell>
                  <Table.Cell>{item.rate}</Table.Cell>
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
