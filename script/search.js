'use strict';

/*-- Define variable input and checkbox --*/
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
/*-- Define variable Button --*/
const findBtn = document.getElementById("find-btn");
/*-- on change input pet type --*/
typeInput.addEventListener("change",function () {
    const val = this.value;
    const filterBreed = breedArr.filter(item => item.type === val);
    renderBreed(filterBreed);
});
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
            <td>${pet.vaccinated ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'}</td>
            <td>${pet.dewormed ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'}</td>
            <td>${pet.sterilized ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'}</td>
            <td>${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</td>
        </tr>`;
        tableBodyEl.insertAdjacentHTML("beforeend", row);
    });
}
/* render  available table data */
renderTableData(petArr);
/*----find pet-----*/
findBtn.addEventListener("click",function () {
    const petFilter = petArr.filter(item => {
        return (idInput.value !== '' ? item.id.includes(idInput.value) : true)
            && (nameInput.value !== '' ? item.name.includes(nameInput.value) : true)
            && (typeInput.value !== '' ? item.type === typeInput.value : true)
            && (breedInput.value !== '' ? item.breed === breedInput.value : true)
            && (vaccinatedInput.checked ? item.vaccinated === vaccinatedInput.checked : true)
            && (dewormedInput.checked ? item.dewormed === dewormedInput.checked : true)
        && (sterilizedInput.checked ? item.sterilized === sterilizedInput.checked : true)
    });
    renderTableData(petFilter);
});