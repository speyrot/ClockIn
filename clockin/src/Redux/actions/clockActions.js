// clockActions.js
import * as actionTypes from './actionTypes';

export const clockIn = (time, location) => {
    return {
        type: actionTypes.CLOCK_IN,
        payload: { time, location }
    };
};

export const clockOut = (time) => {
    return {
        type: actionTypes.CLOCK_OUT,
        payload: { time }
    };
};
