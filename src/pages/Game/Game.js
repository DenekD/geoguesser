import React from "react";
import GuessMap from "../../components/GuessMap.js/GuessMap";
import StreetView from "../StreetView/StreetView";
import classes from "./Game.module.css";

const Game = () => {
  return (
    <div className={classes.game}>
      <StreetView />
      <GuessMap />
    </div>
  );
};

export default Game;
