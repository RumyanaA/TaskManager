function allowDrop(ev) {
        ev.preventDefault();
      }

function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
      }

function removeLiElement() {
  const todoList = document.getElementById("todo");
  const inProgressList = document.getElementById("inProgress");
  for (let i = 0; i < todoList.childNodes.length; i++) {
    if (
      todoList.childNodes[i].hasChildNodes() == false &&
      todoList.childNodes[i].tagName == "LI"
    ) {
      todoList.childNodes[i].remove();
    }
  }
  for (let j = 0; j < inProgressList.childNodes.length; j++) {
    if (
      inProgressList.childNodes[j].hasChildNodes() == false &&
      inProgressList.childNodes[j].tagName == "LI"
    ) {
      inProgressList.childNodes[j].remove();
    }
  }
}
      function drop(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        const li = document.createElement("li");
        if (ev.target.id == "inProgress") {
          const inProgress = document.getElementById("inProgress");
          inProgress.append(li);
          li.append(document.getElementById(data));
          const updateStatus = {
            id: data,
            status_id: 2,
          };
          axios.put("http://localhost:8080/task/updateTaskStatus", updateStatus).then(
            (response) => {},
            (error) => {
              alert(error);
            }
          );
          removeLiElement();
        } else if (ev.target.id == "todo") {
          const toDo = document.getElementById("todo");
          toDo.append(li);
          li.append(document.getElementById(data));
          const draggable = document.createAttribute("draggable");
          draggable.value = "true";
          li.setAttributeNode(draggable);
          li.addEventListener("dragstart", drag);
          const updateStatus = {
            id: data,
            status_id: 1,
          };
          axios.put("http://localhost:8080/task/updateTaskStatus", updateStatus).then(
            (response) => {},
            (error) => {
              alert(error);
            }
          );
          removeLiElement();
        }
      }
      function dropInDoneList(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        const li = document.createElement("li");
        const done = document.getElementById("done");
        done.append(li);
        const dragBut = document.getElementById(data);
        dragBut.setAttribute("draggable", false);
        li.append(document.getElementById(data));
        const updateStatus = {
          id: data,
          status_id: 3,
        };
        axios.put("http://localhost:8080/task/updateTaskStatus", updateStatus).then(
          (response) => {},
          (error) => {
            alert(error);
          }
        );
        removeLiElement();
      }