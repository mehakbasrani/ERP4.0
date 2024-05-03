import { useState } from "react";
//import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Grid, Icon } from "semantic-ui-react";
import Menubar from "./Components/Menu";
import SidebarCom from "./Components/Sidebar";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function RootLayout() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("dashboard");
  const [visible, setVisible] = useState(false);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    setVisible(true);
    navigate(`${name}`);
    e.stopPropagation();
  };

  return (
    <>
      <ToastContainer />
      <Grid>
        <Grid.Row>
          <Grid.Column
            width={1}
            color="red"
            textAlign="center"
            verticalAlign="middle"
          >
            <Icon
              name="th"
              size="big"
              onClick={() => setVisible(!visible)}
            ></Icon>
          </Grid.Column>
          <Grid.Column width={15}>
            <Menubar
              activeItem={activeItem}
              handleItemClick={handleItemClick}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} style={{ height: "1000px" }}>
            <SidebarCom
              visible={visible}
              change={setVisible}
              sidemenu2={activeItem}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
