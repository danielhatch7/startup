class Home {
  constructor() {
    const user_name = document.querySelector(".user_name");
    user_name.textContent = this.getPlayerName();
  }

  getPlayerName() {
    return localStorage.getItem("userName") ?? "Mystery player";
  }
}

const home = new Home();
