import MovieIcon from '@mui/icons-material/Movie';
import ViewListIcon from '@mui/icons-material/ViewList';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

const quickmenu = {
    id: 'quickmenu',
    title: 'Quick Menu',
    type: 'group',
    children: [
        {
            id: 'users',
            title: 'Users',
            type: 'item',
            url: '/users',
            icon: PeopleOutlineIcon,
            breadcrumbs: false
        },
        {
            id: 'movies',
            title: 'Movies',
            type: 'item',
            url: '/movies',
            icon: MovieIcon,
            breadcrumbs: false
        },
        {
            id: 'list',
            title: 'List',
            type: 'item',
            url: '/lists',
            icon: ViewListIcon,
            breadcrumbs: false
        }
    ]
};

export default quickmenu;
