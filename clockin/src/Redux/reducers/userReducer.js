// src/Redux/reducers/userReducer.js
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuthenticated: Boolean(localStorage.getItem('userToken')),
    user: JSON.parse(localStorage.getItem('userInfo')),
    token: localStorage.getItem('userToken'),
    error: null
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user
            };
        case actionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload.error
            };
        case actionTypes.USER_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
};

export default userReducer;
