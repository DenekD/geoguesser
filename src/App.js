import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components imports
import { StartGame } from "./pages/StartGame/StartGame";
import Layout from "./components/Layout/Layout";
import GameResult from "./pages/GameResult/GameResult";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/Signup";
import TopScores from "./pages/TopScores/TopScores";
import Game from "./pages/Game/Game";
// import { useSelector } from "react-redux";

function App() {
  // useSelector((state) => console.log(state.firebase));

  return (
    <BrowserRouter basename="/geoguesser">
      <Layout>
        <Switch>
          <Route exact path="/">
            <StartGame />
          </Route>
          <Route path="/newGame">
            <Game />
          </Route>
          <Route path="/gameResult">
            <GameResult />
          </Route>
          <Route path="/topScores">
            <TopScores />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
