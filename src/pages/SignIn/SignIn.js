import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { Redirect } from "react-router";
import { signIn } from "../../store/actions/authActions";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import classes from "./SignIn.module.css";

const schema = yup.object().shape({
  email: yup.string().email(),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "password is too short - should be 6 chars minimum.")
    .matches(/[a-zA-Z]/, "quote can only contain Latin letters."),
});

const SignIn = () => {
  const dispatch = useDispatch();
  // const authError = useSelector((state) => state.auth.authError);
  const auth = useSelector((state) => state.firebase.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  if (isLoaded(auth) && !isEmpty(auth)) return <Redirect to="/" />;

  const submintHandler = (data) => {
    const email = data.email;
    const password = data.password;
    dispatch(signIn({ email, password }));
    reset();
  };

  return (
    <div className={classes.container}>
      <p className={classes.title}> Log In</p>

      <form onSubmit={handleSubmit(submintHandler)} className={classes.form}>
        <label htmlFor="email">email </label>
        <input
          {...register("email")}
          type="text"
          id="email"
          className={errors.email && classes.invalid}
        />
        <p className={classes.error}>{errors.email?.message}</p>

        <label htmlFor="password">password </label>
        <input
          {...register("password")}
          type="password"
          id="password"
          className={errors.password && classes.invalid}
        />
        <p className={classes.error}>{errors.password?.message}</p>

        <button type="submit" className={classes.submit}>
          zaloguj sie
        </button>
        {/* <div className="">{authError ? <p>{authError}</p> : null}</div> */}
      </form>
    </div>
  );
};

export default SignIn;
