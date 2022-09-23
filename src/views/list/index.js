import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { gridSpacing } from 'store/constant';
import { useContext, useEffect } from 'react';
import useScriptRef from 'hooks/useScriptRef';
import { useTheme } from '@mui/material/styles';
import MovieIcon from '@mui/icons-material/Movie';
import MainCard from 'ui-component/cards/MainCard';
import { capitalizeFirstLetter } from '../../utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMovies } from '../../context/movieContext/apiCall';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { updateLists } from '../../context/listContext/apiCall';
import { ListContext } from '../../context/listContext/ListContext';
import { MovieContext } from '../../context/movieContext/MovieContext';
import {
    Grid,
    CardContent,
    Button,
    Divider,
    Typography,
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    Select,
    MenuItem
} from '@mui/material';

const List = ({ ...others }) => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const { list } = location.state;
    const scriptedRef = useScriptRef();
    const { dispatch } = useContext(ListContext);
    const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

    useEffect(() => {
        getMovies(dispatchMovie);
    }, [dispatchMovie]);

    const listMovie = list.content?.map((id) => movies.find((movie) => movie._id === id));

    return (
        <MainCard title="List" button movieSection>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={4}>
                            <MainCard content={false} title="List Info">
                                <CardContent>
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">Title</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {capitalizeFirstLetter(list.title)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">Id</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {list._id}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">Type</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {list.type}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">Genre</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {list.genre}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </MainCard>
                        </Grid>
                        {/* LEFT */}
                        <Grid item xs={12} md={3}>
                            <MainCard content={false} title="Movie List">
                                {listMovie.map((row, ind) => (
                                    <Link to={{ pathname: '/movie/' + row?._id }} state={{ movie: row }} style={{ listStyle: 'none' }}>
                                        <Grid key={ind} container alignItems="center" justifyContent="flex-start">
                                            <Grid item sx={{ my: 0.69, ml: 1.5 }}>
                                                <MovieIcon />
                                            </Grid>
                                            <Grid item sx={{ my: 0.69, ml: 0.5 }}>
                                                <Typography variant="p">{row?.title}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Link>
                                ))}
                            </MainCard>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <MainCard title="Edit Info">
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item xs={12}>
                                        <Formik
                                            initialValues={{
                                                title: list.title,
                                                type: list.type,
                                                genre: list.genre,
                                                submit: null
                                            }}
                                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                                try {
                                                    if (scriptedRef.current) {
                                                        updateLists(list._id, values, dispatch);
                                                        setStatus({ success: true });
                                                        setSubmitting(false);
                                                        navigate('/lists');
                                                    }
                                                } catch (err) {
                                                    console.error(err);
                                                    if (scriptedRef.current) {
                                                        setStatus({ success: false });
                                                        setErrors({ submit: err.message });
                                                        setSubmitting(false);
                                                    }
                                                }
                                            }}
                                        >
                                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                                <form noValidate onSubmit={handleSubmit} {...others}>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.title && errors.title)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel htmlFor="outlined-adornment-title-update">Title</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-title-update"
                                                            type="text"
                                                            value={values.title}
                                                            name="title"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="title"
                                                            inputProps={{}}
                                                        />
                                                        {touched.title && errors.title && (
                                                            <FormHelperText error id="standard-weight-helper-text-title-update">
                                                                {errors.title}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                        <InputLabel id="type-readonly-label">Select Type</InputLabel>
                                                        <Select
                                                            labelId="type-readonly-label"
                                                            id="type"
                                                            label="type"
                                                            name="type"
                                                            onChange={handleChange}
                                                            style={{ height: '62px' }}
                                                        >
                                                            <MenuItem>Type</MenuItem>
                                                            <MenuItem key={1} value="movie">
                                                                Movie
                                                            </MenuItem>
                                                            <MenuItem key={2} value="series">
                                                                Series
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.genre && errors.genre)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel htmlFor="outlined-adornment-genre-update">Genre</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-genre-update"
                                                            type="text"
                                                            value={values.genre}
                                                            name="genre"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="genre"
                                                            inputProps={{}}
                                                        />
                                                        {touched.genre && errors.genre && (
                                                            <FormHelperText error id="standard-weight-helper-text-genre-update">
                                                                {errors.genre}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    {errors.submit && (
                                                        <Box sx={{ mt: 3 }}>
                                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                                        </Box>
                                                    )}

                                                    <Box sx={{ mt: 2 }}>
                                                        <AnimateButton>
                                                            <Button
                                                                disableElevation
                                                                disabled={isSubmitting}
                                                                fullWidth
                                                                size="large"
                                                                type="submit"
                                                                variant="contained"
                                                                color="secondary"
                                                            >
                                                                Update
                                                            </Button>
                                                        </AnimateButton>
                                                    </Box>
                                                </form>
                                            )}
                                        </Formik>
                                    </Grid>
                                </Grid>
                            </MainCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default List;
