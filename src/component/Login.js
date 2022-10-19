import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

function Login() {
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [userData, setUserData] = useState('');
    const [checked, setChecked] = useState();
    const navigate = useNavigate();
    // const [value , setValues]=useState();
    const [passwordShown, setPasswordShown] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        // setIsVisible(!isVisible)
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    // const handleChange = (event) => {
    //     if (event.target.checked) {
    //         console.log('✅ Checkbox is checked');
    //         localStorage.setItem('userData', JSON.stringify(userData))
    //     }
    //     //   setIsSubscribed(current => !current);
    // }
    useEffect(() => {
        let Email = '';
        if (localStorage.getItem("userData") !== null) {
            let data = JSON.parse(localStorage.getItem("userData"))
            setEmail(data.email)
            setPassword(data.password)
            // console.log((data.email))
        }
    }, []);
    const handleSubmit = (event) => {

        event.preventDefault();
        // setOpen(true);

        const LoginData = async () => {

            const response = await axios.get('http://localhost:3333/data').then((response) => {

                let flag = '';
                let errorFlag = '';
                // let userData = '';
                response.data.map((index) => {
                    if (email == index.email) {
                        if (password == index.password) {
                            flag = 1;
                            let userData = index
                            if (checked) {
                                setUserData(localStorage.setItem('userData', JSON.stringify(userData)))
                            }
                            else {
                                setUserData(sessionStorage.setItem('userData', JSON.stringify(userData)))
                            }
                        }
                        else {
                            console.log('incorrect password')
                        }
                    } else {
                        errorFlag = 2;
                    }
                    // if (email == index.email && password == index.password) {
                    //   flag = 1;
                    // }
                })
                // console.log(userData)

                if (errorFlag == 2) {
                    console.log("Email Wrong")
                }
                if (flag == 1) {

                    console.log("login succesfully");
                    navigate('/Home');
                }
                else {
                    setErrorMessage('Login unsuccesfull ')
                    console.log("login unsuccesfull");
                    // console.log(email);
                    // console.log(password);
                }


            });


        }
        LoginData();



    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <span style={{ color: 'red' }}>{errorMessage}</span>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            {/* <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined"> */}
                            {/* <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel> */}

                            <TextField
                                value={email}
                                error={false}
                                style={{ marginBlock: '10px' }}
                                required
                                fullWidth
                                id="outlined-adornment-email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={e => setEmail(e.target.value)}
                            />


                            <FormControl sx={{ width: '50ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    style={{ marginBlock: '10px' }}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    id="password"
                                    type={values.showPassword ? "text" : "password"}
                                    //type={isVisible ? "text" : "password"}
                                    autoComplete="current-password"
                                    // autoFocus
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                {/* {isVisible? <Visibility /> : <VisibilityOff />} */}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                // label="Password"
                                />
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox
                                    value='remember'
                                    onChange={e => setChecked(e.target.value)}
                                    color="primary" />}

                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}

                            >
                                Login
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link style={{ cursor: "pointer" }} to="SignIn" variant="body2">
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                </Container>
            </ThemeProvider>


        </>

    )
}

export default Login
