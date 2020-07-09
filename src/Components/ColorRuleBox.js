import React from 'react';
import {
    ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import { FiberManualRecord } from '@material-ui/icons/';

export default function EditView(props) {

    return (
        <div style={{ flexWrap: 'wrap', display: 'flex', flexDirection: 'row' }}>

            <div>
                <ListItem style={{ color: '#19a833' }}>
                    <ListItemIcon style={{ color: '#19a833' }}>
                        <FiberManualRecord />
                    </ListItemIcon>
                    <ListItemText primary="K - Keep" />
                </ListItem>
                <ListItem style={{ color: '#dc191c' }}>
                    <ListItemIcon style={{ color: '#dc191c' }}>
                        <FiberManualRecord />
                    </ListItemIcon>
                    <ListItemText primary="X - Remove" />
                </ListItem>
            </div>
            <div>
                <ListItem style={{ color: '#dc7ee9' }}>
                    <ListItemIcon style={{ color: '#dc7ee9' }}>
                        <FiberManualRecord />
                    </ListItemIcon>
                    <ListItemText primary="D - Replace by a dummy value" />
                </ListItem>
                <ListItem style={{ color: '#1a38be' }}>
                    <ListItemIcon style={{ color: '#1a38be' }}>
                        <FiberManualRecord />
                    </ListItemIcon>
                    <ListItemText primary="Z - Raplace by null value" />
                </ListItem>
            </div>
            <div>
                <ListItem style={{ color: '#f58a25' }}>
                    <ListItemIcon style={{ color: '#f58a25' }}>
                        <FiberManualRecord />
                    </ListItemIcon>
                    <ListItemText primary="U - Replace by a dummy UID" />
                </ListItem>
                <ListItem style={{ color: '#25dff5' }}>
                    <ListItemIcon style={{ color: '#25dff5' }}>
                        <FiberManualRecord />
                    </ListItemIcon>
                    <ListItemText primary="C - Clean, replace by value with similar meaning" />
                </ListItem>
            </div>
        </div>
    )
}