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
function renderBreedTable(data) {
    tableBodyEl.innerHTML = "";
    data.forEach((breed) => {
        const row = `<tr>
              <th scope="row">${breed.id}</th>
              <td>${breed.name}</td>
              <td>${breed.type}</td>
              <td>
                <button type="button" class="btn btn-danger" onclick="deleteBreed('${breed.id}')">
                  Delete
                </button>
              </td>
            </tr>`;
        tableBodyEl.insertAdjacentHTML('beforeend', row);
      });
}

/* clear input */
const clearInput = () => {
    nameInput.value = "";
    typeInput.value = "Select type";
};

/* --submit form-- */
submitBtn.addEventListener("click", function (e) {   
    const maxId = breedArr.reduce((max, item) => Math.max(max, item.id), 0); // Find the highest existing breed ID
    const data = {
        id: maxId + 1,
        name: nameInput.value,
        type: typeInput.value,
    };
    const validate = validateData(data); 
    if (validate) {                        
        breedArr.push(data);
        saveToStorage("breedArr", JSON.stringify(breedArr))
        clearInput();
        renderBreedTable(breedArr);        
    }
});

/***
 * delete pet
 * @param breedId string
 * */
const deleteBreed = (breedId) => {1
    // Confirm before deletePet    
    if (confirm("Are you sure?")) {
        breedId = Number(breedId);
        const index = breedArr.findIndex((breed) => breed.id === breedId);
        if (index !== -1) {
            breedArr.splice(index, 1);
            saveToStorage("breedArr", JSON.stringify(breedArr))
            renderBreedTable(breedArr);
        }
    }
};