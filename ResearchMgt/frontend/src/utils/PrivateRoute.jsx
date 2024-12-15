import {Navigate, Outlet} from "react-router-dom"
import {useContext} from "react"
import AuthContext from "../context/AuthContext"
import Swal from "sweetalert2";


/*const PrivateRoute = ({children}) => {
    let {user} = useContext(AuthContext)


    return user ? children : <Navigate to ="/login" />;
    //return <Route {...rest}>{!user ? <Navigate to="/login" /> : children}</Route>
    //
}
*/
const PrivateRoute = ({children}) => {
    let {user} = useContext(AuthContext)

    if(user)
    { 
        return <Outlet/>
    }
    else
    {
        Swal.fire({
            title: "Unauthorized",
            icon: "warning",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        });
        return <Navigate to ="/login" />;
    }
    // return user ? <Outlet/> : (
    // <>
    //     {/*alert("Not working")*/}
    //     {Swal.fire({
    //             title: "Login Successful",
    //             icon: "success",
    //             toast: true,
    //             timer: 6000,
    //             position: 'top-right',
    //             timerProgressBar: true,
    //             showConfirmButton: false,
    //         })
    //     <Navigate to ="/login" />;
    // </> );

    //return <Route {...rest}>{!user ? <Navigate to="/login" /> : children}</Route>
    //
}

export default PrivateRoute