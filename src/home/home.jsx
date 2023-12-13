import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export function Home({ userName }) {
  const navigate = useNavigate();

  return (
    <main className="container-fluid bg-light text-center text-dark">
      <div>
        <h1 className="user">
          Welcome <span className="user_name">{userName}</span>
        </h1>
        <p>Click on an option to begin</p>

        <div className="container align-items-center">
          <div className="row mt-3">
            <Button variant="outline-primary" onClick={() => navigate("/join")}>
              Join a Live Voting Session
            </Button>
          </div>
          <div className="row mt-3">
            <Button
              variant="outline-success"
              onClick={() => navigate("/start")}>
              Start a Live Session
            </Button>
          </div>
          <div className="row mt-3">
            <Button
              variant="outline-danger"
              onClick={() => navigate("/results")}>
              View Results
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
