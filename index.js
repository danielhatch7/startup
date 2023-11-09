const express = require("express");
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static("public"));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetResults TODO: FINISH
apiRouter.get("/results/*", (_req, res) => {
  let sessionID = getSessionID(_req.originalUrl);
  let session_results = getResults(sessionID);
  res.send(session_results);
});

// GetInfo TODO: FINISH
apiRouter.get("/info/*", (_req, res) => {
  let sessionID = getSessionID(_req.originalUrl);
  let session_info = getInfo(sessionID);
  res.send(session_info);
});

// GetValid TODO: FINISH
apiRouter.post("/valid/*", (req, res) => {
  let sessionID = getSessionID(req.originalUrl);
  valid = getValid(req.body, valid);

  res.send(valid);
});

// StartSession TODO: FINISH
apiRouter.put("/start", (req, res) => {
  startSession(req.body);
});

// StartSession TODO: FINISH
apiRouter.put("/end", (req, res) => {
  endSession(req.body);
  res.send(valid);
});

// SubmitVote TODO: FINISH
apiRouter.post("/vote/*", (req, res) => {
  session_results = updateVote(req.body);
  res.send(session_results);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// The results and info are saved in memory and disappear whenever the service is restarted.
let results = new Map();
let info = new Map();
let voters = new Map();
let valid = [];

// TODO: FINISH
function getSessionID(URL) {
  let pieces = URL.split("/");
  let sessionID = pieces[pieces.length - 1];
  return sessionID;
}

// TODO: FINISH
function startSession(session_info) {
  let sessionID = session_info.sessionID;
  let question = session_info.question;
  let response1 = session_info.response1;
  let response2 = session_info.response2;
  let response3 = session_info.response3;
  let response4 = session_info.response4;
  let is_live = session_info.is_live;

  info.set(sessionID, [
    question,
    response1,
    response2,
    response3,
    response4,
    is_live,
  ]);
  results.set(sessionID, [0, 0, 0, 0]);
  voters.set(sessionID, []);
}

function endSession(session_info) {
  let sessionID = session_info.sessionID;
  let is_live = session_info.is_live;

  let current = info.get(sessionID);
  current[current.length - 1] = is_live;

  info.set(sessionID, current);
}

// TODO: FINISH
function getResults(sessionID) {
  let temp = results.get(sessionID);
  return temp;
}

// TODO: FINISH
function getInfo(sessionID) {
  let temp = info.get(sessionID);
  return temp;
}

// TODO: FINISH
function getValid(body, valid) {
  valid.length = 0;
  let sessionID = body.sessionID;
  let temp = info.has(sessionID);

  body.valid = temp;

  if (temp) {
    body.message = "";
  } else {
    body.message = "Invalid SessionID. Please try again.";
  }
  valid.push(body);

  return valid;
}

// TODO: FINISH
function updateVote(vote_info) {
  let sessionID = vote_info.sessionID;
  let username = vote_info.userName;
  let vote = vote_info.vote;
  let vote_index = parseInt(vote[vote.length - 1]);

  // FINISH
  let ballots = voters.get(sessionID);
  let old_vote = 4;
  let ballot_index = ballots.length;

  for (let i = 0; i < ballots.length; i++) {
    if (ballots[i].userName === username) {
      old_vote = ballots[i].vote;
      ballot_index = i;
    }
  }

  let temp = results.get(sessionID);

  if (old_vote != 4) {
    temp[old_vote] -= 1;
  }

  if (ballot_index === ballots.length) {
    ballots.push({ userName: username, vote: vote_index });
  } else {
    ballots[ballot_index] = { userName: username, vote: vote_index };
  }

  temp[vote_index] += 1;

  voters.set(sessionID, ballots);
  results.set(sessionID, temp);
  return temp;
}
