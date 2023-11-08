class Session {
  constructor() {
    const sessionID = document.querySelector(".session-ID");
    sessionID.textContent = this.getSessionID();

    loadData(sessionID);

    const question = document.querySelector(".live-question");
    question.textContent = this.getQuestion();

    loadResults();

    const live_status = document.querySelector(".live_status");
    let live = this.getLiveStatus();
    if (live) {
      live_status.textContent = "LIVE";
    } else [(live_status.textContent = "NOT LIVE")];
  }

  getSessionID() {
    return localStorage.getItem("sessionID") ?? "Unknown";
  }

  getLiveStatus() {
    return localStorage.getItem("is_live") ?? false;
  }

  getQuestion() {
    return localStorage.getItem("question") ?? "Unknown";
  }
}

function loadData(sessionID) {
  // this is where the websocket data will be filled in later
  // const webData = getData(sessionID);
  // const question = webData.question;
  // const results = webData.results;
}

function loadResults() {
  let results = [];
  const resultsText = localStorage.getItem("results");
  if (resultsText) {
    results = JSON.parse(resultsText);
  }

  const tableBodyEl = document.querySelector("#results");

  if (results.length) {
    let total_voters = 0;
    for (const [i, line] of results.entries()) {
      const responseTdEl = document.createElement("td");
      const resultTdEl = document.createElement("td");

      responseTdEl.textContent = line.response;
      resultTdEl.textContent = line.result;

      console.log(responseTdEl);
      console.log(resultTdEl);

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
