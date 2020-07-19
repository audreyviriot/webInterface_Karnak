const jsonToSave = []

const constructJSON = (listAttributes) => {

    listAttributes.map((attr, key) => {
        var obj = {
            "name": attr.name,
            "tag": attr.tag,
            "id": attr.id,
            "moduleId": attr.moduleId,
            "customRule" : attr.customRule,
            "ruletoapply": attr.ruletoapply,
            "anonymizationRule": attr.anonymizationRule,
            "isChecked": attr.isChecked,
        }
        jsonToSave.push(obj);
        return true;
    })

    return jsonToSave;
}

const writeFile = (listAttributes, nameFile) => {
    var result = JSON.stringify(constructJSON(listAttributes));
    const blob = new Blob([result], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = nameFile + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

    

export { constructJSON, writeFile
 }