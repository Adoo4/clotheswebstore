import axios from 'axios'
import { useState, useEffect } from 'react'
import * as React from 'react';
import "../Pages/Homepage.css"
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';


let Sneakers = ({user, setuser}) => {
  let [data, setdata] = useState([])
  let navigate = useNavigate();
  useEffect(() => {

    let limitedSneakers = async () => {
      try {
        let getlimitedsneakers = await axios.get("http://localhost:5757/sneakers/getsneakerslimit")
        console.log(getlimitedsneakers.data)
        setdata(getlimitedsneakers.data || [])



      }
      catch (e) { }

    }

    limitedSneakers()


  }, [])




  return (
    <>
   

          <div className="separator">
            
          <Typography gutterBottom variant="h2" component="div">
                        Footwear
                      </Typography>

                      <Button color="success" variant="outlined"
          onClick={()=>navigate("/sneakers")}
           sx={{
            color: "white",
            backgroundColor: "black",
            alignSelf: "flex-end",
            borderColor: 'gray', 
            '&:hover': {
              borderColor: 'white', 
              backgroundColor: 'gray', 
              
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
                  height: '100%',  
                  border: 'none'
                }}
              >
                <Card
                  sx={{
                    maxWidth: 280,
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1, 
                    height: '100%', 
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: 'none',
                    backgroundColor:"transparent"
                    
                  }}
                >
                  <CardActionArea sx={{
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none', 
      backgroundColor: 'inherit', 
    },
  }}>
                    <CardMedia sx={{ width: "100%", objectFit: "contain", height: "200px"}}
                      component="img"
                      height="140"
                      image={e.imageUrl}
                      alt="green iguana"
                      
                      
                    />
                    <CardContent  sx={{
      boxShadow: 'none', 
      '&:hover': {
        boxShadow: 'none', 
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




export default Sneakers