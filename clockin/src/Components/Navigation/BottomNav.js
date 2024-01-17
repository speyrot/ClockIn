// src/components/Navigation/BottomNav.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsGrid3X3GapFill, BsFillClockFill, BsCashStack, BsPersonVcardFill } from 'react-icons/bs';
import styles from './BottomNav.module.css';

const BottomNav = () => {
  return (
    <div className={styles.bottomNavContainer}>
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
      >
        <BsGrid3X3GapFill className={styles.navIcon} />
        <small>Dashboard</small>
      </NavLink>
      <NavLink 
        to="/timesheet" 
        className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
      >
        <BsFillClockFill className={styles.navIcon} />
        <small>Time Sheet</small>
      </NavLink>
      <NavLink 
        to="/payroll" 
        className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
      >
        <BsCashStack className={styles.navIcon} />
        <small>Payroll</small>
      </NavLink>
      <NavLink 
        to="/settings" 
        className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
      >
        <BsPersonVcardFill className={styles.navIcon} />
        <small>Settings</small>
      </NavLink>
    </div>
  );
};

export default BottomNav;
