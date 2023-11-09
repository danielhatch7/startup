class Session {
  constructor() {
    const sessionIDElement = document.querySelector(".session-ID");
    const sessionID = this.getSessionID();
    sessionIDElement.textContent = sessionID;

    loadData(sessionID);
    loadQuote();
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

function finishSetup() {
  const question = document.querySelector(".live-question");
  question.textContent = this.getQuestion();

  loadResults();

  const live_status = document.querySelector(".live_status");
  let live = this.getLiveStatus();
  if (live != "false") {
    live_status.textContent = "LIVE";
  } else {
    live_status.textContent = "NOT LIVE";
  }
}

function getLiveStatus() {
  return localStorage.getItem("is_live") ?? false;
}

function getQuestion() {
  return localStorage.getItem("question") ?? "Unknown";
}

async function loadData(sessionID) {
  try {
    let request = "/api/results/" + sessionID;
    const response1 = await fetch(request);
    const results = await response1.json();

    request = "/api/info/" + sessionID;
    const response2 = await fetch(request);
    const info = await response2.json();

    localStorage.setItem("question", info[0]);
    localStorage.setItem("is_live", info[info.length - 1]);

    const current_results = JSON.stringify([
      { response: info[1], result: results[0] },
      { response: info[2], result: results[1] },
      { response: info[3], result: results[2] },
      { response: info[4], result: results[3] },
    ]);

    localStorage.setItem("results", current_results);
    finishSetup();
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

setInterval(() => {
  const sessionID = localStorage.getItem("sessionID");
  loadData(sessionID);
}, 5000);

async function loadQuote() {
  const url = "https://api.quotable.io/random";
  fetch(url)
    .then((x) => x.json())
    .then((response) => {
      document.querySelector("#quote").textContent = JSON.stringify(
        response.content,
        null,
        "  "
      );

      let author = JSON.stringify(response.author, null);
      author = author.slice(1, author.length - 1);
      author = "- " + author;

      document.querySelector("#author").textContent = author;
    });
}
