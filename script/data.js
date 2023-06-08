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
    const breed = data.breed;
    const type = data.type;
    const idExists = breedArr.find((obj) => obj.name === breed && obj.type === type);
    if(!idExists){
        const maxId = breedArr.reduce((max, item) => Math.max(max, item.id), 0);
        const breedOne = {
            id: maxId + 1,
            name: breed,
            type: type,
        };
        breedArr.push(breedOne);        
    }    
}
importDataBtn.addEventListener("click", async function () {    
    const file = inputFile.files[0];
    if (file) {
        try {
            const result = await readFile(file);
            result.forEach(updateData);
            saveToStorage("breedArr", JSON.stringify(breedArr));
            saveToStorage("petArr", JSON.stringify([...petMap.values()]));
            alert("Import finished");
          } catch (error) {
            alert("Error reading file");
          }
    }
});

function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
        const result = JSON.parse(evt.target.result);
        resolve(result);
      };
      reader.onerror = function (evt) {
        reject(evt);
      };
    });
  }