import React from "react";
import { useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import TableScore from "../../components/TableScore/TableScore";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

const TopScores = () => {
  useFirestoreConnect([
    {
      collection: "topScores",
      orderBy: ["topScore", "desc"],
    },
  ]);

  const scores = useSelector((state) => state.firestore.ordered.topScores);

  const content = scores ? <TableScore scores={scores} /> : <LoadingSpinner />;
  return <div>{content}</div>;
};

export default TopScores;
