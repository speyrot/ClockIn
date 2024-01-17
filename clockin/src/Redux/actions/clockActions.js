// src/redux/actions/clockActions.js
//import axios from 'axios'; // Import axios
import {
    CLOCK_IN_SUCCESS,
    CLOCK_OUT_SUCCESS,
    //UPDATE_ELAPSED_TIME,
    //CLOCK_ERROR,
    //FETCH_CLOCK_IN_TIME_SUCCESS
} from './actionTypes';

/*export const fetchClockInTimeSuccess = (startTime) => {
    return { type: FETCH_CLOCK_IN_TIME_SUCCESS, startTime };
};

export const fetchClockInTime = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/clock/getClockInTime');
        if (response.data.clockInTime !== null) {
            dispatch(fetchClockInTimeSuccess(response.data.clockInTime));
        }
    } catch (error) {
        console.error('Fetch Clock In Time Error:', error);
        dispatch(clockError(error));
    }
};*/

export const clockInSuccess = (startTime) => {
    return { type: CLOCK_IN_SUCCESS, startTime };
};

export const clockOutSuccess = () => {
    return { type: CLOCK_OUT_SUCCESS };
};

/*export const updateElapsedTime = (elapsedTime) => {
    return { type: UPDATE_ELAPSED_TIME, elapsedTime };
};*/

export const clockError = (error) => ({
    type: 'CLOCK_ERROR',
    error: { message: error.message, code: error.code } 
});

