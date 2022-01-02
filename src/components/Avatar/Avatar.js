import React from "react";
import classes from "./Avatar.module.css";

const Avatar = (props) => {
  return <div className={classes.avatar}>{props.text}</div>;
};

export default Avatar;
