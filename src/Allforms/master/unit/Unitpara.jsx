import React from "react";
import { Form } from "react-router-dom";
import "../../master/master-common.css";
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
} from "semantic-ui-react";
// const data = [
//     {
//         main: 'KILOGRAM',
//         symb: "KGS"
//     },
// ];

// add row

// const [tableRows, setTableRows] = useState(["TableRow"]);
// const [counter, setCounter] = useState(1);

// function addRow() {
//     setCounter(counter + 1);
//     setTableRows([...tableRows, `TableRow ${counter + 1}`]);
// }

// const Unitpara = () => (
export default function Unitpara() {
  //    const plus = {
  //     color:'black !important' ,
  //     width:'30px',
  //     height:'30px',
  //     borderRadius:'50%',
  //     display:'flex',
  //     justifyContent:'center',
  //     alignItems:'center'
  //    };

  //    const plus_button= {
  //     background:'transparent',
  //     padding:'0',
  //    };

  //    const tableStyle = {
  //     border: 'none !important',
  //    };
  //    const icons_cell={
  //     width:'50px',
  //    };

  //    const input_width={
  //     width:'100%',
  //    };

  return (
    <>
      <div className="center_box">
        <Form method="post" className="">
          <div className="table-responsive">
            <h6 className="main_head">Edit Item</h6>
            <Table celled striped className="table-responsive tableStyle">
              <TableHeader>
                <TableRow className="tableStyle">
                  <TableHeaderCell className="icons_cell">
                    <Button className="plus_button">
                      <Icon className="plus" name="plus" onClick={() => {}} />
                    </Button>
                  </TableHeaderCell>
                  <TableHeaderCell>Unit Name</TableHeaderCell>
                  <TableHeaderCell>Short Name</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* {data.map((ele) => */}
                <TableRow>
                  <TableCell className="icons_cell">
                    <Button className="plus_button">
                      {" "}
                      <Icon
                        className="close_btn"
                        name="close"
                        onClick={() => {}}
                      />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Unit Name*"
                      name="unit_name"
                      className="input_width"
                    />
                  </TableCell>
                  <TableCell colSpan="3">
                    <Input
                      placeholder="Short Name*"
                      name="unit_shortname"
                      className="input_width"
                    />
                  </TableCell>
                </TableRow>

                {/* )} */}
              </TableBody>
            </Table>

            <div className="text-center">
              <Button primary className="mt_10">
                Submit
              </Button>
              <Button primary>cancel</Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
