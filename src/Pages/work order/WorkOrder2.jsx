import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardGroup,
  CardHeader,
  Input,
} from "semantic-ui-react";
import {
  MasterUrl,
  records_per_page,
} from "../../Consts/Master/MasterUrl.const";
import { getPageData } from "../../Double/fun";

const size = await getPageData(
  axios,
  MasterUrl.getPageData,
  records_per_page,
  1,
  "size"
);

export const WorkOrder2 = () => {
  const [data, setData] = useState(size);
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  const fetchData = (value) => {
    const results = data.filter((user) => {
      return (
        value &&
        user &&
        user.size_name &&
        user.size_name.toLowerCase().includes(value)
      );
    });
    // console.log(results);
    setResult(results);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
  console.log(selectedSize);
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    if (selectedSize && selectedSize.size_nos) {
      const count = parseInt(selectedSize.size_nos);
      const newQuantities = Array.from(
        { length: count },
        (_, index) => index + 1
      ).map(() => "");
      setQuantities(newQuantities);
    }
  }, [selectedSize]);
  const [addQty, setAddQty] = useState();
  const handleQuantityChange = (e) => {
    const { name, value } = e.target;

    setAddQty({
      ...values,
      [name]: value,
    });
  };

  return (
    <>
      <div id="sidebar">
        Size:
        <Input
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div>
        {result.map((result, id) => {
          return (
            <div onClick={(e) => setSelectedSize(result)}>
              {result.size_name}
            </div>
          );
        })}
      </div>
      <div id="detail">
        {selectedSize && (
          <CardGroup itemsPerRow={3}>
            {selectedSize.sizes?.split("**").map((size) => (
              <Card key={size} fluid>
                <CardContent>
                  <CardHeader>{size}</CardHeader>
                </CardContent>
              </Card>
            ))}
          </CardGroup>
        )}
        {quantities.map((index) => (
          <Input
            key={index}
            type="number"
            onChange={handleQuantityChange}
            value={addQty}
            name={`${index + 1}`}
            placeholder={`Enter quantity`}
          />
        ))}
      </div>
    </>
  );
};
