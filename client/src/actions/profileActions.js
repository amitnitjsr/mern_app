import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from './types';

// GET current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// Get current profile
export const getAllUsers = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/users')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Delete User
export const deleteUser = id => dispatch => {
  axios
    .delete(`/api/users/${id}`)
    .then(res => {
      console.log('res', res)
      // getAllUsers()();
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    }
    )
    .catch(err => {
      console.log('errr', err)
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    }

    );
};

// Update Users
export const updateUser = (profileData, history) => dispatch => {
  axios
    .put('/api/users', profileData)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
