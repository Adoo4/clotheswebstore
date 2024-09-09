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
import Cart from './Pages/Cart';
import Checkout from './Components/Checkout';




function App() {



 
  let [user, setuser] = useState(null)
  let [allData, setAllData] = useState([])
  let [cart, setCart] = useState([])
  let [cartItem, setCartItem] = useState( {

    user: ""
    ,
      items: [
        {
        productId: "",
        quantity: 0
          
        }
      ],
  })
  let [checkout, setCheckout] = useState([])
  let [isDrawerOpen, setDrawerOpen] = useState(false);


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
  let allProducts = await axios.get("http://localhost:5757/allproducts/get");

  if(allProducts){

   let combinedData = ([
     ...allProducts
    ]);

   

    setAllData([...combinedData])
  }
 
  } catch(e) {

    console.log(e)
  }
}
getAllData();

} , [])


useEffect(() => {
  let getCartItems = async () => {
      try {
          let response = await axios.post("http://localhost:5757/cart/getusercart", { userId: user._id });
          if(response.data?.items?.length) {
            setCart(response.data.items);
            
           
          } else {
            setCart([])
          }
         
      } catch (error) {
          console.error("Error fetching cart items:", error);
      }
  };

  if (!user) {
      let savedCart = JSON.parse(sessionStorage.getItem("cartitems")) || [];
      setCart(savedCart);
  } else {
      getCartItems();
  }
}, [user]); // pokusati sa praznim array

  return (

    <div style={{display: "flex", flexDirection:"column"}}>
    <BrowserRouter style={{display: "flex", flexDirection:"column", justifyContent:"space-between"}} >
      <Navigation user={user} setuser={setuser} cart={cart} setCart={setCart} isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
      <Checkout checkout={checkout} setCheckout={setCheckout} isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} cart={cart} user={user} setCart={setCart}/>
      <Routes style={{display: "flex", flexDirection:"column"}}>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
        <Route path="/login" element={<Loginpage user={user} setuser={setuser}  />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/home" element={<Homepage  />} />
        <Route path="/sneakers" element={<SneakersAll user={user} setuser={setuser} cart={cart} setCart={setCart} cartItem={cartItem} setCartItem={setCartItem} checkout={checkout} setCheckout={setCheckout}/>} />
        <Route path="/tops" element={<TopsAll user={user} setuser={setuser} cart={cart} setCart={setCart} cartItem={cartItem} setCartItem={setCartItem} checkout={checkout} setCheckout={setCheckout}/>} />
        <Route path="/bottoms" element={<BottomsAll user={user} setuser={setuser} cart={cart} setCart={setCart} cartItem={cartItem} setCartItem={setCartItem} checkout={checkout} setCheckout={setCheckout}/>} />
        <Route path="/accessories" element={<AccessoriesAll user={user} setuser={setuser} cart={cart} setCart={setCart} cartItem={cartItem} setCartItem={setCartItem} checkout={checkout} setCheckout={setCheckout}/>} />
        <Route path="/access" element={<AccesRoute/>} />
        <Route path="/:id/:name" element={<DetailsPage />} />
        <Route path="search/:searchquery" element={<SearchData allData={allData} setAllData={setAllData} />} />
        <Route path="/admin" element={<PrivatnaRuta user={user}><Adminpage user={user} /></PrivatnaRuta>} />
        <Route path="/cart" element={<Cart user={user}  cart={cart} setCart={setCart} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  ); 
}


export default App;
