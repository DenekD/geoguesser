import React from "react";
import { Field, ErrorMessage } from "formik";

export const CheckboxGroup = ({ name, label, options, ...rest }) => {
  return (
    <div className="form-control">
      <label>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => (
            <React.Fragment key={option.key}>
              <input
                type="checkbox"
                id={option.value}
                {...field}
                value={option.value}
                checked={field.value.includes(option.value)}
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
