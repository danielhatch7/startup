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

    const question = questionEl.value;
    const response1 = answer1El.value;
    const response2 = answer2El.value;
    const response3 = answer3El.value;
    const response4 = answer4El.value;

    const results = JSON.stringify([
      { response: answer1El.value, result: 0 },
      { response: answer2El.value, result: 0 },
      { response: answer3El.value, result: 0 },
      { response: answer4El.value, result: 0 },
    ]);

    const is_live = true;

    localStorage.setItem("results", results);
    localStorage.setItem("is_live", is_live);

    let idNumber = this.generateRandomNumber().toString();
    localStorage.setItem("sessionID", idNumber);

    const info = [
      idNumber,
      is_live,
      question,
      response1,
      response2,
      response3,
      response4,
    ];

    let responses = [info[3], info[4], info[5], info[6]];
    localStorage.setItem("responses", responses);

    sendInfo(info);

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

async function sendInfo(info) {
  const newRequest = {
    sessionID: info[0],
    is_live: info[1],
    question: info[2],
    response1: info[3],
    response2: info[4],
    response3: info[5],
    response4: info[6],
  };

  try {
    let request = "/api/start";
    const response = await fetch(request, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newRequest),
    });
    const output = await response.json();
    // TODO FINISH
  } catch (err) {
    // TODO FINISH
    console.log("something happened");
    doSomething(err);
    console.log(err);
  }
}
