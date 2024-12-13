import { useState, useContext } from 'react';
import React from 'react';
import AuthContext from '../context/AuthContext';
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const {loginUser} = useContext(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission logic here
        console.log(formData);
        const email = formData.email //e.target.email.value
        const password = e.target.password.value

        email.length > 0 && loginUser(email, password)

        console.log(email);
        console.log(password);

    };

    return (
        <div className="login-container">
            <div className="login-header">
                <i className="fas fa-lock lock-icon"></i>
                <h2>Sign In</h2>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
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
                <button type="submit">SIGN IN</button>
                <div className="signup-redirect">
                    Don't have an account? <a href="/register">Sign up</a>
                </div>
            </form>
        </div>
    );
}

export default Login;
