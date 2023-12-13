import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { ResultsTable } from "../results/resultsTable";
import { VoteEvent, VoteNotifier } from "../voteNotifier";
import { Voters } from "../voters";

export function HostView() {
  const navigate = useNavigate();

  const [question, setQuestion] = React.useState("");
  const [responses, setResponses] = React.useState([]);
  const [is_live, setIsLive] = React.useState("");

  const sessionID = localStorage.getItem("sessionID");
  const userName = localStorage.getItem("userName");
  let info_request = "/api/info/" + sessionID;

  VoteNotifier.broadcastEvent(userName, VoteEvent.VoterJoined, {}, sessionID);

  React.useEffect(() => {
    fetch(info_request)
      .then((response) => response.json())
      .then((info) => {
        setQuestion(info[0]);
        setResponses([info[1], info[2], info[3], info[4]]);
        let status;
        if (info[5]) {
          status = "LIVE";
        } else {
          status = "FINISHED";
        }

        setIsLive(status);
        localStorage.setItem("responses", JSON.stringify(responses));
        localStorage.setItem("question", JSON.stringify(question));
        localStorage.setItem("is_live", is_live);
      })
      .catch(() => {
        const responsesText = localStorage.getItem("responses");
        if (responsesText) {
          setResponses(JSON.parse(responsesText));
        }
      });
  }, []);

  return (
    <main className="bg-light text-dark">
      <Voters userName={userName} sessionID={sessionID} />
      <div className="container-fluid bg-light text-center text-dark">
        <h1>Host View</h1>
        <p>Share the session ID with your friends so they can start voting</p>
        <p>Then watch below you to see the live results as they come in!</p>
        <div>
          <p>Session ID: {sessionID}</p>
        </div>

        <div className="container mt-4">
          <h3>Question: {question}</h3>
          <h3>Current Results</h3>
          <div>
            <ResultsTable sessionID={sessionID} responses={responses} />
          </div>
        </div>

        <div>
          <p>The session is: {is_live}</p>
        </div>

        <div>
          <Button variant="primary" onClick={() => navigate("/home")}>
            Return Home
          </Button>
        </div>
      </div>
    </main>
  );
}
