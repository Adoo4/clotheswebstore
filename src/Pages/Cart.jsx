import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect, useState } from 'react';

let Cart = ({ cart, setCart, user }) => {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    let getCartItems = async () => {
      try {
        let response = await axios.get("http://localhost:5757/cart/get");
        let productsInCart = response.data.items;
        if(productsInCart) {
          setCart(response.data.items);
        }
        
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (user) {
      getCartItems();
    } else {
      let savedCart = JSON.parse(sessionStorage.getItem("cartitems")) || [];
      setCart(savedCart);
    }
  }, []); 

  let getProductDetails = (productId) => {
    return products.find(product => product._id === productId) || {};
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="cart table">
        <TableHead>
          <TableRow>
            <TableCell>Article Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.items && cart.items.map((item, index) => {
            let product = getProductDetails(item?.productId);
            return (
              <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product?.name} - {product.brand} - {product.color}
                </TableCell>
                <TableCell align="right">{product?.price}</TableCell>
                <TableCell align="right">{item?.quantity}</TableCell>
                <TableCell align="right">{product?.price * item.quantity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Cart;
