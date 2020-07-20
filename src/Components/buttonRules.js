import React, { createRef, useEffect } from 'react';
import { ButtonGroup, Button } from '@material-ui/core/';
import rulesColors from '../Resources/rules_colors.json';
import { defineColorByRules, cleanAnonymizationRule } from '../Functions/DefineRuleAndColor'
import { cloneDeep } from 'lodash';

export default function ButtonRules(props) {

    const { attribute, listException, setListException } = props;

    //Ref au bouton 
    const K = createRef();
    const X = createRef();
    const C = createRef();
    const D = createRef();
    const Z = createRef();
    const U = createRef();

    const listBtn = [K, X, C, D, Z, U];

    useEffect(() => {
        listBtn.forEach((btn) => {
            btn.current.style.color = '';
            btn.current.style.backgroundColor = '';
            if (btn.current.name === cleanAnonymizationRule(attribute, attribute.ruletoapply)) {
                btn.current.style.color = '#FFFFFF';
                btn.current.style.backgroundColor = defineColorByRules(btn.current.name);
            }
        })
    }, [attribute.checked])

    const handleChange = (e) => {

        listBtn.forEach((btn) => {
            btn.current.style.color = '';
            btn.current.style.backgroundColor = '';
        })
        e.currentTarget.style.color = '#FFFFFF';
        e.currentTarget.style.backgroundColor = defineColorByRules(e.currentTarget.name);

        //Si la personne coche en cours de route 
        if(attribute.checked !== "none"){
            attribute.ruletoapplyPrevious = cleanAnonymizationRule(attribute, attribute.checked);
        }else if(attribute.ruletoapplyPrevious !== attribute.basicProfile){
            attribute.ruletoapplyPrevious = cleanAnonymizationRule(attribute, attribute.basicProfile);
        }

        //Si la règle qu'on clique est déjà la règle appliquée 
        if (attribute.ruletoapplyPrevious === e.currentTarget.name) {
            attribute.customRule = false; 
            var index = listException.indexOf(attribute);
            var tab = listException;
            tab.splice(index, 1);
            setListException(cloneDeep(tab));
        } else {
            if(!("customRule" in attribute) || !(attribute.customRule)){
                attribute.ruletoapplyPrevious = attribute.anonymizationRule;
            }
            attribute.custom = e.currentTarget.name;
            attribute.customRule = true;
            var tab2 = listException;
            tab2.push(attribute);
            setListException(cloneDeep(tab2));
        }
    }

    return (
        <ButtonGroup size="small" aria-label="small outlined button group">
            <Button style={{ color: rulesColors[0].K }} ref={K} name="K" onClick={handleChange}>K</Button>
            <Button style={{ color: rulesColors[0].X }} ref={X} name="X" onClick={handleChange}>X</Button>
            <Button style={{ color: rulesColors[0].D }} ref={D} name="D" onClick={handleChange}>D</Button>
            <Button style={{ color: rulesColors[0].Z }} ref={Z} name="Z" onClick={handleChange}>Z</Button>
            <Button style={{ color: rulesColors[0].U }} ref={U} name="U" onClick={handleChange}>U</Button>
            <Button style={{ color: rulesColors[0].C }} ref={C} name="C" onClick={handleChange}>C</Button>
        </ButtonGroup>
    )

}