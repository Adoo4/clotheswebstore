import"./Landingpage.css"
import { useNavigate } from "react-router-dom"

let LandingPage = ()=>{
let navigate = useNavigate();

    


    return(
        <div className="outside">
         <div className="text">
            <h1>New <br/>Clothes<br/>New <br/>Fashion</h1>
            <button className="gtstart" onClick={()=>navigate("/home")}>GET STARTED</button>
           

         </div>
            <div className="slika-div"> <img className="slika" src="https://img.freepik.com/free-photo/portrait-serious-brutal-male-casual-clothes-dark-background_613910-5720.jpg?t=st=1725202800~exp=1725206400~hmac=7d4bacd29469965de8f71a2a4a46b7f36545009f1cd4618dee0f4e6a0cfd77a4&w=1380" alt="" /></div>
      
        </div>
          
    )
}

export default LandingPage