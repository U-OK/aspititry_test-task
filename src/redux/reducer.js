import {
  GET_WORKOUT_DATA,
  DELETE_WORKOUT_BY_ID,
  ADD_NEW_WORKOUT,
  EDIT_WORKOUTS
} from "./actionTypes";

const initialState = {
  workouts: [
    {
      id: 0,
      workoutType: "bicycling",
      distance: 3,
      date: "2020-10-20",
      comment: "",
    },
    {
      id: 1,
      workoutType: "running",
      distance: 15,
      date: "2020-10-21",
      comment: "cool",
    },
    {
      id: 2,
      workoutType: "walking",
      distance: 14,
      date: "2020-10-22",
      comment: "",
    },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WORKOUT_DATA: {
      return {
        ...state,
        workouts: [...action.payload],
      };
    }
    case ADD_NEW_WORKOUT: {
      return {
        ...state,
        workouts: [...state.workouts, action.payload],
      };
    }
    case EDIT_WORKOUTS: {
      return {
        workouts: [...action.payload]
      };
    }
    case DELETE_WORKOUT_BY_ID: {
      return {
        ...state,
        workouts: [
          ...state.workouts.filter((item) => item.id !== action.payload),
        ],
      };
    }
    default:
      return state;
  }
}
