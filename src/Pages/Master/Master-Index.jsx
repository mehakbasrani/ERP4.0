import React from "react";
import { Link } from "react-router-dom";
import { Card, CardGroup } from "semantic-ui-react";

export default function MasterIndex() {
  return (
    <div>
      <CardGroup itemsPerRow={3}>
        <Card className="modulecard" as={Link} to="party">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Party</Card.Header>
            <Card.Description>
              Listing of all Customers and Vendors.
            </Card.Description>
          </Card.Description>
        </Card>

        <Card className="modulecard" as={Link} to="unit">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Unit</Card.Header>
            <Card.Description>
              Listing of all Units of Measurement.
            </Card.Description>
          </Card.Description>
        </Card>

        <Card className="modulecard" as={Link} to="item">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Item</Card.Header>
            <Card.Description>
              Listing of all Units of Measurement.
            </Card.Description>
          </Card.Description>
        </Card>

        <Card className="modulecard" as={Link} to="activity">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Activity</Card.Header>
            <Card.Description>Listing of all Activities.</Card.Description>
          </Card.Description>
        </Card>

        <Card className="modulecard" as={Link} to="process">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Process</Card.Header>
            <Card.Description>Listing of all the Processes.</Card.Description>
          </Card.Description>
        </Card>

        <Card className="modulecard" as={Link} to="location">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Location</Card.Header>
            <Card.Description>Listing of all Locations.</Card.Description>
          </Card.Description>
        </Card>

        <Card className="modulecard" as={Link} to="group">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Group</Card.Header>
            <Card.Description>
              Listing of all Units of Measurement.
            </Card.Description>
          </Card.Description>
        </Card>

        <Card className="modulecard" as={Link} to="size">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Size</Card.Header>
            <Card.Description>
              Listing of all Units of Measurement.
            </Card.Description>
          </Card.Description>
        </Card>

        <Card className="modulecard" as={Link} to="product">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Product</Card.Header>
            <Card.Description>
              Listing of all Units of Measurement.
            </Card.Description>
          </Card.Description>
        </Card>
      </CardGroup>
    </div>
  );
}
