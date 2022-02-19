import React from "react";
import { Input } from "./Input";
import { RadioButtons } from "./RadioButtons";
import { Select } from "./Select";
import { TextArea } from "./TextArea";
import { CheckboxGroup } from "./CheckboxGroup";
import { DatePicker } from "./DatePicker";

export const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckboxGroup {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    default:
      return null;
  }
};
