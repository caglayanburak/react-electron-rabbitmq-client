import React from 'react';
import { TableRow, withStyles, TableCell, Icon, Badge } from '@material-ui/core';

export default function TableHeader(props: { response: string | any[]; }) {
    const StyledTableCell = withStyles(theme => ({
        root: {
            color: 'white',
            backgroundColor: 'transparent'
        },
        head: {
            backgroundColor: 'transparent',
            color: 'white',
            fontWeight: 'bold'
        },
        body: {
            fontSize: 12,
        },
    }))(TableCell);

    const StyledTableRow = withStyles(theme => ({
        root: {
            backgroundColor: 'transparent',
            '&:nth-of-type(odd)': {
                backgroundColor: 'transparent',
                color: 'white'
            },
        },
    }))(TableRow);

    return (
        <StyledTableRow>
            <StyledTableCell>Queue Name</StyledTableCell>
            <StyledTableCell align="right">
                <Badge badgeContent={props.response?.length} color="error">
                    Error Messages</Badge></StyledTableCell>
            <StyledTableCell align="right">Requeue</StyledTableCell>
            <StyledTableCell align="right">Purge</StyledTableCell>
        </StyledTableRow>
    );
}
