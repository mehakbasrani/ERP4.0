import { useLoaderData, Form, redirect, useNavigate } from "react-router-dom";
import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ItemForm from "./ItemForm";
import { MasterUrl } from "../../Consts/Master/MasterUrl.const";
import { getIdEntry } from "../../Double/fun";
import Itemfromtest from "./Itemformtest";

export async function loader({ params }) {
  //console.log(params);

  const data = await getIdEntry(
    axios,
    MasterUrl.getIdEntry,
    params.itemId,
    "items"
  );
  //console.log(`inside loader unit edit:`);
  //console.log(data);
  return data;
}
export default function ItemEdit() {
  const data = useLoaderData();

  return (
    <div>
      <Itemfromtest data={data}></Itemfromtest>
      {/* <ItemForm data={data} /> */}
    </div>
  );
}
