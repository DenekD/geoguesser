import React from "react";
import { Field, ErrorMessage } from "formik";

export const TextArea = ({ name, label, ...rest }) => {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} {...rest} as="textarea" />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};
