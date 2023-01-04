let userId;


let currentlySelectedTaskId;

const allUserTasks = [];
function addTask(id, listId, taskTitle) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  const buttonType = document.createAttribute("type");
  buttonType.value = "button";
  button.setAttributeNode(buttonType);

  const toggleAttribute = document.createAttribute("data-bs-toggle");
  toggleAttribute.value = "modal";
  button.setAttributeNode(toggleAttribute);

  const targetAttribute = document.createAttribute("data-bs-target");
  targetAttribute.value = "#taskModal";
  button.setAttributeNode(targetAttribute);
  button.addEventListener("click", openTaskDetails);
  button.textContent = taskTitle;
  li.append(button);

  const ul = document.getElementById(listId);
  const draggableAttr = document.createAttribute("draggable");
  draggableAttr.value = listId !== "done";
  button.setAttributeNode(draggableAttr);
  const idAttr = document.createAttribute("id");
  idAttr.value = id;
  button.setAttributeNode(idAttr);
  button.addEventListener("dragstart", drag);
  ul.append(li);
}
function openTaskDetails(event) {
  const taskDesc = document.getElementById("taskDesc");
  const taskTitle = document.getElementById("taskTitle");
  axios
    .get("http://localhost:8080/task/getTaskById", {
      params: {
        taskId: event.target.id,
      },
    })
    .then(
      (response) => {
        const currentTask = response?.data;
        currentlySelectedTaskId = response?.data?.id;
        taskTitle.value = currentTask.title;
        taskDesc.value = currentTask.description;
        if (currentTask.status == "done") {
          document.getElementById("bSave").style.display = "none";
          document.getElementById("bEdit").style.display = "none";
        } else {
          document.getElementById("bSave").style.display = "none";
          document.getElementById("bEdit").style.display = "block";
        }
      },
      (error) => {
        console.log(error);
      }
    );
}

function createTask() {
  const taskTitle = document.getElementById("title").value;
  const taskDesc = document.getElementById("description").value;
  const newTask = {
    user_id: userId,
    title: taskTitle,
    description: taskDesc,
    status_id: 1,
  };

  const li = document.createElement("li");
  const button = document.createElement("button");
  const buttonType = document.createAttribute("type");
  buttonType.value = "button";
  button.setAttributeNode(buttonType);

  const toggleAttribute = document.createAttribute("data-bs-toggle");
  toggleAttribute.value = "modal";
  button.setAttributeNode(toggleAttribute);

  const targetAttribute = document.createAttribute("data-bs-target");
  targetAttribute.value = "#taskModal";
  button.setAttributeNode(targetAttribute);
  button.addEventListener("click", openTaskDetails);
  button.textContent = taskTitle;

  li.append(button);
  const draggableAttr = document.createAttribute("draggable");
  draggableAttr.value = "true";
  button.setAttributeNode(draggableAttr);

  //send newTask to server
  //req.body=newTask;
  axios.post("http://localhost:8080/task/saveTask", newTask).then(
    (response) => {
       newTask.id=response.data;
      const id = document.createAttribute("id");
      id.value = response?.data;
      button.setAttributeNode(id);
    },
    (error) => {
      console.log(error);
    }
  );

  allUserTasks.push(newTask);
  button.addEventListener("dragstart", drag);
  const todo = document.getElementById("todo");
  todo.append(li);
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
}
function distributeTasks(tasksToDistribute){
for (let i = 0; i < tasksToDistribute?.length; i++) {
          if (tasksToDistribute[i].status.name === "ToDo") {
            addTask(
              tasksToDistribute[i].id,
              "todo",
              tasksToDistribute[i].title
            );
          } else if (tasksToDistribute[i].status.name === "InProgress") {
            addTask(
              tasksToDistribute[i].id,
              "inProgress",
              tasksToDistribute[i].title
            );
          } else if (tasksToDistribute[i].status.name === "Done") {
            addTask(
              tasksToDistribute[i].id,
              "done",
              tasksToDistribute[i].title
            );
          }
        }
}
function onLoad() {
  userId = localStorage.getItem("id");
  axios
    .get("http://localhost:8080/task/getTasks", {
      params: {
        userId: userId,
      },
    })
    .then(
      (response) => {
        userTasks = response?.data;
        distributeTasks(userTasks);
      },
      (error) => {
        console.log(error);
      }
    );
  document.getElementById("bSave").style.display = "none";
}
function editTask() {
  document.getElementById("bSave").style.display = "block";
  document.getElementById("bEdit").style.display = "none";
  const taskTitle = document.getElementById("taskTitle");
  const taskDesc = document.getElementById("taskDesc");
  taskTitle.readOnly = false;
  taskDesc.readOnly = false;
}

function updateTask(event) {
  document.getElementById("bSave").style.display = "none";
  document.getElementById("bEdit").style.display = "block";
  const taskTitle = document.getElementById("taskTitle");
  const taskDesc = document.getElementById("taskDesc");
  taskTitle.readOnly = true;
  taskDesc.readOnly = true;
  const button = document.getElementById(currentlySelectedTaskId);
  const taskToUpdate = {
    id: currentlySelectedTaskId,
    title: taskTitle.value,
    description: taskDesc.value,
  };
  axios.put("http://localhost:8080/task/updateTask", taskToUpdate).then((response) => {
    if(response?.data === 1){
     for (let i = 0; i < allUserTasks.length; i++) {
          if (allUserTasks[i].id == currentlySelectedTaskId) {
            allUserTasks[i].title = taskTitle.value;
            allUserTasks[i].description = taskDesc.value;
          }
        }
        button.textContent = taskTitle.value;
      };
    })
    }


function deleteTask(event) {
  const liTarget = document.getElementById(currentlySelectedTaskId);
  liTarget.parentNode.remove();

  axios
    .delete("http://localhost:8080/task/deleteTask", {
      params: {
        taskId: currentlySelectedTaskId,
      },
    })
    .then(
      (response) => {
      response?.data === 1? alert("Task deleted successfully"): alert("Something went wrong");
      },
      (error) => {
        console.log(error);
      }
    );
  for (let i = 0; i < allUserTasks.length; i++) {
    if (allUserTasks[i].id == currentlySelectedTaskId) {
      allUserTasks.splice(i, 1);
    }
  }
}
function debounce(func, timeout = 1000){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
function getTasksByTitle(){
  const taskTitle = document.getElementById("title-search-input").value;
  const todoList = document.getElementById("todo");
  while(todoList.firstChild) todoList.removeChild(todoList.firstChild);
  const inProgressList = document.getElementById("inProgress");
  while(inProgressList.firstChild) inProgressList.removeChild(inProgressList.firstChild);
  const doneList = document.getElementById("done");
  while(doneList.firstChild) doneList.removeChild(doneList.firstChild);
 axios
     .get("http://localhost:8080/task/getTasksByTitle", {
       params: {
         title: taskTitle,
         userId: userId
       },
     })
     .then(
     (response) => {
          userTasks = response?.data;
          distributeTasks(userTasks);
           },
           (error) => {
             console.log(error);
           }
      )
}
const inputChange = debounce(() => getTasksByTitle());