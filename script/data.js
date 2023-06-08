'use strict';
const exportDataBtn = document.getElementById("export-btn");
const importDataBtn = document.getElementById("import-btn");
const inputFile     = document.getElementById("input-file");
// function saveStaticDataToFile(data) {
//     const blob = new Blob([data],
//         { type: "application/json;charset=utf-8" });
//     saveAs(blob, "pet.json");
// }
const saveDataToFile = (data, filename) => {
    const blob = new Blob([data], { type: 'application/json;charset=utf-8' });
    saveAs(blob, filename);
};
exportDataBtn.addEventListener("click",function () {
    saveDataToFile(JSON.stringify(petArr), 'pet.json');
});
const petMap = new Map(petArr.map(pet => [pet.id, pet]));
const updateData = (data) => {
    petMap.set(data.id, {
        ...petMap.get(data.id),
        ...data
    });
    saveToStorage("petArr", JSON.stringify([...petMap.values()]));
}
importDataBtn.addEventListener("click",function () {
    console.log(inputFile.files);
    const file = inputFile.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            const result = JSON.parse(evt.target.result);
            // for (let i = 0; i < result.length; i++) {
            //     const pet = result[i];
            //     updateData(pet);
            // }
            result.forEach(updateData);
            alert("Import finished")
        }
        reader.onerror = function (evt) {
            alert("error reading file");
        }
    }
});