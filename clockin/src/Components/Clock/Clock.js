// src/components/Clock/Clock.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clockIn, clockOut, updateElapsedTime } from '../../Redux/actions/clockActions';
import styles from './Clock.module.css';

const Clock = () => {
    const dispatch = useDispatch();
    const { isClockedIn, startTime, elapsedTime } = useSelector(state => state.clock);
    
    useEffect(() => {
        const storedStartTime = localStorage.getItem('clockInTime');
        if (storedStartTime && !isClockedIn) {
            const storedTime = parseInt(storedStartTime);
            dispatch(clockIn(storedTime));
            const elapsed = Date.now() - storedTime;
            dispatch(updateElapsedTime(elapsed));
        }
    }, [dispatch, isClockedIn]);

    useEffect(() => {
        let interval;
        if (isClockedIn && startTime) {
            interval = setInterval(() => {
                const newElapsedTime = Date.now() - startTime;
                dispatch(updateElapsedTime(newElapsedTime));
            }, 1000);
        }
        return () => clearInterval(interval); 
    }, [isClockedIn, startTime, dispatch]);

    function msToTime(duration) {
        let seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
    
        return hours + " : " + minutes + " : " + seconds;
    };

    // Handle clock in
    const handleClockIn = () => {
        dispatch(clockIn());
    };

    // Handle clock out
    const handleClockOut = () => {
        dispatch(clockOut());
        // Here, handle saving the elapsed time to a database or state
    };

    // Update the elapsed time every second
    useEffect(() => {
        let interval;
        if (isClockedIn) {
            interval = setInterval(() => {
                const newElapsedTime = Date.now() - startTime;
                dispatch(updateElapsedTime(newElapsedTime));
            }, 1000);
        }
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [isClockedIn, startTime, dispatch]);

    return (
        <div className={styles.clockInContainer}>
            {isClockedIn && (
                <div className={styles.digitalClock}>
                    {msToTime(elapsedTime)} 
                </div>
            )}
            <button className={styles.clockButton} onClick={handleClockIn} disabled={isClockedIn}>Clock In</button>
            <button className={styles.clockButton} onClick={handleClockOut} disabled={!isClockedIn}>Clock Out</button>
        </div>
    );
};

export default Clock;
