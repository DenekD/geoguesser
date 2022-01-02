const initState = {
  isGameOver: false,
  round: 1,
  totalScore: 0,
  scores: [],
};

const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case "NEXT_ROUND":
      return {
        ...state,
        round: state.round + 1,
        isGameOver: state.round >= 4 ? true : false,
      };
    case "ADD_SCORE":
      const score = 4999.91 * Math.pow(0.998036, action.distance);
      const sc = score.toFixed(2) * 1;
      const total = state.totalScore + sc;
      const totalScore = total.toFixed(2) * 1;
      console.log(state.scores, sc);

      return {
        ...state,
        scores: [...state.scores, { score: sc, distance: action.distance }],
        totalScore: totalScore,
      };

    default:
      return state;
  }
};
export default gameReducer;
