import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { getFirebase } from "react-redux-firebase";
import { getFirestore } from "@firebase/firestore";
import firebase from "firebase/compat/app";
import "./config/fbConfig"; // importujemy tak zeby sie połaczenie z firebase zainicjalizowało
import { createStore, applyMiddleware, compose } from "redux";
import { createFirestoreInstance } from "redux-firestore";
import rootReducer from "./store/reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

const initialState = {};

const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {/* <AuthIsLoaded> */}
        <App />
        {/* </AuthIsLoaded> */}
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
