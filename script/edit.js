'use strict';
/*-- Define variable Button --*/
const submitBtn = document.getElementById("submit-btn");
/*-- Define variable container form element--*/
const formContainer = document.getElementById("container-form");
/*-- Define variable input and checkbox --*/
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

/*-- on change input pet type --*/
typeInput.addEventListener("change",function () {
    const val = this.value;
    const filterBreed = breedArr.filter(item => item.type === val);
    renderBreed(filterBreed);
});

/***
 * validate data
 * @param data object
 * */
function validateData(data) {
    if (data.name === "") {
        alert("Please input for name");
    } else if (data.age < 1 || data.age > 15) {
        alert("Age must be between 1 and 15!");
    } else if (data.weight < 1 || data.weight > 15) {
        alert("Weight must be between 1 and 15!");
    } else if (data.leng < 1 || data.leng > 100) {
        alert("Length must be between 1 and 100!");
    } else if (isNaN(data.age)) {
        alert("Please input for age");
    } else if (isNaN(data.weight)) {
        alert("Please input for weight");
    } else if (isNaN(data.leng)) {
        alert("Please input for length");
    } else if (data.type === "") {
        alert("Please select Type!");
    } else if (data.breed === "") {
        alert("Please select Breed!");
    } else {
        return true;
    }
}

/***
 * render table data
 * @param petArr array
 * */
function renderTableData(petArr) {
    tableBodyEl.innerHTML = "";
    petArr.forEach((pet) => {
        const date = new Date(pet.date);
        const row = `
        <tr>
            <th scope="row">${pet.id}</th>
            <td>${pet.name}</td>
            <td>${pet.age}</td>
            <td>${pet.type}</td>
            <td>${pet.weight} kg</td>
            <td>${pet.leng} cm</td>
            <td>${pet.breed}</td>
            <td>
                <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
            </td> 
            <td>
                ${pet.vaccinated ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'}
            </td>
            <td>
                ${pet.dewormed ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'}
            </td>
            <td>
                ${pet.sterilized ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'}
            </td>
            <td>${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</td>
            <td>
                <button type="button" class="btn btn-warning" onclick="startEditPet('${pet.id}')">Edit</button>
            </td>
        </tr>`;
        tableBodyEl.insertAdjacentHTML("beforeend", row);
    });
}
/* clear input */
const clearInput = () => {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select type";
    weightInput.value = "";
    lengthInput.value = "";
    colorInput.value = "#000000";
    breedInput.value = "";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
};
/***
 * render table data
 * @param petArr array
 * */
renderTableData(petArr);

/***
 * start edit pet
 * @param petId string
 * */
const startEditPet = function (petId) {
    const editPet = petArr.find((item) => item.id === petId);
    const { type, id, name, age, weight, leng, color, vaccinated, dewormed, sterilized} = editPet;

    idInput.value = id;
    nameInput.value = name;
    ageInput.value = age;
    typeInput.value = type;
    weightInput.value = weight;
    lengthInput.value = leng;
    colorInput.value = color;

    const filterBreed = breedArr.filter(item => item.type === type);
    renderBreed(filterBreed);
    breedInput.value = editPet.breed;

    vaccinatedInput.checked = vaccinated;
    dewormedInput.checked = dewormed;
    sterilizedInput.checked = sterilized;

    formContainer.classList.remove("hide");
}

/** Update data after edit
 * @param data array
* */
const updateData = function(data){
    const petIndex = petArr.findIndex(pet => pet.id === data.id);
    // Only update the object if it exists in the array
    if (petIndex !== -1) {
        const { name, age, type, weight, leng, color, breed, vaccinated, dewormed, sterilized } = data;
        // Update the object with new values
        petArr[petIndex] = {
            ...petArr[petIndex],
            name,
            age,
            type,
            weight,
            leng,
            color,
            breed,
            vaccinated,
            dewormed,
            sterilized
        };
        saveToStorage("petArr", JSON.stringify(petArr))
    }
}

/* --submit form-- */
submitBtn.addEventListener("click", function (e) {
    const data = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseInt(weightInput.value),
        leng: parseInt(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        bmi: "?",
        date: new Date(),
    };
    const validate = validateData(data);
    if (validate) {
        updateData(data);
        clearInput();
        formContainer.classList.add("hide");
        renderTableData(petArr);
    }
});