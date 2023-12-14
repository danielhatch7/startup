import React from "react";

import { VoteEvent, VoteNotifier } from "./voteNotifier";
import "./voters.css";

export function Voters(props) {
  const userName = props.userName;
  const sessionID = props.sessionID;

  const [events, setEvent] = React.useState([]);

  React.useEffect(() => {
    VoteNotifier.addHandler(handleVoteEvent);

    return () => {
      VoteNotifier.removeHandler(handleVoteEvent);
    };
  });

  function handleVoteEvent(event) {
    setEvent([...events, event]);
  }

  function createMessageArray() {
    const messageArray = [];
    let counter = 0;
    let list = [];
    for (const [i, event] of events.entries()) {
      list.push(event);
    }

    list.reverse();

    for (const [i, event] of list.entries()) {
      let message = "unknown";
      if (event.type === VoteEvent.BallotCast) {
        message = `voted ${event.value.vote}`;
      } else if (event.type === VoteEvent.VoterJoined) {
        message = `joined`;
      } else if (event.type === VoteEvent.VoterLeft) {
        message = `left`;
      } else if (event.type === VoteEvent.System) {
        message = event.value.msg;
      }

      if (counter < 10) {
        messageArray.push(
          <div key={i} className="event">
            <span className={"voter-event"}>{event.from.split("@")[0]} </span>
            {message}
          </div>
        );
      }

      counter += 1;
    }
    return messageArray;
  }

  return (
    <div className="voters">
      User:
      <span className="voter-name"> {userName}</span>
      <div id="voter-messages">{createMessageArray()}</div>
    </div>
  );
}
