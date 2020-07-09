import React, { useState, useEffect } from 'react';
import { List, ListItemText, ListItemIcon, ListItem } from '@material-ui/core/';
import ButtonRules from './buttonRules';
import TreeViewListAttributes from './TreeViewListAttributes';
import { determineLogo, defineColor } from '../Functions/DefineRuleAndColor';

export default function ListAttributes(props) {

    const [arrayChildPart1, setArrayChildPart1] = useState([]);
    const [arrayChildPart2, setArrayChildPart2] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [filterTable, setFilterTable] = useState([]);
    const [listException, setListException] = useState([]);

    const { listAttributes, searchTerm, valueRadio, valueCb, propertiesAdvOpt } = props;

    //Construct a table of unique moduleId
    const checkIfExist = (moduleId, copyTable) => {
        if (copyTable.length > 0) {
            var res = copyTable.indexOf(moduleId);
            if (res === -1) {
                var newStr = moduleId.split('-').join(' ');
                var strDef = newStr.charAt(0).toUpperCase() + newStr.substr(1);
                copyTable.push(strDef);
            }
        }
        else {
            newStr = moduleId.split('-').join(' ');
            strDef = newStr.charAt(0).toUpperCase() + newStr.substr(1);
            copyTable.push(strDef);
        }
        return true;
    }

    //Clean the name of categories 
    const cleanNameModuleId = (copyTable) => {
        copyTable.forEach(mid => {
            var newStr = mid.split('-').join(' ');
            mid = newStr.charAt(0).toUpperCase() + newStr.substr(1);
        });
    }

    //Gestion exception 
    const manageException = (obj) => {
        listException.forEach((except) => {
            if(obj.id === except.id){
                obj = except; 
                return;
            }
        })
    }

    //General function to call everything
    const initTable = () => {

        const copyTable = []
        listAttributes.map((data, key) => {
            manageException(data);
            checkIfExist(data.moduleId, copyTable);
            determineLogo(data, propertiesAdvOpt);
            return true;
        });

        const groupChild = [];

        cleanNameModuleId(copyTable);

        copyTable.sort().forEach((groupId, key) => {
            groupChild.push(listAttributes.filter(attr => attr.moduleId === groupId));
        })

        setArrayChildPart1(groupChild.slice(0, groupChild.length / 2 - 1));
        setArrayChildPart2(groupChild.slice(groupChild.length / 2, groupChild.length - 1));
    }

    useEffect(() => {
        let result = [];
        if (searchTerm === "") {
            initTable();
            setIsSearched(false);
        } else {
            switch(valueRadio){
                case 'module' : 
                    result = listAttributes.filter(attr => attr.moduleId.toLowerCase().includes(searchTerm));
                    break;
                case 'tagid' : 
                    result = listAttributes.filter(attr => attr.tag.toLowerCase().includes(searchTerm));
                    break;
                case 'attribute' : 
                    result = listAttributes.filter(attr => attr.name.toLowerCase().includes(searchTerm));
                    break;
                default:
                    break;
            }
            result.forEach((item) => {
                determineLogo(item, propertiesAdvOpt);
            })
            setFilterTable(result);
            setIsSearched(true);
        }
    }, [listAttributes, searchTerm, valueCb, listException, setListException])

    return (

        !isSearched ? (<div style={{ display: 'flex', flexDirection: 'row' }}>

            <TreeViewListAttributes arrayChild={arrayChildPart1} defineColor={defineColor} setListException={setListException} 
            listException={listException}/>

            <TreeViewListAttributes arrayChild={arrayChildPart2} defineColor={defineColor} setListException={setListException}
            listException={listException}/>

        </div>

        ) : (
                filterTable.length > 0 ?
                (<List>
                    {filterTable.map((attribute, key) => (
                        <ListItem style={{color: defineColor(attribute)}}>
                            <ListItemIcon style={{color: defineColor(attribute)}}>
                                {determineLogo(attribute, propertiesAdvOpt)}
                            </ListItemIcon>
                            <ListItemText primary={attribute.tag + " " + attribute.name} key={key} />
                            <ButtonRules attribute={attribute} setListException={setListException} listException={listException}/>
                        </ListItem>   
                    ))}
                </List>) 
                : (
                    <p>No data to display</p>
                )
            )

    )
}