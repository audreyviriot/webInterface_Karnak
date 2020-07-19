import React from 'react';
import TreeItem from '@material-ui/lab/TreeItem';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ButtonRules from './buttonRules';

TreeItemCustom.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired
};

const useTreeItemStyles = makeStyles(theme => ({
    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        "$expanded > &": {
            fontWeight: theme.typography.fontWeightRegular
        }
    },
    group: {
        marginLeft: 0,
        "& $content": {
            paddingLeft: theme.spacing(2)
        }
    },
    expanded: {},
    label: {
        fontWeight: "inherit",
    },
    labelRoot: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0.5, 0)
    },
    labelIcon: {
        marginRight: theme.spacing(1)
    },
    labelText: {
        fontWeight: "inherit",
        flexGrow: 1
    }
}));

export default function TreeItemCustom(props) {

    const classes = useTreeItemStyles();

    const {
        labelText,
        labelIcon: LabelIcon,
        labelInfo,
        color,
        bgColor,
        attribute,
        listException,
        setListException,
        id,
        ...other
    } = props;

    return (

        <TreeItem

            label={
                <div className={classes.labelRoot} style={{ color: color }}>
                    <LabelIcon color="inherit" className={classes.labelIcon} />
                    <Typography variant="body2" className={classes.labelText}>
                    {id} - {labelText}
                    </Typography>
                    <ButtonRules color={color} attribute={attribute} listException={listException}
                        setListException={setListException} />
                </div>
            }
            style={{
                color: { color },
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                group: classes.group,
                label: classes.label
            }}
            {...other}
        />
    )
}


