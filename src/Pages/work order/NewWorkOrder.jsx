import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Link, Outlet } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbDivider,
  BreadcrumbSection,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardGroup,
  CardHeader,
  Dropdown,
  Grid,
  GridColumn,
  GridRow,
  Input,
  Label,
  Segment,
  SegmentGroup,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "semantic-ui-react";
import {
  MasterUrl,
  records_per_page,
} from "../../Consts/Master/MasterUrl.const";
import { getPageData } from "../../Double/fun";

const products = [
  "General",
  "BOM",
  "Manufacturing",
  "Pictures",
  "Operations",
  "Specification",
];
const size = await getPageData(
  axios,
  MasterUrl.getPageData,
  records_per_page,
  1,
  "size"
);

const NewWorkOrder = () => {
  const [open, setOpen] = useState(false);
  const addnew = () => {
    setOpen(true);
  };

  const [productData, setProductData] = useState(products);
  const [isInputFocused, setInputFocused] = useState(false);
  const [selecteProduct, setSelectProduct] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (name) => {
    setSelectProduct(name);
    const user = productData.find((user) => user === name);
    setSelectedProduct(user);
  };
  console.log(selectedProduct);

  const [sizeData, setSizeData] = useState(size);
  const [isSizeInputFocused, setSizeInputFocused] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleNameSelect = (name) => {
    setSelectedName(name);
    const user = sizeData.find((user) => user.size_name === name);
    setSelectedUser(user);
  };
  console.log(selectedUser);

  // let count = parseInt(selectedUser?.size_nos);
  // console.log(count);
  // // console.log(typeof count);
  // const [quantities, setQuantities] = useState(
  //   Array.from({ length: count }, (_, index) => index + 1).map(() => "")
  // );
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    if (selectedUser && selectedUser.size_nos) {
      const count = parseInt(selectedUser.size_nos);
      const newQuantities = Array.from(
        { length: count },
        (_, index) => index + 1
      ).map(() => "");
      setQuantities(newQuantities);
    }
  }, [selectedUser]);
  const [addQty, setAddQty] = useState();
  const [values, setValues] = useState();
  const handleQuantityChange = (e) => {
    const { name, value } = e.target;

    setAddQty({
      ...values,
      [name]: value,
    });
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
        {open && (
          <GridRow>
            <SegmentGroup horizontal>
              <Segment>
                Size
                <Input
                  onFocus={() => setSizeInputFocused(true)}
                  value={selectedUser?.size_name}
                  // onBlur={() => setSizeInputFocused(false)}
                  // onChange={handleChangee}
                  // value={sizeSearch}
                  placeholder="Size"
                />
                {isSizeInputFocused && (
                  <ul>
                    {sizeData.map((item) => (
                      <li
                        key={item.size_name}
                        onClick={() => handleNameSelect(item.size_name)}
                      >
                        {item.size_name}
                      </li>
                    ))}
                  </ul>
                )}
              </Segment>
              <Segment>
                {selectedUser && (
                  <CardGroup itemsPerRow={3}>
                    {selectedUser.sizes?.split("**").map((size) => (
                      <Card key={size} fluid>
                        <CardContent>
                          <CardHeader>{size}</CardHeader>
                        </CardContent>
                      </Card>
                    ))}
                  </CardGroup>
                )}
                {/* {sizeData
                  .filter((item) => {
                    return sizeSearch === ""
                      ? item
                      : item.size_name.includes(sizeSearch);
                  })

                  .map((filteredItem) => (
                    <CardGroup itemsPerRow={3}>
                      {filteredItem.sizes?.split("**").map((size) => (
                        <Card key={size} fluid>
                          <CardContent>
                            <CardHeader>{size}</CardHeader>
                          </CardContent>
                        </Card>
                      ))}
                    </CardGroup>
                  ))} */}
              </Segment>
            </SegmentGroup>
            <SegmentGroup horizontal>
              <Segment>Quantities</Segment>
              <Segment>
                {quantities.map((index) => (
                  <Input
                    key={index}
                    type="number"
                    onChange={handleQuantityChange}
                    value={addQty}
                    name={`${index + 1}`}
                    placeholder={`Enter quantity`}
                  />
                ))}
              </Segment>
            </SegmentGroup>
          </GridRow>
        )}
      </Grid>
    </>
  );
};

export default NewWorkOrder;
