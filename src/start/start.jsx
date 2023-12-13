import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { MessageDialog } from "../messageDialog";

export function Start(props) {
  const navigate = useNavigate();
  const [question, setQuestion] = React.useState("");
  const [response1, setResponse1] = React.useState("");
  const [response2, setResponse2] = React.useState("");
  const [response3, setResponse3] = React.useState("");
  const [response4, setResponse4] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 900000) + 100000;
  }

  const sessionID = generateRandomNumber().toString();

  async function startSession({
    question,
    response1,
    response2,
    response3,
    response4,
  }) {
    const q = question;
    const r1 = response1;
    const r2 = response2;
    const r3 = response3;
    const r4 = response4;
    const is_live = true;

    if (q === "" || r1 === "" || r2 === "" || r3 === "" || r4 === "") {
      const message = "Make sure to fill in all fields.";
      setDisplayError(`⚠ Error: ${message}`);
      //console.log("You missed something");
    } else {
      const results = JSON.stringify([
        { response: r1, result: 0 },
        { response: r2, result: 0 },
        { response: r3, result: 0 },
        { response: r4, result: 0 },
      ]);

      localStorage.setItem("results", results);
      localStorage.setItem("is_live", is_live);
      localStorage.setItem("sessionID", sessionID);

      const info = [sessionID, is_live, q, r1, r2, r3, r4];

      let responses = [info[3], info[4], info[5], info[6]];
      localStorage.setItem("responses", responses);

      sendInfo(info);
      //console.log("You did it");
    }
  }

  async function sendInfo(info) {
    const newRequest = {
      sessionID: info[0],
      is_live: info[1],
      question: info[2],
      response1: info[3],
      response2: info[4],
      response3: info[5],
      response4: info[6],
    };

    const request = "/api/start";

    const response = await fetch(request, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(newRequest),
    });
    if (response?.status === 200) {
      navigate("/hostView");
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <main className="container-fluid bg-light text-center text-dark">
      <div>
        <h1>Join Live Voting Session</h1>
        <p>Enter the session ID to join the live session</p>
        <div>
          <div className="input-group mb-3">
            <span className="input-group-text">Question:</span>
            <input
              className="form-control"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What's your favorite color?"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Response 1:</span>
            <input
              className="form-control"
              type="text"
              value={response1}
              onChange={(e) => setResponse1(e.target.value)}
              placeholder="Red"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Response 2:</span>
            <input
              className="form-control"
              type="text"
              value={response2}
              onChange={(e) => setResponse2(e.target.value)}
              placeholder="Blue"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Response 3:</span>
            <input
              className="form-control"
              type="text"
              value={response3}
              onChange={(e) => setResponse3(e.target.value)}
              placeholder="Yellow"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Response 4:</span>
            <input
              className="form-control"
              type="text"
              value={response4}
              onChange={(e) => setResponse4(e.target.value)}
              placeholder="Green"
            />
          </div>
        </div>
        <div className="mt-3">
          <Button
            variant="primary"
            onClick={() =>
              startSession({
                question,
                response1,
                response2,
                response3,
                response4,
              })
            }>
            Start Session
          </Button>
        </div>
      </div>
      <MessageDialog
        message={displayError}
        onHide={() => setDisplayError(null)}
      />
    </main>
  );
}
