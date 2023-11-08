function login() {
  document.getElementById("username").required = true;
  const nameEl = document.querySelector("#username");
  if (nameEl.value != "") {
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "home.html";
  }
}
