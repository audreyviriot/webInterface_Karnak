import React, { useEffect, createRef } from 'react';
import {
    FormControlLabel, Checkbox
} from '@material-ui/core';
import { Fingerprint, Lock, Devices, Description, Assessment, Event, EventNote, DonutLarge, VpnKey } from '@material-ui/icons/';

export default function CbAdvancedOption(props) {

    const { valueCb, setValueCb1, setValueCb2, setValueCb3
        , setValueCb4, setValueCb5, setValueCb6, setValueCb7, setValueCb8, setValueCb9, conflictAdvOption } = props;

    const rtnSafePrivOpt = createRef();
    const rtnUIDsOpt = createRef();
    const rtnDevIdOpt = createRef();
    const rtnPatCharsOpt = createRef();
    const rtnLongFullDatesOpt = createRef();
    const rtnLongModifDatesOpt = createRef();
    const cleanDescOpt = createRef();
    const cleanStructContOpt = createRef();
    const cleanGraphOpt = createRef();

    const arrayRef = [rtnSafePrivOpt, rtnUIDsOpt, rtnDevIdOpt, rtnPatCharsOpt, rtnLongFullDatesOpt, rtnLongModifDatesOpt,
        cleanDescOpt, cleanStructContOpt, cleanGraphOpt];

    useEffect(() => {
        if (valueCb.indexOf(true) !== -1) {
            conflictAdvOption.forEach((rules) => {
                let tab = rules.split('-');
                arrayRef.forEach(ref1 => {
                    if (ref1.current.control.name === tab[0] || ref1.current.control.name === tab[1]) {
                        if (ref1.current.control.checked) {
                            arrayRef.forEach(ref2 => {
                                if (ref1 === ref2) {
                                    return;
                                } else if (ref2.current.control.name === tab[0] || ref2.current.control.name === tab[1]) {
                                    ref2.current.control.disabled = true;
                                    ref2.current.style.color = '#E1DDDC';
                                    ref2.current.control.style.color = 'E1DDDC';
                                    return;
                                }
                            })
                        }
                    }
                });
            })
        }
    }, [])

    const disabledCb = (event, valueForDisabled, colorDisabled) => {

        conflictAdvOption.forEach((rules) => {
            let tab = rules.split('-');
            if (event.target.name === tab[0] || event.target.name === tab[1]) {
                arrayRef.forEach(ref2 => {
                    if (event.target.name === ref2.current.control.name) {
                        return;
                    } else if (ref2.current.control.name === tab[0] || ref2.current.control.name === tab[1]) {
                        ref2.current.control.disabled = valueForDisabled;
                        ref2.current.style.color = colorDisabled;
                        ref2.current.control.style.color = colorDisabled;
                        return;
                    }
                })
            }
        });
    }

    const manageConflict = (event) => {
        if (event.target.checked) {
            disabledCb(event, true, '#E1DDDC');
        } else {
            disabledCb(event, false, '');
        }
    }

    return (

        <div style={{ display: 'flex', flexDirection: 'row' }}>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={valueCb[0]}
                            onChange={(event) => {
                                manageConflict(event);
                                setValueCb1(!valueCb[0])
                            }}
                            color="primary"
                        />
                    }
                    ref={rtnSafePrivOpt}
                    name="rtnSafePrivOpt"
                    style={{ whiteSpace: 'nowrap' }}
                    label={(<p>Retain safe private option <Lock /></p>)}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={valueCb[1]}
                            onChange={(event) => {
                                manageConflict(event);
                                setValueCb2(!valueCb[1]);
                            }}
                            color="primary"
                        />
                    }
                    ref={rtnUIDsOpt}
                    name="rtnUIDsOpt"
                    style={{ whiteSpace: 'nowrap' }}
                    label={(<p>Retain UIDs option <VpnKey /></p>)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={valueCb[2]}
                            onChange={(event) => {
                                manageConflict(event);
                                setValueCb3(!valueCb[2]);
                            }}
                            color="primary"
                        />
                    }
                    ref={rtnDevIdOpt}
                    name="rtnDevIdOpt"
                    style={{ whiteSpace: 'nowrap' }}
                    label={(<p>Retain device identity option <Devices /></p>)}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={valueCb[3]}
                            onChange={(event) => {
                                manageConflict(event);
                                setValueCb4(!valueCb[3]);
                            }}
                            color="primary"
                        />
                    }
                    ref={rtnPatCharsOpt}
                    name="rtnPatCharsOpt"
                    style={{ whiteSpace: 'nowrap' }}
                    label={(<p>Retain patient characteristics <Fingerprint /></p>)}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={valueCb[4]}
                            onChange={(event) => {
                                manageConflict(event);
                                setValueCb5(!valueCb[4]);
                            }}
                            color="primary"
                        />
                    }
                    ref={rtnLongFullDatesOpt}
                    name="rtnLongFullDatesOpt"
                    style={{ whiteSpace: 'nowrap' }}
                    label={(<p>Retain long full dates option <EventNote /></p>)}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={valueCb[5]}
                            onChange={(event) => {
                                manageConflict(event);
                                setValueCb6(!valueCb[5]);
                            }}
                            color="primary"
                        />
                    }
                    ref={rtnLongModifDatesOpt}
                    name="rtnLongModifDatesOpt"
                    style={{ whiteSpace: 'nowrap' }}
                    label={(<p>Retain long modified dates option <Event /></p>)}
                />

            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={valueCb[6]}
                            onChange={(event) => {
                                manageConflict(event);
                                setValueCb7(!valueCb[6]);
                            }}
                            color="primary"
                        />
                    }
                    ref={cleanDescOpt}
                    name="cleanDescOpt"
                    style={{ whiteSpace: 'nowrap' }}
                    label={(<p>Clean description option <Description /></p>)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={valueCb[7]}
                            onChange={(event) => {
                                manageConflict(event);
                                setValueCb8(!valueCb[7]);
                            }}
                            color="primary"
                        />
                    }
                    ref={cleanStructContOpt}
                    name="cleanStructContOpt"
                    style={{ whiteSpace: 'nowrap' }}
                    label={(<p>Clean structured continued option <DonutLarge /></p>)}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={valueCb[8]}
                            onChange={(event) => {
                                manageConflict(event);
                                setValueCb9(!valueCb[8]);
                            }}
                            color="primary"
                        />
                    }
                    ref={cleanGraphOpt}
                    name="cleanGraphOpt"
                    style={{ whiteSpace: 'nowrap' }}
                    label={(<p>Clean graph option <Assessment /></p>)}
                />
            </div>
        </div>
    )

}