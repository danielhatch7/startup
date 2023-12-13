import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { MessageDialog } from "../messageDialog";

export function Results(props) {
  const navigate = useNavigate();
  const [sessionID, setSessionID] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);

  async function joinSession({ sessionID }) {
    trySession(sessionID);
  }

  async function trySession(sessionID) {
    let endpoint = "/api/valid/" + sessionID;
    let valid = true;
    const newRequest = {
      sessionID: sessionID,
      valid: valid,
      message: "",
    };

    const response = await fetch(endpoint, {
      method: "post",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(newRequest),
    });
    if (response?.status === 200) {
      const output = await response.json();
      if (output[0].valid === true) {
        localStorage.setItem("sessionID", sessionID);
        navigate("/resultsView");
      } else {
        const message = output[0].message;
        setDisplayError(`⚠ Error: ${message}`);
      }
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <main className="container-fluid bg-light text-center text-dark">
      <div>
        <h1>View Session Results</h1>
        <p>Enter the session ID to view the results.</p>
        <div>
          <div className="input-group mb-3">
            <span className="input-group-text">Session ID:</span>
            <input
              className="form-control"
              type="text"
              value={sessionID}
              onChange={(e) => setSessionID(e.target.value)}
              placeholder="123456"
            />
          </div>
        </div>
        <div className="mt-3">
          <Button variant="primary" onClick={() => joinSession({ sessionID })}>
            View Results
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
