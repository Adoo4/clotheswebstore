import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios'
import {useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


let Registerpage = () => {

  let [newuser, setnewuser] = useState({
    firstname:"",
    lastname: "",
    email: "",
    password: "",

  })

  let navigate = useNavigate();

  let [notify, setnotify] = useState(false)

  let createNewUser = async(e)=> {
    e.preventDefault();
    try{
      console.log("request sent")
      let response = await axios.post("http://localhost:5757/user/register", newuser);
      console.log(response.data);
      setnotify(true)
      setTimeout(()=>setnotify(false), 3000)
      
    }
    catch(e){

    }

  }




  return (

    <Container component="main" sx={{ width: "50%", maxWidth: "60%", minWidth: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "70dvh" }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
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
                }} onChange={(e)=>{ setnewuser({...newuser, firstname: e.target.value})}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
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
                }} onChange={(e)=>{ setnewuser({...newuser, lastname: e.target.value})}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                }} onChange={(e)=>{ setnewuser({...newuser, email: e.target.value})}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
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
                }} onChange={(e)=>{ setnewuser({...newuser, password: e.target.value})}}
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={(e)=>createNewUser(e)}
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#ed6a00",
              '&:hover': {
                backgroundColor: 'black', 
              },
            }}
            
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={()=>navigate("/login")}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <div>
      
      <Snackbar open={notify} autoHideDuration={2000} >
        <Alert
          
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          User created!
        </Alert>
      </Snackbar>
    </div>

    </Container>

  );
}


export default Registerpage