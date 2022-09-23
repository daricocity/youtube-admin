import app from '../../firebase';
import { useContext, useState } from 'react';
import { gridSpacing } from 'store/constant';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { createMovies } from '../../context/movieContext/apiCall';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Grid, Button, Box, FormControl, InputLabel, OutlinedInput, Select, MenuItem, Input } from '@mui/material';

const NewMovie = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const storage = getStorage(app);
    const [img, setImg] = useState(null);
    const [video, setVideo] = useState(null);
    const [imgSm, setImgSm] = useState(null);
    const [movie, setMovie] = useState(null);
    const [uploaded, setUploaded] = useState(0);
    const [trailer, setTrailler] = useState(null);
    const { dispatch } = useContext(MovieContext);
    const [imgTitle, setImgTitle] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
    };

    const upload = (items) => {
        items.forEach((item) => {
            const fileName = new Date().getTime() + item.label + item.file.name;
            const storageRef = ref(storage, `/img/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                    }
                },
                (err) => {
                    // Handle unsuccessful uploads
                    console.log(err);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setMovie((prev) => {
                            return { ...prev, [item.label]: downloadURL };
                        });
                        setUploaded((prev) => prev + 1);
                        console.log('File available at', downloadURL);
                    });
                }
            );
        });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            { file: img, label: 'img' },
            { file: imgSm, label: 'imgSm' },
            { file: imgTitle, label: 'imgTitle' },
            { file: trailer, label: 'trailer' },
            { file: video, label: 'video' }
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createMovies(movie, dispatch);
        navigate('/movies');
    };

    return (
        <MainCard title="New Movie" button oneUserSection>
            <MainCard title="Create Your Movie">
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
                                <InputLabel htmlFor="outlined-adornment-desc-create">Description</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-desc-create"
                                    type="text"
                                    name="desc"
                                    onChange={handleChange}
                                    label="desc"
                                    inputProps={{}}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-year-create">Year</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-year-create"
                                    type="text"
                                    name="year"
                                    onChange={handleChange}
                                    label="year"
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
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-duration-create">Duration</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-duration-create"
                                    type="text"
                                    name="duration"
                                    onChange={handleChange}
                                    label="duration"
                                    inputProps={{}}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-limit-create">Limit</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-limit-create"
                                    type="text"
                                    name="limit"
                                    onChange={handleChange}
                                    label="limit"
                                    inputProps={{}}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel id="demo-simple-select-readonly-label">Select Series</InputLabel>
                                <Select
                                    labelId="demo-simple-select-readonly-label"
                                    id="isSeries"
                                    label="isSeries"
                                    name="isSeries"
                                    onChange={handleChange}
                                    inputProps={{}}
                                >
                                    <MenuItem value="false">No</MenuItem>
                                    <MenuItem value="true">Yes</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-img-create">Image</InputLabel>
                                <Input
                                    id="outlined-adornment-img-create"
                                    type="file"
                                    name="img"
                                    onChange={(e) => setImg(e.target.files[0])}
                                    label="img"
                                    inputProps={{}}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-imgTitle-create">Image Title</InputLabel>
                                <Input
                                    id="outlined-adornment-imgTitle-create"
                                    type="file"
                                    name="imgTitle"
                                    onChange={(e) => setImgTitle(e.target.files[0])}
                                    label="imgTitle"
                                    inputProps={{}}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-username-update">Thumbnail Image</InputLabel>
                                <Input
                                    id="outlined-adornment-username-update"
                                    type="file"
                                    name="imgSm"
                                    onChange={(e) => setImgSm(e.target.files[0])}
                                    label="imgSm"
                                    inputProps={{}}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-trailer-create">Trailer</InputLabel>
                                <Input
                                    id="outlined-adornment-trailer-create"
                                    type="file"
                                    name="trailer"
                                    onChange={(e) => setTrailler(e.target.files[0])}
                                    label="trailer"
                                    inputProps={{}}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-video-create">Video</InputLabel>
                                <Input
                                    id="outlined-adornment-video-create"
                                    type="file"
                                    name="video"
                                    onChange={(e) => setVideo(e.target.files[0])}
                                    label="video"
                                    inputProps={{}}
                                />
                            </FormControl>
                            {uploaded === 5 ? (
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
                            ) : (
                                <Box sx={{ mt: 2 }}>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            fullWidth
                                            size="large"
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleUpload}
                                        >
                                            Upload
                                        </Button>
                                    </AnimateButton>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </MainCard>
        </MainCard>
    );
};

export default NewMovie;
