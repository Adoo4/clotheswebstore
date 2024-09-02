import React from 'react';
import { Box, Container, Typography, Link, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


let Footer = ()=>{


	return (
		<Box
		sx={{
			bgcolor: '#333333',
			color: 'white',
			padding: '2rem 0',
			mt: 'auto',
			justifySelf:"flex-end",
			bottom:"0%"
		  }}
		>
		  <Container maxWidth="lg">
			<Grid container spacing={4}>
			  <Grid item xs={12} md={4}>
				<Typography variant="h6" gutterBottom>
				  Shop Local
				</Typography>
				<Typography variant="body2">
				  Bringing you the latest in fashion. Stay stylish with UrbanStyle.
				</Typography>
			  </Grid>
			  <Grid item xs={12} md={4}>
				<Typography variant="h6" gutterBottom>
				  Quick Links
				</Typography>
				<Grid container spacing={1}>
				  <Grid item xs={6}>
					<Link href="#" color="inherit" variant="body2">
					  Home
					</Link>
				  </Grid>
				  <Grid item xs={6}>
					<Link href="#" color="inherit" variant="body2">
					  Products
					</Link>
				  </Grid>
				  <Grid item xs={6}>
					<Link href="#" color="inherit" variant="body2">
					  Contact
					</Link>
				  </Grid>
				  <Grid item xs={6}>
					<Link href="#" color="inherit" variant="body2">
					  About
					</Link>
				  </Grid>
				</Grid>
			  </Grid>
			  <Grid item xs={12} md={4}>
				<Typography variant="h6" gutterBottom>
				  Follow Us
				</Typography>
				<Box>
				  <IconButton href="#" color="inherit" aria-label="Facebook">
					<FacebookIcon />
				  </IconButton>
				  <IconButton href="#" color="inherit" aria-label="Twitter">
					<TwitterIcon />
				  </IconButton>
				  <IconButton href="#" color="inherit" aria-label="Instagram">
					<InstagramIcon />
				  </IconButton>
				  <IconButton href="#" color="inherit" aria-label="LinkedIn">
					<LinkedInIcon />
				  </IconButton>
				</Box>
			  </Grid>
			</Grid>
			<Typography variant="body2" align="center" sx={{ marginTop: '1rem' }}>
			  © 2024 Shop Local. All rights reserved.
			</Typography>
		  </Container>
		</Box>
	  );
}

export default Footer