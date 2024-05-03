import React from 'react'
import { TabPane, Tab,
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from 'semantic-ui-react'

const panes = [
  {
    menuItem: 'Tab 1',
    render: () => <TabPane attached={false}>
    <div className='table-responsive process' >
    <Table celled selectable>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>Compony Name</TableHeaderCell>
        <TableHeaderCell>Contact person</TableHeaderCell>
        <TableHeaderCell>City</TableHeaderCell>
        <TableHeaderCell>State</TableHeaderCell>
        <TableHeaderCell>Pin</TableHeaderCell>
        <TableHeaderCell>Role</TableHeaderCell>
        <TableHeaderCell>Email</TableHeaderCell>
        <TableHeaderCell>Landline</TableHeaderCell>
        <TableHeaderCell>Mobile</TableHeaderCell>
        <TableHeaderCell>GST</TableHeaderCell>
        <TableHeaderCell>Bank</TableHeaderCell>
        <TableHeaderCell>Account</TableHeaderCell>
        <TableHeaderCell>IFSC</TableHeaderCell>
        <TableHeaderCell>Opening Balance</TableHeaderCell>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow>
        <TableCell>John</TableCell>
        <TableCell>No Action</TableCell>
        <TableCell>None</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jamie</TableCell>
        <TableCell>Approved</TableCell>
        <TableCell>Requires call</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jill</TableCell>
        <TableCell>Denied</TableCell>
        <TableCell>None</TableCell>
      </TableRow>
      <TableRow >
        <TableCell>John</TableCell>
        <TableCell>No Action</TableCell>
        <TableCell>None</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jamie</TableCell>
        <TableCell >Approved</TableCell>
        <TableCell >Requires call</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jill</TableCell>
        <TableCell >Denied</TableCell>
        <TableCell>None</TableCell>
      </TableRow>
    </TableBody>
  </Table>
  </div>
    </TabPane>,
  },
  {
    menuItem: 'Tab 2',
    render: () => <TabPane attached={false}>
        <Table celled selectable>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
        <TableHeaderCell>Notes</TableHeaderCell>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow>
        <TableCell>John</TableCell>
        <TableCell>No Action</TableCell>
        <TableCell>None</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jamie</TableCell>
        <TableCell>Approved</TableCell>
        <TableCell>Requires call</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jill</TableCell>
        <TableCell>Denied</TableCell>
        <TableCell>None</TableCell>
      </TableRow>
      <TableRow >
        <TableCell>John</TableCell>
        <TableCell>No Action</TableCell>
        <TableCell>None</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jamie</TableCell>
        <TableCell >Approved</TableCell>
        <TableCell >Requires call</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jill</TableCell>
        <TableCell >Denied</TableCell>
        <TableCell>None</TableCell>
      </TableRow>
    </TableBody>
  </Table>
    </TabPane>,
  },
  {
    menuItem: 'Tab 3',
    render: () => <TabPane attached={false}>
        <Table celled selectable>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
        <TableHeaderCell>Notes</TableHeaderCell>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow>
        <TableCell>John</TableCell>
        <TableCell>No Action</TableCell>
        <TableCell>None</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jamie</TableCell>
        <TableCell>Approved</TableCell>
        <TableCell>Requires call</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jill</TableCell>
        <TableCell>Denied</TableCell>
        <TableCell>None</TableCell>
      </TableRow>
      <TableRow >
        <TableCell>John</TableCell>
        <TableCell>No Action</TableCell>
        <TableCell>None</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jamie</TableCell>
        <TableCell >Approved</TableCell>
        <TableCell >Requires call</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jill</TableCell>
        <TableCell >Denied</TableCell>
        <TableCell>None</TableCell>
      </TableRow>
    </TableBody>
  </Table>
    </TabPane>,
  },
]

const Tabform = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
)

export default Tabform