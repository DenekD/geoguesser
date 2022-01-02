import { doc, setDoc, updateDoc } from "@firebase/firestore";

export const addTopScore = (topScore) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();

    const userId = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;

    const topScoreData = {
      topScore,
      nickName: profile.nickName,
      createdAt: new Date(),
    };

    const addTopScore = async () => {
      await setDoc(doc(db, "topScores", userId), topScoreData);
    };
    const addTopScoreToUserProfile = async () => {
      const collectionRef = doc(db, `users`, userId);
      await updateDoc(collectionRef, {
        topScore: topScore,
      });
    };

    try {
      if (topScore > profile.topScore) {
        await addTopScore();
        await addTopScoreToUserProfile();
      }
      //  dispatch({ type: "CREATE_PROJECT", note });
      // dispatch({ type: "OPEN_NOTIFICATION", message: "note was created" });
    } catch (err) {
      // dispatch({ type: "CREATE_PROJECT_ERROR", err });
      console.log("error add score, ", err);
    }
  };
};
