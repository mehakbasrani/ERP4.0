import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Card, CardGroup } from "semantic-ui-react";

export default function MatMgmt() {
  return (
    <>
      <div>
        <CardGroup itemsPerRow={3}>
          <Card className="modulecard" as={Link} to="grn">
            <Card.Description textAlign="center" style={{ margin: "30px" }}>
              <Card.Header as="h3">GRN</Card.Header>
              <Card.Description>
                Listing of all Customers and Vendors.
              </Card.Description>
            </Card.Description>
          </Card>

          <Card className="modulecard" as={Link} to="gsn">
            <Card.Description textAlign="center" style={{ margin: "30px" }}>
              <Card.Header as="h3">GSN</Card.Header>
              <Card.Description>
                Listing of all Units of Measurement.
              </Card.Description>
            </Card.Description>
          </Card>

          <Card className="modulecard" as={Link} to="purchaseorder">
            <Card.Description textAlign="center" style={{ margin: "30px" }}>
              <Card.Header as="h3">Purchase Order</Card.Header>
              <Card.Description>
                Listing of all Units of Measurement.
              </Card.Description>
            </Card.Description>
          </Card>
        </CardGroup>
      </div>
      <Outlet />
    </>
  );
}
