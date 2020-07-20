import React, { useEffect, useState } from 'react';
import './App.css';
import dataBase from './Resources/attributes_modules_linked.json';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomeView from './Views/HomeView';
import EditView from './Views/EditView';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function App() {

  const classes = useStyles();

  //Initialize data
  const [attributes, setAttributes] = useState(dataBase);
  const [attr, setAttr] = useState([]);
  const [arrayConflict, setArrayConflict] = useState([]);
  const tab = [];
  const [importedJson, setImportedJson] = useState();
  const [isImported, setIsImported] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  //Advanced option
  const propertiesAdvOpt = ["rtnSafePrivOpt", "rtnUIDsOpt", "rtnDevIdOpt",
    "rtnPatCharsOpt", "rtnLongFullDatesOpt", "rtnLongModifDatesOpt",
    "cleanDescOpt", "cleanStructContOpt", "cleanGraphOpt"]

  //Cb for advanced option  
  const [isCb1Checked, setIsCb1Checked] = useState(false);
  const [isCb2Checked, setIsCb2Checked] = useState(false);
  const [isCb3Checked, setIsCb3Checked] = useState(false);
  const [isCb4Checked, setIsCb4Checked] = useState(false);
  const [isCb5Checked, setIsCb5Checked] = useState(false);
  const [isCb6Checked, setIsCb6Checked] = useState(false);
  const [isCb7Checked, setIsCb7Checked] = useState(false);
  const [isCb8Checked, setIsCb8Checked] = useState(false);
  const [isCb9Checked, setIsCb9Checked] = useState(false);

  const ruleToCb = (ruleChecked) => {
    switch (ruleChecked) {
      case 'rtnSafePrivOpt':
        setIsCb1Checked(true);
        break;
      case 'rtnUIDsOpt':
        setIsCb2Checked(true);
        break;
      case 'rtnDevIdOpt':
        setIsCb3Checked(true);
        break;
      case 'rtnPatCharsOpt':
        setIsCb4Checked(true);
        break;
      case 'rtnLongFullDatesOpt':
        setIsCb5Checked(true);
        break;
      case 'rtnLongModifDatesOpt':
        setIsCb6Checked(true);
        break;
      case 'cleanDescOpt':
        setIsCb7Checked(true);
        break;
      case 'cleanStructContOpt':
        setIsCb8Checked(true);
        break;
      case 'cleanGraphOpt':
        setIsCb9Checked(true);
        break;
      default:
        break;
    }
  }

  //Manage conflict advanced option
  const testIfConflict = (opt1, opt2, obj) => {
    if (opt1 in obj && opt2 in obj) {
      return true;
    } else {
      return false;
    }
  }

  const createMatriceConflict = (obj) => {
    for (let i = 0; i < 9; i++) {
      for (let j = i + 1; j < 9; j++) {
        if (testIfConflict(propertiesAdvOpt[i], propertiesAdvOpt[j], obj)) {
          if (tab.indexOf(propertiesAdvOpt[i] + '-' + propertiesAdvOpt[j]) === -1) {
            tab.push(propertiesAdvOpt[i] + '-' + propertiesAdvOpt[j])
          }
        };
      }
    }
  }

  useEffect(() => {

    setAttr([]);
    setAttributes(dataBase);
    if(isCancel){
      setIsCancel(false);
    }

    if (!isImported) {
      attributes.map((obj, key) => {

        //Manage conflicts for advanced option
        createMatriceConflict(obj);

        obj.checked = '';
        obj.ruletoapply = 'basicProfile';
        obj.isChecked = false;
        obj.customRule = false;

        return true;
      })


    } else {
      if (importedJson !== undefined) {
        attributes.map((a, key) => {
          importedJson.map((obj, key) => {
            if (obj.id === a.id) {
              a.moduleId = obj.moduleId;
              a.ruletoapply = obj.ruletoapply;
              a.anonymizationRule = obj.anonymizationRule;
              a.checked = obj.checked;
              a.isChecked = obj.isChecked;
              if (obj.customRule !== undefined) {
                a.customRule = obj.customRule;
              } else {
                a.customRule = '';
              }
            }
            return true;
          })
          createMatriceConflict(a);
          if (a.isChecked) {
            ruleToCb(a.ruletoapply);
          }
          return true;
        })
      }
    }

    setAttr(attributes);
    setArrayConflict(tab);

  }, [isImported, setIsImported, isCancel, setIsCancel])

  return (
    <Router>
      <Switch>
        <Route path="/editPage">
          {attr.length > 0 && arrayConflict.length > 0 ? (
            <EditView listAttributes={attr}
              setValueCb1={setIsCb1Checked}
              setValueCb2={setIsCb2Checked}
              setValueCb3={setIsCb3Checked}
              setValueCb4={setIsCb4Checked}
              setValueCb5={setIsCb5Checked}
              setValueCb6={setIsCb6Checked}
              setValueCb7={setIsCb7Checked}
              setValueCb8={setIsCb8Checked}
              setValueCb9={setIsCb9Checked}
              valueCb={[isCb1Checked, isCb2Checked, isCb3Checked, isCb4Checked,
                isCb5Checked, isCb6Checked, isCb7Checked, isCb8Checked, isCb9Checked]}
              conflictAdvOption={arrayConflict} propertiesAdvOpt={propertiesAdvOpt} setIsImported={setIsImported}
              setImportedJson={setImportedJson} setIsCancel={setIsCancel}/>
          ) : (
              <p>Loading</p>
            )}
        </Route>
        <Route path="/">
          {arrayConflict.length > 0 ? (
            <HomeView
              setValueCb1={setIsCb1Checked}
              setValueCb2={setIsCb2Checked}
              setValueCb3={setIsCb3Checked}
              setValueCb4={setIsCb4Checked}
              setValueCb5={setIsCb5Checked}
              setValueCb6={setIsCb6Checked}
              setValueCb7={setIsCb7Checked}
              setValueCb8={setIsCb8Checked}
              setValueCb9={setIsCb9Checked}
              valueCb={[isCb1Checked, isCb2Checked, isCb3Checked, isCb4Checked,
                isCb5Checked, isCb6Checked, isCb7Checked, isCb8Checked, isCb9Checked]}
              conflictAdvOption={arrayConflict} setImportedJson={setImportedJson} setIsImported={setIsImported}
            />
          ) : (
              <div className={classes.root}>
                <CircularProgress />
              </div>
            )}
        </Route>
      </Switch>
    </Router>
  )
}


export default App;
