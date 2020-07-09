import React from 'react';
import rulesColors from '../Resources/rules_colors.json';
import {
    Fingerprint, Lock, Devices, Description, Assessment, Event,
    EventNote, DonutLarge, VpnKey, Stop, Star
} from '@material-ui/icons/';

const getTheRuleToApply = (obj, propertiesAdvOpt) => {
    obj.ruletoapply = 'basicProfile';
    obj.checked = "none";
    propertiesAdvOpt.forEach(p => {
        document.getElementsByName(p).forEach((element) => {
            if (element.checked) {
                if (p in obj) {
                    obj.ruletoapply = p;
                    obj.checked = p;
                    obj.isChecked = true;
                    return;
                }
            }
        }
        )
    });
    if ('customRule' in obj) {
        if (obj.customRule === true) {
            obj.ruletoapply = "custom";
            return;
        }
    }
}

const cleanAnonymizationRule = (obj, ruletoapply) => {

    let value = defineRule(obj, ruletoapply);
    var v = value;
    if(value !== undefined){
        if (value.length > 1) {
            var tab = value.split('/');
            v = tab[tab.length - 1]
        }
        obj.anonymizationRule = v;
    }
    return v;
}

//Define the color with the rules of anonymization
const defineColor = (obj) => {

    var v = cleanAnonymizationRule(obj, obj.ruletoapply);
    return defineColorByRules(v);
}

const defineColorByRules = (rule) => {
    switch (rule) {
        case 'D':
            return rulesColors[0].D;
        case 'Z':
            return rulesColors[0].Z;
        case 'X':
            return rulesColors[0].X;
        case 'K':
            return rulesColors[0].K;
        case 'C':
            return rulesColors[0].C;
        case 'U':
        case 'U*':
            return rulesColors[0].U;
        default:
            break;
    }
}

const defineRule = (obj, ruleToApply) => {
    let value = "";

    switch (ruleToApply) {
        case 'rtnSafePrivOpt':
            value = obj.rtnSafePrivOpt;
            break;
        case 'rtnUIDsOpt':
            value = obj.rtnUIDsOpt;
            break;
        case 'rtnDevIdOpt':
            value = obj.rtnDevIdOpt;
            break;
        case 'rtnPatCharsOpt':
            value = obj.rtnPatCharsOpt;
            break;
        case 'rtnLongFullDatesOpt':
            value = obj.rtnLongFullDatesOpt;
            break;
        case 'rtnLongModifDatesOpt':
            value = obj.rtnLongModifDatesOpt;
            break;
        case 'cleanDescOpt':
            value = obj.cleanDescOpt;
            break;
        case 'cleanStructContOpt':
            value = obj.cleanStructContOpt;
            break;
        case 'cleanGraphOpt':
            value = obj.cleanGraphOpt;
            break;
        case 'custom':
            if(obj.custom === undefined){
                value = obj.anonymizationRule;
            }else{
                value = obj.custom;
            }
            break;
        default:
            value = obj.basicProfile;
            break;
    }

    return value;
}

const determineLogo = (obj, propertiesAdvOpt) => {
    getTheRuleToApply(obj, propertiesAdvOpt);
    switch (obj.ruletoapply) {
        case 'rtnSafePrivOpt':
            obj.icon = Lock;
            return <Lock />;
        case 'rtnUIDsOpt':
            obj.icon = VpnKey;
            return <VpnKey />;
        case 'rtnDevIdOpt':
            obj.icon = Devices;
            return <Devices />;
        case 'rtnPatCharsOpt':
            obj.icon = Fingerprint;
            return <Fingerprint />;
        case 'rtnLongFullDatesOpt':
            obj.icon = EventNote;
            return <EventNote />;
        case 'rtnLongModifDatesOpt':
            obj.icon = Event;
            return <Event />;
        case 'cleanDescOpt':
            obj.icon = Description;
            return <Description />;
        case 'cleanStructContOpt':
            obj.icon = DonutLarge;
            return <DonutLarge />;
        case 'cleanGraphOpt':
            obj.icon = Assessment;
            return <Assessment />;
        case 'custom':
            obj.icon = Star;
            return <Star />
        default:
            obj.icon = Stop;
            return <Stop />;
    }
}

export { defineColorByRules, defineRule, determineLogo, defineColor, cleanAnonymizationRule }