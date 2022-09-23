import MailIcon from '@mui/icons-material/Mail';
import MessageIcon from '@mui/icons-material/Message';
import FeedbackIcon from '@mui/icons-material/Feedback';

const notifications = {
    id: 'notifications',
    title: 'Notifications',
    type: 'group',
    children: [
        {
            id: 'mail',
            title: 'Mail',
            type: 'item',
            url: '',
            icon: MailIcon,
            breadcrumbs: false
        },
        {
            id: 'feedback',
            title: 'Feedback',
            type: 'item',
            url: '',
            icon: FeedbackIcon,
            breadcrumbs: false
        },
        {
            id: 'message',
            title: 'Messages',
            type: 'item',
            url: '',
            icon: MessageIcon,
            breadcrumbs: false
        }
    ]
};

export default notifications;
