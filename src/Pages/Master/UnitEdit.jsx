import { useLoaderData, Form, redirect, useNavigate } from "react-router-dom";
import * as React from "react";
import axios from "axios";
import UnitForm from "./UnitForm";
import { getIdEntry } from "../../Double/fun";
import { MasterUrl } from "../../Consts/Master/MasterUrl.const";

export async function loader({ params }) {
  //console.log(params);

  const data = await getIdEntry(
    axios,
    MasterUrl.getIdEntry,
    params.unitId,
    "unit"
  );
  //console.log(`inside loader unit edit:`);
  //console.log(data);
  return data;
}

export default function UnitEdit() {
  const data = useLoaderData();

  return (
    <div>
      <UnitForm data={data} />
    </div>
  );
}
