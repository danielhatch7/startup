function start() {
  document.getElementById("question").required = true;
  document.getElementById("answer_1").required = true;
  document.getElementById("answer_2").required = true;
  document.getElementById("answer_3").required = true;
  document.getElementById("answer_4").required = true;

  const questionEl = document.querySelector("#question");
  const answer1El = document.querySelector("#answer_1");
  const answer2El = document.querySelector("#answer_2");
  const answer3El = document.querySelector("#answer_3");
  const answer4El = document.querySelector("#answer_4");

  if (questionEl.value != "") {
    localStorage.setItem("question", questionEl.value);

    const question = "What is your favorite color?";
    const results = JSON.stringify([
      { response: answer1El.value, result: 0 },
      { response: answer2El.value, result: 0 },
      { response: answer3El.value, result: 0 },
      { response: answer4El.value, result: 0 },
    ]);

    const is_live = true;

    localStorage.setItem("results", results);
    localStorage.setItem("is_live", is_live);

    let idNumber = this.generateSessionID().toString();
    localStorage.setItem("sessionID", idNumber);

    window.location.href = "hostView.html";
  }
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 900000) + 100000;
}

function add() {
  document.getElementById("username").required = true;
  const nameEl = document.querySelector("#username");
  if (nameEl.value != "") {
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "home.html";
  }
}
