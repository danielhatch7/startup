import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { VoteEvent, VoteNotifier } from "../voteNotifier";

export function Choices(props) {
  const [radioValue, setRadioValue] = React.useState("1");
  const responses = props.responses;
  const sessionID = props.sessionID;
  const userName = props.userName;

  const radios = [
    { name: responses[0], value: "0" },
    { name: responses[1], value: "1" },
    { name: responses[2], value: "2" },
    { name: responses[3], value: "3" },
  ];

  async function buttonClicked(e) {
    const current_vote = e.currentTarget.value;
    localStorage.setItem("current_vote", current_vote);
    setRadioValue(current_vote);

    const newVote = { vote: responses[current_vote] };

    submitVote(sessionID, current_vote);
    VoteNotifier.broadcastEvent(
      userName,
      VoteEvent.BallotCast,
      newVote,
      sessionID
    );
    //loadResults();

    // TODO uncomment below
    // TODO REFRESH RESULTS
    // TODO websocket broadcast

    // let responses = getResponses();
    // responses = responses.split(",");
    // const index = vote[vote.length - 1];

    // const newVote = { vote: responses[index] };

    // webSocket.broadcastEvent(
    //   userName,
    //   BallotCastEvent,
    //   newVote,
    //   sessionID
    // );
  }

  async function submitVote(sessionID, vote) {
    const newRequest = {
      sessionID: sessionID,
      vote: vote,
      userName: userName,
    };
    try {
      let request = "/api/vote/" + sessionID;
      const response1 = await fetch(request, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newRequest),
      });
      const results = await response1.json();

      let responses = localStorage.getItem("responses");
      responses = responses.split(",");

      const current_results = JSON.stringify([
        { response: responses[0], result: results[0] },
        { response: responses[1], result: results[1] },
        { response: responses[2], result: results[2] },
        { response: responses[3], result: results[3] },
      ]);

      localStorage.setItem("results", current_results);
      //loadResults();
    } catch (err) {
      // TODO FINISH
      console.log("something happened");
      console.log(err);
    }
  }

  return (
    <div>
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="outline-primary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => buttonClicked(e)}>
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  );
}
