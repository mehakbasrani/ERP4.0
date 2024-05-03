import { useLoaderData } from "react-router-dom";
import * as React from "react";
import axios from "axios";
import { getIdEntry } from "../../Double/fun";
import { MasterUrl } from "../../Consts/Master/MasterUrl.const";
import ActivityForm from "./ActivityForm";

export async function loader({ params }) {
  //console.log(params);

  const data = await getIdEntry(
    axios,
    MasterUrl.getIdEntry,
    params.activityId,
    "activity"
  );
  //console.log(`inside loader unit edit:`);
  //console.log(data);
  return data;
}

export default function UnitEdit() {
  const data = useLoaderData();

  return (
    <div>
      <ActivityForm data={data} />
    </div>
  );
}
