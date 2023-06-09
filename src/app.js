//***On crée l'environnement**** */
createEnvironment();
//***************** */

// Ne pas oublier que le reset divs ne sert à rien ...

const container = document.querySelector("#main-container");
const textInput = document.querySelector("#task-input");
const submitButton = document.querySelector("#submit-button");
const taskList = [];
class Task {
   constructor(text) {
      this.status = "To do";
      this.text = text;
      this.id = taskList.length + 1;
      this.order = taskList.length + 1;
   }
   createTaskDiv() {
      console.log(taskList);
      taskList.forEach((element) => {
         const taskDiv = document.createElement("div");
         console.log(element.text);
         taskDiv.textContent = element.text;
         taskDiv.className = "task-div";
         taskDiv.style.order = element.order;
         textInput.value = "";
         column01.prepend(taskDiv);
      });
      const taskDiv = document.querySelectorAll(".task-div");
      for (let h = 0; h < taskDiv.length; h++) {
         taskDiv[h].addEventListener("drag", (event) => {
            console.log("dragging");
         });
         taskDiv[h].addEventListener("drag", (event) => {
            console.log("dragging");
         });
         //dragstart
         taskDiv[h].addEventListener("dragstart", (event) => {
            taskDiv[h].classList.add("dragging");
            // taskDiv[h].textContent = "dragging in progress";
         });
         //dragend
         taskDiv[h].addEventListener("dragend", (event) => {
            taskDiv[h].classList.remove("dragging");
         });
         //droptarget
         const target = document.querySelectorAll(".container-column");
         for (let i = 0; i < target.length; i++) {
            target[i].addEventListener(
               "dragover",
               (event) => {
                  event.preventDefault();
               },
               false
            );
            //dragenter
            target[i].addEventListener("dragenter", (event) => {
               target[i].classList.add("targeted");
            });
            //dragleave
            target[i].addEventListener("dragleave", (event) => {
               target[i].classList.remove("targeted");
            });

            //drop
            target[i].addEventListener("drop", (event) => {
               event.preventDefault();
               target[i].appendChild(taskDiv[h]);
            });
         }
      }
   }
   resetDivs() {
      const existingDivs = document.querySelectorAll(".task-div");
      const columns = document.querySelectorAll("container-column");
      for (let i = 0; i < existingDivs.length; i++) {
         for (let j = 0; j < columns.length; j++) {
            columns[j].removeChild(existingDivs[i]);
         }
      }
   }
}
//
const column01 = document.querySelector("#column-01");
class TaskManager {
   orderDivs() {
      console.log(container);
   }
}
//***************** */
//
submitButton.addEventListener("click", (event) => {
   event.preventDefault();
   const submitedTask = textInput.value;
   console.log(submitedTask);
   const createdTask = new Task(submitedTask);
   taskList.push(createdTask);
   console.log(createdTask);
   createdTask.resetDivs();
   createdTask.createTaskDiv();
   console.log(taskList);
   // createdTask.orderDivs();
});

function createFullElement(tagName, source, properties) {
   const element = document.createElement(tagName);
   sourceElement = document.querySelector(source);
   sourceElement.appendChild(element);

   for (const property in properties) {
      element[property] = properties[property];
   }

   return element;
}

function createEnvironment() {
   createFullElement("div", "#app", {
      id: "form-container",
      className: "column-container",
   });
   createFullElement("h2", "#form-container", {
      textContent: "Create a new task",
   });
   createFullElement("form", "#form-container", {
      id: "new-task-form",
      name: "new-task-form",
      method: "post",
   });
   createFullElement("input", "#new-task-form", {
      type: "text",
      name: "new-task-form",
      id: "task-input",
   });
   createFullElement("input", "#new-task-form", {
      type: "submit",
      name: "new-task-form",
      id: "submit-button",
   });
   //on crée la structure en 3 colonnes
   createFullElement("div", "#app", {
      id: "column-container",
      className: "flex-container",
   });
   createFullElement("div", "#column-container", {
      id: "column-01",
      className: "container-column",
   });
   createFullElement("h2", "#column-01", {
      textContent: "To Do",
   });
   createFullElement("div", "#column-container", {
      id: "column-02",
      className: "container-column",
   });
   createFullElement("h2", "#column-02", {
      textContent: "In Progress",
   });
   createFullElement("div", "#column-container", {
      id: "column-03",
      className: "container-column",
   });
   createFullElement("h2", "#column-03", {
      textContent: "Done !",
   });
   //on crée un élément dragable
   createFullElement("template", "#column-01", {
      id: "template",
   });
   createFullElement("div", "#template", {
      textContent: "drag me !",
      id: "to-drag",
      className: "draggable-element",
      draggable: "true",
   });
}
