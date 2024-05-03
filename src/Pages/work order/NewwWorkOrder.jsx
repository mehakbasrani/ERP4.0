import React, { useState } from "react";
import { Input, Tab } from "semantic-ui-react";
import { WorkOrder2 } from "./WorkOrder2";
import WorkOrder3 from "./WorkOrder3";

const NewwWorkOrder = () => {
  const [numTabs, setNumTabs] = useState();
  const [panes, setPanes] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setNumTabs(0);
      setPanes([]);
    } else {
      const intValue = parseInt(value);
      if (intValue > 0) {
        setNumTabs(intValue);
        const newPanes = Array.from({ length: intValue }, (_, index) => ({
          menuItem: `Tab ${index + 1}`,
          render: () => (
            <Tab.Pane>
              <WorkOrder3 />
            </Tab.Pane>
          ),
        }));
        setPanes(newPanes);
      }
    }
  };

  return (
    <div>
      <Input
        // type="number"
        value={numTabs}
        onChange={handleInputChange}
        placeholder="Enter number of tabs..."
      />
      <Tab panes={panes} />
    </div>
  );
};

export default NewwWorkOrder;
