// src/components/Dashboard/Dashboard.js
import React from 'react';
import Clock from '../Clock/Clock';
import styles from './Dashboard.module.css'; 
import HeaderComponent from '../Header/Header';

function getCurrentWeek(currentDate) {
    let week = [];
    // Clone current date to avoid mutating original date
    let date = new Date(currentDate.getTime());
    // Starting from the current day go back to the last Sunday (or the day you consider start of the week)
    date.setDate(date.getDate() - date.getDay()); // Go back to the last Sunday
    for (let i = 0; i < 7; i++) { // Loop for 7 days
      let day = new Date(date);
      week.push(day);
      date.setDate(date.getDate() + 1); // Move to next day
    }
    return week;
}

const Dashboard = () => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();
  const currentWeek = getCurrentWeek(currentDate);

  return (
    <div>
      {/* Header Section */}
      <HeaderComponent />

      <div className={`container ${styles.dashboardContainer}`}>
        
        {/* Calendar Section */}
        <div className={`row ${styles.calendarSection}`}>
          {currentWeek.map((date, index) => {
            const isToday = currentDate.getDate() === date.getDate() && currentDate.getMonth() === date.getMonth();
            return (
              <div className={`col ${isToday ? styles.highlight : ''}`} key={index}>
                <div>{weekDays[date.getDay()]}</div> {/* Abbreviated day name */}
                <div>{date.getDate()}</div> {/* Numerical Date Here */}
              </div>
            );
          })}
        </div>

        {/* Clock In Container */}
        <div className={`row ${styles.clockInContainer}`}>
          <Clock />
        </div>

        {/* Running Total of Hours Worked */}
        <div className={`row ${styles.hoursWorkedContainer}`}>
          <div className="col">
            <p>Running Total of Hours Worked This Week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;