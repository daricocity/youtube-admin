import { gridSpacing } from 'store/constant';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { useContext, useState, useEffect } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { createList } from '../../context/listContext/apiCall';
import { getMovies } from '../../context/movieContext/apiCall';
import { ListContext } from '../../context/listContext/ListContext';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { Grid, Button, Box, FormControl, InputLabel, OutlinedInput, Select, MenuItem, FormHelperText } from '@mui/material';

const NewList = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [list, setList] = useState(null);
    const [movieList, setMovieList] = useState([]);
    const { dispatch } = useContext(ListContext);
    const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };

    useEffect(() => {
        getMovies(dispatchMovie);
    }, [dispatchMovie]);

    const handleChange = (e) => {
        const value = e.target.value;
        setList({ ...list, [e.target.name]: value });
    };

    const handleSelect = (e) => {
        const {
            target: { value }
        } = e;
        setList({ ...list, [e.target.name]: value });
        setMovieList(typeof value === 'string' ? value.split(',') : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createList(list, dispatch);
        navigate('/lists');
    };

    return (
        <MainCard title="New List" button>
            <MainCard title="Create Your List">
                <form noValidate>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-title-create">Title</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-title-create"
                                    type="text"
                                    name="title"
                                    onChange={handleChange}
                                    label="title"
                                    inputProps={{}}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-genre-create">Genre</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-genre-create"
                                    type="text"
                                    name="genre"
                                    onChange={handleChange}
                                    label="genre"
                                    inputProps={{}}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                                    <MenuItem value="movie">Movie</MenuItem>
                                    <MenuItem value="series">Series</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel id="content-readonly-label">Select Content</InputLabel>
                                <Select
                                    labelId="content-readonly-label"
                                    id="content"
                                    label="content"
                                    name="content"
                                    onChange={handleSelect}
                                    multiple
                                    value={movieList}
                                    style={{ height: '62px' }}
                                    MenuProps={MenuProps}
                                >
                                    {movies.map((movie) => (
                                        <MenuItem key={movie._id} value={movie._id}>
                                            {movie.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText default id="standard-weight-helper-text--register">
                                    Select Multiple Movie Content
                                </FormHelperText>
                            </FormControl>
                            <Box sx={{ mt: 2 }}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        fullWidth
                                        size="large"
                                        onClick={handleSubmit}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Create
                                    </Button>
                                </AnimateButton>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </MainCard>
        </MainCard>
    );
};

export default NewList;
