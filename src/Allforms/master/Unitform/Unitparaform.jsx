import React, { useState } from "react";
import { Form } from "react-router-dom";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  MenuItem,
  Icon,
  Label,
  Menu,
  Input,
  Table,
  Button,
  IconGroup,
  Modal,
} from "semantic-ui-react";

// Custom Modal Content Component
const CustomModalContent = ({ value }) => {
  return (
    <div>
      <h1>Modal Content</h1>
      <p>Received value: {value}</p>
    </div>
  );
};
function ModalComponent({ modalOpen }) {
  return (
    <Modal
      open={modalOpen}
      // value={inputValue}
      // onClose={closeModal}
    />
  );
}

export default function Unitparaform() {
  const [modalOpen, setModalOpen] = useState(false);
  // Function to open modal
  const openModal = (value) => {
    setInputValue(value);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const [inputValue, setInputValue] = useState("");

  // List
  const [inputValuetype, setInputValuetype] = useState("");
  // Sample list of items
  const itemList = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Grapes",
    "Mango",
    "papaya",
  ];

  // Function to handle input change
  const handleInputChange = (e, data) => {
    console.log(`e:`);
    // console.log(e);
    console.log(`data:`);
    console.log(data);
    // setModalOpen(true);

    // List
    const value = e.target.value;
    setInputValuetype(value);
  };
  const plus = {
    // background:'blue',
    color: "black !important",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const plus_button = {
    background: "transparent",
    padding: "0",
  };

  const tableStyle = {
    border: "none !important",
    // padding:'20px',
  };
  const icons_cell = {
    width: "50px",
  };
  const input_width = {
    width: "100%",
  };
  const [row_id, setRow_id] = useState(1);

  const [rows, setRows] = useState([{ id: 0 }]);
  const handleAddRow = (e) => {
    console.log("add clicked");
    setRow_id(row_id + 1);
    console.log(`row_id:${row_id}`);
    setRows([...rows, { id: rows.length }]);
    console.log(rows);
    e.preventDefault();
  };

  const handleDelRow = (e, ind) => {
    console.log("cross clicked");
    console.log(ind);

    const updated_rows = [...rows];
    console.log(rows);
    console.log(rows.length);
    console.log(updated_rows);

    updated_rows.splice(ind, 1);
    console.log(rows);
    console.log(updated_rows);
    setRows(updated_rows);
    e.preventDefault();
  };

  return (
    <>
      <div className="position-relative">
        <div className="center_box">
          <Form method="post">
            <div className="table-responsive">
              <h6 className="main_head">Edit Item</h6>

              <Table
                celled
                striped
                style={tableStyle}
                className="table-responsive"
              >
                <TableHeader>
                  <TableRow style={tableStyle}>
                    <TableHeaderCell style={icons_cell}>
                      <Button style={plus_button}>
                        <Icon
                          className="plus"
                          name="plus"
                          onClick={(e) => handleAddRow(e)}
                        />
                      </Button>
                    </TableHeaderCell>
                    <TableHeaderCell>Unit Name</TableHeaderCell>
                    <TableHeaderCell>Short Name</TableHeaderCell>
                    {/* <ModalComponent modalOpen={modalOpen} /> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row, index) => {
                    return (
                      <TableRow key={`R${row.id}`}>
                        <TableCell style={icons_cell}>
                          <Button style={plus_button}>
                            <Icon
                              className="close_btn"
                              name="close"
                              onClick={(e) => handleDelRow(e, index)}
                            />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="Unit Name*"
                            name="unit_name"
                            style={input_width}
                            defaultValue={row.id}
                            value={inputValuetype}
                            onChange={(e, data) => handleInputChange(e, data)}
                          />

                          {inputValuetype.length > 0 && (
                            <div className="right_box">
                              <ul>
                                {itemList
                                  .filter((item) =>
                                    item
                                      .toLowerCase()
                                      .includes(inputValuetype.toLowerCase())
                                  )
                                  .map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                              </ul>
                            </div>
                          )}
                        </TableCell>
                        <TableCell colSpan="3">
                          <Input
                            placeholder="Short Name*"
                            name="unit_shortname"
                            style={input_width}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <div className="text-center">
                <Button primary className="mt_10">
                  Submit
                </Button>
                <Button primary>Reset</Button>
              </div>
            </div>
          </Form>
        </div>
      </div>

      <Modal />
    </>
  );
}
