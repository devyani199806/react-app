import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Link } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const theme = createTheme();

function SignIn() {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

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
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const handleSubmit = (event) => {

    event.preventDefault()
    const SignUp = async () => {

      const response = await axios.get('http://localhost:3333/data').then((response) => {

        let flag = '';
        let errorFlag = '';
        let userData = '';
        response.data.map((index) => {
          if (email == index.email) {
            setOpen(true);
            setErrorMessage('Email Already Exist ')
            setEmail('');
          } else {
            flag = 1;
          }
        })

        if (flag == 1) {
          // setOpen(true)
          // setErrorMessage('SignUp successfully');
          axios.post('http://localhost:3333/data', {
            first_name,
            last_name,
            email,
            password,
          }).then((response) => {
            console.log(response);

          }).catch((error) => {
            // console.log(error);
          })
          setFirst_name("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }
        if(first_name=='' )
        {
          setOpen(true)
          setErrorMessage('Please Enter FirstName')
        }else if(last_name==''){
          setOpen(true)
          setErrorMessage('Please Enter LastName')
        }else if(email==''){
          setOpen(true)
          setErrorMessage('Please Enter Email')
        }else if(password==''){
        setOpen(true)
        setErrorMessage('Please Enter Password')
        }else if(confirmPassword=='' && password !== confirmPassword ){
          setOpen(true)
          setErrorMessage('Password not Match')
        }else{

        }



        if (password !== confirmPassword) {
          setOpen(true)
          setErrorMessage('password not match')
        }
      });
    }
    SignUp();

  }
  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {/* Email Already Exist */}
          {errorMessage}
        </Alert>
      </Snackbar>

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
              Sign Up
            </Typography>
            <span style={{ color: 'red' }}></span>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              {/* <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined"> */}
              {/* <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel> */}
              <TextField
                error={false}
                margin="dense"
                required
                fullWidth
                id="outlined-adornment-Fname"
                label="First Name"
                name="FirstName"
                autoComplete="FirstName"
                autoFocus
                onChange={e => setFirst_name(e.target.value)}
              />
              <TextField
                error={false}
                margin="dense"
                required
                fullWidth
                id="outlined-adornment-lname"
                label="Last Name"
                name="LastName"
                autoComplete="LastName"
                onChange={e => setLastName(e.target.value)}
              />
              <TextField
                error={false}
                margin="dense"
                required
                fullWidth
                id="outlined-adornment-email"
                label="Email"
                name="email"
                autoComplete="email"
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
                  value={values.pass}
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
                />


              </FormControl>
              <FormControl sx={{ width: '50ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Confirm Password </InputLabel>
                <OutlinedInput
                  // style={{marginBottom:'15px'}}
                  required
                  fullWidth
                  name="ConfirmPassword"
                  label="Confirm Password"
                  id="ConfirmPassword"
                  type={values.showPassword ? "text" : "password"}
                  //type={isVisible ? "text" : "password"}
                  autoComplete="current-password"
                  // autoFocus
                  onChange={e => setConfirmPassword(e.target.value)}
                  value={values.pass}
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
                />


              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}

              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    {/* Forgot password? */}
                  </Link>
                </Grid>
                <Grid item>
                  <Link style={{ cursor: "pointer" }} to="/" variant="body2">
                    Go to Login
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

export default SignIn
