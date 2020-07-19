import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar, Toolbar, IconButton, Typography, Paper, Button, TextField, InputAdornment
} from '@material-ui/core';
import CbAdvancedOption from '../Components/CbAdvancedOption';
import { useHistory } from 'react-router-dom';
import { AttachFile, Menu } from '@material-ui/icons/';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#f3f3f2',
    },
    paper: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(3),
        margin: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    input: {
        display: 'none',
    },
}));

export default function HomeView(props) {

    const classes = useStyles();

    const { valueCb, setValueCb1, setValueCb2, setValueCb3
        , setValueCb4, setValueCb5, setValueCb6, setValueCb7, setValueCb8, setValueCb9,
         conflictAdvOption, setImportedJson, setIsImported } = props;

    const [jsonPath, setJsonPath] = useState("");
    const [jsonFile, setJsonFile] = useState("");

    let history = useHistory();

    const readJson = (jsonFile) => {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(jsonFile);
    }
    
    const onReaderLoad = (event) => {
        var obj = JSON.parse(event.target.result);
        setImportedJson(obj);
        setIsImported(true);
    }

    return (
        <div className={classes.root}>

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        KARNAK
                </Typography>
                </Toolbar>
            </AppBar>

            <Paper className={classes.paper} elevation={3}>
                <h3>Creation of a new anonymization profile</h3>

                <p>You can already select options for your anonymization rules from the suggestions below.
                You can always change your choices in the settings on the next page.
                    By not checking any box, all fields will be anonymized according to a basic profile. </p>

                <CbAdvancedOption valueCb={valueCb}
                    setValueCb1={setValueCb1}
                    setValueCb2={setValueCb2}
                    setValueCb3={setValueCb3}
                    setValueCb4={setValueCb4}
                    setValueCb5={setValueCb5}
                    setValueCb6={setValueCb6}
                    setValueCb7={setValueCb7}
                    setValueCb8={setValueCb8}
                    setValueCb9={setValueCb9}
                    conflictAdvOption={conflictAdvOption} />

                <p>If you cannot check a box, it means that another one is already checked and applies anonymization rules to the same fields.</p>

                <Button variant="contained" color="primary" onClick={() => {
                    history.push("/editPage/")
                }}>
                    Create
                </Button>

                <h3>Importation of an existing anonymization profile</h3>

                <div style={{display:'flex', flexDirection:'row', verticalAlign:'middle'}}>

                    <input
                        accept="*.json"
                        className={classes.input}
                        id="raised-button-file"
                        type="file"
                        value={jsonPath}
                        onChange={(event) => {
                            setJsonFile('');
                            setJsonPath(event.target.value);
                            setJsonFile(event.target.files[0]);
                        }}
                    />
                    <TextField
                        style={{display:'flex', flexDirection:'row'}}
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AttachFile />
                                </InputAdornment>
                            ),
                        }}
                        label="Select file in Json format"
                        value={jsonPath}
                    />

                    <label htmlFor="raised-button-file">
                        <Button variant="contained" component="span" style={{height:'98%'}}>
                            Browse ...
                        </Button>
                    </label>

                </div>

                <Button variant="contained" color="primary" style={{marginTop: '1%'}} onClick={() => {
                    readJson(jsonFile);
                    history.push("/editPage/");
                }}>
                    Import profile
                </Button>

            </Paper>

        </div>
    )

}