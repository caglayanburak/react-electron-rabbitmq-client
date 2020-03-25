import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Card, CardContent, CardActions, Grid, TextField } from '@material-ui/core';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        color: `black`,
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '35ch',
        },
    },
    paper: {
        position: 'absolute',
        width: 400,
        color: 'black',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #cecece',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal() {
    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [regexName, setRegexName] = React.useState("");
    const [regex, setRegex] = React.useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
  
    const save = () => {
        let regexList = window.localStorage.getItem('regexList');
        alert(regexList);
        let regexList1 = new Array<any>();
        if (regexList) {
            regexList1 = JSON.parse(window.localStorage.getItem('regexList'));
        }

        regexList1.push({ regexName: regexName, regex: regex });
        window.localStorage.setItem('regexList', JSON.stringify(regexList1));
    }

    return (
        <div>
            <Button type="button" onClick={handleOpen} variant="outlined" color="primary">
                New
      </Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h1 color="error">New Regex</h1>
                    <Card>
                        <CardContent>
                            <form className={classes.root} noValidate autoComplete="off">
                                <Grid container>
                                    <Grid item md={12}>
                                        <TextField id="outlined-basic" label="Name" variant="outlined" value={regexName} onChange={e => setRegexName(e.target.value)} />
                                    </Grid>
                                    <br />
                                    <Grid item md={12}>
                                        <TextField id="outlined-basic" label="Regex" variant="outlined" value={regex} onChange={e => setRegex(e.target.value)} />
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="outlined" color="primary" onClick={() => save()}>Save</Button>
                        </CardActions>
                    </Card>
                </div>
            </Modal>
        </div>
    );
}