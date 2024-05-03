import axios from "axios";
import React, { useEffect, useState } from "react";
import Autocomplete from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";
import "semantic-ui-css/semantic.min.css";
import { Card, CardGroup, CardHeader, Table } from "react-bootstrap";
import { Form } from "react-router-dom";
import {
  CardContent,
  CardDescription,
  Image,
  Input,
  Button,
  SegmentGroup,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import {
  MasterUrl,
  records_per_page,
} from "../../Consts/Master/MasterUrl.const";
import { getPageData } from "../../Double/fun";
import MultiSelectAutoComplete from "./MultiSelectAutoComplete";
import WorkOrderCom from "./WorkOrderCom";

export const getProdDetail = async (style_name) => {
  let data = await axios.post(
    `https://arya-erp.in/simranapi/workorder/getProdDetail.php`,

    {
      style_name: style_name,
    }
  );
  // console.log(`inside getProdDetail function`);
  // console.log(data.data);
  return data.data;
};

const Formm2 = ({ contacts, urlsearch }) => {
  const [formData, setFormData] = useState({
    product: "",
  });

  const [selectedOptions, setSelectedOptions] = useState({
    product: "",
  });

  const [data, setData] = useState({});
  const handleSelect = async (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    setSelectedOptions({
      ...selectedOptions,
      [field]: value,
    });
    setData(await getProdDetail(value));
  };
  console.log("data");
  console.log(data);

  return (
    <>
      <div id="sidebar">
        <Autocomplete
          className="autocomplete auto"
          trigger=""
          options={contacts.map((item) => item.style_name)}
          placeholder="Type a product"
          onSelect={(value) => handleSelect("product", value)}
        />
      </div>

      <div id="detail">
        <Form method="post">
          {Object.keys(data).length > 0 && (
            <>
              {Object.keys(selectedOptions.product).map((option, index) => (
                <WorkOrderCom key={index} data={data} />
              ))}
            </>
          )}
        </Form>
      </div>
    </>
  );
};

export default Formm2;
