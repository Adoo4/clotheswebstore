


import Sneakers from "../Components/Sneakers"
import Tops from "../Components/Tops"
import Shortlist from "../Components/Bottoms"
import Shortlist2 from "../Components/Shortlist2"
import Box from "@mui/material/Box";

import {useState} from 'react'

import "./Homepage.css"
let Homepage = ({user, setuser}) => {










    return (<>
        <div className="main">


            <div className="container">
                <div className="leftside" >
                    <img src="https://i.postimg.cc/5050Yk2P/Reebok.jpg" alt="" />

                </div>
                <div className="rightside" >

                    <h1 className="qoute">WEAR THE CLOTHERS THAT MATTER</h1>

                </div>


            </div>

                
                <Sneakers user={user} setuser={setuser} />  

                


                <Tops/>
                <div className="denim" >
                    <img className="img2" src="https://img.freepik.com/free-psd/black-friday-sale-with-abstract-background_1361-4626.jpg?t=st=1725192301~exp=1725195901~hmac=2d3ac3df1f859f29e34327a3104785c089f8ad882b272cd9e02ad085f24d2df7&w=1380" alt="" />

                </div>
                <Shortlist/>
                <Box sx={{ position: 'relative', padding: '4rem 0' }}>
  <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'url(/path/to/shape.svg)' }} />
  {/* Your section content */}
</Box>
                <Shortlist2/>

            
        </div>

    </>
    )
}


export default Homepage