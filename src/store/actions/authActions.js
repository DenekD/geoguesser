import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "@firebase/firestore";

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // dispatch({ type: "LOGIN_SUCCESS", auth });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode: " + errorCode, "errorMessage: " + errorMessage);
        // dispatch({ type: "LOGIN_ERROR", error });
      });
  };
};

export const signOuting = () => {
  return (dispatch, getState, { getFirebase }) => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // dispatch({ type: "SIGNOUT_SUCCESS" });
      })
      .catch((error) => {
        // An error happened.
      });
  };
};

//dodajemy nowego usera w authentication i tworzymy nowa kolekcje userów z extra danymi
// w kolekcji userów nie generujemy id ale ustawiamy takie jak ma user w authentication tj uid
//addoc() dodaje dokument z wygenerowanym id a doc dodaje dokument gdzie ustawiamy id a w set() ustawiamy properties dokmentu
export const signUp = (newUser) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const auth = getAuth();
    const db = getFirestore();

    const user = {
      nickName: newUser.nickName,
      // lastName: newUser.lastName,
      initials: newUser.nickName[0],
      topScore: 0,
    };

    const setUser = async () => {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );
      await setDoc(doc(db, "users", userCredentials.user.uid), user);
    };

    try {
      await setUser();
      // dispatch({ type: "SIGNUP_SUCCESS" });
    } catch (error) {
      console.log(error);
      // dispatch({ type: "SIGNUP_ERROR", error });
    }
  };
};
