import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    // State to track the currently active menu item
    const [menu, setMenu] = useState("Home");

    // Destructure required values and functions from StoreContext
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

    // React Router navigation hook
    const navigate = useNavigate();

    // Function to handle user logout
    const logout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        setToken(""); // Clear the token in the context
        navigate("/"); // Redirect to the home page
    };

    return (
        <div className='navbar'>
            {/* Logo with a link to the home page */}
            <Link to='/'> 
                <img src={assets.logo} alt="Logo" className="logo" /> 
            </Link>

            {/* Navigation menu */}
            <ul className="navbar-menu">
                <Link 
                    to='/' 
                    onClick={() => setMenu("Home")} 
                    className={menu === "Home" ? "active" : ""} 
                >
                    Home
                </Link>
                <a 
                    href='#expoler-menu' 
                    onClick={() => setMenu("Menu")} 
                    className={menu === "Menu" ? "active" : ""} 
                >
                    Menu
                </a>
                <a 
                    href='#app-download' 
                    onClick={() => setMenu("Mobile-App")} 
                    className={menu === "Mobile-App" ? "active" : ""} 
                >
                    Mobile-App
                </a>
                <a 
                    href='footer' 
                    onClick={() => setMenu("Contact Us")}  
                    className={menu === "Contact Us" ? "active" : ""} 
                >
                    Contact Us
                </a>
            </ul>

            {/* Right section of the navbar */}
            <div className="navbar-right">
                {/* Search icon */}
                {/* <img src={assets.search_icon} alt="Search Icon" /> */}

                {/* Cart icon with dynamic dot for items in the cart */}
                <div className="navbar-search-icon">
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt="Cart Icon" />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>

                {/* User authentication: Show Sign In or Profile Dropdown */}
                {!token ? (
                    <button onClick={() => setShowLogin(true)}> Sign In </button>
                ) : (
                    <div className='navbar-profile'>
                        {/* Profile icon */}
                        <img src={assets.profile_icon} alt="Profile Icon" />
                        {/* Dropdown menu */}
                        <ul className="nav-profile-dropdown">
                            <li>
                                <img onClick={()=>navigate('/myorders')} src={assets.bag_icon} alt="Orders Icon" />
                                <p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="Logout Icon" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
