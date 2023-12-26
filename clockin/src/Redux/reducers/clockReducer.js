// clockReducer.js
import * as actionTypes from '../Actions/actionTypes';

const initialState = {
    clockedIn: false,
    clockInTime: null,
    clockOutTime: null,
    location: null
};

const clockReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CLOCK_IN:
            return {
                ...state,
                clockedIn: true,
                clockInTime: action.payload.time,
                location: action.payload.location
            };
        case actionTypes.CLOCK_OUT:
            return {
                ...state,
                clockedIn: false,
                clockOutTime: action.payload.time
            };
        default:
            return state;
    }
};

export default clockReducer;
