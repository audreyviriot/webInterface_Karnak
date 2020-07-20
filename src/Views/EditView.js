import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListAttributes from '../Components/listAttributes';
import CloseIcon from '@material-ui/icons/Close';
import {
    TextField, AppBar, Toolbar, IconButton,
    Typography, Button, RadioGroup, FormControlLabel, Radio, FormControl,
    Divider, Fab, Modal
} from '@material-ui/core';
import { Done } from '@material-ui/icons/';
import CbAdvancedOption from '../Components/CbAdvancedOption';
import ColorRuleBox from '../Components/ColorRuleBox';
import { writeFile } from '../Functions/WriteJson';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#f3f3f2',
    },
    paper: {
        padding: theme.spacing(3),
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    paperSettings: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(3),
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    paperColor: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(3),
        marginRight: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    divider: {
        margin: theme.spacing(3),
    },
    listItem: {
        padding: theme.spacing(3),
    },
    appBar: {
        marginBottom: theme.spacing(2),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default function EditView(props) {

    const classes = useStyles();
    let history = useHistory();

    const [settingDisplay, setSettingDisplay] = useState("none");
    const [colorBtn, setColorBtn] = useState("inherit");
    const [searchTerm, setSearchTerm] = useState('');
    const [nameFile, setNameFile] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    //Checkboxes for research 
    const [radioChecked, setRadioChecked] = useState("module");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleRadio = (event) => {
        setRadioChecked(event.target.value);
    }

    const { listAttributes, valueCb, setValueCb1, setValueCb2, setValueCb3
        , setValueCb4, setValueCb5, setValueCb6, setValueCb7, setValueCb8,
        setValueCb9, conflictAdvOption, propertiesAdvOpt, setIsImported, 
        setImportedJson, setIsCancel } = props;

    return (
        <div className={classes.root}>

            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={() => {
                        setImportedJson();
                        setValueCb1(false);
                        setValueCb2(false);
                        setValueCb3(false);
                        setValueCb4(false);
                        setValueCb5(false);
                        setValueCb6(false);
                        setValueCb7(false);
                        setValueCb8(false);
                        setValueCb9(false);
                        setIsImported(false);
                        setIsCancel(true);
                        history.push("/");
                    }}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        KARNAK
                </Typography>
                    <Button color={colorBtn} onClick={() => {
                        if (settingDisplay === "") {
                            setSettingDisplay("none");
                            setColorBtn("inherit");
                        } else {
                            setSettingDisplay("");
                            setColorBtn("secondary");
                        }
                    }}>
                        Settings
                </Button>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3} style={{ flexWrap: 'wrap', display: 'flex' }}>
                <Grid item xs={12} style={{ display: settingDisplay }}>
                    <Paper id='paperSettings' className={classes.paper} elevation={3} style={{ display: 'flex', flexDirection: 'row' }}>
                        <div>
                            <Typography variant="h6" className={classes.title}>
                                Anonymization options :
                            </Typography>

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
                                conflictAdvOption={conflictAdvOption}
                            />
                        </div>

                        <Divider orientation="vertical" flexItem className={classes.divider} style={{ flexGrow: 1 }} />

                        <div>

                            <Typography variant="h6" className={classes.title} style={{ margin: '3px' }}>
                                Color code :
                            </Typography>

                            <ColorRuleBox />

                        </div>

                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={3} style={{ display: 'flex', flexDirection: 'row' }}>

                        <TextField
                            label="Seach by attribute name, tag/ID or module name"
                            style={{ width: '73%' }}
                            value={searchTerm}
                            onChange={handleChange}
                        />

                        <FormControl component="fieldset">
                            <RadioGroup aria-label="dicomHierarchy" name="dicomHierarchy" value={radioChecked} onChange={handleRadio} row>
                                <FormControlLabel value="module" control={<Radio color="primary" />} label="Module name" labelPlacement="end" />
                                <FormControlLabel value="tagid" control={<Radio color="primary" />} label="Tag/ID" labelPlacement="end" />
                                <FormControlLabel value="attribute" control={<Radio color="primary" />} label="Attribute name" labelPlacement="end" />
                            </RadioGroup>
                        </FormControl>

                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={3}>
                        <ListAttributes listAttributes={listAttributes} searchTerm={searchTerm.toLowerCase()} valueRadio={radioChecked}
                            valueCb={valueCb} conflictAdvOption={conflictAdvOption} propertiesAdvOpt={propertiesAdvOpt} />
                    </Paper>
                </Grid>
                <Fab variant="extended" color="primary" style={{ position: 'fixed', bottom: '2%', right: '2%', zIndex: 9999 }}
                    onClick={() => {
                        setIsOpen(true);
                    }}>
                    <Done className={classes.extendedIcon} />
                    Save profile
                </Fab>
                <Modal
                    open={isOpen}
                    onClose={() => {
                        setIsOpen(false);
                    }}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className={classes.modal}>
                    <Paper className={classes.paper}>
                        <h3>Save your anonymization profile</h3>
                        <TextField
                            label="Profile name"
                            value={nameFile}
                            onChange={(event) => {
                                setNameFile(event.target.value);
                            }}
                        />
                        <Button onClick={() => {
                            writeFile(listAttributes, nameFile)
                        }}>
                            Save
                        </Button>
                    </Paper>
                </Modal>
            </Grid>

        </div>
    )

}