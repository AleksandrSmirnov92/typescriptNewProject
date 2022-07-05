"use strict";
const input = document.querySelector(".add_task_input");
const button = document.querySelector(".button_add");
const result = document.querySelector(".wrapper_task");
let c = document.querySelector(".header_span2");
let filter = document.querySelector(".filter");
var memberFilter;
(function (memberFilter) {
    memberFilter["ALL"] = "all";
    memberFilter["ALL_ACTIVE"] = "all-active";
    memberFilter["ALL_INACTIVE"] = "all-inactive";
})(memberFilter || (memberFilter = {}));
let state = {
    massiv: [],
    count: 0,
    filterValue: null,
};
button === null || button === void 0 ? void 0 : button.addEventListener("click", () => {
    state.massiv.push({ id: Math.random(), name: input.value, checked: false });
    drawTasks();
    console.log(state.massiv);
    input.value = "";
});
result.addEventListener("click", (event) => {
    let remove = document.querySelectorAll(".add_task_result");
    const idButton = event.target;
    let getIdButton = idButton.getAttribute("id");
    remove.forEach((item) => {
        if (item.id === getIdButton) {
        }
    });
});
function drawTasks() {
    let drawTask = "";
    state.massiv.forEach((item) => {
        drawTask += `<div class="add_task_result" id = "id_${item.id}">
   <span class="add_task_result_text" "id_${item.id}">${item.name}</span>
   <div>
   <input type ="checkbox" class = "checkbox_task" ${item.checked ? "checked" : ""} id = "id_${item.id}">
   <button class="add_task_result_text_remove"id = "id_${item.id}">удалить</button></label>
   </div>
   </div>`;
    });
    result.innerHTML = drawTask;
}