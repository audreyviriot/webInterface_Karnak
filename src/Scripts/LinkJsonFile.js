const attributes =  require('../Resources/confidentiality_profile_attributes.json');
const modules = require('../Resources/module_to_attributes.json');
const fs = require('fs');

attributes.map((attribute, key) => {

    modules.map((module, key) => {
        if (attribute.tag === module.tag) {
            var newStr = module.moduleId.split('-').join(' ');
            attribute.moduleId = newStr.charAt(0).toUpperCase() + newStr.substr(1);
        }
        return true;
    })

    if(attribute.moduleId === undefined){
        attribute.moduleId = "Other";
    }

})

var json = JSON.stringify(attributes);
fs.writeFile('../Resources/attributes_modules_linked.json', json, 'utf8', (res, err) => {
    if(err){
        console.log("Error : "+err);
    }
});