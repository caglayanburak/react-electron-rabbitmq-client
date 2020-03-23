import React from 'react';
import { Button, TableRow, withStyles, TableCell, Icon, makeStyles } from '@material-ui/core';

export default function TableItem(props) {
    const useStyles = makeStyles(theme => ({
        requeueButton: {
          color: 'white',
          border: '1px solid white'
        }
      }));
      const classes = useStyles();

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

    function dialogOpen(name:any) {
        props.dialogOpen(name);
    }

    function requeue(name:any) {
        props.requeue(name);
    }

    return (
        <StyledTableRow key={props.queue.name}>
            <StyledTableCell component="th" scope="row">
                {props.queue.name}
            </StyledTableCell>
            <StyledTableCell align="right">
                {props.queue.messages}
            </StyledTableCell>
            <StyledTableCell align="right">
                <Button variant="outlined" className={classes.requeueButton} color="primary" onClick={() => requeue(props.queue.name)}>
                        <Icon className="fa fa-recycle" />
                    </Button>
            </StyledTableCell>
            <StyledTableCell align="right">
                <Button variant="outlined" color="secondary" onClick={() => dialogOpen(props.queue.name)}>
                        <Icon className="fa fa-trash" />
                    </Button>
            </StyledTableCell>
        </StyledTableRow>
    );
}
