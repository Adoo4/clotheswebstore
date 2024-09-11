


import Sneakers from "../Components/Sneakers"
import Tops from "../Components/Tops"
import Shortlist from "../Components/Bottoms"
import Shortlist2 from "../Components/Shortlist2"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import "./Homepage.css"
let Homepage = ({user, setuser}) => {










    return ( <Box
      sx={{
        boxSizing: "border-box",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: "1rem",
        background: "rgb(255, 255, 255)",
      }}
    >
      {/* Main container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: {xs:"column", sm:"row"},
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
        }}
      >
        {/* Left side */}
        <Box
          sx={{
            display: "flex",
            width: {xs:"100%", sm: "70%"},
            height: "100dvh",
            flexGrow: 2,
          }}
        >
          <img
            src="https://i.postimg.cc/5050Yk2P/Reebok.jpg"
            alt="Reebok"
            style={{
              width: {xs:"100%", sm:"70%"},
             
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Right side */}
        <Box
          sx={{
            display: "flex",
            width: {xs:"100%", md:"50%"},
            height: "50%",
            justifySelf:"start",
            flexDirection: "column",
            flexGrow: 1,
            gap: "1rem",
          }}
        >
          <Typography
            variant="h1"
            className="quote"
            sx={{
              fontSize: "clamp(5rem, 10vw, 7rem)",
              fontFamily: "anton",
              lineHeight: 1,
              justifySelf:"flex-start",
            }}
          >
            WEAR THE CLOTHES THAT MATTER
          </Typography>
        </Box>
      </Box>

      {/* Sneakers component */}
      <Sneakers user={user} setuser={setuser} />

      {/* Tops component */}
      <Tops />

      {/* Denim Section */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "50%",
          justifyContent: "center",
        }}
      >
        <img
          src="https://img.freepik.com/free-psd/black-friday-sale-with-abstract-background_1361-4626.jpg"
          alt="Black Friday Sale"
          style={{
            width: "50%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Shortlist components */}
      <Shortlist />
      <Shortlist2 />
    </Box>
    )
}


export default Homepage