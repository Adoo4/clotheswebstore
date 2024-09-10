import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


let TabPanel = ({ value, index, children }) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
};





let Checkout = ({ isDrawerOpen, setDrawerOpen, user, cart, setCart }) => {
  let [itemsInCart, setItemsInCart] = useState([]);
  let [tabValue, setTabValue] = useState(0);
  let [purchased, setPurchased] = useState([])

  let toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  let total = itemsInCart.reduce((acc, item) => {
    return acc + Number(item.productId.price || item?.price) * item?.quantity;
  }, 0);

  useEffect(() => {
    let fetchCartItems = async () => {
      if (user) {
        try {
          let response = await axios.post("http://localhost:5757/cart/getcart", { userId: user._id });
          setItemsInCart(response.data.items || []);
        } catch (e) {
          console.error("Error fetching cart items:", e);
        }
      } else {
        let cartItems = sessionStorage.getItem("cartitems")
        setItemsInCart(JSON.parse(cartItems) || []);
      }
    };

    fetchCartItems();
  }, [cart, user]);


  useEffect(() => {


    let fetchPurchasedItems = async () => {
      let purchasedArticle = {
        user: user._id,

      }
      try {
        let response = await axios.post("http://localhost:5757/purchased/get", purchasedArticle)
        if (response.data) {
          setPurchased(response.data)
          console.log("ovo je purchased", response.data)
        }

      } catch (e) {
        console.log(e.message)

      }



    }

    if (user) {
      fetchPurchasedItems()
    }




    //OVDJE IDU KUPLJENI PROIZVODI


  }, [cart, user])




  let deleteItem = async (item) => {
    let { productId } = item;


    if (user) {
      let id = productId._id;
      let userId = user._id;


      try {
        let response = await axios.put("http://localhost:5757/cart/deletecartitems", { id, userId });

        setCart(response.data.items);

      } catch (e) {
        console.log(e);
      }
    } else {

      let updatedCart = cart.filter((e) => item.productId !== e.productId);
      setCart(updatedCart);

      sessionStorage.setItem("cartitems", JSON.stringify(updatedCart));

    }

  };

  let handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  let PurchaseArticles = async (userId) => {
    if (user) {
      let purchasedArticle = {
        user: userId,
        items: [...cart],
        value: total
      }
      try {
        await axios.post("http://localhost:5757/purchased/post", purchasedArticle)
        let response = await axios.delete(`http://localhost:5757/cart/delete-by-user/${userId}`);
        console.log(response.data);
        setCart([])
        setItemsInCart([])


      } catch (e) {
        console.log(e.message)

      }
    } else {


      sessionStorage.removeItem("cartitems")
      setItemsInCart([])
      setCart([])

    }

  }

  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
      <Box sx={{ width: { xs: '100%', sm: 400 }, padding: 0 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="tabs">
          <Tab label="Cart" color="warning" />
          <Tab label="Purchase History" />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <List>
            {itemsInCart.length ? (
              itemsInCart.map((item) => (
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", mb: 1 }} key={item._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Product Image" src={item.productId.imageUrl || item.imageUrl || "/static/images/avatar/1.jpg"} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item?.productId?.name || item?.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: 'text.primary', display: 'inline', fontSize: "0.8rem" }}
                          >
                            Quantity: {item.quantity}
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: 'text.primary', display: 'block', fontSize: "0.8rem" }}
                          >
                            {"Price: " + (Number(item.productId.price || item.price) * Number(item.quantity)).toFixed(2) + " KM"}
                          </Typography>
                        </React.Fragment>
                      }
                      primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                      secondaryTypographyProps={{ sx: { fontSize: '1rem' } }}
                    />
                  </ListItem>
                  <Button onClick={() => deleteItem(item)}><ClearIcon sx={{ color: "#333333" }} /></Button>
                </Box>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No items in cart" />
              </ListItem>
            )}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", mt: 2 }}>
              <Typography variant="h7" sx={{ backgroundColor: "#333333", color: "white", width: "100%", padding: "1rem" }}>
                TOTAL: {total.toFixed(2)} KM
              </Typography>
              <Button variant="contained" color="warning" onClick={() => PurchaseArticles(user?._id)} disabled={!cart.length}>CHECKOUT</Button>
              <Button color="error" onClick={() => setDrawerOpen(false)}>CLOSE</Button>
            </Box>
          </List>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>

          <List>
            {purchased.length > 0 ? (
              purchased.map((purchase) => (
                <div key={purchase._id} style={{ fontSize: "0.8rem" }}>
                  <h3 style={{ backgroundColor: "#333333", color: "white" }}>Purchase Date: {new Date(purchase?.createdAt).toLocaleDateString()}</h3>
                  {purchase.items.map((item) => (
                    <ListItem key={item._id} >
                      <ListItemText sx={{ fontSize: '0.7rem' }}
                        primary={item?.productId?.name}
                        secondary={`Quantity: ${item.quantity} - Price: ${(item?.productId?.price * item?.quantity).toFixed(2)} KM`}
                        primaryTypographyProps={{ style: { fontSize: '0.8rem' } }}
                        secondaryTypographyProps={{ style: { fontSize: '0.8rem' } }}
                      />
                    </ListItem>
                  ))}
                </div>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No purchased items available." />
              </ListItem>
            )}
          </List>

        </TabPanel>
      </Box>
    </Drawer>
  );
};

export default Checkout;
