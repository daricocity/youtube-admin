import { IconDashboard, IconReportAnalytics } from '@tabler/icons';
import LogoutIcon from '@mui/icons-material/Logout';

const staff = {
    id: 'staff',
    title: 'Staff',
    type: 'group',
    children: [
        {
            id: 'manage',
            title: 'Manage',
            type: 'item',
            url: '',
            icon: IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'report',
            title: 'Reports',
            type: 'item',
            url: '',
            icon: IconReportAnalytics,
            breadcrumbs: false
        },
        {
            id: 'logout',
            title: 'Logout',
            type: 'item',
            url: '/logout',
            icon: LogoutIcon,
            breadcrumbs: false
        }
    ]
};

export default staff;
