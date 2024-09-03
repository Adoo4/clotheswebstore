import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios'

import './App.css';
import "./tailwind.css"
import Navigation from './Components/Navigation';
import LandingPage from './Pages/Landingpage';
import Footer from './Components/Footer';
import Loginpage from './Pages/Loginpage';
import Registerpage from './Pages/Registerpage';
import Homepage from './Pages/Homepage';
import SneakersAll from './Pages/SnakersAll';
import TopsAll from './Pages/TopsAll';
import DetailsPage from './Pages/DetailsPage';
import BottomsAll from './Pages/BottomsAll';
import AccessoriesAll from './Pages/AccessoriesAll';
import Adminpage from './Pages/Admin';
import PrivatnaRuta from './Components/PrivatnaRuta';
import AccesRoute from './Pages/AccessRoute';
import SearchData from './Pages/Search';




function App() {



 
  let [user, setuser] = useState(null)
  let [allData, setAllData] = useState([])
  let [cart, setCart] = useState([])


  useEffect(() => {
    let authenticateUser = async () => {
      let tokenData = localStorage.getItem("LocalShopAuth");
      let sessionData = sessionStorage.getItem("LocalShopAuth");
      if (tokenData) { 
        try {
          let response = await axios.post("http://localhost:5757/user/Authentication", {}, {
            headers: {
              Authorization: `Bearer ${tokenData}`
            }
          });
          setuser(response.data);
        } catch (e) {
          console.log(e.message);
          
          localStorage.removeItem("LocalShopAuth"); //brisanje tokena ako padne zahtjev
        }
      } else if (sessionData) {
        try {
          let response = await axios.post("http://localhost:5757/user/Authentication", {}, {
            headers: {
              Authorization: `Bearer ${sessionData}`
            }
          });
          setuser(response.data);
        } catch (e) {
          console.log(e.message);
          
          sessionStorage.removeItem("LocalShopAuth"); //brisanje tokena ako padne zahtjev
        }
      }
    };
  if(!user){
    authenticateUser();
}  }, []);


useEffect(()=> {
let getAllData = async () => {
try {
  let sneakersdata = await axios.get("http://localhost:5757/sneakers/getsneakers");
  let topsdata = await axios.get("http://localhost:5757/tops/gettops");
  let bottomsdata = await axios.get("http://localhost:5757/bottoms/getbottoms");
  let accessoriesdata = await axios.get("http://localhost:5757/accessories/getaccessories");
  if(sneakersdata.data.length && topsdata.data.length && bottomsdata.data.length && accessoriesdata.data.length ){

   let combinedData = ([
      ...sneakersdata.data,
      ...topsdata.data,
      ...bottomsdata.data,
      ...accessoriesdata.data
    ]);

    console.log(combinedData)

    setAllData([...combinedData])
  }
 
  } catch(e) {

    console.log(e)
  }
}
getAllData();

} , [])


useEffect(() => {
  if(!user){
  let savedCart = JSON.parse(sessionStorage.getItem("cartitems")) || [];
  setCart(savedCart);}
}, []);
  return (

    <div style={{display: "flex", flexDirection:"column"}}>
    <BrowserRouter style={{display: "flex", flexDirection:"column", justifyContent:"space-between"}} >
      <Navigation user={user} setuser={setuser} cart={cart} setCart={setCart} />
      <Routes style={{display: "flex", flexDirection:"column"}}>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
        <Route path="/login" element={<Loginpage user={user} setuser={setuser}  />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/home" element={<Homepage  />} />
        <Route path="/sneakers" element={<SneakersAll user={user} setuser={setuser} cart={cart} setCart={setCart}/>} />
        <Route path="/tops" element={<TopsAll user={user} setuser={setuser} cart={cart} setCart={setCart}/>} />
        <Route path="/bottoms" element={<BottomsAll user={user} setuser={setuser} cart={cart} setCart={setCart}/>} />
        <Route path="/accessories" element={<AccessoriesAll user={user} setuser={setuser} cart={cart} setCart={setCart}/>} />
        <Route path="/access" element={<AccesRoute/>} />
        <Route path="/:id/:name" element={<DetailsPage />} />
        <Route path="search/:searchquery" element={<SearchData allData={allData} setAllData={setAllData} />} />
        <Route path="/admin" element={<PrivatnaRuta user={user}><Adminpage user={user} /></PrivatnaRuta>} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  ); 
}


export default App;
