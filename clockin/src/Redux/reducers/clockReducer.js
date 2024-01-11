// src/redux/reducers/clockReducer.js
const initialState = {
    isClockedIn: !!localStorage.getItem('clockInTime'), // Determine initial state based on local storage
    startTime: localStorage.getItem('clockInTime') ? parseInt(localStorage.getItem('clockInTime')) : null,
    elapsedTime: 0,
};

const clockReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CLOCK_IN':
            return {
                ...state,
                isClockedIn: true,
                startTime: action.startTime,
                // Don't reset elapsed time here; it will be set by the updateElapsedTime action
            };
        case 'CLOCK_OUT':
            return {
                ...state,
                isClockedIn: false,
                startTime: null,
                elapsedTime: 0, // Reset elapsed time on clock out
            };
        case 'UPDATE_ELAPSED_TIME':
            return {
                ...state,
                elapsedTime: action.elapsedTime,
            };
        default:
            return state;
    }
};

export default clockReducer;