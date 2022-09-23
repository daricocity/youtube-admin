import themes from 'themes';
import { useContext, lazy } from 'react';
import { useSelector } from 'react-redux';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { ThemeProvider } from '@mui/material/styles';
import NavigationScroll from 'layout/NavigationScroll';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/authContext/AuthContext';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

const User = Loadable(lazy(() => import('views/user')));
const List = Loadable(lazy(() => import('views/list')));
const Movie = Loadable(lazy(() => import('views/movie')));
const NewList = Loadable(lazy(() => import('views/newList')));
const Login = Loadable(lazy(() => import('views/auth/Login')));
const ListList = Loadable(lazy(() => import('views/listList')));
const NewMovie = Loadable(lazy(() => import('views/newMovie')));
const UserList = Loadable(lazy(() => import('views/userList')));
const MovieList = Loadable(lazy(() => import('views/movieList')));
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

const App = () => {
    const { user } = useContext(AuthContext);
    const customization = useSelector((state) => state.customization);
    return (
        <>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes>
                            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                            <Route path="/users" element={user ? <MainLayout Children={<UserList />} /> : <Navigate to="/login" />} />
                            <Route path="/lists" element={user ? <MainLayout Children={<ListList />} /> : <Navigate to="/login" />} />
                            <Route path="/newList" element={user ? <MainLayout Children={<NewList />} /> : <Navigate to="/login" />} />
                            <Route path="/movies" element={user ? <MainLayout Children={<MovieList />} /> : <Navigate to="/login" />} />
                            <Route path="/newMovie" element={user ? <MainLayout Children={<NewMovie />} /> : <Navigate to="/login" />} />
                            <Route path="/" element={user ? <MainLayout Children={<DashboardDefault />} /> : <Navigate to="/login" />} />
                            <Route path="/user/:userId" element={user ? <MainLayout Children={<User />} /> : <Navigate to="/login" />} />
                            <Route path="/list/:listId" element={user ? <MainLayout Children={<List />} /> : <Navigate to="/login" />} />
                            <Route path="/movie/:movieId" element={user ? <MainLayout Children={<Movie />} /> : <Navigate to="/login" />} />
                        </Routes>
                    </NavigationScroll>
                </ThemeProvider>
            </StyledEngineProvider>
        </>
    );
};

export default App;
