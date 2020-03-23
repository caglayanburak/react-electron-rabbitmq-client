import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, makeStyles } from '@material-ui/core';

export default function Footer() {
    const useStyles = makeStyles(theme => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
          color: 'white'
        }
      }));
      const classes = useStyles();
      
    return (
        <div>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Enviroment</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                >
                    <MenuItem value={10}>Dev</MenuItem>
                    <MenuItem value={20}>Stage</MenuItem>
                    <MenuItem value={30}>Prod</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Refresh</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                >
                    <MenuItem value={10}>5 seconds</MenuItem>
                    <MenuItem value={20}>30 seconds</MenuItem>
                    <MenuItem value={30}>5 minutes</MenuItem>
                    <MenuItem value={30}>none</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
