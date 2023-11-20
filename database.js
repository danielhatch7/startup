const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("startup");
const resultsCollection = db.collection("results");
const infoCollection = db.collection("info");
const votersCollection = db.collection("voters");
const userCollection = db.collection("user");

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(
    `Unable to connect to database with ${url} because ${ex.message}`
  );
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

// TODO: FINISH
async function startSession(session_info) {
  let sessionID = session_info.sessionID;

  // ADDED

  temp_results = {
    sessionID: sessionID,
    results: [0, 0, 0, 0],
  };

  temp_voters = {
    sessionID: sessionID,
    voters: [],
  };

  await infoCollection.insertOne(session_info);
  await resultsCollection.insertOne(temp_results);
  const result = await votersCollection.insertOne(temp_voters);

  return result;
}

async function endSession(session_info) {
  let sessionID = session_info.sessionID;
  let is_live = session_info.is_live;

  // ADDED
  const filter = { sessionID: sessionID };
  const updateDoc = {
    $set: {
      is_live: is_live,
    },
  };

  const result = await resultsCollection.updateOne(filter, updateDoc);
  return result;
}

// TODO: FINISH
async function getResults(sessionID) {
  // ADDED
  const query = { sessionID: sessionID };
  const options = {
    limit: 1,
  };

  const cursor = resultsCollection.find(query, options);
  return cursor.toArray();
}

// TODO: FINISH
async function getInfo(sessionID) {
  // ADDED
  const query = { sessionID: sessionID };
  const options = {
    limit: 1,
  };

  const cursor = infoCollection.find(query, options);
  return cursor.toArray();
}

// TODO: FINISH
async function getValid(sessionID) {
  // ADDED
  const query = { sessionID: sessionID };
  const options = {
    limit: 1,
  };

  const cursor = infoCollection.find(query, options);
  const results = cursor.toArray();

  return results;
}

//TODO: FINISH
async function getVote(sessionID) {
  // ADDED
  const query = { sessionID: sessionID };
  const cursor = votersCollection.find(query);
  return cursor.toArray();
}

// TODO: FINISH
async function updateVote(sessionID, ballots) {
  const filter = { sessionID: sessionID };
  let updateDoc = {
    $set: {
      voters: ballots,
    },
  };
  await votersCollection.updateOne(filter, updateDoc);
}

async function updateResults(sessionID, results) {
  const filter = { sessionID: sessionID };
  updateDoc = {
    $set: {
      results: results,
    },
  };
  const result = await resultsCollection.updateOne(filter, updateDoc);

  return result;
}

module.exports = {
  startSession,
  endSession,
  getResults,
  getInfo,
  getValid,
  updateVote,
  updateResults,
  getVote,
  getUserByToken,
  getUser,
  createUser,
};
