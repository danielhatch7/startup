function session() {
  document.getElementById("sessionID").required = true;
  const sessionID = document.querySelector("#sessionID");
  if (sessionID.value != "") {
    localStorage.setItem("sessionID", sessionID.value);
    window.location.href = "live.html";
    loadData();
  }
}

function loadData(sessionID) {
  // this is where the websocket data will be filled in later

  // const webData = getData(sessionID);
  // const question = webData.question;
  // const results = webData.results;

  // temp placeholders
  const question = "What is your favorite color?";
  const results = JSON.stringify([
    { response: "blue", result: 4 },
    { response: "red", result: 3 },
    { response: "yellow", result: 2 },
    { response: "green", result: 5 },
  ]);

  const is_live = true;

  localStorage.setItem("question", question);
  localStorage.setItem("results", results);
  localStorage.setItem("is_live", is_live);
}

async function getValid() {
  document.getElementById("sessionID").required = true;
  const userInput = document.querySelector("#sessionID");
  const errorMessage = document.querySelector("#error_message");
  errorMessage.textContent = "";
  if (userInput.value != "") {
    let valid = true;
    const newRequest = {
      sessionID: userInput.value,
      valid: valid,
      message: "",
    };
    try {
      let request = "/api/valid/" + userInput.value;
      const response = await fetch(request, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newRequest),
      });
      const output = await response.json();
      if (output[0].valid) {
        session();
      } else {
        let message = output[0].message;
        errorMessage.textContent = message;
      }
    } catch (err) {
      // TODO FINISH
      console.log("something happened");
      doSomething(err);
      console.log(err);
    }
  }
}

function doSomething(message) {
  let something = message;
}
