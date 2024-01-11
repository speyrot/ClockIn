// src/redux/actions/clockActions.js
export const clockIn = () => {
    const startTime = Date.now();
    localStorage.setItem('clockInTime', startTime.toString());
    return { type: 'CLOCK_IN', startTime };
};

export const clockOut = () => {
    localStorage.removeItem('clockInTime');
    return { type: 'CLOCK_OUT' };
};

export const updateElapsedTime = (elapsedTime) => {
    return { type: 'UPDATE_ELAPSED_TIME', elapsedTime };
};
