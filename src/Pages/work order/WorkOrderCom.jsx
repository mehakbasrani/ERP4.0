import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import StyleDisplay from "./StyleDisplay";
import SizeDisplay from "./SizeDisplay";
import ProcessDisplay from "./ProcessDisplay";
import BOMDisplay from "./BOMDisplay";
import { CardGroup, Card } from "semantic-ui-react";

export const getProdDetail = async () => {
  let data = await axios.post(
    `https://arya-erp.in/simranapi/workorder/getProdDetail.php`,

    {
      style_name: "Genz",
    }
  );
  // console.log(`inside getProdDetail function`);
  // console.log(data.data);
  return data.data;
};
const WorkOrderCom = ({ data }) => {
  // const [data, setData] = useState({});
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const details = await getProdDetail();
  //     setData(details);
  //   };
  //   fetchData();
  // }, []);

  console.log(`inside getProdDetail function inside workordercom`);
  console.log(data);

  return (
    <div>
      <CardGroup className="mainscrollable">
        <Card fluid style={{ padding: "25px" }}>
          <StyleDisplay data={data?.pic} />
          <SizeDisplay data={data?.sz} />
          <BOMDisplay data={data?.bom} />
          <ProcessDisplay data={data?.mfg} bomData={data?.bom} />
        </Card>
      </CardGroup>
      {/* iside wokkcvv */}
    </div>
  );
};

export default WorkOrderCom;
