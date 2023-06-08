'use strict';
/*-- Define variable table body element--*/
const tableBodyEl = document.getElementById("tbody");
/*-- Define variable pet array --*/
const petArr = JSON.parse(getFromStorage("petArr","[]")) ?? [];
/*-- Define variable breed array --*/
const breedArr = JSON.parse(getFromStorage("breedArr","[]")) ?? [];
/***
 * sava pet data to storage
 * @param key string
 * @param value json
 * */
function saveToStorage(key, value) {
    localStorage.setItem(key, value);
}
/***
 * sava pet data to storage
 * @param key string
 * @param defaults string
 * */
function getFromStorage(key, defaults) {
    return localStorage.getItem(key) ?? defaults;
}
/***
 * render breed data
 * @param breedArr array
 * */
function renderBreed(breedArr) {
    const options = breedArr.map((breed) => `<option>${breed.name}</option>`).join("");
    breedInput.innerHTML = `<option value=''>Select Breed</option>${options}`;
}
/*-- Define variable sidebar --*/
const sidebarEl  = document.getElementById("sidebar");
/*-- Toggle class active when click on sidebar --*/
sidebarEl.addEventListener('click', function () {
    this.classList.toggle('active');
});
