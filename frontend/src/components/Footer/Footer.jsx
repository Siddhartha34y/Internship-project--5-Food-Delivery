import React from 'react';
import './Footer.css';
import { assets, food_list } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="FoodHub Logo" className="footer-logo" />
                <p className="footer-description">
                    Welcome to FoodHub, your ultimate destination for delicious food delivered to your doorstep. 
                    We strive to bring the best meals to you with a seamless delivery experience. Explore a wide 
                    variety of dishes, from healthy options to indulgent treats, all carefully prepared by top chefs.
                </p>
                <div className="footer-social-icons">
                    <a href="https://www.facebook.com/profile.php?id=100024559002690" target="_blank" rel="noopener noreferrer">
                        <img src={assets.facebook_icon} alt="Facebook" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src={assets.twitter_icon} alt="Twitter" />
                    </a>
                    <a href="https://www.linkedin.com/in/tek-narayan-yadav-108938289/" target="_blank" rel="noopener noreferrer">
                        <img src={assets.linkedin_icon} alt="LinkedIn" />
                    </a>
                </div>
            </div>

            <div className="footer-content-center">
               <h2>COMPANY</h2>
               <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#delivery">Delivery</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
               </ul>
            </div>

            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li><strong>Phone:</strong> +8700920579</li>
                    <li><strong>Email:</strong> <a href="mailto:contact@foodhub.com">contact@foodhub.com</a></li>
                </ul>
                <div className="footer-map">
                    <h3>Visit Us</h3>
                    <iframe 
                        title="KPR College Location" 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.7284197754745!2d77.02831871479834!3d11.005528767133317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab6f58b4a4367f%3A0x735a433f5ac54764!2sKPR%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1646356848980!5m2!1sen!2sin&t=k" 
                        width="100%" 
                        height="200" 
                        frameBorder="0" 
                        style={{ border: "0" }} 
                        allowFullScreen="" 
                        aria-hidden="false" 
                        tabIndex="0">
                    </iframe>
                </div>
            </div>
        </div>

        <div className="footer-image-container">
            <img src="food_hub.png"alt="FoodHub Banner" className="footer-banner" />
        </div>

        <div className="footer-contact">
            <h3>Have Any Questions? Send Us an Email</h3>
            <a href="mailto:teknarayan2456@gmail.com" className="send-email-button">
                Send Email
            </a>
        </div>

        <hr />

        <p className="footer-copyright">
            CopyRight 2025 © FoodHub.com - All Rights Reserved.
        </p>
    </div>
  );
}

export default Footer;

