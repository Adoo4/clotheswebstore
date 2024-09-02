import axios from 'axios'
import { useState, useEffect } from 'react'
import * as React from 'react';
import "../Pages/Homepage.css"
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import { CardActionArea } from '@mui/material';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';





let Shortlist = ({user, setuser}) => {
  let [data, setData] = useState([])
  let navigate = useNavigate();
  useEffect(() => {

    let limited = async () => {
      try {
        let response = await axios.get("http://localhost:5757/bottoms/getbottomslimit")
        console.log(response.data)
        setData(response.data || [])



      }
      catch (e) { }

    }

    limited()


  }, [])




  return (
    <>
   

          <div className="separator">
            
          <Typography gutterBottom variant="h2" component="div">
                        Bottoms
                      </Typography>

                      <Button color="success" variant="outlined"
          onClick={()=>navigate("/bottoms")}
           sx={{
            color: "white",
            backgroundColor: "black",
            alignSelf: "flex-end",
            borderColor: 'gray', // Optional: change the border color if needed
            '&:hover': {
              borderColor: 'white', // Optional: ensure the border color remains white on hover
              backgroundColor: 'gray', // Optional: change background color on hover
              
            }
          }}>VIEW MORE</Button>
            
            
            </div>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflowX: 'auto', height: "50dvh", gap: "1rem" }}>
        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: "flex-start", height: "100%" }}>
          {data.map((e, index) => (
            <Grid item xs={12} sm={6} md={3} xl={2} key={e._id}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'stretch',
                  height: '100%',  // Ensure the Box takes the full height of the Grid item
                  border: 'none'
                }}
              >
                <Card
                  sx={{
                    maxWidth: 280,
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1, // Make the card grow to fill the available space
                    height: '100%', // Ensure the Card takes the full height of the Box
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: 'none' 
                    
                  }}
                >
                  <CardActionArea sx={{
    boxShadow: 'none', // Remove drop shadow
    '&:hover': {
      boxShadow: 'none', // Remove hover effect shadow
      backgroundColor: 'inherit', // Ensure no background change on hover
    },
  }}>
                    <CardMedia sx={{ width: "100%", objectFit: "contain", height: "200px"}}
                      component="img"
                      height="140"
                      image={e.imageUrl}
                      alt="green iguana"
                      
                      
                    />
                    <CardContent  sx={{
      boxShadow: 'none', // Ensure no shadow on the content
      '&:hover': {
        boxShadow: 'none', // Remove hover effect on content
      },
    }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {e.name}
                      </Typography>
                      <Typography variant="h8" color="text.secondary" >
                        {e.description}
                      </Typography>


                    </CardContent>

                  </CardActionArea>

                </Card>
              </Box>

            </Grid>
          ))}

        </Grid>

      </Box>
    </>
  )
}




export default Shortlist