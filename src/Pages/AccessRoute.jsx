
import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react'

let AccesRoute = () => {

    let navigation = useNavigate()

useEffect(()=>{
    setTimeout(()=>{
        navigation("/")

    },3000)


}, [])



    return (
        <div style={{width: "100%", height:"100dvh",  display: "flex", justifyContent:"center", alignItems:"center"}}>

            <Alert severity="error">
                <AlertTitle>Access Denied</AlertTitle>
                You dont have permission to access this section.
                
                Redirection to Homepage in 3 seconds
            </Alert>

        </div>



    )
}

export default AccesRoute