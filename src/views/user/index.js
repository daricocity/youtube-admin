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
    OutlinedInput
} from '@mui/material';
import { Formik } from 'formik';
import { useContext } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { gridSpacing } from 'store/constant';
import useScriptRef from 'hooks/useScriptRef';
import { useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import MainCard from 'ui-component/cards/MainCard';
import PersonIcon from '@mui/icons-material/Person';
import PublishIcon from '@mui/icons-material/Publish';
import User1 from 'assets/images/users/avatar image.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUser } from '../../context/userContext/apiCall';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { formatDate, capitalizeFirstLetter } from '../../utils';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { UserContext } from '../../context/userContext/UserContext';

const User = ({ ...others }) => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state;
    const scriptedRef = useScriptRef();
    const { dispatch } = useContext(UserContext);

    return (
        <MainCard title={capitalizeFirstLetter(user.username)} button userSection>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={4}>
                            <MainCard content={false} title="User Info">
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <Avatar
                                                        src={user.profilePic ? user.profilePic : User1}
                                                        sx={{
                                                            ...theme.typography.mediumAvatar,
                                                            cursor: 'pointer'
                                                        }}
                                                        aria-haspopup="true"
                                                        color="inherit"
                                                        style={{ width: '80px', height: '80px', marginRight: '10px' }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="span">
                                                        <Typography variant="h3">{capitalizeFirstLetter(user.username)}</Typography>
                                                        <Typography variant="h5">Software Engineer</Typography>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">Account Details</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <PersonIcon />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {capitalizeFirstLetter(user.fullName ? user.fullName : user.username)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <CalendarMonthIcon />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {formatDate(user.createdAt)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">CONTACT DETAILS</Typography>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <EmailIcon />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        {user.email}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="flex-start">
                                                <Grid item>
                                                    <PlaceIcon />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="p" style={{ marginLeft: '10px' }}>
                                                        New York | USA
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
                                                username: user.username,
                                                fullName: user.fullName,
                                                email: user.email,
                                                submit: null
                                            }}
                                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                                try {
                                                    if (scriptedRef.current) {
                                                        console.log(values);
                                                        updateUser(user._id, values, dispatch);
                                                        setStatus({ success: true });
                                                        setSubmitting(false);
                                                        navigate('/users');
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
                                                        error={Boolean(touched.username && errors.username)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel htmlFor="outlined-adornment-username-update">Username</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-username-update"
                                                            type="text"
                                                            value={values.username}
                                                            name="username"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="Username"
                                                            inputProps={{}}
                                                            disabled
                                                        />
                                                        {touched.username && errors.username && (
                                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                                {errors.username}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.fullName && errors.fullName)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel htmlFor="outlined-adornment-name-update">Full Name</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-name-update"
                                                            type="text"
                                                            value={values.fullName}
                                                            name="fullName"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="Full Name"
                                                            inputProps={{}}
                                                        />
                                                        {touched.fullName && errors.fullName && (
                                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                                {errors.fullName}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.email && errors.email)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel htmlFor="outlined-adornment-email-update">Email</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-email-update"
                                                            type="text"
                                                            value={values.email}
                                                            name="email"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="Email"
                                                            inputProps={{}}
                                                        />
                                                        {touched.email && errors.email && (
                                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                                {errors.email}
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
                                                src={user.profilePic ? user.profilePic : User1}
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

export default User;
