const btnDescriptions = [
  { name: "response_0" },
  { name: "response_1" },
  { name: "response_2" },
  { name: "response_3" },
];

class Button {
  constructor(description, el) {
    this.el = el;
    this.description = description.name;
  }
}

class Session {
  buttons;
  current_vote;

  constructor() {
    this.buttons = new Map();
    this.current_vote = "";
    localStorage.setItem("current_vote", this.current_vote);

    const sessionID = document.querySelector(".session-ID");
    sessionID.textContent = this.getSessionID();

    loadData();

    const question = document.querySelector(".live-question");
    question.textContent = this.getQuestion();

    loadResults();

    document.querySelectorAll(".voting-button").forEach((el, i) => {
      if (i < btnDescriptions.length) {
        this.buttons.set(el.id, new Button(btnDescriptions[i], el));
      }
    });
  }

  getQuestion() {
    return localStorage.getItem("question") ?? "Unknown";
  }

  getSessionID() {
    return localStorage.getItem("sessionID") ?? "Unknown";
  }

  pressButton(button) {
    const vote = button.id;
    this.current_vote = vote;
    localStorage.setItem("current_vote", this.current_vote);
    loadResults();
  }
}

const session = new Session();

function loadData() {
  // get data from database
  // insert data into database

  // temp placeholders
  const question = "What is your favorite color?";
  const results = JSON.stringify([
    { response: "blue", result: 4 },
    { response: "red", result: 3 },
    { response: "yellow", result: 2 },
    { response: "green", result: 5 },
  ]);

  const is_live = true;

  localStorage.setItem("question", question);
  localStorage.setItem("results", results);
  localStorage.setItem("is_live", is_live);
}

function loadResults() {
  let results = [];
  let labels = [];
  const resultsText = localStorage.getItem("results");
  if (resultsText) {
    results = JSON.parse(resultsText);
  }

  const tableBodyEl = document.querySelector("#results");
  tableBodyEl.innerHTML = "";

  if (results.length) {
    let total_voters = 0;
    for (const [i, line] of results.entries()) {
      const responseTdEl = document.createElement("td");
      const resultTdEl = document.createElement("td");

      const line_id = "btnradio" + i;
      const current_button = document.getElementById(line_id);
      current_button.ariaLabel = line.response;
      labels[i] = line.response;

      responseTdEl.textContent = line.response;
      let temp_result = line.result;
      let current_vote = localStorage.getItem("current_vote");
      if (line_id == current_vote) {
        temp_result += 1;
      }
      resultTdEl.textContent = temp_result;

      console.log(responseTdEl);
      console.log(resultTdEl);

      const rowEl = document.createElement("tr");
      rowEl.appendChild(responseTdEl);
      rowEl.appendChild(resultTdEl);

      tableBodyEl.appendChild(rowEl);
      total_voters += temp_result;
    }

    let button_labels = document.getElementsByTagName("label");

    for (let i = 0; i < button_labels.length; i++) {
      button_labels[i].innerHTML = labels[i];
    }

    const totalTdE1 = document.createElement("td");
    const countTdE1 = document.createElement("td");

    totalTdE1.textContent = "Total Votes:";
    countTdE1.textContent = total_voters;

    const new_row = document.createElement("tr");
    new_row.appendChild(totalTdE1);
    new_row.appendChild(countTdE1);

    tableBodyEl.appendChild(new_row);
  } else {
    tableBodyEl.innerHTML = "<tr><td colSpan=4>No Results Yet :(</td></tr>";
  }
}
