function changePage() {
  window.location = "registration.html";
}
function registerUser() {
  const username = document.getElementById("username-input").value;
  const userEmail = document.getElementById("reg-email-input").value;
  const userPassword = document.getElementById("reg-password-input").value;
  const repeatedPassword = document.getElementById("repeat-password-input").value;
  if (repeatedPassword !== userPassword) {
    alert("password doesnt match");
  } else {
    const newUser = {
      name: username,
      email: userEmail,
      password: userPassword,
    };
    axios.post("http://localhost:8080/user/registration", newUser).then((response) => {
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
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  axios
    .get(`http://localhost:8080/user/login?email=${email}&password=${password}`)
    .then((response) => {
      if (!response.data) {
        alert("Wrong password or email");
      } else {
        userId = response.data.id;
        userName = response.data.name
        localStorage.setItem("id", Number(userId));
        localStorage.setItem("name", userName);
        window.location = "http://localhost:8080/taskPage.html";
      }
    });
}