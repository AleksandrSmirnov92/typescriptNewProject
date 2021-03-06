const input = document.querySelector(".add_task_input")! as HTMLInputElement;
const button = document.querySelector(".button_add")!;
const result = document.querySelector(".wrapper_task")! as HTMLInputElement;
const counterHeader = document.querySelector(".header_span2")!;
const selectElement = document.querySelector(".select")!;
enum memberFilter {
  ALL = "all",
  ALL_ACTIVE = "all-active",
  ALL_INACTIVE = "all-inactive",
}
interface STATE {
  massiv: {
    id: string;
    name: string;
    checked: boolean;
  }[];
  count: number;
  filterValue: memberFilter | string;
}

let state: STATE = {
  massiv: [],
  count: 0,
  filterValue: memberFilter.ALL,
};

button.addEventListener("click", () => {
  state.massiv.push({
    id: `id_${Math.random().toString()}`,
    name: input.value,
    checked: false,
  });
  drawTasks();
  changeColor();
  input.value = "";
  state.count++;
  drawCounter(state.count);
});
result.addEventListener("click", (event: MouseEvent) => {
  const idButton = event.target as HTMLInputElement;
  let getIdButton: string = idButton.getAttribute("id")!;
  if (idButton.closest("button")) {
    for (let item of state.massiv) {
      if (!item.checked) {
        state.count--;
        drawCounter(state.count);
      }
      remove(getIdButton);
      break;
    }
  }
});
result.addEventListener("click", (event) => {
  const checkbox = event.target as HTMLInputElement;
  let getIdCheckbox: string = checkbox.getAttribute("id")!;
  if (checkbox.closest(".checkbox_task")) {
    changeCheckbox(getIdCheckbox);
    changeColor();
    changeFilter();
  }
});
selectElement.addEventListener("change", () => {
  const selectValue = selectElement as HTMLInputElement;
  state.filterValue = selectValue.value;
  changeFilter();
});
function drawTasks() {
  let drawTask = "";
  state.massiv.forEach((item) => {
    drawTask += `<div class="add_task_result" id = "${item.id}">
   <span class="add_task_result_text" "${item.id}">${item.name}</span>
   <div>
   <input type ="checkbox" class = "checkbox_task" ${
     item.checked ? "checked" : ""
   } id = "${item.id}">
   <button class="add_task_result_text_remove"id = "${
     item.id
   }">??????????????</button></label>
   </div>
   </div>`;
  });
  result.innerHTML = drawTask;
}
function remove(getIdButton: string) {
  let remove = document.querySelectorAll(".add_task_result")!;
  remove.forEach((item, index) => {
    if (item.id === getIdButton) {
      state.massiv.splice(index, 1);
      item.remove();
    }
  });
}
function changeCheckbox(getIdCheckbox: string) {
  const containerTasks = document.querySelectorAll(".add_task_result");
  containerTasks.forEach((element) => {
    if (element.id === getIdCheckbox) {
      for (let item of state.massiv) {
        if (item.id === element.id) {
          item.checked = !item.checked;
          if (item.checked) {
            state.count--;
            drawCounter(state.count);
          } else {
            state.count++;
            drawCounter(state.count);
          }
          break;
        }
      }
    }
  });
}
function changeColor() {
  let changeColorTask = document.querySelectorAll(".add_task_result");
  let textlineThroughTask = document.querySelectorAll(".add_task_result_text");
  for (let i = 0; i < state.massiv.length; i++) {
    if (state.massiv[i].checked) {
      changeColorTask[i].classList.add("add_task_input1");
      textlineThroughTask[i].classList.add("add_task_result_text1");
    } else {
      changeColorTask[i].classList.remove("add_task_input1");
      textlineThroughTask[i].classList.remove("add_task_result_text1");
    }
  }
}
function drawCounter(count: number): void {
  let counter = "";
  counter += count;
  counterHeader.innerHTML = counter;
}
function changeFilter() {
  let c = document.querySelectorAll(".add_task_result");
  if (state.filterValue === memberFilter.ALL) {
    state.massiv.forEach((item, index) => {
      c[index].classList.remove("add_task_input2");
    });

    // console.log("?????????????? ?????? ");
  }
  if (state.filterValue === memberFilter.ALL_ACTIVE) {
    state.massiv.forEach((item, index) => {
      if (item.checked === true) {
        c[index].classList.add("add_task_input2");
      } else {
        c[index].classList.remove("add_task_input2");
      }
    });

    // console.log("?????????????? ????????????????");
  }
  if (state.filterValue === memberFilter.ALL_INACTIVE) {
    state.massiv.forEach((item, index) => {
      if (!item.checked) {
        c[index].classList.add("add_task_input2");
      } else {
        c[index].classList.remove("add_task_input2");
      }
    });
    // console.log("?????????????? ????????????????????");
  }
}
