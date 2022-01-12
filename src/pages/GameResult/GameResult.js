import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
// import * as yup from "yup";

import classes from "./GameResult.module.css";
import { addTopScore } from "../../store/actions/gameAction";

// const schema = yup.object().shape({
//   autor: yup.string().required(),
//   quote: yup
//     .string()
//     .required("you must enter your name")
//     .min(3, "name is too short - should be 3 chars minimum.")
//     .matches(/[a-zA-Z]/, "quote can only contain Latin letters."),
// });

const GameResult = ({ onLoad }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const score = useSelector((state) => state.game.totalScore);
  const scores = useSelector((state) => state.game.scores);

  dispatch(addTopScore(score));

  const endGame = async () => {
    history.push("/");
    history.go(0);
  };

  return (
    <div className={classes.container}>
      <p> Your score {score.toFixed(2)}</p>
      <table className={classes.table}>
        <thead className={classes.tabHead}>
          <tr>
            <th></th>
            <th>score</th>
            <th>distance [m]</th>
          </tr>
        </thead>
        <tbody className={classes.tabBody}>
          {scores.map((score, index) => (
            <tr>
              <th> guess {index + 1}</th>
              <td>{score.score}</td>
              <td>{score.distance}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {scores.map((score, index) => (
        <tr>
        <th> guess {index +1}</th>
        <td>{score.score}</td>
        <td>{score.distance}</td>
        </tr>
      ))} */}

      {/* {scores.map((score, index) => (
        <p>
          guess {index + 1}: score: {score.score} distance: {score.distance}
        </p>
      ))} */}

      <button className={classes.btn} onClick={endGame}>
        return to <br />
        main menu
      </button>
      <button className={classes.btn} onClick={endGame}>
        play again
      </button>
    </div>
  );
};

export default GameResult;
