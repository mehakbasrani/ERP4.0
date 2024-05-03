import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbDivider,
  BreadcrumbSection,
} from "semantic-ui-react";
// import Unitpara from "./Unitpara";
import Unitparaform from "./Unitparaform"
export default function Unitform() {
  const submitHandler = async (event) => {
    console.log(event.target[0].files[0]);
    const file2 = event.target[0].files[0];
    console.log(file2);
    const formData = new FormData();
    formData.append("file", file2);
    console.log(formData);
    //const a = await insertImage(event.target.files[0]);
    event.preventDefault();
    event.stopPropagation();
  };
  const insertImage = async (imgfile) => {
    axios.post("", imgfile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbSection as={Link} to="/">
          Home
        </BreadcrumbSection>
        <BreadcrumbDivider icon="right chevron" />
        <BreadcrumbSection as={Link} to="/master">
          Master
        </BreadcrumbSection>
        <BreadcrumbDivider icon="right chevron" />
        <BreadcrumbSection active>Unit</BreadcrumbSection>
      </Breadcrumb>
      Unit
      <form
        onSubmit={submitHandler}
        method="post"
        enctype="multipart/form-data"
      >
        <input type="file" name="avatar" />
        <button type="submit">Submit</button>
      </form>
      {/* <Unitpara /> */}
      <Unitparaform />

    </div>
  );
}