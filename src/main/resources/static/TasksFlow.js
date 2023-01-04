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
        for (let i = 0; i < userTasks?.length; i++) {
          if (userTasks[i].status.name === "ToDo") {
            addTask(
              userTasks[i].id,
              "todo",
              userTasks[i].title
            );
          } else if (userTasks[i].status.name === "InProgress") {
            addTask(
              userTasks[i].id,
              "inProgress",
              userTasks[i].title
            );
          } else if (userTasks[i].status.name === "Done") {
            addTask(
              userTasks[i].id,
              "done",
              userTasks[i].title
            );
          }
        }
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
