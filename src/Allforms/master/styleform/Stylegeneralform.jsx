import React from 'react'
import { Form } from 'react-router-dom'
// import '../commoncss/common.css'
// import './styleform.css'
import '../../master/master-common.css'

import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Icon,
    Input,
    Table,
    Button,
    Select,
} from 'semantic-ui-react'

const dropData = [
    { key: 'supplier', value: 'supplier', text: 'supplier' },
    { key: 'vender', value: 'vender', text: 'venders' },
    { key: 'Buyer', value: 'Buyer', text: 'Buyer' }
]



export default function Stylegeneralform() {
    return (
        <>
            <div className='item_form'>
                <Form method="post">
                <div className='top_style'>
                    <label htmlFor="">Style :</label>
                    <Input placeholder='Style Id' />
                </div>
                    <h6 className='pl_10'>General</h6>
                    <Table celled striped>
                        <TableBody>
                            <TableRow>
                                <TableCell ><Input placeholder='Style Name*' name='style_name' className='form__input' /></TableCell>
                                <TableCell><Input  name='ref_name' placeholder='Ref Name*' /></TableCell>
                                <TableCell ><Input name='season' placeholder='Season*' /></TableCell>
                                <TableCell><Input name='style_categor' placeholder='Category*' /></TableCell>
                            </TableRow>
                            <TableRow>
                                
                                <TableCell><Input name='designer' placeholder='Designer*' /></TableCell>
                                <TableCell><Input name='misc1' placeholder='MISC 1*' /></TableCell>
                                <TableCell ><Input name='misc2' placeholder='MISC 2*' /></TableCell>
                                <TableCell><Input name='misc3' placeholder='MISC 3*' /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell ><Input name='misc4' placeholder='MISC 4*' /></TableCell>
                            </TableRow>
                           
                           
                        </TableBody>
                    </Table>
                    <div className='text-center'>
                        <Button primary className='mr_10'>Submit</Button>
                        <Button primary>cancel</Button>
                    </div>
                </Form>
            </div>

        </>
    )
}
