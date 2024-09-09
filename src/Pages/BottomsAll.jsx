import * as React from "react";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios"
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Checkbox from "@mui/material/Checkbox";
import { FormControl, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";


let Bottoms = ({ user, setuser, cart, setCart, cartItem, setCartItem }) => {
    let [data, setdata] = useState([])
    let [open, setOpen] = useState(false);
    let [selectedSizes, setSelectedSizes] = useState([]);
    let [currentSize, setCurrentSize] = useState("");
    let [error, seterror] = useState("")
    let [newArticle, setNewArticle] = useState({
        name: "",
        brand: "",
        price: 0,
        sizes: [],
        color: "",
        imageUrl: "",
        description: ""

    })

    let token = (localStorage.getItem('LocalShopAuth') || sessionStorage.getItem('LocalShopAuth'));




    let [editedArticle, setEditedArticle] = useState({
        name: "",
        brand: "",
        price: 0,
        sizes: [],
        color: "",
        imageUrl: "",
        description: ""

    })

    let [openWarning, setOpenWarning] = useState(false);
    let [itemToDelete, setItemToDelete] = useState(null);
    let [startedit, setstartedit] = useState(false)
    let [itemtoedit, setitemtoedit] = useState(null)
    let [sizenumber, setsizenumber] = useState([]);

    let navigation = useNavigate();

    useEffect(() => {
        let getSnakers = async () => {
            try {
                let response = await axios.get("http://localhost:5757/bottoms/getbottoms")

                setdata(response.data)

            } catch (e) {
                console.error("Error adding to cart:", e.message);
            }

        }
        getSnakers();

    }, [])



    useEffect(() => {
        console.log("Prije", sizenumber)
        if (itemtoedit && itemtoedit.sizes) {
            setsizenumber([...itemtoedit.sizes]);

        }
        console.log("Poslje", sizenumber)
    }, [itemtoedit]);


    let handleOpen = () => setOpen(true);
    let handleClose = () => {
        setOpen(false);
        setNewArticle({
            name: "",
            brand: "",
            price: 0,
            sizes: [],
            color: "",
            imageUrl: "",
            description: ""

        })
    }


    let style = {
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "70%",
        bgcolor: "lightgray",
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",

        width: { xs: "100%", sm: "80%", md: "60%", },

        flexWrap: { xs: "wrap", sm: "nowrap", md: "nowrap", },
    };


    let style2 = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70%",
        bgcolor: "#f65656",

        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",

        width: {
            xs: "100%",
            sm: "80%",
            md: "40%",
        },

        flexWrap: {
            xs: "wrap",
            sm: "nowrap",
            md: "nowrap",
        },
    };

    let sizes = [
        {
            value: 8,
            label: "8",
        },
        {
            value: 9,
            label: "9",
        },
        {
            value: 10,
            label: "10",
        },
        {
            value: 11,
            label: "11",
        },
        {
            value: 12,
            label: "12",
        },
        {
            value: 13,
            label: "13",
        },
        {
            value: 14,
            label: "14",
        },
        {
            value: 15,
            label: "15",
        },
        {
            value: 16,
            label: "16",
        },
    ];



    let handleSelectChange = (e) => {
        setCurrentSize(Number(e.target.value));
    };

    let handleAddSize = () => {
        if (currentSize && !selectedSizes.includes(currentSize)) {
            setSelectedSizes([...selectedSizes, currentSize]);
            setNewArticle({ ...newArticle, sizes: selectedSizes })
        }
        setCurrentSize("");
    };

    let addItem = async () => {
        try {
            console.log("preparing to send request");
            console.log(newArticle);



            let response = await axios.post(
                "http://localhost:5757/bottoms/bottoms", newArticle, { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response) {
                let response2 = await axios.post(
                    "http://localhost:5757/allproducts/post", { ...newArticle, _id: response.data._id }, { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log("request sent");
                setdata(prevSneakers => [...prevSneakers, response.data]);
            }
        } catch (e) {
            console.error("Error adding to cart:", e.message);
        }
    };
    let deleteItem = async (item) => {
        try {
            let response = await axios.delete(
                `http://localhost:5757/bottoms/deletebottoms/${item._id}`,
                { headers: { Authorization: `Bearer ${token}` } } 
            );
            let response2 = await axios.delete(
                `http://localhost:5757/allproducts/delete/${item._id}`,
                { headers: { Authorization: `Bearer ${token}` } } 
            );
            console.log("Sneaker deleted:", response.data);
            setdata(data.filter((e) => e._id !== item._id));
            setOpenWarning(false);
        } catch (e) {
            console.error("Error adding to cart:", e.message);
        }
    };
    let handleeditItem = (item) => {

        setitemtoedit({ ...item });
        setstartedit(true);

    }
    // let [sizenumber, setsizenumber] = useState([])
    let sizehandler = (e) => {
        let value = Number(e.target.value); //konstantnost
        setsizenumber((prevSizenumber) => {
            let updatedSizenumber = [...prevSizenumber];

            if (e.target.checked) {
                if (!updatedSizenumber.includes(value)) {
                    updatedSizenumber.push(value);
                }
            } else {

                updatedSizenumber = updatedSizenumber.filter((item) => item !== value);
            }

            console.log("Updated array: ", updatedSizenumber);
            return updatedSizenumber;
        });
    };
    //editovanje itema
    let editItem = async (id) => {
        let toEdit = {
            name: editedArticle.name || itemtoedit.name,
            brand: editedArticle.brand || itemtoedit.brand,
            price: editedArticle.price || itemtoedit.price,
            sizes: editedArticle.sizes.length > 0 ? editedArticle.sizes : itemtoedit.sizes,
            color: editedArticle.color || itemtoedit.color,
            imageUrl: editedArticle.imageUrl || itemtoedit.imageUrl,
            description: editedArticle.description || itemtoedit.description,
            sizes: [...sizenumber],
            _id: id
        };

        console.log(sizenumber);
        setdata(data.map((e) => e._id !== id ? e : { ...e, ...toEdit }));

        try {
            let response = await axios.put(
                "http://localhost:5757/bottoms/editbottom",
                toEdit,
                { headers: { Authorization: `Bearer ${token}` } } 
            );
            let response2 = await axios.put(
                "http://localhost:5757/allproducts/edit",
                toEdit,
                { headers: { Authorization: `Bearer ${token}` } } 
            );
            setstartedit(false);
        } catch (e) {
            console.error("Error adding to cart:", e.message);
        }
    };

    let handleOpenWarning = (item) => {
        setItemToDelete({ ...item });
        setOpenWarning(true);
    };





    let addToCart = async (product) => {
        console.log(cart);




        if (user) {


            let item = {
                user: user._id,
                items: [
                    {
                        productId: product._id,
                        quantity: 1
                    }
                ],
            };
            let existingItemIndex = cart.findIndex((e) => e.productId === product._id);

            if (existingItemIndex !== -1) {


                let updatedCart = cart.map((e, index) =>
                    index === existingItemIndex ? { ...e, quantity: e.quantity + 1 } : e
                );


                setCart(updatedCart);
                console.log(updatedCart[existingItemIndex]);


                try {
                    await axios.put("http://localhost:5757/cart/update", { user: user._id, items: updatedCart[existingItemIndex] });
                    console.log("Cart updated successfully");
                } catch (e) {
                    console.error("Error adding to cart:", e.message);
                }

            } else {
                let newArticle = { productId: product._id, quantity: 1 }
                let newCart = [...cart, newArticle];



                console.log(cart)





                try {
                    await axios.put("http://localhost:5757/cart/update", { user: user._id, items: newArticle });
                    setCart(newCart);
                    console.log("Item added to cart successfully");
                } catch (e) {
                    console.error("Error adding to cart:", e.message);
                }

            }
        } else {

            let item = {
                items: [
                    {
                        name: product.name,
                        brand: product.brand,
                        imageUrl: product.imageUrl,
                        price: product.price,
                        sizes: [...product.sizes],
                        productId: product?._id,
                        quantity: 1
                    }
                ],
            };


            let existingItemIndex = cart.findIndex((e) => e.productId === product._id);
            console.log(existingItemIndex)
            if (existingItemIndex !== -1) {




                let updatedCart = cart.map((e, index) =>
                    index === existingItemIndex ? { ...e, quantity: e.quantity + 1 } : e
                );
                setCart(updatedCart);
                sessionStorage.setItem("cartitems", JSON.stringify(updatedCart));
            } else {

                setCart((prevCart) => {
                    let updatedCart = [...prevCart, ...item.items];
                    sessionStorage.setItem("cartitems", JSON.stringify(updatedCart));
                    console.log(updatedCart)
                    return updatedCart;
                });
            }

            console.log(product);

        };
    }

    return (<div style={{ height: "100%" }}>
        {!data.length ?
            <Box sx={{ display: "flex", height: "70dvh", width: "100%", justifyContent: "center", alignItems: "center" }} >
                <CircularProgress size={140} />
            </Box> :

            <>
                <Grid
                    container
                    sx={{
                        padding: { xs: 0, md: "1rem" },
                        justifyContent: "flex-start",
                        alignItems: "center",
                        minHeight: "100vh",
                    }}
                    spacing={{ xs: 1, md: 1 }}
                    columns={{ xs: 1, sm: 8, md: 12, xl: 20 }}
                >
                    {data.map((e, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={4}
                            key={index}
                        >
                            <Card sx={{ maxWidth: "100%", padding: "1rem", margin: "auto" }}>
                                {user?.role === "admin" && (
                                    <Box sx={{ display: "flex", justifyContent: "space-around", gap: "1rem", backgroundColor: "#f4f2f3", borderRadius: "10px" }}>
                                        <Button size="small" color="success" sx={{ display: "flex", gap: "8px", alignItems: "center" }} onClick={() => handleeditItem(e)}>
                                            <EditNoteIcon />EDIT
                                        </Button>
                                        <Button size="small" color="error" sx={{ display: "flex", gap: "8px", alignItems: "center", color: "coral" }} onClick={() => handleOpenWarning(e)}>
                                            <DeleteForeverIcon />DELETE
                                        </Button>
                                    </Box>
                                )}
                                <CardMedia
                                    sx={{
                                        height: 170,
                                        width: "100%",
                                        padding: "0.5rem",
                                        objectFit: "cover",
                                    }}
                                    image={e?.imageUrl}
                                    title={e?.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h7" component="div" sx={{ fontWeight: "bold" }}>
                                        {e?.name}
                                    </Typography>
                                    <Box sx={{ backgroundColor: "white", display: "flex", flexDirection: "column" }}>
                                        <Typography gutterBottom variant="h9" component="div" sx={{ color: "#ed6b01" }}>
                                            <Typography variant="h10" sx={{ color: "black" }}>Price:</Typography>
                                            {" " + e?.price + " BAM"}
                                        </Typography>
                                        <Typography variant="h10" sx={{ color: "black" }}>Brand: {" " + e.brand}</Typography>
                                        <Typography variant="h10" sx={{ color: "black" }}>Color: {" " + e.color}</Typography>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: "1rem", width: "100%" }}>
                                        <Button size="small" sx={{ display: "flex", gap: "8px", alignItems: "center", color: "black" }} onClick={() => navigation(`/${e._id}/bottoms`)}>
                                            <InfoIcon />DETAILS
                                        </Button>
                                        <Button size="small" sx={{ display: "flex", gap: "8px", alignItems: "center", color: "#ed6b01" }} onClick={() => addToCart(e)}>
                                            <ShoppingBasketIcon /> PURCHASE
                                        </Button>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                    {user && (
                        <Box sx={{ width: "345px", maxWidth: 345, height: "432px", padding: "1rem", display: "flex", justifyContent: "center", flexDirection: "column", margin: "auto" }}>
                            <AddCircleIcon onClick={handleOpen} sx={{
                                fontSize: 140, alignSelf: "center", justifySelf: "center", transition: "color 0.3s",
                                "&:hover": { color: "lightblue" },
                                "&:active": { color: "green" },
                            }} />
                            <Typography sx={{ alignSelf: "center" }}>ADD ITEM</Typography>
                        </Box>
                    )}
                </Grid>
                <div>

                    <Modal

                        open={open}
                        onClose={handleClose}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >

                        <Box sx={style}>
                            <Box sx={{ width: "100%", height: "10dvh", background: "orange" }}>
                                <Typography id="keep-mounted-modal-description" variant="h4" sx={{ mt: 2, color: "white" }}>
                                    <AddBoxIcon variant="h1" />  Add new article
                                </Typography>

                            </Box>

                            <TextField sx={{ width: "70%" }}
                                required
                                id="standard-required"
                                label="Model Name"
                                defaultValue="Type here Model name"
                                variant="standard"
                                onChange={(e) => setNewArticle({ ...newArticle, name: e.target.value })}
                            />
                            <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem", flexWrap: "wrap" }}  >
                                <TextField
                                    required
                                    id="standard-required"
                                    label=" Type here Brand Name"
                                    defaultValue="Adidas"
                                    variant="standard"
                                    sx={{ width: "60%" }}
                                    onChange={(e) => setNewArticle({ ...newArticle, brand: e.target.value })}
                                />
                                <TextField
                                    id="standard-number"
                                    label="Type here Price"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    inputProps={{ min: 0 }}
                                    defaultValue="0"
                                    onChange={(e) => setNewArticle({ ...newArticle, price: Number(e.target.value) })}
                                />

                            </Box>


                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <TextField
                                    id="outlined-select-sizes"
                                    select
                                    label="Pick Available sizes"
                                    value={currentSize}
                                    onChange={handleSelectChange}
                                    helperText="Please select sizes"
                                    sx={{ minWidth: 120, width: "30%" }}
                                >
                                    {sizes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <IconButton aria-label="add" size="small" onClick={handleAddSize}>
                                    <AddCircleOutlineIcon fontSize="inherit" />
                                </IconButton>


                                <TextField
                                    disabled
                                    id="standard-disabled"
                                    label=""
                                    value={selectedSizes.join(", ")}
                                    variant="standard"
                                />

                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }} >
                                <TextField
                                    required
                                    id="standard-required"
                                    label="Color"
                                    defaultValue="White/Black"
                                    variant="standard"
                                    sx={{ width: "30%" }}
                                    onChange={(e) => setNewArticle({ ...newArticle, color: e.target.value })}
                                />
                                <TextField
                                    required
                                    id="standard-required"
                                    label="Image URL"
                                    defaultValue="https://picsum.photos/200"
                                    variant="standard"
                                    sx={{ width: "60%" }}
                                    onChange={(e) => setNewArticle({ ...newArticle, imageUrl: e.target.value })}
                                />
                            </Box>
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                defaultValue="Default Value"
                                onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
                            />

                            <Button sx={{ width: "50%", alignSelf: "center" }} variant="contained" endIcon={<SendIcon />} onClick={addItem}>
                                Send
                            </Button>
                        </Box>
                    </Modal>

                    {openWarning && (
                        <Modal
                            open={openWarning}
                            onClose={() => setOpenWarning(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style2}>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: "white" }}>
                                    <WarningAmberIcon sx={{ color: "white" }} /> WARNING
                                </Typography>
                                <Typography id="modal-modal-title" variant="h7" component="h2" sx={{ color: "white" }}>
                                    Are you sure you want to delete this item?
                                </Typography>
                                <Box id="modal-modal-description" sx={{ mt: 2, display: "flex", flexDirection: "row", gap: "1rem", justifyContent: "flex-end" }}>
                                    <Button
                                        variant="outlined"
                                        sx={{ color: "white", borderColor: " white", "&:hover": { borderColor: "#f7ed7e", color: "#f7ed7e" }, "&:active": { borderColor: "orange" } }}
                                        onClick={() => setOpenWarning(false)}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        onClick={() => deleteItem(itemToDelete)}
                                        variant="contained"
                                        sx={{ color: "white", backgroundColor: "red", "&:hover": { backgroundColor: "darkred" } }}
                                    >
                                        DELETE
                                    </Button>
                                </Box>
                            </Box>
                        </Modal>

                    )}
                    {itemtoedit && <Modal

                        open={startedit}

                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"

                    >

                        <Box sx={style}>
                            <Box sx={{ width: "100%", height: "5dvh", background: "Green" }}>
                                <Typography id="keep-mounted-modal-description" variant="h4" sx={{ mt: 2, color: "white" }}>
                                    <AddBoxIcon variant="h1" />  Edit Article
                                </Typography>

                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <TextField sx={{ width: "100%" }}

                                    required
                                    id="standard-required"
                                    label="Model Name"
                                    defaultValue={itemtoedit.name}
                                    variant="standard"
                                    onChange={(e) => {
                                        let value = e.target.value.trim();
                                        setEditedArticle((prev) => ({
                                            ...prev,
                                            name: value !== "" ? value : itemtoedit.name,
                                        }));
                                    }}
                                />
                                <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem", flexWrap: "wrap", gap: "1rem" }}  >
                                    <TextField
                                        required
                                        id="standard-required"
                                        label=" Type here Brand Name"
                                        defaultValue={itemtoedit.brand}
                                        variant="standard"
                                        sx={{ width: "60%" }}
                                        onChange={(e) => {
                                            let value = e.target.value.trim();
                                            setEditedArticle((prev) => ({
                                                ...prev,
                                                brand: value !== "" ? value : itemtoedit.brand,
                                            }));
                                        }}
                                    />
                                    <TextField
                                        id="standard-number"
                                        label="Type here Price"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        inputProps={{ min: 0 }}
                                        defaultValue={itemtoedit.price}
                                        onChange={(e) => {
                                            let value = Number(e.target.value.trim());
                                            setEditedArticle((prev) => ({
                                                ...prev,
                                                price: value !== "" ? value : itemtoedit.price,
                                            }));
                                        }}
                                    />

                                </Box>

                                <Box sx={{ border: "1px solid green", padding: 4, position: "relative" }}>
                                    <Typography
                                        variant="h7"
                                        sx={{
                                            position: "absolute",
                                            top: -14,
                                            left: 16,
                                            backgroundColor: "#d3d3d3",
                                            color: "#737373",
                                            padding: "0 8px",

                                        }}
                                    >
                                        Sizes
                                    </Typography>
                                    <Grid container spacing={1} sx={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center" }}>


                                        <FormControl sx={{ display: "flex", flexDirection: "row", gap: "0rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }} >

                                            {sizes.map((item) =>
                                                <FormControlLabel

                                                    key={item.value}
                                                    control={
                                                        <Checkbox
                                                            value={item.value}
                                                            defaultChecked={itemtoedit.sizes.includes(item.value)}
                                                            size="small"
                                                            onChange={(e) => sizehandler(e)}
                                                        />
                                                    }
                                                    label={item.label}
                                                />

                                            )}


                                        </FormControl>

                                    </Grid>
                                </Box>
                              


                                <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }} >
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="Color"
                                        defaultValue={itemtoedit.color}
                                        variant="standard"
                                        sx={{ width: "30%" }}
                                        onChange={(e) => {
                                            let value = e.target.value.trim();
                                            setEditedArticle((prev) => ({
                                                ...prev,
                                                color: value !== "" ? value : itemtoedit.color,
                                            }));
                                        }}
                                    />
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="Image URL"
                                        defaultValue={itemtoedit.imageUrl}
                                        variant="standard"
                                        sx={{ width: "60%" }}
                                        onChange={(e) => {
                                            let value = e.target.value.trim();
                                            setEditedArticle((prev) => ({
                                                ...prev,
                                                imageUrl: value !== "" ? value : itemtoedit.umageUrl,
                                            }));
                                        }}
                                    />
                                </Box>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    defaultValue={itemtoedit.description}
                                    onChange={(e) => {
                                        let value = e.target.value.trim();
                                        setEditedArticle((prev) => ({
                                            ...prev,
                                            description: value !== "" ? value : itemtoedit.description,
                                        }));
                                    }}
                                />

                            </Box>

                            <Box sx={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                                <Button sx={{ color: "gray" }} onClick={() => setstartedit(false)}>Cancel</Button>

                                <Button variant="outlined" color="success" onClick={() => editItem(itemtoedit._id)}>
                                    EDIT
                                </Button>
                            </Box>
                        </Box>
                    </Modal>}

                </div>

            </>


        } </div>
    )
}


export default Bottoms