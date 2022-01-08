import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import classes from "./Modal.module.css";

const Modal = () => {
  const isOpen = useSelector((state) => state.ui.isModalOpen);
  const dispatch = useDispatch();

  const clickHandler = (e) => {
    console.log(e.type);
    dispatch({ type: "CLOSE_MODAL" });
  };

  const modal = isOpen ? (
    <div className={classes.wrapper}>
      <div className={classes.modal}>
        <p>if you want to play sign in or sign up first </p>
        <p>for lazy users:</p>
        <p>
          email: user1@gmail.com <br /> password: pass1234
        </p>
        <button className={classes.btnClose} onClick={clickHandler}>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  ) : null;

  return modal;
};

export default Modal;
