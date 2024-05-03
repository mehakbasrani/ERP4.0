import React from "react";
import { Card, CardGroup } from "react-bootstrap";
import {
  CardContent,
  CardDescription,
  Image,
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";

const StyleDisplay = ({ data }) => {
  console.log(data);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Style: {data[0]?.style_name}</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <CardGroup>
              <Card>
                <CardContent textAlign="center">
                  <Image size="small" src="/defaultimg.jpeg" />
                  <CardDescription>{data[0]?.frontpic}</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardContent textAlign="center">
                  <Image size="small" src="/defaultimg.jpeg" />
                  <CardDescription>{data[0]?.backpic}</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardContent textAlign="center">
                  <Image size="small" src="/defaultimg.jpeg" />
                  <CardDescription>{data[0]?.sketch}</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardContent textAlign="center">
                  <Image size="small" src="/defaultimg.jpeg" />
                  <CardDescription>{data[0]?.stylecard}</CardDescription>
                </CardContent>
              </Card>
            </CardGroup>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default StyleDisplay;
