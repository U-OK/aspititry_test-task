import {
  GET_WORKOUT_DATA_SUCCESS
} from "./actionTypes";

const initialState = {
  workouts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WORKOUT_DATA_SUCCESS: {
      return {
        ...state,
        workouts: [...action.payload],
      };
    }
    default:
      return state;
  }
}
