function session() {
  document.getElementById("sessionID").required = true;
  const sessionID = document.querySelector("#sessionID");
  if (sessionID.value != "") {
    localStorage.setItem("sessionID", sessionID.value);
    window.location.href = "live.html";
  }
}
