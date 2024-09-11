import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import * as React from 'react';
import Box from '@mui/material/Box';

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
                    let response = await axios.get("https://backend-nffn.onrender.com/sneakers/getdetails", {
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
                    let response = await axios.get("https://backend-nffn.onrender.com/tops/getdetails", {
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
                    let response = await axios.get("https://backend-nffn.onrender.com/bottoms/getdetails", {
                        params: { id: id }
                    });
                    setArticleDetails(response.data)
                    console.log(response.data)
                }
                catch (e) {
                    console.log(e.message)
                }
            }


            if (name === "accessories") {
                try {
                    let response = await axios.get("https://backend-nffn.onrender.com/accessories/getdetails", {
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

   



    return (articleDetails && 

        <Box sx={{width:"100%",display: "flex", height:"100dvh", flexDirection:{xs:"column"}, WebkitJustifyContent:"center", alignItems:"center"}}>
               <Box sx={{maxHeight:"50dvh"}}>
               <img src={articleDetails.imageUrl} alt="" sx={{minWidth:"300px", maxWidth:"500px", objectFit:"cover"}}/>
                </Box> 

               
                <Box sx={{width:"100%",display: "flex", flexDirection:"column", WebkitJustifyContent:"center", alignItems:"center"}}>
                <Typography variant="h4" gutterBottom  sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '2rem' }}} > 
                <b>Model Name:</b> {articleDetails.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '2rem' }}}>
                    <b>Brand:</b>{articleDetails.brand}
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '2rem' }}}>
                      <b> Price</b> : {articleDetails.price} EUR
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '2rem' }}}>
                    <b>Color:</b> {articleDetails.color}
                    </Typography>



                
                    <Typography variant="h5" gutterBottom sx={{ display: "flex", flexDirection: "column", WebkitJustifyContent:"center", alignItems:"center" ,gap:{xs:"0.5rem"}, fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '2rem' } }}> Sizes available: <br />
                        <Box sx={{ display: "flex", gap:"1rem"}}>
                        {articleDetails.sizes.map((e) => {
                            return (
                                
                                
                            
                            <Chip label={e} value={e}  />
                           )
                        })}
                        </Box>
                         </Typography>
                    

                    <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '2rem' }}} >
                        {articleDetails.description}
                    </Typography>
                
                </Box> 


        </Box>

     
        

    )



}



export default DetailsPage



/*

   <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{width:"100%", display:"flex"}}>
                <Grid item xs={12} md={4} sx={{display: "flex", flexDirection: "row", gap:"1rem", width:"100%"}} >
                    <img src={articleDetails.imageUrl} alt="" />
                    <Grid item xs={12} md={12} >
                    <Typography variant="h4" gutterBottom sx={{width:"100%"}}> 
                         {articleDetails.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Brand:{articleDetails.brand}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                       Price: {articleDetails.price} EUR
                    </Typography>
                    <Typography variant="h7" gutterBottom>
                        Color: {articleDetails.color}
                    </Typography>
                    <Grid item xs={6} sx={{ display: "flex", flexDirection: "row", gap:"1rem" }}>
                    <Typography variant="h7" gutterBottom> Sizes available: <br />
                        {articleDetails.sizes.map((e) => {
                            return (
                                
                                
                            
                            <Chip label={e} value={e}  xs={12} md={4}/>
                           )
                        })}
                         </Typography>
                    </Grid >
                    <Grid item xs={12} md={12}>
                    <Typography variant="h6" gutterBottom>
                        {articleDetails.description}
                    </Typography>
                </Grid>

                    
                </Grid>
                    
                

                </Grid>
                

                </Grid>
                
                
            
        </Box>


*/ 