var userId;


var idd;

var arr = [];
function taskAdding(id, ul, valueOftitle) {
  var li = document.createElement("li");
  var button = document.createElement("button");
  var tAttribute = document.createAttribute("type");
  tAttribute.value = "button";
  button.setAttributeNode(tAttribute);

  var bAttribute = document.createAttribute("data-bs-toggle");
  bAttribute.value = "modal";
  button.setAttributeNode(bAttribute);

  var butAttribute = document.createAttribute("data-bs-target");
  butAttribute.value = "#taskModal";
  button.setAttributeNode(butAttribute);
  button.addEventListener("click", modalButton);
  button.textContent = valueOftitle;

  li.append(button); //='<button type="button"> </button>'
  var draggable = document.createAttribute("draggable");
  draggable.value = "true";
  button.setAttributeNode(draggable);
  var idAttr = document.createAttribute("id");
  idAttr.value = id;
  button.setAttributeNode(idAttr);
  button.addEventListener("dragstart", drag);
  ul.append(li);
}
function modalButton(event) {
  var pDescr = document.getElementById("taskDesc");
  var htitle = document.getElementById("taskTitle");
  axios
    .get("http://localhost:8080/task/getTaskById", {
      params: {
        taskId: event.target.id,
      },
    })
    .then(
      (response) => {
        var clickedTask = response?.data;
        idd = response?.data?.id;
        htitle.value = clickedTask.title;
        pDescr.value = clickedTask.description;
        if (clickedTask.status == "done") {
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
  var valueOftitle = document.getElementById("title").value;
  var valueOfDescr = document.getElementById("floatingTextarea2").value;
  var obj = {
    user_id: userId,
    title: valueOftitle,
    description: valueOfDescr,
    status_id: 1,
  };

  var li = document.createElement("li");
  var button = document.createElement("button");
  var tAttribute = document.createAttribute("type");
  tAttribute.value = "button";
  button.setAttributeNode(tAttribute);

  var bAttribute = document.createAttribute("data-bs-toggle");
  bAttribute.value = "modal";
  button.setAttributeNode(bAttribute);

  var butAttribute = document.createAttribute("data-bs-target");
  butAttribute.value = "#taskModal";
  button.setAttributeNode(butAttribute);
  button.addEventListener("click", modalButton);
  button.textContent = valueOftitle;

  li.append(button); //='<button type="button"> </button>'
  var draggable = document.createAttribute("draggable");
  draggable.value = "true";
  button.setAttributeNode(draggable);

  //send obj to server
  //req.body=obj;
  axios.post("http://localhost:8080/task/saveTask", obj).then(
    (response) => {
       obj.id=response.data;
      var id = document.createAttribute("id");
      id.value = response?.data;
      button.setAttributeNode(id);
    },
    (error) => {
      console.log(error);
    }
  );

  arr.push(obj);
  button.addEventListener("dragstart", drag);
  var todo = document.getElementById("todo");
  todo.append(li);
  document.getElementById("title").value = "";
  document.getElementById("floatingTextarea2").value = "";
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
        for (var i = 0; i < userTasks?.length; i++) {
          if (userTasks[i].status.name === "ToDo") {
            taskAdding(
              userTasks[i].id,
              document.getElementById("todo"),
              userTasks[i].title
            );
          } else if (userTasks[i].status.name === "InProgress") {
            taskAdding(
              userTasks[i].id,
              document.getElementById("inProgress"),
              userTasks[i].title
            );
          } else if (userTasks[i].status.name == "Done") {
            taskAdding(
              userTasks[i].id,
              document.getElementById("done"),
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
  var htitle = document.getElementById("taskTitle");
  var pDescr = document.getElementById("taskDesc");
  htitle.readOnly = false;
  pDescr.readOnly = false;
}

function saveTask(event) {
  document.getElementById("bSave").style.display = "none";
  document.getElementById("bEdit").style.display = "block";
  var htitle = document.getElementById("taskTitle");
  var pDescr = document.getElementById("taskDesc");
  htitle.readOnly = true;
  pDescr.readOnly = true;
  var but = document.getElementById(idd);
  var update = {
    button: idd,
    title: htitle.value,
    description: pDescr.value,
  };
  axios.put("http://localhost:5000/getCurrentTask", update).then((response) => {
    taskToSave = response.data;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == idd) {
        arr[i].title = htitle.value;
        arr[i].description = pDescr.value;
      }
    }

    but.textContent = htitle.value;
  });
}
function liRemove() {
  var ulID = document.getElementById("todo");
  var ulID2 = document.getElementById("inProgress");
  for (let i = 0; i < ulID.childNodes.length; i++) {
    if (
      ulID.childNodes[i].hasChildNodes() == false &&
      ulID.childNodes[i].tagName == "LI"
    ) {
      ulID.childNodes[i].remove();
    }
  }
  for (let j = 0; j < ulID2.childNodes.length; j++) {
    if (
      ulID2.childNodes[j].hasChildNodes() == false &&
      ulID2.childNodes[j].tagName == "LI"
    ) {
      ulID2.childNodes[j].remove();
    }
  }
}

function deleteTask(event) {
  var liTarget = document.getElementById(idd);
  liTarget.parentNode.remove();

  axios
    .delete("http://localhost:8080/task/deleteTask", {
      params: {
        taskId: idd,
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
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id == idd) {
      arr.splice(i, 1);
    }
  }
}
