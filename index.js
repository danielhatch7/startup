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
apiRouter.get("/results", (_req, res) => {
  session_results = getResults(_req.body.sessionID);
  res.send(session_results);
});

// GetInfo TODO: FINISH
apiRouter.get("/info", (_req, res) => {
  session_info = getInfo(_req.body.sessionID);
  res.send(session_info);
});

// GetValid TODO: FINISH
apiRouter.get("/valid", (_req, res) => {
  session_valid = getValid(_req.body.sessionID);
  res.send(session_valid);
});

// StartSession TODO: FINISH
apiRouter.put("/start", (req, res) => {
  scores = startSession(req.body);
});

// SubmitVote TODO: FINISH
apiRouter.post("/vote", (req, res) => {
  session_results = updateVote(req.body, scores);
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

// TODO: FINISH
function startSession(session_info) {
  let sessionID = session_info.sessionID;
  let question = session_info.question;
  let response1 = session_info.response1;
  let response2 = session_info.response2;
  let response3 = session_info.response3;
  let response4 = session_info.response4;

  info.set(sessionID, [question, response1, response2, response3, response4]);
  results.set(sessionID, [0, 0, 0, 0]);
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
function getInfo(sessionID) {
  let valid = info.has(sessionID);
  return valid;
}

// TODO: FINISH
function updateVote(vote_info) {
  let sessionID = vote_info.sessionID;
  let username = vote_info.username;
  let vote = vote_info.vote;

  // FINISH

  let temp = results.get(sessionID);
  return temp;
}

// The high scores are saved in memory and disappear whenever the service is restarted.
function updateScores(newScore, scores) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}
