// src/components/ClockControl.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clockIn, clockOut } from '../Redux/actions/clockActions';

const ClockControl = () => {
  const { clockedIn } = useSelector((state) => state.clock); // Adjust selector as per your state structure
  const dispatch = useDispatch();

  return (
    <div>
      {clockedIn ? (
        <button onClick={() => dispatch(clockOut())}>Clock Out</button>
      ) : (
        <button onClick={() => dispatch(clockIn(new Date(), 'location'))}>Clock In</button> // Replace 'location' with actual data or remove if not used
      )}
    </div>
  );
};

export default ClockControl;
