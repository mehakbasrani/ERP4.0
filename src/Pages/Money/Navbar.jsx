import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function AllProductView() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState();
  const [visible, setVisible] = useState(false);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    setVisible(true);
    navigate(`/finance/${name}`);
    e.stopPropagation();
  };

  return (
    <>
      <Menu>
        <Menu.Item
          name="payment"
          active={activeItem === "payment"}
          onClick={handleItemClick}
        >
          Payment
        </Menu.Item>
        <Menu.Item
          name="reciept"
          active={activeItem === "reciept"}
          onClick={handleItemClick}
        >
          Reciept
        </Menu.Item>
        <Menu.Item
          name="journal"
          active={activeItem === "journal"}
          onClick={handleItemClick}
        >
          Journal
        </Menu.Item>
        <Menu.Item
          name="contra"
          active={activeItem === "contra"}
          onClick={handleItemClick}
        >
          Contra
        </Menu.Item>
        <Menu.Item
          name="sales"
          active={activeItem === "sales"}
          onClick={handleItemClick}
        >
          Sales
        </Menu.Item>
        <Menu.Item
          name="purchase"
          active={activeItem === "purchase"}
          onClick={handleItemClick}
        >
          Purchase
        </Menu.Item>
        <Menu.Item
          name="creditnote"
          active={activeItem === "creditnote"}
          onClick={handleItemClick}
        >
          Credit Note
        </Menu.Item>
        <Menu.Item
          name="debitnote"
          active={activeItem === "debitnote"}
          onClick={handleItemClick}
        >
          Debit Note
        </Menu.Item>
      </Menu>
    </>
  );
}
