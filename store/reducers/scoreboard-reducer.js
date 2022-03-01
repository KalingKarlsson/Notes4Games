import { ADD_SCOREBOARD, SET_SCOREBOARDS, DELETE_SCOREBOARD } from "../actions/scoreboard-actions";
import Scoreboard from "../../models/scoreboard";

const initialState = {
  scoreboards: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SCOREBOARDS:
      return {
        scoreboards: action.scoreboards.map((sb) => new Scoreboard(sb.id.toString(), sb.title, sb.date, sb.scores)),
      };
    case ADD_SCOREBOARD:
      const newScoreboard = new Scoreboard(
        action.scoreboardData.id.toString(),
        action.scoreboardData.title,
        action.scoreboardData.date,
        action.scoreboardData.scores
      );
      return {
        scoreboards: state.scoreboards.concat(newScoreboard),
      };
    case DELETE_SCOREBOARD:
      return {
        scoreboards: state.scoreboards.filter((item, index) => index !== action.payload),
      };
    default:
      return state;
  }
};
