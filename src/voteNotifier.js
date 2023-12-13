const VoteEvent = {
  System: "system",
  VoterLeft: "voterLeft",
  VoterJoined: "voterJoined",
  BallotCast: "ballotCast",
};

class EventMessage {
  constructor(from, type, value, sessionID) {
    this.from = from;
    this.type = type;
    this.value = value;
    this.sessionID = sessionID;
  }
}

class VoteEventNotifier {
  events = [];
  handlers = [];

  constructor(sessionID) {
    let port = window.location.port;
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    this.socket = new WebSocket(
      `${protocol}://${window.location.hostname}:${port}/ws`
    );
    this.socket.onopen = (event) => {
      this.receiveEvent(
        new EventMessage("Session", VoteEvent.System, { msg: "connected" }, "")
      );
    };
    this.socket.onclose = (event) => {
      this.broadcastEvent(this.getPlayerName(), VoteEvent.VoterLeft, {}, "");
      this.receiveEvent(
        new EventMessage(
          "Session",
          VoteEvent.System,
          { msg: "disconnected" },
          ""
        )
      );
    };
    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch {}
    };
  }

  getPlayerName() {
    return localStorage.getItem("userName") ?? "Mystery player";
  }

  broadcastEvent(from, type, value, sessionID) {
    const event = new EventMessage(from, type, value, sessionID);
    this.socket.send(JSON.stringify(event));
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);

    this.events.forEach((e) => {
      this.handlers.forEach((handler) => {
        handler(e);
      });
    });
  }
}

const VoteNotifier = new VoteEventNotifier();

export { VoteEvent, VoteNotifier };
