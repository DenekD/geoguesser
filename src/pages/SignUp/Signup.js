import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { Redirect } from "react-router";

import { signUp } from "../../store/actions/authActions";

import { Form, Formik } from "formik";
import { FormikControl } from "../../formik/FormikControl";
import * as Yup from "yup";

import classes from "../Sign-In-Up.module.css";
import { countryList } from "../../helpers/coutriesList";

const initialValues = {
  email: "",
  password: "",
  confirmedPassword: "",
  nickName: "",
  gender: "",
  country: "",
  birthDate: null,
};
const genderOptions = [
  { key: "Male", value: "male" },
  { key: "Female", value: "female" },
];
const dropDownCountryOptions = countryList;

const validationSchema = Yup.object({
  email: Yup.string().email().required("No email provided."),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "password is too short - should be 6 chars minimum.")
    .matches(/[a-zA-Z]/, "quote can only contain Latin letters."),
  confirmedPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), ""],
      "The password confirmation does not match"
    )
    .required(),
  nickName: Yup.string()
    .min(3, "nickname is too short - should be 3 chars minimum.")
    .required("No nickname provided."),
  gender: Yup.string().required(),
  country: Yup.string().required(),
  birthDate: Yup.date().required().nullable(),
});

const SignUp = () => {
  const dispatch = useDispatch();
  // const authError = useSelector((state) => state.auth.authError);
  const auth = useSelector((state) => state.firebase.auth);

  if (isLoaded(auth) && !isEmpty(auth)) return <Redirect to="/" />;

  const submintHandler = (data) => {
    dispatch(
      signUp({
        email: data.email,
        password: data.password,
        nickName: data.nickName,
      })
    );
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submintHandler}
    >
      {(formik) => (
        <div className={classes.container}>
          <p className={classes.title}> Zarerejestruj się</p>
          <Form>
            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
            />
            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password"
            />
            <FormikControl
              control="input"
              name="confirmedPassword"
              type="password"
              label="Confirmed Password"
            />
            <FormikControl
              control="input"
              type="text"
              label="Nickname"
              name="nickName"
            />
            <FormikControl
              control="radio"
              name="gender"
              label="Gender"
              options={genderOptions}
            />
            <FormikControl
              name="country"
              control="select"
              options={dropDownCountryOptions}
              label="Select Your Country"
            />
            <FormikControl
              control="date"
              name="birthDate"
              label="Select your date of birth"
            />
            <button
              type="submit"
              disabled={!formik.isValid}
              className={classes.submit}
            >
              Sing Up
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
