import React from "react";
import { useSelector } from "react-redux";
import classes from "./PlayerDashbord.module.css";

const PlayerDashbord = () => {
  const round = useSelector((state) => state.game.round);
  const score = useSelector((state) => state.game.totalScore);

  return (
    <div className={classes.dashboard}>
      <div className={classes.text}>
        <p>map</p>
        <p>round</p>
        <p>score</p>
        <p>World</p>
        <p>{round}/5</p>
        <p>{score.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default PlayerDashbord;
