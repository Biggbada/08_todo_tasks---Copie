//***On crée l'environnement**** */
createEnvironment();

const container = document.querySelector("#main-container");
const column01 = document.querySelector("#column-01");
const column02 = document.querySelector("#column-02");
const textInput = document.querySelector("#task-input");
const submitButton = document.querySelector("#submit-button");
const toDoCOntainer = document.querySelector("#to-do-tasks-container");
const inProgress = document.querySelector("#in-progress-tasks-container");
const taskList = [];
//***************** */

class Task {
   constructor(text) {
      this.text = text;
   }
   makeADiv() {
      console.log(inProgress);
      const newDiv = document.createElement("div");
      toDoCOntainer.prepend(newDiv);
      newDiv.textContent = this.text;
      newDiv.addEventListener("drag", (event) => {
         console.log("dragging");
      });
      column02.addEventListener("dragover", (event) => {
         console.log("dragover");
         console.log(newDiv);
      });
      column02.addEventListener("dragenter", (event) => {
         console.log("dragenter");
         console.log(newDiv);
      });
      column02.addEventListener("dragleave", (event) => {
         console.log("dragleave");
         console.log(newDiv);
      });
      column02.addEventListener("drop", (event) => {
         console.log("drop");
         console.log(newDiv);
         inProgress.appendChild(newDiv);
      });
   }
}

// Ne pas oublier que le reset divs ne sert à rien ...

//***************** */
//
submitButton.addEventListener("click", (event) => {
   event.preventDefault();
   console.log(textInput.value);
   const submitedTask = new Task(textInput.value);
   submitedTask.makeADiv();
});

//***************** */
function createFullElement(tagName, source, properties) {
   const element = document.createElement(tagName);
   sourceElement = document.querySelector(source);
   sourceElement.appendChild(element);

   for (const property in properties) {
      element[property] = properties[property];
   }

   return element;
}

//***************** */

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
   createFullElement("div", "#column-01", {
      className: "task-container",
      id: "to-do-tasks-container",
   });
   createFullElement("div", "#column-container", {
      id: "column-02",
      className: "container-column",
   });
   createFullElement("h2", "#column-02", {
      textContent: "In Progress",
   });
   createFullElement("div", "#column-02", {
      className: "task-container",
      id: "in-progress-tasks-container",
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
