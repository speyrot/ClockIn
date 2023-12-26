// userActions.js
import * as actionTypes from './actionTypes';

export const loginUser = (credentials) => {
    return (dispatch) => {
        // Perform login logic here (e.g., API call)
        // On success
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: { user: "userData" } });
        // On failure
        // dispatch({ type: actionTypes.LOGIN_FAILURE, payload: { error: "errorInfo" } });
    };
};

export const logoutUser = () => {
    return {
        type: actionTypes.USER_LOGOUT
    };
};
