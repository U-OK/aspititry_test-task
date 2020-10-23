import Axios from "axios";
import { GET_WORKOUT_DATA_SUCCESS } from "./actionTypes";

export const getWorkoutData = () => {
  return (dispatch) => {

    Axios.get('/api/workouts')
      .then((res) => {
        dispatch(getWorkoutDataSuccess(res.data));
      })
      .catch((err) => {
        console.log(err)
      });
  };
};

export const deleteWorkoutById = (id) => {
  return (dispatch) => {

    Axios.delete(`/api/workouts/${id}`)
      .then((res) => {
        // dispatch(deleteWorkoutByIdSuccess(res.data));
        dispatch(getWorkoutData())
      })
      .catch((err) => {
        console.log(err)
      });
  };
};

export const editWorkout = (editedWorkout) => {
  return (dispatch) => {

    Axios.put('/api/workouts', {editedWorkout})
      .then((res) => {
        // dispatch(getWorkoutDataSuccess(res.data));
        dispatch(getWorkoutData())
      })
      .catch((err) => {
        console.log(err)
      });
  };
};

export const addNewWorkout = (newWorkout) => {
  return (dispatch) => {

    Axios.post('/api/workouts', {newWorkout})
      .then((res) => {
        // dispatch(getWorkoutDataSuccess(res.data));
        dispatch(getWorkoutData())
      })
      .catch((err) => {
        console.log(err)
      });
  };
};

const getWorkoutDataSuccess = (workouts) => ({
  type: GET_WORKOUT_DATA_SUCCESS,
  payload: workouts
});

const deleteWorkoutByIdSuccess = () => ({
  type: ''
})

