import { useLoaderData } from "react-router-dom";
import * as React from "react";
import axios from "axios";
import LocationForm from "./LocationForm";
import { getIdEntry } from "../../Double/fun";
import { MasterUrl } from "../../Consts/Master/MasterUrl.const";

export async function loader({ params }) {
  //console.log(params);

  const data = await getIdEntry(
    axios,
    MasterUrl.getIdEntry,
    params.locationId,
    "location"
  );
  //console.log(`inside loader unit edit:`);
  //console.log(data);
  return data;
}

export default function LocationEdit() {
  const data = useLoaderData();

  return (
    <div>
      <LocationForm data={data} />
    </div>
  );
}
