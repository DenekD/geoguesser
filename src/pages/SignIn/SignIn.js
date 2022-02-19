import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { Redirect } from "react-router";

import { signIn } from "../../store/actions/authActions";

import { Form, Formik } from "formik";
import { FormikControl } from "../../formik/FormikControl";
import * as Yup from "yup";

import classes from "../Sign-In-Up.module.css";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(6, "password is too short - should be 6 chars minimum.")
    .matches(/[a-zA-Z]/, "quote can only contain Latin letters.")
    .required(),
});

const SignIn = () => {
  const dispatch = useDispatch();
  // const authError = useSelector((state) => state.auth.authError);
  const auth = useSelector((state) => state.firebase.auth);

  if (isLoaded(auth) && !isEmpty(auth)) return <Redirect to="/" />;

  const submintHandler = (data, onSubmitProps) => {
    const email = data.email;
    const password = data.password;
    dispatch(signIn({ email, password }));
    onSubmitProps.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submintHandler}
    >
      {(formik) => (
        <div className={classes.container}>
          <p className={classes.title}> Log In</p>
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
            <button
              type="submit"
              disabled={!formik.isValid}
              className={classes.submit}
            >
              Login
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SignIn;
