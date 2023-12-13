import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { ResultsTable } from "../results/resultsTable";
import { VoteEvent, VoteNotifier } from "../voteNotifier";
import { Choices } from "./choices";

export function Live() {
  const navigate = useNavigate();
  const [question, setQuestion] = React.useState("");
  const [responses, setResponses] = React.useState([]);

  const sessionID = localStorage.getItem("sessionID");
  let info_request = "/api/info/" + sessionID;
  const userName = localStorage.getItem("userName");

  React.useEffect(() => {
    VoteNotifier.broadcastEvent(userName, VoteEvent.VoterJoined, {}, sessionID);
  }, []);

  React.useEffect(() => {
    fetch(info_request)
      .then((response) => response.json())
      .then((info) => {
        setQuestion(info[0]);
        setResponses([info[1], info[2], info[3], info[4]]);
        localStorage.setItem("responses", JSON.stringify(responses));
        localStorage.setItem("question", JSON.stringify(question));
      })
      .catch(() => {
        const responsesText = localStorage.getItem("responses");
        if (responsesText) {
          setResponses(JSON.parse(responsesText));
        }
      });
  }, []);

  //const webSocket = new WebSocket(sessionID);

  let current_vote = "";
  localStorage.setItem("current_vote", current_vote);

  function close() {
    VoteNotifier.broadcastEvent(userName, VoteEvent.VoterLeft, {}, sessionID);
    navigate("/home");
  }

  return (
    <main className="container-fluid bg-light text-center text-dark">
      <div>
        <h1>Live Voting!</h1>
        <p>Cast your vote and watch the live results!</p>

        <div className="container mt-4">
          <h3>Question: {question}</h3>

          <div>
            <div>
              <legend>Answers</legend>
            </div>
            <div>
              <Choices
                sessionID={sessionID}
                responses={responses}
                userName={userName}
              />
            </div>
          </div>
        </div>

        <div className="container mt-4">
          <h3>Current Results</h3>
          <div>
            <ResultsTable sessionID={sessionID} responses={responses} />
          </div>
        </div>

        <div>
          <span>Session ID: {sessionID}</span>
        </div>

        <div>
          <Button variant="primary" onClick={() => close()}>
            Return Home
          </Button>
        </div>
      </div>
    </main>
  );
}
