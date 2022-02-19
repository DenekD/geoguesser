import React from "react";
import { Field, ErrorMessage } from "formik";
import classes from "./formik.module.css";

export const Input = ({ name, label, ...rest }) => {
  return (
    <div className={classes["form-control"]}>
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} {...rest} />
      <ErrorMessage name={name} component="div" className={classes.error} />
    </div>
  );
};
