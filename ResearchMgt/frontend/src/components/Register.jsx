import React, { useState,useContext } from 'react';
import './Register.css';
import AuthContext from '../context/AuthContext';
function Register() {
    const [formData, setFormData] = useState({
        userName:'',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptMarketing: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const {registerUser} = useContext(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        const username = formData.userName
        const first_name = formData.firstName
        const last_name = formData.lastName
        const email = formData.email
        const password = formData.password
        const confrmPwd = formData.confirmPassword


        if(email.length>0 && first_name.length >0 && last_name.length > 0 && username.length > 0 && password.length > 0 && confrmPwd.length >0){
            registerUser(email, username, first_name, last_name, password, confrmPwd)
        }
        console.log(username);
    };

    return (
        <div className="register-container">
            <div className="register-header">
                <i className="fas fa-lock lock-icon"></i>
                <h2>Register</h2>
            </div>
            <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-container">
                    <label htmlFor="userName">Username:</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        placeholder="Username *"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password *"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password *"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <label className="marketing-checkbox">
                    <input
                        type="checkbox"
                        name="acceptMarketing"
                        checked={formData.acceptMarketing}
                        onChange={handleChange}
                    />
                    I want to receive inspiration, marketing promotions and updates via email.
                </label>
                <button type="submit">Register</button>
                <div className="login-redirect">
                    Already have an account? <a href="/login">Sign in</a>
                </div>
            </form>
     </div>
    );
}

export default Register;
