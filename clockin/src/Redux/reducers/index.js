// index.js in reducers folder
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import clockReducer from './clockReducer';

const rootReducer = combineReducers({
    user: userReducer,
    clock: clockReducer
});

export default rootReducer;
