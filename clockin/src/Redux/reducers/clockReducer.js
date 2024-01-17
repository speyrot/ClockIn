// src/redux/reducers/clockReducer.js
import {
    CLOCK_IN_SUCCESS,
    CLOCK_OUT_SUCCESS,
    //UPDATE_ELAPSED_TIME,
    //FETCH_CLOCK_IN_TIME_SUCCESS // New action type
} from '../actions/actionTypes';

/*const getInitialStartTime = () => {
    const storedTime = localStorage.getItem('clockInTime');
    return storedTime ? parseInt(storedTime, 10) : null;
};*/

const initialState = {
    isClockedIn: false,
    //startTime: getInitialStartTime(),
    //elapsedTime: 0,
};

const clockReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLOCK_IN_SUCCESS:
        /*case FETCH_CLOCK_IN_TIME_SUCCESS:*/ // Handle fetching clock-in time
            return {
                ...state,
                isClockedIn: true,
                //startTime: action.startTime,
            };
        case CLOCK_OUT_SUCCESS:
            return {
                ...state,
                isClockedIn: false,
                //startTime: null,
                //elapsedTime: 0,
            };
        /*case UPDATE_ELAPSED_TIME:
            return {
                ...state,
                elapsedTime: action.elapsedTime,
            };*/
        default:
            return state;
    }
};

export default clockReducer;
