import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";
import General from "./General";

export default function Product() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("general");
  const [visible, setVisible] = useState(false);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    setVisible(true);
    navigate(`${name}`);
    e.stopPropagation();
  };
  useEffect(() => {
    navigate("general");
  }, []);
  return (
    <>
      <Menu tabular>
        <Menu.Item
          name="general"
          active={activeItem === "general"}
          onClick={handleItemClick}
        >
          General
        </Menu.Item>
        <Menu.Item
          name="bom"
          active={activeItem === "bom"}
          onClick={handleItemClick}
        >
          BOM
        </Menu.Item>
        <Menu.Item
          name="manufacturing"
          active={activeItem === "manufacturing"}
          onClick={handleItemClick}
        >
          Manufacturing
        </Menu.Item>
        <Menu.Item
          name="picture"
          active={activeItem === "picture"}
          onClick={handleItemClick}
        >
          Pictures
        </Menu.Item>
        <Menu.Item
          name="operation"
          active={activeItem === "operation"}
          onClick={handleItemClick}
        >
          Operations
        </Menu.Item>
        <Menu.Item
          name="specification"
          active={activeItem === "specification"}
          onClick={handleItemClick}
        >
          Specifications
        </Menu.Item>
      </Menu>
      <Segment basic>
        <Outlet />
      </Segment>
    </>
  );
}
