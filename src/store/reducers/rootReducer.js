import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import uiReducer from "./uiReducer";
import mapReducer from "./mapReducer";
import gameReducer from "./gameReducer";

const rootReducer = combineReducers({
  game: gameReducer,
  map: mapReducer,
  ui: uiReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
