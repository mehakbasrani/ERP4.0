import React from 'react'
import { Form } from 'react-router-dom'
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




export default function Stylepicture(){
    return(
        <>
          <div className='item_form'>
                <Form method="post">
                <div className='top_style'>
                    <label htmlFor="">Style :</label>
                    <Input placeholder='Style Id' />
                </div>
                <div className='styleHead'>
                    <h6 className='pl_10'>Pictures</h6>
                    </div>
                    <div className='table-responsive'>
                    <Table celled className='style_table table'>
                        <TableBody>
                            <TableRow className='tableRow_flex'>
                                <TableCell >1.</TableCell>
                                <TableCell>Main Pic</TableCell>
                                <TableCell ><Input type='file' className='file_field' name='file'/></TableCell>
                                <TableCell><a href="#" className='upload_btn'>Upload</a></TableCell>
                            </TableRow>
                            <TableRow className='tableRow_flex'>
                                <TableCell >2.</TableCell>
                                <TableCell>Supplier Pic</TableCell>
                                <TableCell ><Input type='file' className='file_field' name='file'/></TableCell>
                                <TableCell><a href="#" className='upload_btn'>Upload</a></TableCell>
                            </TableRow>
                            <TableRow className='tableRow_flex'>
                                <TableCell >3.</TableCell>
                                <TableCell>Technical Pic</TableCell>
                                <TableCell ><Input type='file' className='file_field' name='file'/></TableCell>
                                <TableCell><a href="#" className='upload_btn'>Upload</a></TableCell>
                            </TableRow>
                            <TableRow className='tableRow_flex'>
                                <TableCell >4.</TableCell>
                                <TableCell>Sketch</TableCell>
                                <TableCell ><Input type='file' className='file_field' name='file'/></TableCell>
                                <TableCell><a href="#" className='upload_btn'>Upload</a></TableCell>
                            </TableRow>
                           
                           
                        </TableBody>
                    </Table>
                    </div>
                    <div className='text-center mt-4'>
                        <a href='#' className='mr_10 upload_btn'>Submit</a>
                        <a href='#' className='upload_btn'>cancel</a>
                    </div>
                </Form>
            </div>

        </>
    )
}