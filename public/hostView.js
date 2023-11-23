// Event messages
const VoterJoinedEvent = "voterJoined";
const VoterLeftEvent = "voterLeft";
const BallotCastEvent = "ballotCast";

class Session {
  socket;

  constructor() {
    const sessionID = document.querySelector(".session-ID");

    sessionID.textContent = this.getSessionID();

    loadData(sessionID);

    const question = document.querySelector(".live-question");
    question.textContent = this.getQuestion();

    loadResults();

    const host_name = document.querySelector(".voter-name");
    host_name.textContent = this.getHostName();

    this.configureWebSocket(this.getSessionID());
  }

  getSessionID() {
    return localStorage.getItem("sessionID") ?? "unknown";
  }

  getHostName() {
    return localStorage.getItem("userName") ?? "unknown";
  }

  getLiveStatus() {
    return localStorage.getItem("is_live") ?? false;
  }

  getQuestion() {
    return localStorage.getItem("question") ?? "Unknown";
  }

  // Functionality for peer communication using WebSocket

  configureWebSocket(sessionID) {
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    this.socket.onopen = (event) => {
      this.broadcastEvent(
        "this.getPlayerName()",
        VoterJoinedEvent,
        {},
        sessionID
      );
      this.displayMsg("system-event live_status", "Session", "connected");
    };
    this.socket.onclose = (event) => {
      this.displayMsg("system-event live_status", "Session", "disconnected");
    };
    this.socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === BallotCastEvent) {
        this.displayMsg(
          "voter-event voter-name",
          msg.from,
          `voted ${msg.value.vote}`
        );
      } else if (msg.type === VoterJoinedEvent) {
        this.displayMsg("voter-event voter-name", msg.from, `joined`);
      } else if (msg.type === VoterLeftEvent) {
        this.displayMsg("voter-event voter-name", msg.from, `left`);
      }
    };
  }

  displayMsg(cls, from, msg) {
    const chatText = document.querySelector("#voter-messages");
    chatText.innerHTML =
      `<div class="event"><span class="${cls}">${from}</span> ${msg}</div>` +
      chatText.innerHTML;
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

function loadResults() {
  let results = [];
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

      responseTdEl.textContent = line.response;
      resultTdEl.textContent = line.result;

      const rowEl = document.createElement("tr");
      rowEl.appendChild(responseTdEl);
      rowEl.appendChild(resultTdEl);

      tableBodyEl.appendChild(rowEl);
      total_voters += line.result;
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

//loadData(sessionID);
const session = new Session();

async function finishSession() {
  const sessionID = localStorage.getItem("sessionID");
  const newRequest = {
    sessionID: sessionID,
    is_live: false,
  };

  try {
    let request = "/api/end";
    const response = await fetch(request, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newRequest),
    });
    const output = await response.json();

    finishSession();
    // TODO FINISH
  } catch (err) {
    // TODO FINISH
    console.log("something happened");
    doSomething(err);
    console.log(err);
  }
}

function end() {
  finishSession();
  localStorage.setItem("is_live", false);
  window.location.href = "resultsView.html";
}

setInterval(() => {
  const sessionID = localStorage.getItem("sessionID");
  loadData(sessionID);
}, 5000);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
