import React from "react";
import { Field, ErrorMessage } from "formik";
import classes from "./formik.module.css";

export const Select = ({ name, label, options, ...rest }) => {
  return (
    <div className={classes["form-control"]}>
      <label htmlFor={name}>{label}</label>
      <Field as="select" name={name} id={name} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.key}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component="div" className={classes.error} />
    </div>
  );
};
