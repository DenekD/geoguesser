import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";

import { signOuting } from "../../store/actions/authActions";
import classes from "./Layout.module.css";
import Avatar from "../Avatar/Avatar";
import Modal from "../../UI/Modal/Modal";

const signedInMenuItems = [
  {
    text: "avatar",
  },
  {
    text: "Logout",
    path: "/",
  },
];

const signedOutMenuItems = [
  {
    text: "Sign In",
    path: "/signIn",
  },
  {
    text: "Sign Up",
    path: "/signUp",
  },
];

const Layout = ({ children }) => {
  const [isClicked, setIsClicked] = useState(false);

  const auth = useSelector((state) => state.firebase.auth);
  const initials = useSelector((state) => state.firebase.profile.initials);
  const dispatch = useDispatch();
  const history = useHistory();

  const links = auth.uid ? signedInMenuItems : signedOutMenuItems;

  return (
    <div>
      <Modal />
      <nav className={classes.nav}>
        <div
          className={`${classes.overlay} ${isClicked ? classes.open : ""}`}
          onClick={() => setIsClicked((prev) => !prev)}
        ></div>
        <div className={classes.logo} onClick={() => history.push("/")}>
          GeoGuesser
        </div>
        <ul className={`${classes.list} ${isClicked ? classes.open : ""}`}>
          <li className={classes.item}>
            <NavLink activeClassName={classes.active} exact to="/">
              HOME
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink activeClassName={classes.active} to="/TopScores">
              TOP SCORES
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink activeClassName={classes.active} to="/About">
              ABOUT
            </NavLink>
          </li>
        </ul>
        <ul
          className={`${classes.signinList} ${isClicked ? classes.open : ""}`}
        >
          {links.map((item) => (
            <li
              className={item.text === "avatar" ? classes.avatar : classes.item}
              onClick={
                item.text === "Logout"
                  ? () => dispatch(signOuting())
                  : () => history.push(item.path)
              }
            >
              {item.text === "avatar" ? (
                <Avatar text={initials} />
              ) : (
                <p>{item.text}</p>
              )}
            </li>
          ))}
        </ul>

        <span
          className={classes.hamburger}
          onClick={() => setIsClicked((prev) => !prev)}
        >
          <i></i>
          <i></i>
          <i></i>
        </span>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
