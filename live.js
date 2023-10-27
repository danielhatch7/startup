class Session {
  constructor() {
    const sessionID = document.querySelector(".session-ID");
    sessionID.textContent = this.getSessionID();
  }

  getSessionID() {
    return localStorage.getItem("sessionID") ?? "Unknown";
  }
}

const session = new Session();
