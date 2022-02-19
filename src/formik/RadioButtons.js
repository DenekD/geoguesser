import React from "react";
import { Field, ErrorMessage } from "formik";
import classes from "./formik.module.css";

export const RadioButtons = ({ name, label, options, ...rest }) => {
  return (
    <div className={classes["form-control"]}>
      <label>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => (
            <React.Fragment key={option.key}>
              <input
                type="radio"
                id={option.value}
                {...field}
                value={option.value}
                checked={field.value === option.value}
              />
              <label htmlFor={option.value}>{option.key}</label>
            </React.Fragment>
          ));
        }}
      </Field>
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};
