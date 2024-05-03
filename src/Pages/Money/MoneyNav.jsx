import React from "react";
import { Link } from "react-router-dom";
import { Card, CardGroup } from "semantic-ui-react";

export default function MasterIndex() {
  return (
    <div>
      <CardGroup itemsPerRow={3}>
        <Card className="modulecard" as={Link} to="payment">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Payment</Card.Header>
            <Card.Description>
              Listing of all Customers and Vendors.
            </Card.Description>
          </Card.Description>
        </Card>

        <Card className="modulecard" as={Link} to="reciept">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Reciept</Card.Header>
            <Card.Description>
              Listing of all Units of Measurement.
            </Card.Description>
          </Card.Description>
        </Card>

        <Card className="modulecard" as={Link} to="journal">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Journal</Card.Header>
            <Card.Description>
              Listing of all Units of Measurement.
            </Card.Description>
          </Card.Description>
        </Card>

        <Card className="modulecard" as={Link} to="contra">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Contra</Card.Header>
            <Card.Description>Listing of all Activities.</Card.Description>
          </Card.Description>
        </Card>

        <Card className="modulecard" as={Link} to="sales">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Sales</Card.Header>
            <Card.Description>Listing of all the Processes.</Card.Description>
          </Card.Description>
        </Card>

        <Card className="modulecard" as={Link} to="purchase">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Purchase</Card.Header>
            <Card.Description>Listing of all Locations.</Card.Description>
          </Card.Description>
        </Card>

        <Card className="modulecard" as={Link} to="creditnote">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Credit Note</Card.Header>
            <Card.Description>
              Listing of all Units of Measurement.
            </Card.Description>
          </Card.Description>
        </Card>

        <Card className="modulecard" as={Link} to="debitnote">
          <Card.Description textAlign="center" style={{ margin: "30px" }}>
            <Card.Header as="h3">Debit Note</Card.Header>
            <Card.Description>
              Listing of all Units of Measurement.
            </Card.Description>
          </Card.Description>
        </Card>
      </CardGroup>
    </div>
  );
}
