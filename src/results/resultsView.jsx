import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { ResultsTable } from "./resultsTable";

export function ResultsView() {
  const navigate = useNavigate();

  const [question, setQuestion] = React.useState("");
  const [responses, setResponses] = React.useState([]);
  const [is_live, setIsLive] = React.useState("");
  const [quote, setQuote] = React.useState("");
  const [author, setAuthor] = React.useState("");

  const sessionID = localStorage.getItem("sessionID");
  let info_request = "/api/info/" + sessionID;

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

  const url = "https://api.quotable.io/random";

  React.useEffect(() => {
    fetch(url)
      .then((x) => x.json())
      .then((response) => {
        let quote1 = JSON.stringify(response.content, null, "  ");

        setQuote(quote1);

        let author = JSON.stringify(response.author, null);
        author = author.slice(1, author.length - 1);
        author = "- " + author;

        setAuthor(author);
      });
  }, []);

  return (
    <main className="container-fluid bg-light text-center text-dark">
      <div>
        <h1>Results</h1>
        <p>Below are the results for session {sessionID}</p>

        <div className="container mt-4">
          <h3>Question: {question}</h3>
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

        <div className="mt-3">
          <p>Here's a random quote:</p>
          <span id="quote">{quote}</span>
          <span id="author">{author}</span>
        </div>
      </div>
    </main>
  );
}
