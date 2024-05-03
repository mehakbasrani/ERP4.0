import React, { useState } from "react";
import { Form, useSubmit } from "react-router-dom";
import { Card, CardGroup, GridRow, Input } from "semantic-ui-react";
import Autocomplete from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";

export const getProdDetail = async (axios, style_name) => {
  let data = await axios.post(
    `https://arya-erp.in/simranapi/workorder/getProdDetail.php`,

    {
      style_name: style_name,
    }
  );
  console.log(`inside getProdDetail function`);
  console.log(data.data);
  return data.data;
};

const Formm = ({ contacts, urlsearch }) => {
  const submit = useSubmit();
  const [ipFocused, setIpFocused] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemClick = (name) => {
    if (!selectedItems.includes(name)) {
      setSelectedItems([...selectedItems, name]);
    }
  };

  const [value, setValue] = useState("");
  // const [items, setItems] = useState(["apple", "banana", "orange", "apricot"]);
  const [items, setItems] = useState(contacts);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  // console.log(items);
  const handleSelect = (newValue) => {
    setValue(newValue);
  };
  // console.log(value);

  return (
    <>
      <GridRow>
        <div id="sidebar">
          <div>
            <Form id="search-Form" role="search">
              Product:
              <Input
                onFocus={() => setIpFocused(true)}
                // onBlur={() => setIpFocused(false)}
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="search"
                defaultValue={urlsearch}
                onChange={(event) => {
                  submit(event.currentTarget.form);
                }}
              />
              <Input onChange={getProdDetail()} />
            </Form>
          </div>
          <nav>
            {contacts.length && ipFocused ? (
              <ul>
                {contacts?.map((contact) => (
                  <>
                    <li
                      key={contact.id}
                      onClick={() => handleItemClick(contact.style_name)}
                    >
                      {contact.style_name}
                    </li>
                  </>
                ))}
              </ul>
            ) : null}
          </nav>
        </div>
        <div id="detail">
          {selectedItems.length > 0 && (
            <Card.Group>
              {selectedItems.map((name) => (
                <>
                  <CardGroup>
                    <Card key={name}>
                      <Card.Content>
                        <Card.Header>{name}</Card.Header>
                      </Card.Content>
                    </Card>
                    <Card>
                      <Card.Content>
                        <Card.Header>Size</Card.Header>
                      </Card.Content>
                    </Card>
                    <Card>
                      <Card.Content>
                        <Card.Header>Quantity</Card.Header>
                      </Card.Content>
                    </Card>
                    <Card>
                      <Card.Content>
                        <Card.Header>BOM</Card.Header>
                      </Card.Content>
                    </Card>
                    <Card>
                      <Card.Content>
                        <Card.Header>Manufacturing</Card.Header>
                      </Card.Content>
                    </Card>
                  </CardGroup>
                </>
              ))}
            </Card.Group>
          )}
        </div>
      </GridRow>
    </>
  );
};

export default Formm;
