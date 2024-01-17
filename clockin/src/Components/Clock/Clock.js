// src/components/Clock/Clock.js
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { clockInSuccess, clockOutSuccess } from '../../Redux/actions/clockActions';
import styles from './Clock.module.css';

const Clock = () => {
    const dispatch = useDispatch();
    const { isClockedIn } = useSelector(state => state.clock);
    const [elapsedTime, setElapsedTime] = useState(0);

    // Fetch elapsed time from server
    const fetchElapsedTime = useCallback(async () => {
        const token = localStorage.getItem('userToken');
        if (!token) return;

        try {
            const response = await axios.get('/api/clock/getElapsedTime', {
                headers: { 'Authorization': token }
            });
            if (response.data.elapsedTime) {
                setElapsedTime(response.data.elapsedTime);
            }
        } catch (error) {
            console.error('Error fetching elapsed time:', error);
        }
    }, []);

    useEffect(() => {
        let interval;
        if (isClockedIn) {
            fetchElapsedTime();
            interval = setInterval(fetchElapsedTime, 1000);
        }
        return () => clearInterval(interval);
    }, [isClockedIn, fetchElapsedTime]);

    function msToTime(duration) {
        let seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + " : " + minutes + " : " + seconds;
    }

    // Handle clock in
    const handleClockIn = async () => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            console.error('No token found. User is not logged in.');
            return;
        }

        try {
            await axios.post('/api/clock/clockin', {}, {
                headers: { 'Authorization': token }
            });
            dispatch(clockInSuccess());
        } catch (error) {
            console.error('Clock In Error:', error);
        }
    };
    

    // Handle clock out
    const handleClockOut = async () => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            console.error('No token found. User is not logged in.');
            return;
        }

        try {
            await axios.post('/api/clock/clockout', {}, {
                headers: { 'Authorization': token }
            });
            dispatch(clockOutSuccess());
        } catch (error) {
            console.error('Clock Out Error:', error);
        }
    };

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
