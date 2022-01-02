import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components imports
import GuessMap from "./components/GuessMap.js/GuessMap";
import Layout from "./components/Layout/Layout";
import { StartGame } from "./pages/StartGame/StartGame";
import Street from "./pages/StreetView/StreetView";
import GameResult from "./pages/GameResult/GameResult";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/Signup";
import TopScores from "./pages/TopScores/TopScores";
import { useSelector } from "react-redux";

function App() {
  // useSelector((state) => console.log(state.firebase));

  return (
    <BrowserRouter basename="geoguesser">
      <Layout>
        <Switch>
          <Route exact path="/">
            <StartGame />
          </Route>
          <Route path="/newGame">
            <Street />
            <GuessMap />
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
