// src/components/Dashboard.js
import React from 'react';
import styles from './Dashboard.module.css'; // Import the CSS module for styling

const Dashboard = () => {
  // You might want to generate or fetch these dates dynamically
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date(); // Get current date for highlighting

  return (
    <div className={`container ${styles.dashboardContainer}`}>
      {/* Calendar Section */}
      <div className={`row ${styles.calendarSection}`}>
        {weekDays.map((day, index) => {
          const isToday = currentDate.getDay() === index; // Check if this day is today
          return (
            <div className={`col ${isToday ? styles.highlight : ''}`} key={index}>
              <div>{day}</div> {/* Abbreviated day name */}
              <div>{/* Numerical Date Here */}</div>
            </div>
          );
        })}
      </div>

      {/* Clock In Container */}
      <div className={`row ${styles.clockInContainer}`}>
        <div className="col">
          <p>Clock In Functionality Goes Here</p>
        </div>
      </div>

      {/* Running Total of Hours Worked */}
      <div className={`row ${styles.hoursWorkedContainer}`}>
        <div className="col">
          <p>Running Total of Hours Worked This Week</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;