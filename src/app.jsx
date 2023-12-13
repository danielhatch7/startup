import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { Login } from "./login/login";
import { Home } from "./home/home";
import { Join } from "./join/join";
import { Live } from "./live/live";
import { Results } from "./results/results";
import { ResultsView } from "./results/resultsView";
import { Start } from "./start/start";
import { HostView } from "./start/hostView";
import { AuthState } from "./login/authState";

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}

export default function App() {
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName") || ""
  );
  const currentAuthState = userName
    ? AuthState.Authenticated
    : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <div className="app bg-primary text-light">
        <header className="container-fluid">
          <nav className="navbar fixed-top navbar-dark bg-primary">
            <a className="navbar-brand" href="#">
              You Choose<sup>&reg;</sup>
            </a>
            <menu className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="join">
                  Join
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="start">
                  Start
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="results">
                  Results
                </NavLink>
              </li>
            </menu>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
          <Route path="/home" element={<Home userName={userName} />} />
          <Route path="/join" element={<Join />} />
          <Route path="/live" element={<Live />} />
          <Route path="/results" element={<Results />} />
          <Route path="/resultsView" element={<ResultsView />} />
          <Route path="/start" element={<Start />} />
          <Route path="/hostView" element={<HostView />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>

        <footer className="bg-primary text-white">
          <div className="container-fluid">
            <span className="text-reset">Daniel Hatch</span>
            <a
              className="text-reset"
              href="https://github.com/danielhatch7/startup.git">
              Source
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
