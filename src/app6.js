//***On crée l'environnement**** */
createEnvironment();

const container = document.querySelector("#main-container");
const column01 = document.querySelector("#column-01");
const column02 = document.querySelector("#column-02");
const textInput = document.querySelector("#task-input");
const submitButton = document.querySelector("#submit-button");
const toDoContainer = document.querySelector("#to-do-tasks-container");
const inProgress = document.querySelector("#in-progress-tasks-container");
const taskContainer = document.querySelectorAll(".task-container");
const taskList = [];

class Task {
   position = "To Do";
   constructor(content) {
      this.content = content;
      this.id = taskList.length + 1;
   }

   createTaskDiv() {
      const newDiv = createFullElement("div", "#to-do-tasks-container", {
         textContent: this.content,
         className: "task-div",
         draggable: "true",
      });

      newDiv.addEventListener("dragstart", (event) => {
         event.dataTransfer.setData("text/plain", this.id);
         event.currentTarget.classList.add("dragging");
      });

      newDiv.addEventListener("dragend", (event) => {
         event.currentTarget.classList.remove("dragging");
      });
   }
}

class TaskManager extends Task {
   constructor(content) {
      super(content);
   }

   createTaskDiv() {
      super.createTaskDiv();

      this.taskDiv.addEventListener("dragenter", (event) => {
         event.preventDefault();
         inProgress.classList.add("targeted");
      });

      this.taskDiv.addEventListener("dragover", (event) => {
         event.preventDefault();
      });

      this.taskDiv.addEventListener("dragleave", (event) => {
         event.preventDefault();
         inProgress.classList.remove("targeted");
      });

      this.taskDiv.addEventListener("drop", (event) => {
         event.preventDefault();
         const taskId = event.dataTransfer.getData("text/plain");
         const task = taskList.find((task) => task.id === parseInt(taskId));
         if (task) {
            inProgress.appendChild(task.taskDiv);
            task.position = "In Progress";
            inProgress.classList.remove("targeted");
         }
      });
   }
}

submitButton.addEventListener("click", (event) => {
   event.preventDefault();
   const newTask = new TaskManager(textInput.value);
   newTask.createTaskDiv();
   taskList.push(newTask);
   textInput.value = "";
});

// Reste du code ...

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
