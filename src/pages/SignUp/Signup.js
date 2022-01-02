import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { Redirect } from "react-router";

import { signUp } from "../../store/actions/authActions";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import classes from "./SignUp.module.css";

const schema = yup.object().shape({
  email: yup.string().email().required("No email provided."),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "password is too short - should be 6 chars minimum.")
    .matches(/[a-zA-Z]/, "quote can only contain Latin letters."),
  nickName: yup.string().required("No first name provided."),
});

const SignUp = () => {
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
    dispatch(
      signUp({
        email: data.email,
        password: data.password,
        nickName: data.nickName,
      })
    );
    reset();
  };
  return (
    <div className={classes.container}>
      <p className={classes.title}> Zarerejestruj się</p>

      <form onSubmit={handleSubmit(submintHandler)} className={classes.form}>
        <label htmlFor="email">email </label>
        <input
          {...register("email")}
          type="text"
          id="email"
          className={errors.autor && classes.invalid}
        />
        <p className={classes.error}>{errors.email?.message}</p>

        <label htmlFor="password">password </label>
        <input
          {...register("password")}
          type="password"
          id="password"
          className={errors.autor && classes.invalid}
        />
        <p className={classes.error}>{errors.password?.message}</p>
        <label htmlFor="nickName">nick name </label>
        <input
          {...register("nickName")}
          type="text"
          id="nickName"
          className={errors.autor && classes.invalid}
        />
        <p className={classes.error}>{errors.nickName?.message}</p>

        <button type="submit" className={classes.submit}>
          zarejestruj się
        </button>
        {/* <div className="">{authError ? <p>{authError}</p> : null}</div> */}
      </form>
    </div>
  );
};

export default SignUp;
