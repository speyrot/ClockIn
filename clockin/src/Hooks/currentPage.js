import { useLocation } from 'react-router-dom';

const useCurrentPageName = () => {
    const location = useLocation();
    const pathToPageNameMap = {
        '/dashboard': 'Dashboard',
        '/timesheet': 'Timesheet',
        '/payroll': 'Payroll',
        '/settings': 'Settings',
    };

    return pathToPageNameMap[location.pathname] || 'Unknown';
};

export default useCurrentPageName;