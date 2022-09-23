import {
    Grid,
    CardContent,
    Avatar,
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
import { Formik } from 'formik';
import { useContext } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { gridSpacing } from 'store/constant';
import useScriptRef from 'hooks/useScriptRef';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { capitalizeFirstLetter } from '../../utils';
import PublishIcon from '@mui/icons-material/Publish';
import { useLocation, useNavigate } from 'react-router-dom';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { updateMovies } from '../../context/movieContext/apiCall';
import { MovieContext } from '../../context/movieContext/MovieContext';

const Movie = ({ ...others }) => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const { movie } = location.state;
    const scriptedRef = useScriptRef();
    const { dispatch } = useContext(MovieContext);

    return (
        <MainCard title="Movie" button movieSection>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={4}>
                            <MainCard content={false} title="Movie Info">
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Avatar
                                                        src={movie.img}
                                                        sx={{
                                                            ...theme.typography.mediumAvatar,
                                                            cursor: 'pointer'
                                                        }}
                                                        aria-haspopup="true"
                                                        color="inherit"
                                                        style={{ width: '40px', height: '40px', marginRight: '10px' }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="span">
                                                        <Typography variant="h3">{capitalizeFirstLetter(movie.title)}</Typography>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">Description</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {movie.desc}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">Year</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {movie.year}
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
                                                        {movie.genre}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">Limit</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {movie.limit}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">Time</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {movie.duration}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </MainCard>
                        </Grid>
                        {/* LEFT */}
                        <Grid item xs={12} md={8}>
                            <MainCard title="Edit Info">
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item xs={12} lg={6}>
                                        <Formik
                                            initialValues={{
                                                title: movie.title,
                                                desc: movie.desc,
                                                year: movie.year,
                                                genre: movie.genre,
                                                limit: movie.limit,
                                                duration: movie.duration,
                                                isSeries: movie.isSeries,
                                                submit: null
                                            }}
                                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                                try {
                                                    if (scriptedRef.current) {
                                                        updateMovies(movie._id, values, dispatch);
                                                        setStatus({ success: true });
                                                        setSubmitting(false);
                                                        navigate('/movies');
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
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.desc && errors.desc)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel htmlFor="outlined-adornment-desc-update">Description</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-desc-update"
                                                            type="text"
                                                            value={values.desc}
                                                            name="desc"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="desc"
                                                            inputProps={{}}
                                                        />
                                                        {touched.desc && errors.desc && (
                                                            <FormHelperText error id="standard-weight-helper-text-desc-update">
                                                                {errors.desc}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.year && errors.year)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel htmlFor="outlined-adornment-year-update">Year</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-year-update"
                                                            type="text"
                                                            value={values.year}
                                                            name="year"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="year"
                                                            inputProps={{}}
                                                        />
                                                        {touched.year && errors.year && (
                                                            <FormHelperText error id="standard-weight-helper-text-year-update">
                                                                {errors.year}
                                                            </FormHelperText>
                                                        )}
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
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.duration && errors.duration)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel htmlFor="outlined-adornment-duration-update">Duration</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-duration-update"
                                                            type="text"
                                                            value={values.duration}
                                                            name="duration"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="duration"
                                                            inputProps={{}}
                                                        />
                                                        {touched.duration && errors.duration && (
                                                            <FormHelperText error id="standard-weight-helper-text-duration-update">
                                                                {errors.duration}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.limit && errors.limit)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel htmlFor="outlined-adornment-limit-update">Limit</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-limit-update"
                                                            type="text"
                                                            value={values.limit}
                                                            name="limit"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="limit"
                                                            inputProps={{}}
                                                        />
                                                        {touched.limit && errors.limit && (
                                                            <FormHelperText error id="standard-weight-helper-text-limit-update">
                                                                {errors.limit}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.isSeries && errors.isSeries)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel id="demo-simple-select-readonly-label">Select Series</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-readonly-label"
                                                            id="demo-simple-select-readonly"
                                                            value={values.isSeries}
                                                            label="isSeries"
                                                            name="isSeries"
                                                            onChange={handleChange}
                                                            inputProps={{}}
                                                        >
                                                            <MenuItem value="false">No</MenuItem>
                                                            <MenuItem value="true">Yes</MenuItem>
                                                        </Select>
                                                        {touched.isSeries && errors.isSeries && (
                                                            <FormHelperText error id="standard-weight-helper-text-isSeries-update">
                                                                {errors.isSeries}
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
                                    <Grid item xs={12} lg={6}>
                                        <MainCard style={{ width: '200px', height: '270px', float: 'right' }} sx={{ mt: 3 }}>
                                            <img
                                                src={movie?.img}
                                                alt="Profile Pics"
                                                style={{ width: '150px', height: '150px', borderRadius: '10px' }}
                                            />
                                            <Divider sx={{ my: 1.5 }} />
                                            <AnimateButton>
                                                <Tooltip title="Change Profile Image">
                                                    <Button
                                                        disableElevation
                                                        fullWidth
                                                        size="large"
                                                        type="file"
                                                        variant="contained"
                                                        color="secondary"
                                                    >
                                                        <PublishIcon />
                                                    </Button>
                                                </Tooltip>
                                            </AnimateButton>
                                        </MainCard>
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

export default Movie;
