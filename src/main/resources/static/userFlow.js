function changePage() {
  window.location = "registration.html";
}
function registerUser() {
  var username = document.getElementById("userName").value;
  var userEmail = document.getElementById("exampleInputEmail1").value;
  var password = document.getElementById("Password1").value;
  var repeatedpassword = document.getElementById("RepeatPassword1").value;
  if (repeatedpassword != password) {
    alert("password doesnt match");
  } else {
    var objUser = {
      name: username,
      email: userEmail,
      password: password,
    };
    axios.post("http://localhost:8080/user/registration", objUser).then((response) => {
        if (response.data) {
          window.location = "http://localhost:8080/taskPage.html";
        } else {
          alert(response.data);
        }
      },
      (error) => console.log(error)
    );
  }
}

function login() {
  var email = document.getElementById("exampleInputEmail1").value;
  var password = document.getElementById("exampleInputPassword1").value;
  axios
    .get(`http://localhost:8080/user/login?email=${email}&password=${password}`)
    .then((response) => {
      if (!response.data) {
        alert("Wrong password or email");
      } else {
        userId = response.data.id;
        userName = response.data.name
        localStorage.setItem("id", userId);
        localStorage.setItem("name", userName);
        window.location = "http://localhost:8080/taskPage.html";
      }
    });
}