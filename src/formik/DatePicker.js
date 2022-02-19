import React from "react";
import DateView from "react-datepicker";
import { Field, ErrorMessage } from "formik";
import classes from "./formik.module.css";

import "react-datepicker/dist/react-datepicker.css";

export const DatePicker = ({ name, label, ...rest }) => {
  return (
    <div className={classes["form-control"]}>
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} {...rest}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component="div" className={classes.error} />
    </div>
  );
};
