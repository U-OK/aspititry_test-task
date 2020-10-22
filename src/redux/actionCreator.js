import { GET_WORKOUT_DATA, DELETE_WORKOUT_BY_ID, ADD_NEW_WORKOUT, EDIT_WORKOUTS } from "./actionTypes";

// export const getPlaces = () => {
//   return (dispatch) => {
//     dispatch(getPlacesStarted());

//     const {
//       user: { pk },
//     } = JSON.parse(localStorage.getItem("User data"));

//     api
//       .GET(`places/?format=json&owner=${pk}`)
//       .then((res) => {
//         dispatch(getPlacesSuccess(res.data));
//       })
//       .catch((err) => {
//         dispatch(getPlacesFailure(err.message));
//       });
//   };
// };

const deleteWorkoutById = (id) => ({
  type: DELETE_WORKOUT_BY_ID,
  payload: id ,
});

const addNewWorkout = (newWorkout) => ({
  type: ADD_NEW_WORKOUT,
  payload: newWorkout,
});

const editWorkouts = (newWorkouts) => ({
  type: EDIT_WORKOUTS,
  payload: newWorkouts,
});

const getWorkoutData = () => ({
  type: GET_WORKOUT_DATA,
});

export { deleteWorkoutById, addNewWorkout, editWorkouts };
