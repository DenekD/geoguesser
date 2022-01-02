import React from "react";
import classes from "./TableScore.module.css";

const TableScore = (props) => {
  return (
    <div className={classes.contanier}>
      <p className={classes.title}>Highscores</p>
      <ol className={classes.list}>
        {props.scores &&
          props.scores.map((score, index) => (
            <li>
              <span>{index + 1}. </span>
              <span className={classes.userName}>{score.nickName}</span>
              <span className={classes.score}>{score.topScore}</span>
            </li>
          ))}
      </ol>
    </div>
  );
};

export default TableScore;
