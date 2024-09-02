import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import axios from "axios"
import Typography from '@mui/material/Typography';


let DetailsPage = () => {
    let [articleDetails, setArticleDetails] = useState(null)

    let { id, name } = useParams();


    useEffect(() => {
        let getDetails = async () => {
            if (name === "sneakers") {
                try {
                    let response = await axios.get("http://localhost:5757/sneakers/getdetails", {
                        params: { id: id }
                    });
                    setArticleDetails(response.data)
                    console.log(response.data)
                }
                catch (e) {
                    console.log(e.message)
                }
            }

            if (name === "tops") {
                try {
                    let response = await axios.get("http://localhost:5757/tops/getdetails", {
                        params: { id: id }
                    });
                    setArticleDetails(response.data)
                    console.log(response.data)
                }
                catch (e) {
                    console.log(e.message)
                }
            }


            if (name === "bottoms") {
                try {
                    let response = await axios.get("http://localhost:5757/bottoms/getdetails", {
                        params: { id: id }
                    });
                    setArticleDetails(response.data)
                    console.log(response.data)
                }
                catch (e) {
                    console.log(e.message)
                }
            }


        }
        getDetails();
    }, [id, name])

    let handleClick = () => { }



    return (articleDetails && 

        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} >
                <Grid item xs={12} md={12}>
                    <img src={articleDetails.imageUrl} alt="" />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h4" gutterBottom>
                         {articleDetails.name}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h5" gutterBottom>
                        Brand:{articleDetails.brand}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h5" gutterBottom>
                       Price: {articleDetails.price} EUR
                    </Typography>
                </Grid>
                <Grid item xs={6} md={5}>
                    <Typography variant="h7" gutterBottom>
                        Color: {articleDetails.color}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>

        
                    <Grid item xs={6} sx={{ display: "flex", flexDirection: "row", gap:"1rem" }}>
                    <Typography variant="h7" gutterBottom> Sizes available: <br />
                        {articleDetails.sizes.map((e) => {
                            return (
                                
                                
                            
                            <Chip label={e} value={e}  xs={12} md={4}/>
                           )
                        })}
                         </Typography>
                    </Grid >

                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6" gutterBottom>
                        {articleDetails.description}
                    </Typography>
                </Grid>
                
            </Grid>
        </Box>
        

    )



}



export default DetailsPage