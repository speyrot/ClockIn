import React from 'react';
import useCurrentPageName from '../../Hooks/currentPage'; 
import styles from './Header.module.css';

const HeaderComponent = () => {
    const currentPage = useCurrentPageName();

    return (
        <div className={styles.headerContainer}>
            <div className={styles.componentName}>{currentPage}</div>
            <div className={styles.profilePicPlaceholder}></div>
        </div>
    );
};

export default HeaderComponent;
