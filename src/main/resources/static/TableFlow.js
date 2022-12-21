function allowDrop(ev) {
        ev.preventDefault();
      }

      function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
      }

      function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        var li = document.createElement("li");
        if (ev.target.id == "inProgress") {
          var inprogress = document.getElementById("inProgress");
          inprogress.append(li);
          li.append(document.getElementById(data));

          var updateStatus = {
            taskId: data,
            taskStatus: ev.target.id,
          };
          axios.put("http://localhost:5000/moveTask", updateStatus).then(
            (response) => {
              alert(response.data);
            },
            (error) => {
              console.log(error);
            }
          );

          liRemove();
        } else if (ev.target.id == "todo") {
          var toDo = document.getElementById("todo");
          toDo.append(li);
          li.append(document.getElementById(data));
          var draggable = document.createAttribute("draggable");
          draggable.value = "true";
          li.setAttributeNode(draggable);
          li.addEventListener("dragstart", drag);

          var updateStatus = {
            taskId: data,
            taskStatus: ev.target.id,
          };
          axios.put("http://localhost:5000/moveTask", updateStatus).then(
            (response) => {
              alert(response.data);
            },
            (error) => {
              console.log(error);
            }
          );

          liRemove();
        }
      }
      function drop2(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        var li = document.createElement("li");
        var done = document.getElementById("done");
        done.append(li);
        var dragBut = document.getElementById(data);
        dragBut.setAttribute("draggable", false);
        li.append(document.getElementById(data));

        var updateStatus = {
          taskId: data,
          taskStatus: ev.target.id,
        };
        axios.put("http://localhost:5000/moveTask", updateStatus).then(
          (response) => {
            alert(response.data);
          },
          (error) => {
            console.log(error);
          }
        );

        liRemove();
      }