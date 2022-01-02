import React from "react";
import { useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import TableScore from "../../components/TableScore/TableScore";

const TopScores = () => {
  useFirestoreConnect([
    {
      collection: "topScores",
      orderBy: ["topScore", "desc"],
    },
  ]);

  const scores = useSelector((state) => state.firestore.ordered.topScores);
  return <div>{<TableScore scores={scores} />}</div>;
};

export default TopScores;
