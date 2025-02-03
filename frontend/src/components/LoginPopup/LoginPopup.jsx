import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
    // Destructure `url` and `setToken` from StoreContext
    const { url, setToken } = useContext(StoreContext);

    // State to track the current mode (Login or Sign Up)
    const [currState, setCurrState] = useState("Login");

    // State to store user input data (name, email, password)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    // Function to handle input changes and update state
    const onChangeHandler = (event) => {
        const name = event.target.name; // Input field name
        const value = event.target.value; // Input field value
        setData(data => ({ ...data, [name]: value })); // Update state dynamically
    };

    // Function to handle login or sign-up submission
    const onLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission

        let newUrl = url; // Base API URL

        // Determine API endpoint based on current state (Login or Sign Up)
        if (currState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        // Send request to the server
        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            // If successful, set the token in the context and local storage
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false); // Close the login popup
        } else {
            // If failed, show an error message
            alert(response.data.message);
        }
    };

    return (
        <div className='login-popup'>
            {/* Form container */}
            <form onSubmit={onLogin} className="login-popup-container">
                {/* Popup title with close icon */}
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>

                {/* Input fields */}
                <div className="login-popup-inputs">
                    {/* Show name input only if the current state is Sign Up */}
                    {currState === "Login" ? <></> : (
                        <input 
                            name='name' 
                            onChange={onChangeHandler} 
                            value={data.name} 
                            type="text" 
                            placeholder='Your name' 
                            required 
                        />
                    )}
                    <input 
                        name='email' 
                        onChange={onChangeHandler} 
                        value={data.email} 
                        type="email" 
                        placeholder='Your email' 
                        required 
                    />
                    <input 
                        name='password' 
                        onChange={onChangeHandler} 
                        value={data.password} 
                        type="password" 
                        placeholder='Password' 
                        required 
                    />
                </div>

                {/* Submit button */}
                <button type='submit'> 
                    {currState === "Sign Up" ? "Create account" : "Login"}
                </button>

                {/* Terms and conditions checkbox */}
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the Terms of Use and Privacy Policy.</p>
                </div>

                {/* Toggle between Login and Sign Up */}
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Click here</span></p>
                }
            </form>
        </div>
    );
};

export default LoginPopup;
