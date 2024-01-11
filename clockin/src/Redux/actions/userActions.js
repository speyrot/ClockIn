//src/Redux/actions/userActions.js
import axios from 'axios';
import * as actionTypes from './actionTypes';

const API_BASE_URL = '/api/users'; // Adjust as needed

export const registerUser = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, credentials);
            // Dispatch an action for successful registration
            dispatch({
                type: actionTypes.REGISTRATION_SUCCESS,
                payload: { user: response.data }
            });
            // Optional: Consider automatically logging the user in after registration
        } catch (error) {
            dispatch({
                type: actionTypes.REGISTRATION_FAILURE,
                payload: { error: error.message || "Registration failed" }
            });
        }
    };
};

export const loginUser = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, credentials);
            // Assuming the response includes a token and user information
            const { token, user } = response.data;
            // Store the token in local storage or cookies as needed
            localStorage.setItem('userToken', token);
            localStorage.setItem('userInfo', JSON.stringify(user));

            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload: { user, token }
            });
        } catch (error) {
            dispatch({
                type: actionTypes.LOGIN_FAILURE,
                payload: { error: error.message || "Login failed" }
            });
        }
    };
};

export const logoutUser = () => {
    // Clear the token from storage and reset user state
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    
    return {
        type: actionTypes.LOGOUT_SUCCESS
    };
};
