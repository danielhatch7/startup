const express = require("express");
const app = express();
const DB = require("./database.js");

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
apiRouter.get("/results/*", async (_req, res) => {
  let sessionID = getSessionID(_req.originalUrl);
  let session_results = await DB.getResults(sessionID);
  let results = [];
  if (session_results.length == 0) {
    results = [0, 0, 0, 0];
  } else {
    let results_object = session_results[0];
    results = results_object.results;
  }
  res.send(results);
});

// GetInfo TODO: FINISH
apiRouter.get("/info/*", async (_req, res) => {
  let sessionID = getSessionID(_req.originalUrl);
  let session_data = await DB.getInfo(sessionID);
  let session_info = session_data[0];
  let info = [
    session_info.question,
    session_info.response1,
    session_info.response2,
    session_info.response3,
    session_info.response4,
    session_info.is_live,
  ];

  res.send(info);
});

// GetValid TODO: FINISH
apiRouter.post("/valid/*", async (req, res) => {
  let sessionID = getSessionID(req.originalUrl);
  let valid = await DB.getValid(sessionID);

  let body = req.body;

  if (valid.length == 0) {
    body.message = "Invalid SessionID. Please try again.";
  } else {
    body.message = "";
    body.valid = true;
  }
  let valid_result = [];
  valid_result.push(body);

  res.send(valid_result);
});

// StartSession TODO: FINISH
apiRouter.put("/start", async (req, res) => {
  await DB.startSession(req.body);
});

// StartSession TODO: FINISH
apiRouter.put("/end", async (req, res) => {
  await DB.endSession(req.body);
});

// SubmitVote TODO: FINISH
apiRouter.post("/vote/*", async (req, res) => {
  let sessionID = getSessionID(req.originalUrl);
  let ballots_info = await DB.getVote(sessionID);
  let ballots_object = ballots_info[0];
  let old_ballots = ballots_object.voters;
  let results_info = await DB.getResults(sessionID);
  let results_object = results_info[0];
  let old_results = results_object.results;

  let username = req.body.userName;
  let vote = req.body.vote;
  let vote_index = parseInt(vote[vote.length - 1]);

  let ballots = old_ballots;
  let old_vote = 4;
  let ballot_index = ballots.length;

  for (let i = 0; i < ballots.length; i++) {
    if (ballots[i].userName === username) {
      old_vote = ballots[i].vote;
      ballot_index = i;
    }
  }

  if (old_vote != 4) {
    old_results[old_vote] -= 1;
  }

  old_results[vote_index] += 1;

  if (ballot_index === ballots.length) {
    ballots.push({ userName: username, vote: vote_index });
  } else {
    ballots[ballot_index] = { userName: username, vote: vote_index };
  }

  await DB.updateVote(sessionID, ballots);
  await DB.updateResults(sessionID, old_results);
  let new_results_info = await DB.getResults(sessionID);
  let new_results_object = new_results_info[0];
  let new_results = new_results_object.results;

  res.send(new_results);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// TODO: FINISH
function getSessionID(URL) {
  let pieces = URL.split("/");
  let sessionID = pieces[pieces.length - 1];
  return sessionID;
}
