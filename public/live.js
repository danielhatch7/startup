// Event messages
const VoterJoinedEvent = "voterJoined";
const VoterLeftEvent = "voterLeft";
const BallotCastEvent = "ballotCast";

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
  sessionID;
  socket;

  constructor() {
    this.buttons = new Map();
    this.current_vote = "";
    localStorage.setItem("current_vote", this.current_vote);

    const sessionIDElement = document.querySelector(".session-ID");
    this.sessionID = this.getSessionID();
    sessionIDElement.textContent = this.sessionID;

    loadInfo(this.sessionID);
    loadData(this.sessionID);

    this.configureWebSocket(this.sessionID);

    this.setButtons();
  }

  getSessionID() {
    return localStorage.getItem("sessionID") ?? "Unknown";
  }

  pressButton(button) {
    const vote = button.id;
    this.current_vote = vote;
    localStorage.setItem("current_vote", this.current_vote);
    submitVote(this.sessionID, vote);
    loadResults();

    let responses = this.getResponses();
    responses = responses.split(",");
    const index = vote[vote.length - 1];

    const newVote = { vote: responses[index] };

    this.broadcastEvent(
      this.getPlayerName(),
      BallotCastEvent,
      newVote,
      this.sessionID
    );
  }

  getPlayerName() {
    return localStorage.getItem("userName") ?? "Mystery player";
  }

  getResponses() {
    return localStorage.getItem("responses") ?? "Mystery player";
  }

  setButtons() {
    document.querySelectorAll(".voting-button").forEach((el, i) => {
      if (i < btnDescriptions.length) {
        this.buttons.set(el.id, new Button(btnDescriptions[i], el));
      }
    });
  }

  configureWebSocket(sessionID) {
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    this.socket.onopen = (event) => {
      this.broadcastEvent(
        this.getPlayerName(),
        VoterJoinedEvent,
        {},
        sessionID
      );
      this.broadcastEvent(
        this.getPlayerName(),
        VoterJoinedEvent,
        {},
        sessionID
      );
    };
    this.socket.onclose = (event) => {
      this.broadcastEvent(this.getPlayerName(), VoterLeftEvent, {});
    };
  }

  //TODO: Move to live.js
  broadcastEvent(from, type, value, sessionID) {
    const event = {
      from: from,
      type: type,
      value: value,
      sessionID: sessionID,
    };
    this.socket.send(JSON.stringify(event));
  }
}

function getQuestion() {
  return localStorage.getItem("question") ?? "Unknown";
}

function finishSetup() {
  const question = document.querySelector(".live-question");
  question.textContent = this.getQuestion();

  loadResults();
}

const session = new Session();

async function loadInfo(sessionID) {
  try {
    request = "/api/info/" + sessionID;
    const response2 = await fetch(request);
    const info = await response2.json();

    localStorage.setItem("question", info[0]);
    localStorage.setItem("is_live", info[info.length - 1]);

    let responses = [info[1], info[2], info[3], info[4]];
    localStorage.setItem("responses", responses);

    const current_results = JSON.stringify([
      { response: info[1], result: 0 },
      { response: info[2], result: 0 },
      { response: info[3], result: 0 },
      { response: info[4], result: 0 },
    ]);

    localStorage.setItem("results", current_results);
    finishSetup();
  } catch (err) {
    // TODO FINISH
    console.log("something happened");
    console.log(err);
  }
}

async function loadData(sessionID) {
  try {
    let request = "/api/results/" + sessionID;
    const response1 = await fetch(request);
    const results = await response1.json();

    let responses = localStorage.getItem("responses");
    responses = responses.split(",");

    const current_results = JSON.stringify([
      { response: responses[0], result: results[0] },
      { response: responses[1], result: results[1] },
      { response: responses[2], result: results[2] },
      { response: responses[3], result: results[3] },
    ]);

    localStorage.setItem("results", current_results);
    loadResults();
  } catch (err) {
    // TODO FINISH
    console.log("something happened");
    console.log(err);
  }
}

async function submitVote(sessionID, vote) {
  let userName = localStorage.getItem("userName");
  const newRequest = {
    sessionID: sessionID,
    vote: vote,
    userName: userName,
  };
  try {
    let request = "/api/vote/" + sessionID;
    const response1 = await fetch(request, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newRequest),
    });
    const results = await response1.json();

    let responses = localStorage.getItem("responses");
    responses = responses.split(",");

    const current_results = JSON.stringify([
      { response: responses[0], result: results[0] },
      { response: responses[1], result: results[1] },
      { response: responses[2], result: results[2] },
      { response: responses[3], result: results[3] },
    ]);

    localStorage.setItem("results", current_results);
    loadResults();
  } catch (err) {
    // TODO FINISH
    console.log("something happened");
    console.log(err);
  }
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
      // Maybe use later for if server is down
      // if (line_id == current_vote) {
      //   temp_result += 1;
      // }
      resultTdEl.textContent = temp_result;

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

setInterval(() => {
  const sessionID = localStorage.getItem("sessionID");
  loadData(sessionID);
}, 5000);
