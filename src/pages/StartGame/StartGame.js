import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setRandomLocation } from "../../store/actions/mapActions";
import classes from "./StartGame.module.css";

import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

export const StartGame = () => {
  const auth = useSelector((state) => state.firebase.auth);

  const history = useHistory();
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      dispatch(setRandomLocation());
      history.push("newGame");
    } else {
      dispatch({ type: "OPEN_MODAL" });
    }
  };

  return (
    <section className={classes.mainContent}>
      <button className={classes.btnNG} onClick={clickHandler}>
        <a>new game</a>
      </button>
    </section>
  );
};
