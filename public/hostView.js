class Session {
  constructor() {
    const sessionID = document.querySelector(".session-ID");

    sessionID.textContent = this.getSessionID();

    loadData(sessionID);

    const question = document.querySelector(".live-question");
    question.textContent = this.getQuestion();

    loadResults();

    const host_name = document.querySelector(".voter-name");
    host_name.textContent = this.getHostName();

    const live_status = document.querySelector(".live_status");
    let live = this.getLiveStatus();
    if (live) {
      live_status.textContent = "session LIVE";
    } else [(live_status.textContent = "NOT LIVE")];
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
}

function loadData(sessionID) {
  // this is where the websocket data will be filled in later
  // const webData = getData(sessionID);
  // const question = webData.question;
  // const results = webData.results;
  // temp placeholders
  // const question = "What is your favorite color?";
  // const results = JSON.stringify([
  //  { response: "blue", result: 4 },
  //  { response: "red", result: 3 },
  //  { response: "yellow", result: 2 },
  //  { response: "red", result: 5 },
  // ]);
  // const is_live = true;
  //localStorage.setItem("question", question);
  //localStorage.setItem("results", results);
  //localStorage.setItem("is_live", is_live);
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

function end() {
  // TODO fill this in
  localStorage.setItem("is_live", false);
  window.location.href = "resultsView.html";
}

setInterval(() => {
  const statuses = ["joined", "voted"];
  const names = [
    "Daniel",
    "Hannah",
    "Jacob",
    "Sarah",
    "Paul",
    "Joseph",
    "Christopher",
    "Alice",
    "Bob",
    "Carol",
    "Dave",
    "Eve",
    "Frank",
    "George",
    "Hannah",
    "Ian",
    "Jack",
    "Jill",
    "John",
    "Joseph",
    "Karen",
    "Kevin",
    "Lisa",
    "Luke",
    "Mary",
    "Matthew",
    "Michael",
    "Michelle",
    "Nathan",
    "Olivia",
    "Peter",
    "Rachel",
    "Rebecca",
    "Richard",
    "Robert",
    "Sarah",
    "Scott",
    "Stephen",
    "Susan",
    "Thomas",
    "Timothy",
    "Victoria",
    "William",
    "Zachary",
    "Amelia",
    "Ava",
    "Benjamin",
    "Caleb",
    "Charlotte",
    "Connor",
    "Elijah",
    "Emma",
    "Ethan",
    "Everleigh",
    "Faith",
    "Harper",
    "Henry",
    "Isabel",
    "Jack",
    "Jaiden",
    "Jasmine",
    "Jayden",
    "Jennifer",
    "John",
    "Josephine",
    "Joshua",
    "Julia",
    "Julian",
    "Liam",
    "Lily",
    "Logan",
    "Lucas",
    "Lucy",
    "Madeline",
    "Madison",
    "Matthew",
    "Maya",
    "Michael",
    "Mia",
    "Nathan",
    "Noah",
    "Olivia",
    "Owen",
    "Paige",
    "Parker",
    "Patrick",
    "Peter",
    " Peyton",
    "Rachel",
    "Rebecca",
    "Riley",
    "Robert",
    "Ryan",
    "Sarah",
    "Sophia",
    "Sydney",
    "Taylor",
    "Thomas",
    "William",
  ];
  let status = statuses[getRandomInt(statuses.length)];
  let name = names[getRandomInt(names.length)];
  const chatText = document.querySelector("#voter-messages");
  chatText.innerHTML =
    `<div class="event"><span class="voter-event voter-name">${name} </span>${status}</div>` +
    chatText.innerHTML;
}, 10000);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
