'use strict';
/*-- Define variable Button --*/
const submitBtn = document.getElementById("submit-btn");
/*-- Define variable input --*/
const nameInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
/***
 * validate data
 * @param data object
 * */
function validateData(data) {
    const idExists = breedArr.find((obj) => obj.name === data.name && obj.type === data.type);
    if (idExists) {
        alert("Please input other name of this type!");
    }else if (data.name === "") {
        alert("Please input for name");
    }else if (data.type === "") {
        alert("Please select Type!");
    }else {
        return true;
    }
}
/* render available table breed data */
renderBreedTable(breedArr);
/***
 * render breed table data
 * @param breedArr array
 * */
function renderBreedTable(breedArr) {
    tableBodyEl.innerHTML = "";
    for (let i = 0; i < breedArr.length; i++) {
        const breed = breedArr[i];
        const row = document.createElement("tr");
        row.innerHTML = `<tr><th scope="row">${breed.id}</th> \n\
        <td>${breed.name}</td> \n\
        <td>${breed.type}</td> \n\
        <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${
            breed.id
        }')">Delete</button> \n\
        </td> \n\
        </tr>`;
        tableBodyEl.appendChild(row);
    }
}

/* clear input */
const clearInput = () => {
    nameInput.value = "";
    typeInput.value = "Select type";
};

/* --submit form-- */
submitBtn.addEventListener("click", function (e) {
    // Find the highest existing breed ID
    let maxId = 0;
    breedArr.forEach(item => {
        if (item.id > maxId) {
            maxId = item.id;
        }
    });
    const data = {
        id: maxId + 1,
        name: nameInput.value,
        type: typeInput.value,
    };
    const validate = validateData(data);
    if (validate) {
        breedArr.push(data);
        console.log(breedArr)
        saveToStorage("breedArr", JSON.stringify(breedArr))
        clearInput();
        renderBreedTable(breedArr);
    }
});

/***
 * delete pet
 * @param breedId string
 * */
const deleteBreed = (breedId) => {
    // Confirm before deletePet
    breedId = Number(breedId);
    if (confirm("Are you sure?")) {
        const index = breedArr.findIndex((breed) => breed.id === breedId);
        console.log(index);
        if (index !== -1) {
            breedArr.splice(index, 1);
            saveToStorage("breedArr", JSON.stringify(breedArr))
            renderBreedTable(breedArr);
        }
    }
};