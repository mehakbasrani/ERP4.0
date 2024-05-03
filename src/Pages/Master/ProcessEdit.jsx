import { useLoaderData } from "react-router-dom";
import * as React from "react";
import axios from "axios";
import ProcessForm from "./ProcessForm";
import { getIdEntry } from "../../Double/fun";
import { MasterUrl } from "../../Consts/Master/MasterUrl.const";
import Processformm from "./Processformm";

export async function loader({ params }) {
  //console.log(params);

  const data = await getIdEntry(
    axios,
    MasterUrl.getIdEntry,
    params.processId,
    "process"
  );
  //console.log(`inside loader unit edit:`);
  //console.log(data);
  return data;
}

export default function ProcessEdit() {
  const data = useLoaderData();
  return (
    <div>
      <Processformm data={data} />
      {/* <ProcessForm data={data} /> */}
    </div>
  );
}
