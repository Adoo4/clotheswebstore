import {  Navigate } from 'react-router-dom';

let PrivatnaRuta = ({user, children}) => {

   

    if(!user) {

        return <Navigate to="/" replace />


    }

    if(user.role !== "admin" ) {
        console.log(user, user.role)

        return <Navigate to="/"  replace />
    }

    return children

}

export default PrivatnaRuta