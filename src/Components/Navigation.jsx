import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Chip from '@mui/material/Chip';
import ReplayIcon from '@mui/icons-material/Replay';
import PublicIcon from '@mui/icons-material/Public';
import Avatar from '@mui/material/Avatar';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import CottageIcon from '@mui/icons-material/Cottage';

const StyledSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#444444",
  "&:hover": {
    backgroundColor: alpha(theme.palette.warning.main, 0.45)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  
}));

const SearchIconWrapper2 = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  color: "red",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
  
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));

//search as JSX
const search = (
  <StyledSearch>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Search…"
      inputProps={{ "aria-label": "search" }}
    />
  </StyledSearch>
);

export default function Navigation({ user, setuser }) {
  
  const [open, setState] = useState(false);
  let [searchKey, setSearchKey] = useState("")

  let navigation = useNavigate();

  let Logout = () => {
    setuser(null);
    localStorage.removeItem("LocalShopAuth")
    sessionStorage.removeItem("LocalShopAuth")

  }

 
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    
    setState(open);
  };

  let startSearch = () => {

    navigation(`/search/${searchKey}`)
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#333', width:"100%" }}>
      <Container maxWidth="xl" disableGutters={true}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            <Box component="span" sx={{ display: 'flex', flexDirection: "row", alignItems: "center", width: '35%' }} onClick={() => navigation("/")}>
              <img src="https://i.postimg.cc/7hbr9PMX/Shop-Local-Logo-2.png" alt="Logo" style={{ width: '100px', minWidth: "100px" }} />

            </Box>

          </Typography>
          <Box sx={{
            display: "flex", gap: "1rem", mr: "2rem", display: {
              xs: "none",
              md: "none",
              lg: "none",
              xl:"flex"
            }
          }}>
            <Chip size="small" label="Worldwide shipping" variant="outlined" icon={<PublicIcon />} sx={{
              color: 'gray',
              borderColor: 'gray', 
              '& .MuiChip-label': {
                color: 'gray',
              }
            }} />
            <Chip size="small" label="14 days right of return" variant="outlined" icon={<ReplayIcon />} sx={{
              color: 'gray',
              borderColor: 'gray', 
              '& .MuiChip-label': {
                color: 'gray',
              }
            }} />
          </Box>
          <Box
            component="div"

            sx={{

              display: {
                xs: "none",
                sm: "block"
              }

            }}
          >

            {(user || !user) && <Box>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center" }}>
                <Button variant="soft" color="primary" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }} onClick={() => navigation("/")}> <CottageIcon sx={{ fontSize: { xs: '2rem', sm: '1.5rem', md: '1rem' }, alignSelf: "center" }} /> <Box 
          sx={{ 
            display: { xs: 'none', sm: 'none', md: 'none', lg:"flex" }, fontSize: { xs: '2rem', sm: '1.5rem', md: '0.8rem' },
          }}
        >Home</Box> </Button>
                <Button variant="soft" color="warning" sx={{ display: "flex", gap: "5px", alignItems: "center" }} onClick={() => navigation("/home")}><ShoppingCartIcon sx={{ fontSize: { xs: '2rem', sm: '1.5rem', md: '1rem' }, alignSelf: "center" }} /> <Box  
          sx={{ 
            display: { xs: 'none', sm: 'none', md: 'none', lg:"flex" }, fontSize: { xs: '2rem', sm: '1.5rem', md: '0.8rem' }, 
          }}
        >Shop</Box> </Button>
                <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>


                  <StyledSearch>
                    <SearchIconWrapper2 sx={{color:"white"}} onClick={startSearch}>
                      <SearchIcon onClick={startSearch} />
                    </SearchIconWrapper2>
                    
                    <StyledInputBase
                   
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                      onChange={(e)=>setSearchKey(e.target.value)}
                    />
                    <Button sx={{display:{sm: "none", md:"inline"}, color:"orange"}} onClick={startSearch}>GO</Button>
                  </StyledSearch >

                  {(user?.role === "admin") ? (<Button variant="outlined" color="warning" sx={{
                    display: "flex", gap: "5px", alignItems: "center", backgroundColor: "#ED6C02", color: "white", display: {
                      xs: "none",
                      md: "flex"
                    }
                  }} onClick={() => navigation("/admin")}><SupervisorAccountIcon sx={{ fontSize: "medium", alignSelf: "center", }} />Admin </Button>) : (<Button variant="outlined" color="warning" sx={{
                    display: "flex", gap: "5px", alignItems: "center", backgroundColor: "#ED6C02", color: "white", display: {
                      xs: "none",
                      md: "flex"
                    }
                  }}><PlayCircleOutlineIcon sx={{ fontSize: "medium", alignSelf: "center", }} onClick={() => navigation("/")} />Start </Button>)}


                  {user ? (<><Button variant="outlined" color="warning" sx={{ display: "flex", gap: "5px", alignItems: "center" }} onClick={Logout}><AccountCircleIcon sx={{ fontSize: "medium", alignSelf: "center" }} />Logout </Button>  <Avatar src="/broken-image.jpg" /> <Typography sx={{
                    display: {
                      xs: "none",
                      md: "flex"
                    }
                  }}>{user.firstname}</Typography></>) : (<Button variant="outlined" color="warning" sx={{ display: "flex", gap: "5px", alignItems: "center" }} onClick={() => navigation("/login")} ><AccountCircleIcon sx={{ fontSize: "medium", alignSelf: "center" }} />Login </Button>)}
                </Box>
              </Box>

            </Box>}

          </Box>


          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            sx={{
              mr: 2,
              display: {
                xs: "block",
                sm: "none"
              }
            }}
          >
            <MenuIcon />
          </IconButton>

         
          <Drawer
            
            anchor="right"
            
            open={open}
            
            onClose={() => toggleDrawer(false)}
          
            onClick={() => toggleDrawer(true)}
          >
            
            <Box
              sx={{
                p: 2,
                height: 1,
                backgroundColor: "#171A1C"
              }}
            >
             
              <IconButton sx={{ mb: 2 }} onClick={toggleDrawer(false)}>
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                <ListItemButton onClick={()=>navigation("/")}>
                  <ListItemIcon>
                    <CottageIcon sx={{ color: "#f8cd4c" }} />
                  </ListItemIcon>
                  <ListItemText primary="Home" sx={{ color: "#f8cd4c" }} />
                </ListItemButton>

                <ListItemButton onClick={()=>navigation("/home")}>
                  <ListItemIcon >
                    <ShoppingCartIcon sx={{ color: "#f8cd4c" }} />
                  </ListItemIcon>
                  <ListItemText primary="Shop" sx={{ color: "#f8cd4c" }} />
                </ListItemButton>
                {(user?.role === "admin") ?
                <ListItemButton onClick={()=>navigation("/admin")}>
                
                  <ListItemIcon>
                    <FolderIcon sx={{ color: "#f8cd4c" }} />
                  </ListItemIcon>
                  <ListItemText primary="Admin Panel" sx={{ color: "#f8cd4c" }} /> 
                </ListItemButton> : null }
              </Box>

              {search}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  position: "absolute",
                  bottom: "0",
                  left: "50%",
                  transform: "translate(-50%, 0)"
                }}
              >
                <Button variant="outlined" sx={{
                  m: 1, width: 0.5, color: "#f8cd4c", borderColor: "#f8cd4c", '&:hover': {
                    backgroundColor: "#e6b837", 
                    borderColor: "white", backgroundColor: "#171A1C", color: "white" 
                  }, '&:active': {
                    backgroundColor: "#e6b837", 
                    borderColor: "white", backgroundColor: "#171A1C", color: "white" 
                  }
                }}>
                  Register
                </Button>
                <Button variant="contained" sx={{
                  m: 1, width: 0.5, backgroundColor: "#f8cd4c", color: "#171A1C", '&:hover': {
                    backgroundColor: "#e6b837", 
                    color: "black", backgroundColor: "white" 
                  }, '&:active': {
                    backgroundColor: "#e6b837", 
                    color: "black", backgroundColor: "white" 
                  }
                }}>
                  Login
                </Button>
              </Box>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
