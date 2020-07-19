import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeItemCustom from './TreeItemCustom';
import { ExpandMore, ChevronRight } from '@material-ui/icons/';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function TreeViewListAttributes(props) {

    const { arrayChild, defineColor, listException, setListException } = props; 
    const classes = useStyles();

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ChevronRight />}
        >
            {arrayChild.map((groupId, key) => (

                groupId.length > 0 || !undefined ? (
                    <TreeItem key={key} nodeId={groupId[0].moduleId} label={groupId[0].moduleId}>
                        {groupId.map((item, key) => (
                            (<TreeItemCustom nodeId={key + " "} key={key} id={item.tag} labelText={item.name}
                                color={defineColor(item)} bgColor={defineColor(item)} tag={item.tag}
                                labelIcon={item.icon} attribute={item} listException={listException}
                                setListException={setListException} />)
                        ))}
                    </TreeItem>
                ) : (<TreeItem nodeId="1" label="Loading">
                    <TreeItem nodeId="2" label="Loading" />
                </TreeItem>)
            ))}
        </TreeView>
    )
}