export const CalcSum = (players, winner) => {
  players.forEach((player) => {
    let totalScore = 0;
    player.score.forEach((score) => {
      if (score === "" || score === undefined) {
        score = 0;
      }
      totalScore += parseInt(score);
    });
    player["totalScore"] = totalScore;
  });
  players.sort((a, b) => {
    if (winner === "low") {
      return a.totalScore - b.totalScore;
    }
    if (winner === "high") {
      return b.totalScore - a.totalScore;
    } else {
      console.log("Something went wrong");
    }
  });
  return players;
};
