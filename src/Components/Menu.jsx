/* eslint-disable react/prop-types */

import { Menu } from "semantic-ui-react";

export default function Menubar({ activeItem, handleItemClick }) {
  return (
    <Menu>
      <Menu.Item
        name="dashboard"
        active={activeItem === "dashboard"}
        onClick={handleItemClick}
      >
        Dashboard
      </Menu.Item>
      <Menu.Item
        name="sales"
        active={activeItem === "sales"}
        onClick={handleItemClick}
      >
        Sales
      </Menu.Item>
      <Menu.Item
        name="workorder"
        active={activeItem === "workorder"}
        onClick={handleItemClick}
      >
        Work Order
      </Menu.Item>
      <Menu.Item
        name="material"
        active={activeItem === "material"}
        onClick={handleItemClick}
      >
        Material
      </Menu.Item>
      <Menu.Item
        name="finance"
        active={activeItem === "finance"}
        onClick={handleItemClick}
      >
        Finance
      </Menu.Item>
      <Menu.Item
        name="master"
        active={activeItem === "master"}
        onClick={handleItemClick}
      >
        Master
      </Menu.Item>
    </Menu>
  );
}
