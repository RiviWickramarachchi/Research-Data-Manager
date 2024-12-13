import { createContext, useState, useEffect } from "react"
import { jwtDecode as jwt_decode } from "jwt-decode";
import {useNavigate} from "react-router-dom"
import Swal from "sweetalert2";
//const swal = require('sweetalert2')

const AuthContext = createContext();
//console.log(AuthContext)
export default AuthContext

export const AuthProvider = ({children}) => {

    const [authTokens, setAuthTokens] = useState(() => {
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    })

    const [user, setUser] = useState(() => {
        const storedTokens = localStorage.getItem("authTokens");
        console.log("stored Tokens : "+storedTokens);
        if(storedTokens)
        {
            console.log("Data Coming");
            return jwt_decode(storedTokens);
        }
        else {
                console.log("Data Not Coming");
                return null;
            }

    })

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const loginUser = async (email, password) => {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })

        const data = await response.json()
        console.log("response data = "+data);

        if(response.status === 200) {
            console.log("user logged in");
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            navigate("/dashboard")
            Swal.fire({
                title: "Login Successful",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
        else
        {
            console.log(response.status)
            Swal.fire({
                title: "Username or Password is Incorrect",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const registerUser = async (email, username, first_name, last_name, password, confirmPwd) => {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, username, first_name, last_name, password, confirmPwd
            })

        })
        const data = await response.json();
        if(response.status === 201) {
            console.log("user created");
            Swal.fire({
                title: "Registration Successful",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
            navigate("/login")
        }
        else {
            if (data.password) {
                const passwordError = data.password[0]; // Get the first error message
                console.log(response.status, passwordError);
                Swal.fire({
                    title: passwordError,
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
            else {
                Swal.fire({
                    title: response.status+ "Something Went Wrong!" ,
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                })

            }
            console.log(response.status);
            console.log("server side issue?");
            console.log(response);
            //alert("Something went wrong " );
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        Swal.fire({
            title: "You have logged out",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
        navigate("/login")
    }

    const generateUID = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/generateid/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(response.status === 200) {
            console.log("ID Generated");
            const data = await response.json()
            return data.response;
        }
        else {
            console.log(response.status);
            console.log("server side issue?");
            Swal.fire({
                title: "Something Went Wrong!"+ response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const addPostAddress = async (postAddressID) => {
        const token = JSON.parse(localStorage.getItem("authTokens"));
        console.log("Tok Data : "+ token.access);
        const response = await fetch("http://127.0.0.1:8000/api/addaddress/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access}`
            },
            body: JSON.stringify({
                "address_id": postAddressID
            })
        })

        if(response.status === 200) {
            console.log("Post Address Added");
        }
        else {
            console.log(response.status);
            console.log("Something has gone wrong in the server side");
            //alert("Something went wrong while trying to add the post Address... " + response.status);
            Swal.fire({
                title: "Something went wrong while trying to add the post Address... "+ response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })

        }
    }

    const getUserPostAddresses = async() => {
        const token = JSON.parse(localStorage.getItem("authTokens"));
        //console.log("Tok Data : "+ token.access);
        const response = await fetch("http://127.0.0.1:8000/api/postaddresses/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access}`
            }
        })

        if(response.status === 200) {
            console.log("Successfully Retrieved Addresses");
            const data = await response.json();
            return data.response;
        }
        else {
            console.log(response.status);
            console.log("Something has gone wrong in the server side");
            //alert("Something went wrong while trying to add the post Address... " + response.status);
            Swal.fire({
                title: "Something went wrong while trying to add the post Address... "+ response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const updatePostAddressViewStat = async(postAddressId) => {
        const token = JSON.parse(localStorage.getItem("authTokens"));
        const response = await fetch(`http://127.0.0.1:8000/api/updateaddressviewstats/${postAddressId}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access}`
            }
        })

        if(response.status === 200) {
            console.log("View Status Updated Successfully");
        }
        else {
            console.log(response.status);
            console.log("Error Occurred While Trying To Update View Status");
        }
    }

    const deletePostAddress = async(postAddressId) => {
        const token = JSON.parse(localStorage.getItem("authTokens"));
        const response = await fetch(`http://127.0.0.1:8000/api/deleteaddress/${postAddressId}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.access}`
            }
        })

        if(response.status === 204) {
            console.log("Post Address Successfully Deleted")
            Swal.fire({
                title: "Post Address "+postAddressId + " Was Deleted!",
                icon: "info",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
            const currentPath = window.location.pathname; // Get the current pathname
            navigate(currentPath); // Redirect to the same page
        }
        else {
            console.log(response.status);
            console.log("Error Occurred While Trying To Delete Post Address");
        }
    }

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        loginUser,
        registerUser,
        logoutUser,
        generateUID,
        addPostAddress,
        getUserPostAddresses,
        updatePostAddressViewStat,
        deletePostAddress,
    }

    useEffect(() => {
        if(authTokens) {
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value = {contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
     )
}

