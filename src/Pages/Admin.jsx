import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TextField from '@mui/material/TextField';

import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';


let Admin = ({ user, setuser }) => {
  let [error, seterror] = useState(null)
  let [users, setusers] = useState([])
  let [openWarning, setOpenWarning] = useState(false);
  let [itemToDelete, setItemToDelete] = useState(null);
  let [userSearch, setuserSearch] = useState(null)
  let [originalusers, setoriginalusers] = useState([])

  let [itemtoedit, setitemtoedit] = useState({
    firstname: "",
    lastname: "",
    email: "",
    _id: "",
    role: null

  })
  let token = (localStorage.getItem('LocalShopAuth') || sessionStorage.getItem('LocalShopAuth'));

  useEffect(() => {
    let getUsers = async () => {
      try {
        let response = await axios.get("http://localhost:5757/user/getusers");
        if (response) {
          setusers(response.data);
          setoriginalusers(response.data)
        } else {
          seterror("Users not found");
        }
      } catch (e) {
        seterror("You are unauthorized");
      }
    };
    getUsers();
  }, []);

  let style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    bgcolor: '#f65656',

    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",

    width: {
      xs: '100%',
      sm: '80%',
      md: '40%',
    },

    flexWrap: {
      xs: 'wrap',
      sm: 'nowrap',
      md: 'nowrap',
    },
  };



  //setusers(users.map((item)=> ({...item, editable: false, edit: true})))

  let startEdit = (e) => {

    setusers(users.map((item, i) => item._id !== e._id ? { ...item, editable: false, edit: true } : { ...item, editable: true, edit: false }))
    console.log(user)
  }


  let handleEditUser = async (selecteduser) => {

    let usertoupdate = {
      firstname: itemtoedit.firstname || selecteduser.firstname,
      lastname: itemtoedit.lastname || selecteduser.lastname,
      email: itemtoedit.email || selecteduser.email,
      role: itemtoedit.role || selecteduser.role,
      edit: true,

      _id: selecteduser._id
    };
    console.log(usertoupdate)

    try {
      let response = await axios.put("http://localhost:5757/user/userupdate", usertoupdate, { headers: { Authorization: `Bearer ${token}` } })

      setusers(users.map((item) => item._id === response.data._id ? { ...response.data, editable: false, edit: true } : { ...item, editable: false, edit: true }))

    } catch (e) {
      console.log(e.message)
    }

  }

  let cancelEdit = (e) => {

    setusers(users.map((item, i) => item._id === e._id ? { ...item, editable: false, edit: true } : { ...item }))

  }


  let handleOpenWarning = (item) => {
    setItemToDelete({ ...item });
    setOpenWarning(true);
  };

  let deleteItem = async (user) => {
    try {

      let response = await axios.delete(`http://localhost:5757/user/deleteuser/${user._id}`, { headers: { Authorization: `Bearer ${token}` } });
      console.log('User deleted:', response.data);
      setusers(users.filter((e) => e._id !== user._id))
      setOpenWarning(false);
    } catch (error) {
      console.error('Error deleting sneaker:', error);
    }
  };

  let searchUser = (e) => {
    let searchTerm = e;
    
    if (searchTerm) {
      console.log(searchTerm);
      let regex = new RegExp(searchTerm, 'i');


      setusers(originalusers.filter((user) =>
        regex.test(user.firstname) ||
        regex.test(user.email) ||
        regex.test(user.lastname) ||
        regex.test(user.role) ||
        regex.test(user._id)
      ));
    } else {

      setusers([...originalusers]);
    }
  };




  return (
    <div style={{height:"100dvh"}}>
      {error ? (
        <Alert severity="error">
          <AlertTitle>{error}</AlertTitle>
          You are not authorized to access this section
        </Alert>
      ) : (<div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem", alignItems: "center" }}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >

          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder='Search users'
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={(event) => searchUser(event.target.value)}

          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={() => setusers([...originalusers])}>
            <RestartAltIcon />
          </IconButton>

        </Paper>
        <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
          <Table sx={{ minWidth: { xs: 300, sm: 450, md: 650 } }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ display: { xs: 'none', sm: 'table-cell' }, minWidth: { xs: 50, sm: 70 }, fontSize: { xs: 'none', md: '1rem' } }}>Index</TableCell>
                <TableCell align="center" sx={{ display: { xs: 'none', sm: 'table-cell' }, minWidth: { xs: 100, sm: 150 } }}>ID</TableCell>
                <TableCell align="center" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Firstname</TableCell>
                <TableCell align="center" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Lastname</TableCell>
                <TableCell align="center" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Email</TableCell>
                <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' } }}>Role</TableCell>
                <TableCell align="center" sx={{ minWidth: { xs: 'none', sm: 150 } }}>Settings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((e, index) => (
                <TableRow
                  key={e._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center" sx={{ display: { xs: 'flex', sm: 'table-cell' } }}>
                    {index}
                  </TableCell>
                  <TableCell align="center" sx={{ display: { xs: 'flex', sm: 'flex', md: 'table-cell' } }}>{e._id}</TableCell>
                  {e.editable ?
                    <TableCell align="center" sx={{ display: { xs: 'flex', sm: 'flex', md: 'table-cell' } }}>
                      <TextField
                        id="input-with-icon-textfield"
                        label="Firstname"
                        defaultValue={e.firstname}
                        sx={{ mb: "1rem" }}
                        variant="standard"
                        onChange={(event) => setitemtoedit({ ...itemtoedit, firstname: event.target.value })}
                      />
                    </TableCell>
                    :
                    <TableCell align="center" sx={{ display: { xs: 'flex', sm: 'flex', md: 'table-cell' } }}>{e.firstname}</TableCell>}
                  {e.editable ?
                    <TableCell align="center" sx={{ display: { xs: 'flex', sm: 'flex', md: 'table-cell' } }}>
                      <TextField
                        id="input-with-icon-textfield"
                        label="Lastname"
                        defaultValue={e.lastname}
                        sx={{ mb: "1rem" }}
                        variant="standard"
                        onChange={(e) => setitemtoedit({ ...itemtoedit, lastname: e.target.value })}
                      />
                    </TableCell>
                    :
                    <TableCell align="center" sx={{ display: { xs: 'flex', sm: 'flex', md: 'table-cell' } }}>{e.lastname}</TableCell>}
                  {e.editable ?
                    <TableCell align="center" sx={{ display: { xs: 'flex', sm: 'flex', md: 'table-cell' } }}>
                      <TextField
                        id="input-with-icon-textfield"
                        label="Email"
                        defaultValue={e.email}
                        sx={{ mb: "1rem" }}
                        variant="standard"
                        onChange={(e) => setitemtoedit({ ...itemtoedit, email: e.target.value })}

                      />
                    </TableCell>
                    :
                    <TableCell align="center" sx={{ display: { xs: 'flex', sm: 'flex', md: 'table-cell' } }}>{e.email}</TableCell>}




                  {e.editable ?
                    <TableCell align="center" >
                      <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          defaultValue={e.role}
                          sx={{ mb: "1rem" }}
                          onChange={(event) => setitemtoedit({ ...itemtoedit, role: event.target.value })}
                          label="Role"
                        >

                          <MenuItem value={"user"}>User</MenuItem>
                          <MenuItem value={"admin"}>Admin</MenuItem>

                        </Select>
                      </FormControl>
                    </TableCell>

                    :

                    <TableCell align="center" sx={{ display: { xs: 'flex', md: 'flex', md: 'table-cell' } }}>{e.role}</TableCell>


                  }

                  <TableCell align="center" sx={{ display: "flex" }}>

                    {e.edit ? <Button sx={{ display: "flex", flexDirection: "column", fontSize: "0.7rem", color: "red" }} onClick={() => handleOpenWarning(e)}><ClearOutlinedIcon color="error" />DELETE</Button> : null}
                    {e.edit ? <Button sx={{ display: "flex", flexDirection: "column", fontSize: "0.7rem", color: "green" }} onClick={() => startEdit(e)}><EditOutlinedIcon color="success" />EDIT</Button> : null}
                    {e.edit ? null : <Button sx={{ display: "flex", flexDirection: "column", fontSize: "0.7rem", color: "green" }} onClick={() => handleEditUser(e)}><DoneOutlinedIcon color="success" />APPLY</Button>}
                    {e.edit ? null : <Button sx={{ display: "flex", flexDirection: "column", fontSize: "0.7rem", color: "red", padding: "0.6rem" }} onClick={() => cancelEdit(e)}><DoDisturbAltOutlinedIcon color="warning" />CANCEL</Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      )}

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
            Are you sure you want to delete this user?
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2, display: "flex", flexDirection: "row", gap: "1rem", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              sx={{ color: "white", borderColor: " white", '&:hover': { borderColor: "#f7ed7e", color: "#f7ed7e" }, '&:active': { borderColor: "orange" } }}
              onClick={() => setOpenWarning(false)}
            >
              Cancel
            </Button>

            <Button
              onClick={() => deleteItem(itemToDelete)}
              variant="contained"
              sx={{ color: "white", backgroundColor: "red", '&:hover': { backgroundColor: "darkred" } }}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>

  );
}


export default Admin