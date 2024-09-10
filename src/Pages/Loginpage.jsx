import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {useState} from 'react'
import axios from 'axios' 
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from 'react-router-dom';


let Loginpage = ({setuser, user}) => {

let [login, setlogin] = useState({email:"", password:""})
let [open, setopen] = useState(true);
let [rememberme, setrememberme] = useState(false)

let navigate = useNavigate();







let userLogin = async(e)=> {
  e.preventDefault();
  try {
    if(login.email && login.password) {
    let response = await axios.post("http://localhost:5757/user/login", login)
    console.log(response.data)
    setuser(response.data.user)
    if (rememberme) {
    localStorage.setItem("LocalShopAuth", response.data.token)}
    else {sessionStorage.setItem("LocalShopAuth", response.data.token)}
    setopen(true);
    handleClose();
  }
  } catch(error) {
    console.log(error.message)
  }
  

  }
  let handleClose= ()=> {
    setTimeout(()=>{setopen(false); navigate("/")}, 3000)
    

}

return (
  <>
    {user ? (
      <Grid item xs={12} sm={8} md={5} elevation={6} square sx={{ height: "70dvh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#e8f6e9" }}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Success!
          </Typography>
          <Typography component="h1" variant="h5">
          {(` Welcome ${user.firstname}`)}
          </Typography>
          <Typography component="h3" variant="h8">
          {(` Redirecting you to main page in 3 seconds`)}
          </Typography>
          
        </Box>
        <Snackbar open={open} autoHideDuration={2000}  >
      <Alert
       
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        Logged in!
      </Alert>
    </Snackbar>
      </Grid>

      
    ) : (
      <Grid item xs={12} sm={8} md={5} elevation={6} square sx={{ height: "70dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e) => setlogin({ ...login, email: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'gray',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ed6a00', 
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ed6a00', 
                  },
                  '& input': {
                    backgroundColor: 'transparent', 
                  },
                },
                '& .MuiFormLabel-root': {
                  color: 'gray', 
                },
                '& .MuiFormLabel-root.Mui-focused': {
                  color: '#ed6a00', 
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              color="warning"
              onChange={(e) => setlogin({ ...login, password: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#ed6a00', 
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ed6a00', 
                  },
                },
                '& .MuiFormLabel-root': {
                  color: 'gray',
                },
                '& .MuiFormLabel-root.Mui-focused': {
                  color: '#ed6a00', 
                },
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="warning" />}
              label="Remember me"
              onChange={() => setrememberme(true)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={(e) => userLogin(e)}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#ed6a00",
                '&:hover': {
                  backgroundColor: 'black', 
                },
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => navigate("/register")}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    )}
  </>
);
}

export default Loginpage